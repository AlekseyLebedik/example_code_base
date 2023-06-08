import React from 'react';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { DATE_TIME_FORMATS } from 'dw/core/helpers/date-time';
import {
  getTimestamp,
  sortTimestampSelector,
} from 'dw/online-configuration/scenes/selectors';

const getSearchTelemetryUrl = (start, end, record) =>
  `https://kibana.las.demonware.net/s/studios-default/app/discover#/?_g=(filters:!(),query:(language:lucene,query:''),refreshInterval:(pause:!t,value:0),time:(from:'${start}',to:'${end}'))&_a=(columns:!(type),filters:!(),index:matchmaking-wild-wild,interval:auto,query:(language:lucene,query:'mm_id:(${record.id})%20OR%20basic_info.mm_ids:(${record.id})'),sort:!(!('@timestamp_nanoseconds',desc)))`;

const getConfabInsightUrl = (start, end, record) =>
  `https://kibana.las.demonware.net/s/studios-default/app/visualize#/edit/082ebca9-64ee-4275-9518-30d80cfc28b1?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'${start}',to:'${end}'))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'666aca75-01fd-4090-b0ff-8860904517ea',key:type,negate:!f,params:(query:mmoptimizer.rule_results),type:phrase),query:(match_phrase:(type:mmoptimizer.rule_results)))),linked:!f,query:(language:kuery,query:'gen%3C60%20%20AND%20gen%3E50%20AND%20mm_id:${record.id}'),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(customLabel:False,field:rule_result.false_count),schema:metric,type:sum),(enabled:!t,id:'2',params:(customLabel:None,field:rule_result.none_count),schema:metric,type:sum),(enabled:!t,id:'3',params:(customLabel:True,field:rule_result.true_count),schema:metric,type:sum),(enabled:!t,id:'5',params:(field:rule_result.rule_name,missingBucket:!f,missingBucketLabel:Missing,order:asc,orderBy:_key,otherBucket:!f,otherBucketLabel:Other,size:30),schema:segment,type:terms),(enabled:!t,id:'6',params:(field:gen,missingBucket:!f,missingBucketLabel:Missing,order:asc,orderBy:_key,otherBucket:!f,otherBucketLabel:Other,size:30),schema:split,type:terms),(enabled:!f,id:'7',params:(field:rule_result.rule_name,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:_key,otherBucket:!f,otherBucketLabel:Other,size:5),schema:group,type:terms)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),position:left,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,grid:(categoryLines:!f),isVislibVis:!t,labels:(show:!f),legendPosition:right,maxLegendLines:1,palette:(name:kibana_palette,type:palette),radiusRatio:0,row:!f,seriesParams:!((data:(id:'1',label:False),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'2',label:None),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(data:(id:'3',label:True),drawLinesBetweenPoints:!t,lineWidth:2,mode:normal,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!t,rotate:90,show:!t,truncate:100),name:BottomAxis-1,position:bottom,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Sum%20of%20rule_result.false_count'),type:value))),title:'CM:%20WIP%20Rules',type:histogram))`;

const getLobbyTelemetryUrl = (start, end, record) =>
  `https://kibana.las.demonware.net/s/studios-default/app/discover#/?_g=(filters:!(),query:(language:lucene,query:''),refreshInterval:(pause:!t,value:0),time:(from:'${start}',to:'${end}'))&_a=(columns:!(type),filters:!(),index:matchmaking-wild-wild,interval:auto,query:(language:lucene,query:'lobby_id:(${record.id})%20OR%20basic_info.lobby_ids:(${record.id})'),sort:!(!('@timestamp_nanoseconds',desc)))`;

export const EVENT_GROUP_KEYS = {
  SEARCH: 'search',
  LOBBY: 'lobby',
};

const renderDateTimeCell = (ts, formatDateTime) => (
  <span>
    <div>{formatDateTime(ts, DATE_TIME_FORMATS.DATE_NO_YEAR)}</div>
    <div>{formatDateTime(ts, DATE_TIME_FORMATS.TIME_WITH_SECONDS)}</div>
  </span>
);

export const FORM_NAME = 'MMPTRACE_EVENTS_FILTER_FORM';

export const NAT_TYPE_MAP = {
  1: 'Open',
  2: 'Moderate',
  3: 'Strict',
};

