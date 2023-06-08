import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { COREVIZ_HOST } from '@demonware/devzone-core/config';
import Graph from 'dw/devzone/components/Graph';
import OCFeatureFlags from 'dw/core/components/OCFeatureFlags';
import {
  GAMEMODES_CHART_ENABLED,
  OPS4_SPECIFIC_FEATURES_ENABLED,
} from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import { GAMEMODES_STAT } from 'dw/reporting/constants';

import {
  STAT_NAMES,
  STAT_LABELS,
  STAT_LABELS_SHORT,
  EVENTS,
} from './constants';
import './presentational.css';

const TitleEnvStatsStateless = ({
  getSeries,
  isActionEnabled,
  toggleAction,
  showOnlineGames,
  useCorevizLink,
}) => {
  const getButton = (statName, eventType) => {
    const iconName = EVENTS[eventType].icon;
    return (
      <Tooltip
        key={eventType}
        title={eventType.charAt(0).toUpperCase() + eventType.slice(1)}
      >
        <Button
          className={`show-${eventType}${
            isActionEnabled(eventType, statName) ? ' active' : ''
          }`}
          onClick={() => toggleAction(eventType, statName)}
        >
          <Icon>{iconName}</Icon>
        </Button>
      </Tooltip>
    );
  };

  const getGraph = statName => {
    const actions = () => (
      <div className="Actions">
        {Object.entries(EVENTS)
          .sort((a, b) => a[1].position - b[1].position)
          .map(([eventType]) => getButton(statName, eventType))}
      </div>
    );
    const header = (
      <div className="header">
        <div className="header__name">{STAT_LABELS[statName]}</div>
        <div className="header__name-short">{STAT_LABELS_SHORT[statName]}</div>
        {actions()}
      </div>
    );
    return (
      <div className="Graph__container" key={statName}>
        {header}
        <Graph
          statName={statName}
          source={{ withTitleEnv: true, resource: 'stats' }}
          externalSeries={getSeries(statName)}
          series={[
            { id: statName, name: STAT_LABELS[statName], visible: true },
          ]}
        />
      </div>
    );
  };

  return useCorevizLink ? (
    <div className="_redirect__container">
      <div className="_redirect__content">
        <div className="first">
          {' '}
          <a
            href={`${COREVIZ_HOST}/dashboards/247/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Data moved to Coreviz
          </a>
        </div>
        <div className="third">
          We have moved to Coreviz to display more accurate data about Max
          Concurrent Online Users and Max Daily Unique Users for this title
          environment.
        </div>
        <div className="second">
          Click{' '}
          <a
            href={`${COREVIZ_HOST}/dashboards/247/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            here to go to the Coreviz dashboard
          </a>
          .
        </div>
      </div>
    </div>
  ) : (
    <OCFeatureFlags
      configFeatureFlags={[
        OPS4_SPECIFIC_FEATURES_ENABLED,
        GAMEMODES_CHART_ENABLED,
      ]}
      isStaffAllowed={false}
      aggregated={false}
    >
      {(ops4Enabled, gamemodesEnabled) => (
        <div className="Graphs__container">
          <div className="banner">
            These graphs are for production information only. They are not fit
            for purpose for analytics or business reporting.
            <br />
            For business reporting metrics please contact the Descriptive
            Analytics team{' '}
            <a href="mailto:descriptivegameanalyticsrequests@activision.com">
              (descriptivegameanalyticsrequests@activision.com)
            </a>
            .
          </div>
          {STAT_NAMES.filter(
            statName => statName !== 'games-online' || showOnlineGames
          ).map(statName =>
            statName !== 'registered-users' || !ops4Enabled
              ? getGraph(statName)
              : null
          )}

          {gamemodesEnabled && (
            <div className="Graph__container" key="gamemodes">
              <div className="header">
                <div className="header__name">Users By Gamemode</div>
              </div>
              <Graph
                statName={GAMEMODES_STAT}
                source={{ withTitleEnv: true, resource: 'stats' }}
                series={[
                  { id: 'multiplayer', name: 'Multiplayer', visible: true },
                  { id: 'zombies', name: 'Zombies', visible: true },
                  { id: 'in-menu', name: 'In Menu', visible: true },
                  { id: 'blackout', name: 'Blackout', visible: true },
                  { id: 'total', name: 'Total', visible: true },
                ]}
              />
            </div>
          )}
        </div>
      )}
    </OCFeatureFlags>
  );
};

TitleEnvStatsStateless.propTypes = {
  getSeries: PropTypes.func.isRequired,
  isActionEnabled: PropTypes.func.isRequired,
  toggleAction: PropTypes.func.isRequired,
  showOnlineGames: PropTypes.bool.isRequired,
  useCorevizLink: PropTypes.bool.isRequired,
};

export default TitleEnvStatsStateless;
