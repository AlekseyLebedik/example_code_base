import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Table, Tabs } from 'antd';
import { withRouter, generatePath } from 'react-router-dom';
import { AGGrid } from 'dw/core/components';
import merge from 'deepmerge';
import { AutoSizer } from 'react-virtualized';
import LinearProgress from '@material-ui/core/LinearProgress';
import queryString from 'query-string';
import { Tooltip, Paper, Grid, IconButton, Icon } from '@material-ui/core';

import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import * as d3 from 'd3';

import {
  getClientTelemetry,
  getDispatcherTelemetry,
  getDispatcherTraceTelemetry,
  getOptimizerTelemetry,
} from 'dw/online-configuration/services/mmtrace';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import JSONTree from 'dw/core/components/JSONTree';
import {
  formatDateTimeSelector,
  offsetSelector,
  timezoneOrDefaultSelector as timezoneSelector,
  timestampToMomentSelector,
} from 'dw/core/helpers/date-time';
import { currentEnvSelector } from 'dw/core/helpers/title-env-selectors';
import ThunderpantsLink from 'dw/online-configuration/scenes/LobbyViewer/components/ThunderpantsLink';
import TimelineChart from './components/TimelineChart';
import EventDetail from './components/EventDetail';
import EventsFilterForm from './components/EventsFilterForm';

import {
  getEventGroupsTableColumns,
  EVENT_LIST_TABLE_COLUMNS,
  PLAYER_SEARCH_STARTED,
  PARTY_SEARCH_STARTED,
  PARTY_SEARCH_ENDED,
  LOBBY_DISBANDED,
  START_SEARCH,
  NAT_TYPE_MAP,
  EVENT_GROUP_KEYS,
  LOBBY_ADMISSION_ACCEPTED,
} from './constants';

import {
  eventGroupsSelector,
  serverIDSelector,
  eventBucketDistributionSelector,
} from './selectors';

import './index.css';
import LiveStatus from './components/LiveStatus';

const { TabPane } = Tabs;
const CANCELLED_PROMISE_ERROR = 'Cancelled Promisse';

const nestD3 = (getMMId, getLobbyId, logs) =>
  d3
    .nest()
    .key(d => d.bucket)
    .key(d => (d.bucket === 'search' ? getMMId(d) : getLobbyId(d)))
    .object(eventBucketDistributionSelector(logs));

const isSuccessEvent = (key, values) => {
  const hasAcceptedType = (value, type) => value.type === type;
  const hasSearchEndedSuccessfully = value =>
    value.type === PARTY_SEARCH_ENDED && value.outcome === 'SUCCESS';
  const hasLobbyEndedSuccessfully = value =>
    value.type === LOBBY_DISBANDED && value.reason === 'by_host';
  switch (key) {
    case EVENT_GROUP_KEYS.SEARCH:
      return values.some(
        v =>
          hasAcceptedType(v, LOBBY_ADMISSION_ACCEPTED) ||
          hasSearchEndedSuccessfully(v)
      );
    case EVENT_GROUP_KEYS.LOBBY:
      return values.some(v => hasLobbyEndedSuccessfully(v));
    default:
      return false;
  }
};

const selectDefaultEvent = eventGroup =>
  eventGroup && eventGroup.length > 0
    ? eventGroup.find(event => event.type === PLAYER_SEARCH_STARTED) ||
      eventGroup[0]
    : null;

const nestByKey = (mmIdKey, lobbyIdKey) => data =>
  nestD3(
    d => d[mmIdKey],
    d => d[lobbyIdKey],
    data
  );

const stateToProps = state => ({
  formatDateTime: formatDateTimeSelector(state),
  applyOffset: offsetSelector(state),
  timezone: timezoneSelector(state),
  timestampToMoment: timestampToMomentSelector(state),
  currentEnv: currentEnvSelector(state),
});

const dispatchToProps = dispatch => ({
  showSnackBarWithNoResults: () =>
    dispatch(GlobalSnackBarActions.show('There are no logs to show', 'info')),
  showError: error => dispatch(nonCriticalHTTPError(error)),
});

