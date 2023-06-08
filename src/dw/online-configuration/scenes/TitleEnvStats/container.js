import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { serviceEnabledSelector } from 'dw/core/helpers/title-env-selectors';
import { makeHasFeaturesEnabledSelector } from 'dw/core/components/ConfigFeatureFlags/selectors';
import { sourceSelector } from 'dw/core/components/OCFeatureFlags/selectors';
import { ONLINE_CONFIGURATION_GRAPHS_REDIRECT_TO_COREVIZ } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import { fetchEvents } from './actions';
import { makeEventsSelector } from './selectors';
import TitleEnvStatsStatelessComponent from './presentational';
import { BUBBLE_SERIE_BASE_CONFIG, EVENTS } from './constants';

const getBubble = context => {
  const { id, subject, description, purpose, impact } = context;
  const msg = [];
  msg.push(`<b>${id} ${subject}</b><br/>`);
  if (description !== undefined) {
    msg.push(`<b>Description: </b>${description}`);
  } else {
    msg.push(`<b>Purpose: </b>${purpose}<br/><b>Impact: </b>${impact}`);
  }
  return msg.join('');
};

const stateToProps = state => {
  const eventsSelector = makeEventsSelector(state);
  const events = {};
  Object.keys(EVENTS).forEach(eventType => {
    events[eventType] = eventsSelector(eventType);
  });
  const isServiceEnabled = serviceEnabledSelector(state);
  const projectTitleSource = sourceSelector(state);
  const hasFeatureFlagSelector = makeHasFeaturesEnabledSelector();
  return {
    events,
    useCorevizLink: hasFeatureFlagSelector(state, {
      configFeatureFlags: ONLINE_CONFIGURATION_GRAPHS_REDIRECT_TO_COREVIZ,
      isStaffAllowed: false,
      projectTitleSource,
    }),
    showOnlineGames: !isServiceEnabled(SERVICE_NAMES.MATCHMAKING),
  };
};

const dispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchEvents());
  },
});

const initialState = () => {
  const actionStatus = {};
  Object.keys(EVENTS).forEach(eventType => {
    actionStatus[eventType] = [];
  });
  return { actionStatus };
};

class TitleEnvStats extends Component {
  state = initialState();

  componentDidMount() {
    this.props.onLoad();
  }

  getSeries = statName =>
    Object.keys(EVENTS).map(eventType => ({
      ...BUBBLE_SERIE_BASE_CONFIG,
      id: `${statName}-${eventType}`,
      onSeries: statName,
      lineColor: EVENTS[eventType].color,
      tooltip: {
        // eslint-disable-next-line
        pointFormatter: function () {
          return getBubble(this);
        },
      },
      data: this.props.events[eventType],
      visible: this.isActionEnabled(eventType, statName),
    }));

  toggleAction = (eventType, statName) => {
    this.setState(prevState => {
      const { actionStatus } = prevState;
      const enabled = this.isActionEnabled(eventType, statName, prevState);
      if (enabled) {
        actionStatus[eventType] = actionStatus[eventType].filter(
          el => el !== statName
        );
      } else {
        actionStatus[eventType].push(statName);
      }

      return {
        ...prevState,
        actionStatus,
      };
    });
  };

  isActionEnabled = (eventType, statName, _state) => {
    const state = _state || this.state;
    return state.actionStatus[eventType].includes(statName);
  };

  render() {
    return (
      <TitleEnvStatsStatelessComponent
        getSeries={this.getSeries}
        isActionEnabled={this.isActionEnabled}
        toggleAction={this.toggleAction}
        {...this.props}
      />
    );
  }
}

TitleEnvStats.propTypes = {
  onLoad: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  showOnlineGames: PropTypes.bool.isRequired,
};

const TitleEnvStatsConnected = connect(
  stateToProps,
  dispatchToProps
)(TitleEnvStats);

export { TitleEnvStats as GraphsStateful };
export default TitleEnvStatsConnected;