export const PLAYER_SEARCH_STARTED = 'PLAYER_SEARCH_STARTED';
export const PARTY_SEARCH_STARTED =
  'mmp.async_matchmaking.party_search_started';
export const START_SEARCH = 'mmp.async_matchmaking.start_search';
export const LOBBY_ADMISSION_ACCEPTED = 'LOBBY_ADMISSION_ACCEPTED';
export const LOBBY_NOT_FOUND = 'mmp.async_matchmaking.msg_lobby_not_found';
export const LOBBY_DISBANDED = 'mmp.async_matchmaking.lobby_disbanded';
export const LOBBY_STATE_EVENT_PLAYER_GAME_START =
  'LOBBY_STATE_EVENT_PLAYER_GAME_START';
export const LOBBY_FORMED_PLAYER_LEVEL = 'LOBBY_FORMED_PLAYER_LEVEL';
export const PARTY_SEARCH_ENDED = 'mmp.async_matchmaking.party_search_ended';

export const OPTIMIZER_EVENTS = [
  'OptimizerPlayerResult',
  'OptimizerInConfabPlayerRecord',
  'mmoptimizer.start_search',
  'mmoptimizer.result',
  'mmoptimizer.rejected',
  'mmoptimizer.synchronous_merge_outcome',
];
export const TRACE_TELEMETRY_BLACKLIST = [
  'mmp.async_matchmaking.party_back_off_request',
  'mmp.async_matchmaking.set_client_player_info',
  'mmp.async_matchmaking.get_matchmaking_player_token',
  'mmp.async_matchmaking.data_center_qos_reply',
  'mmp.async_matchmaking.shutdown_matchmaking',
  'mmp.async_matchmaking.party_shutdown',
];

export const SEARCH_EVENTS = [
  PLAYER_SEARCH_STARTED,
  'PARTY_SEARCH_ENDED',
  'LOBBY_ADMISSION_CONSIDERED',
  'LOBBY_ADMISSION_REJECTED',
  'CLIENT_SEARCH_TO_MATCH_SUMMARY_PLAYER_RECORD',
  'CLIENT_MATCHMAKING_SEARCH_SUMMARY_PLAYER_RECORD',
  LOBBY_ADMISSION_ACCEPTED,
  'OptimizerPlayerResult',
  'OptimizerInConfabPlayerRecord',
  'dlog_search_to_match_summary_player_record',
  'dlog_matchmaking_search_summary_player_record',
  // dispatcher trace telemetry
  PARTY_SEARCH_STARTED,
  'mmp.async_matchmaking.cancel_matchmaking',
  'mmp.async_matchmaking.data_center_qos_reply',
  'mmp.async_matchmaking.get_data_center_preferences',
  'mmp.async_matchmaking.get_lobby_documents',
  'mmp.async_matchmaking.get_lobby_documents_response',
  'mmp.async_matchmaking.get_matchmaking_player_token',
  'mmp.async_matchmaking.initiate_dc_qos',
  'mmp.async_matchmaking.lobby_admission_accepted',
  'mmp.async_matchmaking.lobby_admission_considered',
  'mmp.async_matchmaking.lobby_admission_rejected',
  'mmp.async_matchmaking.msg_join_lobby',
  'mmp.async_matchmaking.msg_lobby_not_found',
  'mmp.async_matchmaking.p2p_qos_results',
  'mmp.async_matchmaking.party_back_off_request',
  'mmp.async_matchmaking.party_initialized',
  'mmp.async_matchmaking.party_search_ended',
  'mmp.async_matchmaking.party_shutdown',
  'mmp.async_matchmaking.set_client_player_info',
  'mmp.async_matchmaking.shutdown_matchmaking',
  'mmp.async_matchmaking.start_search',
  'mmoptimizer.start_search',
  'mmoptimizer.result',
  'mmoptimizer.rejected',
  'mmoptimizer.synchronous_merge_outcome',
];

