import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import Empty from 'dw/core/components/Empty';
import SectionAccordion from 'dw/player-tooling/components/SectionAccordion';
import ScrollTop from 'dw/player-tooling/components/ScrollTop';
import { titleNameSelector } from 'dw/player-tooling/scenes/GameData/selectors';

import Accounts from './components/Accounts';
import ABTesting from './components/ABTesting';
import Achievements from './components/Achievements';
import Battlepass from './components/Battlepass';
import Clans from './components/Clans';
import Inventory from './components/Inventory';
import Leaderboards from './components/Leaderboards';
import RecentActivity from './components/RecentActivity';
import Matchmaking from './components/Matchmaking';
import Storage from './components/Storage';
import TitleView from './components/TitleView';

import { SERVICE_LABELS, SERVICE_NAMES } from '../../constants';

import styles from './presentational.module.css';

function ComingSoon() {
  return (
    <Box my={2} style={{ width: '100%' }}>
      <Empty>Coming Soon</Empty>
    </Box>
  );
}

function RenderServiceViews({ service, ...props }) {
  const displayABTesting = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)([fs.DISPLAY_PLAYER_ABTESTING], false)
  );
  const displayLeaderboards = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [fs.DISPLAY_PLAYER_LEADERBOARDS],
      false
    )
  );

  switch (service) {
    case SERVICE_NAMES.ABTESTING:
      if (!displayABTesting) break;
      return <ABTesting {...props} />;
    case SERVICE_NAMES.ACHIEVEMENTS:
      return <Achievements {...props} />;
    case SERVICE_NAMES.BATTLEPASS:
      return <Battlepass {...props} />;
    case SERVICE_NAMES.CLANS:
      return <Clans {...props} />;
    case SERVICE_NAMES.INVENTORY:
      return <Inventory {...props} />;
    case SERVICE_NAMES.STORAGE:
      return <Storage {...props} />;
    case SERVICE_NAMES.MATCHMAKING:
      return <Matchmaking {...props} />;
    case SERVICE_NAMES.LEADERBOARDS:
      if (!displayLeaderboards) break;
      return <Leaderboards {...props} />;
    default:
      return <ComingSoon />;
  }
  return <ComingSoon />;
}

RenderServiceViews.propTypes = {
  service: PropTypes.string.isRequired,
};

const StatelessGameDataContent = ({
  accountsServiceConfigId,
  callbackRef,
  expandAllSections,
  groupBy,
  linkToSection,
  onScroll,
  onSelectAccount,
  playerAccounts,
  playerDataLoading,
  playerBans,
  scrollPosition,
  selectedOptions,
  setHighlightedOption,
  target,
  titleEnvs,
  unoID,
  unoUserData,
}) => {
  const titleName = useSelector(titleNameSelector);
  const sectionAccordionProps = useMemo(
    () => ({
      expandAll: expandAllSections,
      scrollPosition,
      setHighlightedOption,
    }),
    [expandAllSections, scrollPosition, setHighlightedOption]
  );
  const variables = useMemo(
    () => ({ accountsServiceConfigId, unoID }),
    [accountsServiceConfigId, unoID]
  );
  return unoID && playerAccounts.length > 0 ? (
    <>
      <Container
        className={styles.content}
        onScroll={onScroll}
        ref={callbackRef}
      >
        <div id="back-to-top-anchor" />
        {selectedOptions.globals.includes('accounts') && (
          <SectionAccordion
            id="accounts"
            title="Accounts"
            {...sectionAccordionProps}
          >
            <Accounts
              accountsServiceConfigId={accountsServiceConfigId}
              expandAllSections={expandAllSections}
              onSelectAccount={onSelectAccount}
              playerAccounts={playerAccounts}
              playerDataLoading={playerDataLoading}
              playerBans={playerBans}
              unoID={unoID}
              unoUserData={unoUserData}
            />
          </SectionAccordion>
        )}
        {selectedOptions.globals.includes('activity') && (
          <SectionAccordion
            id="activity"
            title="Recent Activity"
            {...sectionAccordionProps}
          >
            <RecentActivity
              linkToSection={linkToSection}
              variables={variables}
            />
          </SectionAccordion>
        )}
        {groupBy === 'services'
          ? selectedOptions.services.map(service => (
              <SectionAccordion
                id={service}
                key={service}
                title={SERVICE_LABELS[service]}
                {...sectionAccordionProps}
              >
                <RenderServiceViews
                  groupBy={groupBy}
                  linkToSection={linkToSection}
                  onSelectAccount={onSelectAccount}
                  service={service}
                  titleEnvs={titleEnvs}
                  variables={variables}
                />
              </SectionAccordion>
            ))
          : selectedOptions.titles.map(title => (
              <SectionAccordion
                id={title}
                key={title}
                title={titleName(title)}
                {...sectionAccordionProps}
              >
                <TitleView
                  linkToSection={linkToSection}
                  onSelectAccount={onSelectAccount}
                  titleEnvs={titleEnvs}
                  variables={{ ...variables, titleId: title }}
                />
              </SectionAccordion>
            ))}
      </Container>
      <ScrollTop target={target} />
    </>
  ) : (
    <Empty
      className={styles.emptyGrid}
      emptyText="Please enter an Activision (Uno) Account ID or First Party ID or Gamertag or Email"
    />
  );
};

StatelessGameDataContent.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  callbackRef: PropTypes.func.isRequired,
  expandAllSections: PropTypes.bool.isRequired,
  groupBy: PropTypes.string.isRequired,
  linkToSection: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
  playerAccounts: PropTypes.arrayOf(PropTypes.object),
  playerDataLoading: PropTypes.bool.isRequired,
  playerBans: PropTypes.array,
  scrollPosition: PropTypes.number.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  setHighlightedOption: PropTypes.func.isRequired,
  target: PropTypes.object,
  titleEnvs: PropTypes.arrayOf(PropTypes.object),
  unoID: PropTypes.string,
  unoUserData: PropTypes.object.isRequired,
};
StatelessGameDataContent.defaultProps = {
  playerAccounts: [],
  target: undefined,
  titleEnvs: [],
  unoID: null,
  playerBans: [],
};

export default StatelessGameDataContent;