const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val =>
        hasCanceled_
          ? reject(new Error(CANCELLED_PROMISE_ERROR))
          : resolve(val),
      error =>
        hasCanceled_
          ? reject(new Error(CANCELLED_PROMISE_ERROR))
          : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

const initialState = ({ match, location }) => {
  const now = Math.round(new Date().getTime() / 1000);
  const { playerId = null, start = now - 60 * 60, end = now } = match.params;
  const { groupId = null } = queryString.parse(location.search);
  return {
    playerId,
    start,
    end,
    requestedGroupId: groupId,
    playerInfo: {},
    loading: false,
    data: {},
    eventGroups: [],
    selectedEventGroup: null,
    selectedEvent: null,
    servers: {},
  };
};

class MMPTrace extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
    applyOffset: PropTypes.func.isRequired,
    timestampToMoment: PropTypes.func.isRequired,
    formatDateTime: PropTypes.func.isRequired,
    showSnackBarWithNoResults: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    currentEnv: PropTypes.object,
  };

  static defaultProps = {
    currentEnv: {},
  };

  state = initialState(this.props);

  dataLoadingPromises = [];

  componentDidMount() {
    const { playerId, start, end, requestedGroupId } = this.state;
    if (playerId && start && end) {
      this.onEventSearchFormSubmit({ playerId, start, end, requestedGroupId });
    }
  }

  componentWillUnmount() {
    this.dataLoadingPromises.forEach(promise => promise.cancel());
  }

  onEventSearchFormSubmit(values) {
    const playerId =
      typeof values.playerId !== 'string'
        ? `${values.playerId.label} | ${values.playerId.value}`
        : values.playerId;
    this.updateUrl(values.start, values.end, playerId, values.requestedGroupId);
    this.reset({ ...values, playerId });
    this.loadData(playerId, values.start, values.end);
  }

  onTimelineSegmentClick(segment) {
    this.setState(previousState => ({
      selectedEventGroup: previousState.eventGroups.find(
        g => g.id === segment.id
      ),
      selectedEvent: selectDefaultEvent(
        previousState.data[segment.label][segment.id]
      ),
      requestedGroupId: segment.id,
    }));
    this.updateUrl(
      this.state.playerId,
      this.state.start,
      this.state.end,
      segment.id
    );
  }

  onEventGroupClick(eventGroup) {
    this.setState(previousState => ({
      selectedEventGroup: eventGroup,
      requestedGroupId: eventGroup.id,
      selectedEvent: selectDefaultEvent(
        previousState.data[eventGroup.label][eventGroup.id]
      ),
    }));
    this.updateUrl(
      this.state.playerId,
      this.state.start,
      this.state.end,
      eventGroup.id
    );
  }

  onEventClick(event) {
    this.setState({ selectedEvent: event });
  }

  updateDataAndEventGroups = events => {
    this.updateData(events);
    this.setState(previousState => {
      const eventGroups = [
        ...previousState.eventGroups,
        ...this.groupEvents(events),
      ];
      const mergedGroups = d3
        .nest()
        .key(d => d.id)
        .rollup(leaves => {
          let retvalue = null;
          leaves.forEach(leaf => {
            if (!retvalue) {
              retvalue = leaf;
            } else {
              const mergedRanges = [...retvalue.timeRange, ...leaf.timeRange];
              retvalue.isSuccess = retvalue.isSuccess || leaf.isSuccess;
              retvalue.isSuccess = retvalue.isSuccess || leaf.isSuccess;
              retvalue.timeRange = [d3.min(mergedRanges), d3.max(mergedRanges)];
            }
          });
          return retvalue;
        })
        .map(eventGroups)
        .values();
      return {
        eventGroups: mergedGroups,
        selectedEventGroup:
          previousState.selectedEventGroup !== previousState.requestedGroupId &&
          mergedGroups.length !== 0
            ? mergedGroups.filter(
                group => group.id === previousState.requestedGroupId
              )[0] ||
              previousState.selectedEventGroup ||
              mergedGroups[0]
            : previousState.selectedEventGroup,
      };
    });
  };

  applyFormatters = columns => {
    const { formatDateTime } = this.props;
    return columns.map(column => {
      const newColumn = { ...column };
      switch (newColumn.type) {
        case 'datetime': {
          const { render } = newColumn;
          newColumn.render =
            render !== undefined
              ? (text, record) => render(text, record, formatDateTime)
              : text => formatDateTime(text, column.format);
          break;
        }
        default:
      }
      return newColumn;
    });
  };

  groupEvents = data => {
    const events = [];
    d3.entries(data).forEach(label => {
      d3.entries(label.value)
        .filter(group => group.key !== 'None')
        .forEach(group => {
          events.push({
            id: group.key,
            label: label.key,
            isSuccess: isSuccessEvent(label.key, group.value),
            timeRange: [
              d3.min(group.value, event => event.timestamp_sec),
              d3.max(group.value, event => event.timestamp_sec),
            ],
          });
        });
    });

    return events;
  };

  updateUrl(playerId, start, end, groupId) {
    const { history, match } = this.props;
    const urlPath = generatePath(match.path, {
      ...match.params,
      playerId,
      start,
      end,
    });
    history.replace(groupId ? `${urlPath}?groupId=${groupId}` : urlPath);
  }

  reset(values) {
    this.setState({
      playerId: values.playerId,
      start: values.start,
      end: values.end,
      requestedGroupId: values.requestedGroupId,
      playerInfo: {},
      loading: true,
      data: {},
      eventGroups: [],
      selectedEventGroup: null,
      selectedEvent: null,
    });
  }

  updateTelemetryPlayerInfo(playerInfo) {
    const { nat_type: natType } = playerInfo;
    const {
      city: { value: city },
      latitude: { value: latitude },
      longitude: { value: longitude },
      country_code: { value: countryCode },
      continent_code: { value: continentCode },
    } = playerInfo.geolocation_data;

    this.setState({
      playerInfo: {
        NAT:
          (typeof natType === 'string' && capitalize(natType)) ||
          (typeof natType === 'number' && NAT_TYPE_MAP[natType]) ||
          'Not found',
        City: city,
        'Country Code': countryCode,
        'Continent Code': continentCode,
        Latitude: latitude,
        Longitude: longitude,
      },
    });
  }

  updateOptimizerPlayerInfo(log) {
    this.setState(previousState => ({
      playerInfo: {
        ...previousState.playerInfo,
        Gamertag: log.in_confab__party__player__player_name,
      },
    }));
  }

  updateData(events) {
    this.setState(previousState => ({
      data: merge.all([previousState.data, events]),
    }));
  }

  fetchDispatcherTraceTelemetry(params) {
    const transformFunc = data => {
      const targetMMIDs = params.mm_id.split(',');
      const transformed = [];
      data.forEach(item => {
        if (item.lobby_member_mm_ids) {
          item.lobby_member_mm_ids.forEach(mmId => {
            if (targetMMIDs.includes(mmId)) {
              transformed.push({ ...item, devzone__mm_id: mmId });
            }
          });
        } else if (item.considered_mm_id) {
          if (targetMMIDs.includes(item.considered_mm_id)) {
            transformed.push({
              ...item,
              devzone__mm_id: item.considered_mm_id,
            });
          }
        } else if (item.recipient_mm_id) {
          if (targetMMIDs.includes(item.recipient_mm_id)) {
            transformed.push({ ...item, devzone__mm_id: item.recipient_mm_id });
          }
        } else if (Array.isArray(item.basic_info__mm_ids__value)) {
          item.basic_info__mm_ids__value.forEach(mmId => {
            if (targetMMIDs.includes(mmId)) {
              transformed.push({ ...item, devzone__mm_id: mmId });
            }
          });
        } else {
          transformed.push({
            ...item,
            devzone__mm_id: item.basic_info__mm_ids__value,
          });
        }

        if (item.basic_info__lobby_ids__value) {
          if (
            Array.isArray(item.basic_info__lobby_ids__value) &&
            item.basic_info__lobby_ids__value.length > 0
          ) {
            // eslint-disable-next-line
            transformed.basic_info__lobby_ids__value =
              item.basic_info__lobby_ids__value[0];
          }
        }
      });
      return transformed;
    };
    return this.fetchLogs(params, getDispatcherTraceTelemetry, data =>
      nestByKey(
        'devzone__mm_id',
        'basic_info__lobby_ids__value'
      )(transformFunc(data))
    );
  }

  fetchDispatcherTelemetry(params) {
    return this.fetchLogs(params, getDispatcherTelemetry, data =>
      nestByKey('mm_id', 'lobby_id')(data)
    );
  }

  fetchOptimizerTelemetry(params) {
    return this.fetchLogs(params, getOptimizerTelemetry, data =>
      nestByKey('in_confab__mmid', 'in_confab__lobbyid')(data)
    );
  }

  fetchClientTelemetry(params) {
    return this.fetchLogs(params, getClientTelemetry, data =>
      nestD3(
        d =>
          d.matchmaking_search_summary__matchmaking_id ||
          d.matchmaking_id ||
          d.searches[0].matchmaking_id,
        d =>
          d.lobby_id !== 'None'
            ? d.lobby_id || d.lobby_intermission_summary__lobby_id
            : undefined,
        data
      )
    );
  }

  async fetchLogs(
    params,
    extract,
    transform,
    load = this.updateDataAndEventGroups
  ) {
    const extractPromise = makeCancelable(extract(params));
    this.dataLoadingPromises.push(extractPromise);
    const response = await extractPromise.promise;
    load(transform(response.data.logs));
    if (response.data.nextPageToken) {
      const newParams = {
        ...params,
        nextPageToken: response.data.nextPageToken,
      };
      await this.fetchLogs(newParams, extract, transform, load);
    }
  }

  async fetchMMIDs(playerId, start, end, dataCallback) {
    const params = {
      start,
      end,
      player_id: playerId,
    };

    const mmIds = [];
    const traceTelemetryData = [];
    const transform = data => {
      if (data.length > 0) {
        const playerInfo = data.find(log =>
          get(log, 'search__member_details[0].player_data', false)
        );
        if (playerInfo) {
          this.updateTelemetryPlayerInfo(
            playerInfo.search__member_details[0].player_data
          );
        }
      }
      return [
        flatten(
          data
            .map(item => item.mm_id || item.basic_info__mm_ids__value)
            .filter(mmId => mmId)
        ),
        data,
      ];
    };
    const load = ([ids, data]) => {
      mmIds.push(...ids);
      traceTelemetryData.push(...data);
    };

    await this.fetchLogs(
      {
        ...params,
        event_type: [PARTY_SEARCH_STARTED, START_SEARCH].join(','),
      },
      getDispatcherTraceTelemetry,
      transform,
      load
    );

    await this.fetchLogs(
      {
        ...params,
        event_type: PLAYER_SEARCH_STARTED,
      },
      getDispatcherTelemetry,
      transform,
      ([ids]) => mmIds.push(...ids)
    );
    const result = [...new Set(mmIds)];
    if (dataCallback && typeof dataCallback === 'function') {
      dataCallback(traceTelemetryData, result);
    }
    return result;
  }

  async loadData(playerId, start, end) {
    this.setState({ loading: true });
    const handleTraceTelemetryData = (data, mmIds) => {
      if (mmIds.length === 0) {
        this.setState({ loading: false });
        if (data.length === 0) {
          this.props.showSnackBarWithNoResults();
        } else {
          this.updateDataAndEventGroups(nestByKey()(data));
        }
      }
    };
    const mmIds = await this.fetchMMIDs(
      playerId,
      start,
      end,
      handleTraceTelemetryData
    );
    if (mmIds.length === 0) {
      return;
    }
    const params = {
      mm_id: mmIds.join(','),
      start,
      end,
    };
    Promise.all([
      this.fetchDispatcherTelemetry(params),
      this.fetchClientTelemetry({ player_id: playerId, start, end }),
      this.fetchClientTelemetry(params),
      this.fetchDispatcherTraceTelemetry(params),
      this.fetchOptimizerTelemetry(params),
    ])
      .then(() => {
        this.setState({ loading: false });
        this.dataLoadingPromises = [];
      })
      .catch(error => {
        if (error.message !== CANCELLED_PROMISE_ERROR) {
          this.props.showError(error);
        }
      });
  }

  render() {
    const {
      eventGroups,
      selectedEventGroup,
      data,
      loading,
      playerId,
      start,
      end,
    } = this.state;

    const { timezone, applyOffset, timestampToMoment, currentEnv } = this.props;
    const values = { playerId, start, end };

    const selectedGroupEventList = selectedEventGroup
      ? uniqBy(data[selectedEventGroup.label][selectedEventGroup.id], 'id')
      : [];

    const optimizerConfabPlayerResultEvent = selectedGroupEventList.find(
      item => item.type === 'OptimizerInConfabPlayerRecord'
    );
    const playlistId =
      optimizerConfabPlayerResultEvent &&
      optimizerConfabPlayerResultEvent.in_confab__playlist_id;
    let lobbyFillingUrl;

    if (playlistId) {
      const startISO = new Date(start * 1000).toISOString();
      const endISO = new Date(end * 1000).toISOString();
      const titleId = currentEnv.title;
      switch (currentEnv.shortType) {
        case 'dev':
          lobbyFillingUrl = `https://mm-kibana5.as.activision.com/app/kibana#/visualize/edit/AWq96hRBbG0EAfzZaGAZ?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:'${startISO}',mode:absolute,to:'${endISO}'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'_type:%20OptimizerPlayerResult%20AND%20in_confab__playlist_id:${playlistId}%20AND%20title_id:${titleId}')),uiState:(),vis:(aggs:!((enabled:!t,id:'3',params:(customInterval:'2h',extended_bounds:(),field:headers__timestamp,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(enabled:!t,id:'2',params:(field:etl_num_slots),schema:metric,type:max),(enabled:!t,id:'4',params:(field:lobby_id,order:desc,orderBy:_term,row:!t,size:5),schema:split,type:terms),(enabled:!t,id:'5',params:(field:in_confab__playlist_id,order:desc,orderBy:_term,size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(text:'headers__timestamp%20per%2030%20seconds'),type:category)),grid:(categoryLines:!f,style:(color:%23eee)),legendPosition:right,seriesParams:!((data:(id:'2',label:'Max%20etl_num_slots'),drawLinesBetweenPoints:!t,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!f,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!f,style:(),title:(text:'Max%20etl_num_slots'),type:value))),title:'Prod%20Filling%20Lobbies',type:histogram))`;
          break;
        case 'live':
          lobbyFillingUrl = `https://mm-kibana5.as.activision.com/app/kibana#/visualize/edit/AWZYZe5VBAhA-_w84UZT?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:'${startISO}',mode:absolute,to:'${endISO}'))&_a=(filters:!(),linked:!f,query:(query_string:(analyze_wildcard:!t,query:'_type:%20OptimizerPlayerResult%20AND%20in_confab__playlist_id:${playlistId}%20AND%20title_id:${titleId}')),uiState:(),vis:(aggs:!((enabled:!t,id:'3',params:(customInterval:'2h',extended_bounds:(),field:headers__timestamp,interval:auto,min_doc_count:1),schema:segment,type:date_histogram),(enabled:!t,id:'2',params:(field:etl_num_slots),schema:metric,type:max),(enabled:!t,id:'4',params:(field:lobby_id,order:desc,orderBy:_term,row:!t,size:5),schema:split,type:terms),(enabled:!t,id:'5',params:(field:in_confab__playlist_id,order:desc,orderBy:_term,size:5),schema:group,type:terms)),listeners:(),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(text:'headers__timestamp%20per%2030%20seconds'),type:category)),grid:(categoryLines:!f,style:(color:%23eee)),legendPosition:right,seriesParams:!((data:(id:'2',label:'Max%20etl_num_slots'),drawLinesBetweenPoints:!t,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!f,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!f,style:(),title:(text:'Max%20etl_num_slots'),type:value))),title:'Prod%20Filling%20Lobbies',type:histogram))`;
          break;
        default:
          lobbyFillingUrl = null;
      }
    }

    const selectedEvent =
      this.state.selectedEvent || selectDefaultEvent(selectedGroupEventList);

    const eventGroupRowClasses = record => {
      const classes = [];
      if (
        selectedEventGroup &&
        `${record.id}${record.timeRange[0]}` ===
          `${selectedEventGroup.id}${selectedEventGroup.timeRange[0]}`
      ) {
        classes.push('active-row');
      }
      const status = record.isSuccess ? 'success-row' : 'failed-row';
      classes.push(status);

      return classes.join(' ');
    };

    const serverID = serverIDSelector(selectedGroupEventList);

    const isSelectedGroupASearchBucket =
      selectedEventGroup && selectedEventGroup.label === 'search';

    const selectedGroupStartSearchEvent = isSelectedGroupASearchBucket
      ? selectedGroupEventList.find(
          item => item.type === 'mmp.async_matchmaking.start_search'
        )
      : null;

    const responseValue =
      selectedGroupStartSearchEvent &&
      selectedGroupStartSearchEvent.response__value
        ? JSON.parse(selectedGroupStartSearchEvent.response__value)
        : null;
        
    return (
      <section className="mmtrace-content">
        <div className="mmtrace-content__navigation">
          <EventsFilterForm
            values={values}
            loading={loading}
            onFilter={formValues => this.onEventSearchFormSubmit(formValues)}
            timestampToMoment={timestampToMoment}
          />
        </div>
        {Object.keys(this.state.playerInfo).length > 0 && (
          <TabPane tab="Player" key="2">
            <JSONTree data={this.state.playerInfo} />
          </TabPane>
        )}
        {eventGroups.length > 0 && (
          <div className="scrollable-content with-inner-padding">
            <div className="common__table-hydrated">
              <Table
                dataSource={eventGroups}
                columns={this.applyFormatters(
                  getEventGroupsTableColumns(this.props.currentEnv.shortType)
                )}
                rowKey={record =>
                  `${record.id}${record.timeRange && record.timeRange[0]}`
                }
                pagination={false}
                onRow={row => ({
                  onClick: () => this.onEventGroupClick(row),
                })}
                size="small"
                rowClassName={eventGroupRowClasses}
              />
            </div>
          </div>
        )}

        <LiveStatus />
        <AGGrid />

        {/* {loading && (
            <LinearProgress className="progress" mode="indeterminate" />
          )}
          <AutoSizer disableHeight>
            {({ width }) => (
              <TimelineChart
                data={eventGroupsSelector({
                  eventGroups,
                  timezone,
                })}
                config={{ height: 300, width }}
                startTime={applyOffset(start) * 1000}
                endTime={applyOffset(end) * 1000}
                onSegmentClick={segment => this.onTimelineSegmentClick(segment)}
              />
            )}
          </AutoSizer> */}

        {/* <div className="right-details">
            <div className="mmtrace-event-group">
              {selectedGroupEventList.length > 0 && (
                <>
                  {isSelectedGroupASearchBucket && (
                    <div className="filling-lobbies-wrapper">
                      <Tooltip
                        key="link"
                        title="Filling lobbies"
                        placement="right"
                      >
                        <IconButton
                          disableRipple
                          disabled={!lobbyFillingUrl}
                          onClick={() => {
                            window.open(lobbyFillingUrl, '_blank');
                          }}
                        >
                          <Icon fontSize="small">bar_chart</Icon>
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}

                  {serverID && (
                    <div className="thunderpants-link-container">
                      <ThunderpantsLink serverID={serverID} />
                    </div>
                  )}
                  <Table
                    dataSource={selectedGroupEventList}
                    columns={this.applyFormatters(EVENT_LIST_TABLE_COLUMNS)}
                    rowKey={record =>
                      `${record.id}${record.headers__timestamp}${record.type}`
                    }
                    pagination={false}
                    onRow={row => ({
                      onClick: () => this.onEventClick(row),
                    })}
                    size="small"
                    rowClassName={record =>
                      !selectedEvent ||
                      `${record.id}${record.headers__timestamp}${record.type}` !==
                        `${selectedEvent.id}${selectedEvent.headers__timestamp}${selectedEvent.type}`
                        ? ''
                        : 'active-row'
                    }
                  />
                </>
              )}
            </div>

            <div className="mmtrace-detail-view">
              {selectedEvent && (
                <Card>
                  <EventDetail
                    event={selectedEvent}
                    servers={
                      responseValue && responseValue.data_centers
                        ? responseValue.data_centers
                        : {}
                    }
                  />
                </Card>
              )}
            </div>
          </div> */}
      </section>
    );
  }
}

export default withRouter(connect(stateToProps, dispatchToProps)(MMPTrace));
