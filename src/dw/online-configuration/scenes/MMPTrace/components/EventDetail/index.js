import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import findIndex from 'lodash/findIndex';

import { mapEvent } from './jsonTreeConfig/mappings';

import EventDetailStateless from './presentational';
import { PARTY_SEARCH_STARTED, OPTIMIZER_EVENTS } from '../../constants';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: undefined,
      eventType: '',
      dataCenterQosResults: [],
      data: undefined,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // there might be events with the same id and different type
    if (
      nextProps.event.id === prevState.eventId &&
      nextProps.event.type === prevState.type
    ) {
      return null;
    }

    const { id, type } = nextProps.event;

    const dataCenterResultsSortFunc = (a, b) => {
      if (a.percent_packet_loss === 100) {
        return 1;
      }
      if (b.percent_packet_loss === 100) {
        return -1;
      }
      return a.median_ping_ms - b.median_ping_ms;
    };
    const mappedEvent = mapEvent(nextProps.event);

    // Sort by keys lexicographically using insert order
    // Filter all header fields for non optimizer events
    // Filter metadata for all events
    const leaveHeaderFields =
      'type' in mappedEvent && OPTIMIZER_EVENTS.includes(mappedEvent.type);
    const sortedEvent = {};
    Object.keys(mappedEvent)
      .sort()
      .filter(
        field =>
          (!field.startsWith('headers') || leaveHeaderFields) &&
          !field.startsWith('meta')
      )
      .forEach(key => {
        sortedEvent[key] = mappedEvent[key];
      });

    const normalizeQOS = event => {
      let retvalue = [];
      if (event.data_center_qos_results) {
        retvalue = [...event.data_center_qos_results];
      } else if (event.type === PARTY_SEARCH_STARTED) {
        if (event.search__member_details.length > 0) {
          // For party_search_started we return the data
          // from the party host
          const partyHost = get(event, 'party_host_user_ids');
          const searchMemberDetails = get(event, 'search__member_details', []);
          // nullable fields are sanitized in the new telemetry
          const memberIdx = findIndex(searchMemberDetails, member =>
            typeof member.party_member_user_id === 'object'
              ? member.party_member_user_id.value === partyHost
              : member.party_member_user_id === partyHost
          );
          const qosResults = get(
            event.search__member_details[memberIdx],
            'player_data.data_center_qos_results',
            []
          );
          qosResults.forEach(result => {
            retvalue.push({
              ...result.qos_result,
              data_center: result.data_center,
            });
          });
        }
      }
      return retvalue;
    };
    const getDataCenterResults = event => {
      const qosResults = normalizeQOS(event);
      if (qosResults.length === 0) return qosResults;
      return [...qosResults].sort(dataCenterResultsSortFunc);
    };

    return {
      eventId: id,
      eventType: type,
      dataCenterQosResults: getDataCenterResults(nextProps.event),
      data: sortedEvent,
    };
  }

  render() {
    return (
      <EventDetailStateless {...this.state} servers={this.props.servers} />
    );
  }
}
EventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  servers: PropTypes.object.isRequired,
};

export default EventDetail;