export const LOBBY_EVENTS = [
  'PLAYER_LOBBY_STATUS_MEMBERSHIP_CHANGE',
  LOBBY_STATE_EVENT_PLAYER_GAME_START,
  'LOBBY_DISBANDED',
  'LOBBY_SHUTDOWN',
  LOBBY_FORMED_PLAYER_LEVEL,
  'CLIENT_LOBBY_INTERMISSION_SUMMARY_PLAYER_RECORD',
  'dlog_lobby_intermission_summary_player_record',
  // dispatcher trace telemetry
  'mmp.async_matchmaking.ack_expect_game',
  'mmp.async_matchmaking.ack_expect_game_timeout_alarm',
  'mmp.async_matchmaking.dedi_allocation',
  'mmp.async_matchmaking.game_started_lobby_state_event',
  'mmp.async_matchmaking.host_ack_new_member_timeout_alarm',
  'mmp.async_matchmaking.lobby_ack_expect_game_timed_out',
  'mmp.async_matchmaking.lobby_disbanded_api',
  'mmp.async_matchmaking.lobby_formed',
  'mmp.async_matchmaking.lobby_initialized',
  'mmp.async_matchmaking.lobby_member_status_from_host',
  'mmp.async_matchmaking.lobby_shutdown',
  'mmp.async_matchmaking.lobby_state_event',
  'mmp.async_matchmaking.msg_create_new_lobby',
  'mmp.async_matchmaking.msg_expect_game',
  'mmp.async_matchmaking.msg_join_lobby',
  'mmp.async_matchmaking.msg_lobby_disbanded',
  'mmp.async_matchmaking.msg_merge_into_lobby',
  'mmp.async_matchmaking.msg_update_lobby_doc',
  'mmp.async_matchmaking.sync_lobby_documents',
];

export const EVENT_LIST_TABLE_COLUMNS = [
  {
    title: 'Type',
    key: 'type',
    render: (text, record) => record.type,
    width: '60%',
  },
  {
    title: 'Timestamp',
    key: 'timestamp_sec',
    render: (text, record, formatDateTime) =>
      renderDateTimeCell(
        // use the same method of getting timestamp that we use to sort (microseconds)
        // then divide it down to seconds
        getTimestamp(record) / 1000 / 1000,
        formatDateTime
      ),
    sorter: (a, b) => sortTimestampSelector({ a, b }),
    sortOrder: 'ascend',
    width: '40%',
    type: 'datetime',
  },
];

export const getEventGroupsTableColumns = envType => [
  {
    title: '',
    key: 'label',
    render: (text, record) => record.label[0].toUpperCase(),
    width: '2.5%',
  },
  {
    title: '',
    key: 'kibana_link',
    render: (text, record) => {
      if (!record.timeRange[0]) {
        return null;
      }
      const start = new Date((record.timeRange[0] - 60) * 1000).toISOString();
      const end = new Date((record.timeRange[1] + 60) * 1000).toISOString();
      let url;
      let searchesChartUrl = null;
      if (record.label === 'search') {
        url = getSearchTelemetryUrl(start, end, record);

        if (envType === 'dev') {
          searchesChartUrl = getConfabInsightUrl(start, end, record);
        }
      } else {
        url = getLobbyTelemetryUrl(start, end, record);
      }

      let searchesChartLink;
      if (searchesChartUrl) {
        searchesChartLink = (
          <Tooltip key="confab-link" title="Confab insights" placement="top">
            <IconButton
              disableRipple
              onClick={() => {
                window.open(searchesChartUrl, '_blank');
              }}
            >
              <Icon fontSize="small">bubble_chart</Icon>
            </IconButton>
          </Tooltip>
        );
      }

      return (
        <div>
          <Tooltip
            key="telemetry-link"
            title={
              record.label === 'search' ? 'Player telemetry' : 'Lobby telemetry'
            }
            placement="top"
          >
            <IconButton
              disableRipple
              onClick={() => {
                window.open(url, '_blank');
              }}
            >
              <Icon fontSize="small">view_list</Icon>
            </IconButton>
          </Tooltip>
          {searchesChartLink}
        </div>
      );
    },
    width: '2.5%',
  },
  {
    title: 'Id',
    key: 'mm_id',
    render: (text, record) => record.id,
    width: '45%',
  },
  {
    title: 'Start',
    key: 'start',
    render: (text, record, formatDateTime) =>
      renderDateTimeCell(record.timeRange[0], formatDateTime),
    sorter: (a, b) => a.timeRange[0] - b.timeRange[0],
    sortOrder: 'ascend',
    width: '25%',
    type: 'datetime',
  },
  {
    title: 'End',
    key: 'end',
    render: (text, record, formatDateTime) =>
      renderDateTimeCell(record.timeRange[1], formatDateTime),
    width: '25%',
    type: 'datetime',
  },
];
