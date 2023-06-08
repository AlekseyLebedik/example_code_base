/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, generatePath } from 'react-router-dom';
import { Card, Table } from 'antd';
import LinearProgress from '@material-ui/core/LinearProgress';
import { AutoSizer } from 'react-virtualized';

import {
  getClientTelemetry,
  getDispatcherTelemetry,
  getDispatcherTraceTelemetry,
  getOptimizerTelemetry,
} from 'dw/online-configuration/services/mmtrace';

import RouteLink from 'dw/online-configuration/components/RouteLink';

import {
  formatDateTimeSelector,
  dateToUTCTimestampSelector,
  timezoneOrDefaultSelector as timezoneSelector,
} from 'dw/core/helpers/date-time';

import { eventsForTimelineSelector, serverIDSelector } from './selectors';
import ThunderpantsLink from './components/ThunderpantsLink';
import LobbyEventsFilterForm from './components/LobbyEventsFilterForm';
import TimelineChart from '../MMPTrace/components/TimelineChart';
import EventDetail from '../MMPTrace/components/EventDetail';

import {
  WEEK,
  EVENTS_TABLE_COLUMNS,
  EVENT_TYPE_MAP,
  MEMBERSHIP_CHANGE,
  MEMBERSHIP_CHANGE_MAP,
} from './constants';

import './index.css';

const processEvent = event => ({
  ...event,
  displayName:
    event.type === MEMBERSHIP_CHANGE
      ? MEMBERSHIP_CHANGE_MAP[event.old_status][event.new_status]
      : EVENT_TYPE_MAP[event.type],
});

const stateToProps = state => ({
  formatDateTime: formatDateTimeSelector(state),
  dateToTimestamp: dateToUTCTimestampSelector(state),
  timezone: timezoneSelector(state),
});

const initialState = ({ dateToTimestamp }) => {
  const end = dateToTimestamp(new Date());
  return {
    data: [],
    lobbyId: null,
    selectedEvent: null,
    end,
    start: end - WEEK * 2,
    APICalls: 0,
  };
};

class LobbyViewer extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    formatDateTime: PropTypes.func.isRequired,
    // eslint-disable-next-line
    dateToTimestamp: PropTypes.func.isRequired,
    timezone: PropTypes.string.isRequired,
  };

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = initialState(props);
    const { lobbyId } = props.match.params;
    if (lobbyId) {
      this.onLobbyEventsFilterFormSubmit({ lobbyId });
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onEventClick(event) {
    this.setState({ selectedEvent: event });
  }

  onLobbyEventsFilterFormSubmit(values) {
    this.setState({ lobbyId: values.lobbyId });

    const { history, match } = this.props;
    history.replace(
      generatePath(match.path, { ...match.params, lobbyId: values.lobbyId })
    );

    this.reset(values);
    this.loadData(values.lobbyId);
  }

  onTimelineSegmentClick(segment) {
    this.setState(prevState => ({
      selectedEvent: prevState.data.find(item => item.id === segment.id),
    }));
  }

  setState(...args) {
    if (this._isMounted) super.setState(...args);
  }

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
        case 'eventtype': {
          const { start, end } = this.state;
          newColumn.render = (text, record) => {
            const playerId =
              record.user_id ||
              record.client__user_id ||
              record.in_confab__party__player__id;

            return (
              <span>
                <div>{record.displayName || record.type}</div>
                {playerId && playerId !== '0' && (
                  <div>
                    <RouteLink
                      routeName="mmp-trace"
                      linkName={playerId}
                      linkParams={{ playerId, start, end }}
                    />
                  </div>
                )}
              </span>
            );
          };
          break;
        }
        default:
      }
      return newColumn;
    });
  };

  updateData(events) {
    this.setState(previousState => ({
      data: [...previousState.data, ...events],
    }));
  }

  decreaseAPICalls() {
    this.setState(currentState => ({ APICalls: currentState.APICalls - 1 }));
  }

  increaseAPICalls() {
    this.setState(currentState => ({ APICalls: currentState.APICalls + 1 }));
  }

  reset(values) {
    const newState = initialState(this.props);
    newState.lobbyId = values.lobbyId;
    this.setState(newState);
  }

  async recursiveFetch(APITelemetryCall, params) {
    this.increaseAPICalls();
    try {
      const response = await APITelemetryCall(params);
      this.decreaseAPICalls();
      if (response.data.logs.length === 0) {
        return;
      }
      this.updateData(response.data.logs.map(event => processEvent(event)));
      if (response.data.nextPageToken) {
        this.recursiveFetch(APITelemetryCall, {
          ...params,
          nextPageToken: response.data.nextPageToken,
        });
      }
    } catch (e) {
      this.decreaseAPICalls();
    }
  }

  loadData(lobbyId) {
    const { start, end } = this.state;
    const params = {
      lobby_id: lobbyId,
      start,
      end,
    };
    this.recursiveFetch(getDispatcherTelemetry, params);
    this.recursiveFetch(getDispatcherTraceTelemetry, params);
    this.recursiveFetch(getOptimizerTelemetry, params);
    this.recursiveFetch(getClientTelemetry, params);
  }

  render() {
    const { APICalls, selectedEvent } = this.state;
    const { timezone } = this.props;
    const serverID = serverIDSelector(this.state);
    return (
      <section className="lobby-viewer-content">
        <div className="left">
          <Card>
            <LobbyEventsFilterForm
              values={{ lobbyId: this.state.lobbyId }}
              onSubmit={values => this.onLobbyEventsFilterFormSubmit(values)}
            />
          </Card>
          <ThunderpantsLink serverID={serverID} />
          {this.state.data.length > 0 && (
            <div className="scrollable-content">
              <Table
                className="events"
                dataSource={this.state.data}
                rowKey={record => `${record.id}${record.type}`}
                columns={this.applyFormatters(EVENTS_TABLE_COLUMNS)}
                pagination={false}
                onRow={row => ({
                  onClick: () => this.onEventClick(row),
                })}
                rowClassName={record =>
                  !selectedEvent ||
                  `${record.id}${record.type}` !==
                    `${selectedEvent.id}${selectedEvent.type}`
                    ? ''
                    : 'active-row'
                }
              />
            </div>
          )}
        </div>

        <div className="right">
          <div className="chart">
            {APICalls > 0 && (
              <LinearProgress className="progress" mode="indeterminate" />
            )}
            <AutoSizer disableHeight>
              {({ width }) => (
                <TimelineChart
                  config={{ height: 300, width, colorScaleKey: 'category' }}
                  data={eventsForTimelineSelector({
                    data: this.state.data,
                    timezone,
                  })}
                  onSegmentClick={segment =>
                    this.onTimelineSegmentClick(segment)
                  }
                />
              )}
            </AutoSizer>
          </div>

          <div className="event-detail">
            {this.state.selectedEvent && (
              <Card>
                <EventDetail event={this.state.selectedEvent} />
              </Card>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(connect(stateToProps)(LobbyViewer));
