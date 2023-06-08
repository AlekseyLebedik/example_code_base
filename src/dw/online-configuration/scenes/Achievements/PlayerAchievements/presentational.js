import React from 'react';
import PropTypes from 'prop-types';
import ComingSoon from 'dw/core/components/ComingSoon';
import Empty from 'dw/core/components/Empty';
import PlayerTabsContainer from 'dw/online-configuration/components/PlayerTabsContainer';
import Audit from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/Audit';
import AE, { ClanAchievements } from './components/AE';
import { useIsClanAchievements } from './hooks';

const TABS = [
  { name: 'player-achievements', label: 'Achievements' },
  { name: 'audit-log', label: 'Audit' },
  { name: 'manage', label: 'Manage' },
];

const CLAN_TABS = [{ name: 'clan-achievements', label: 'Achievements' }];

const AEAudit = ({ playerId, ...props }) => (
  <Audit {...props} userId={playerId} />
);
AEAudit.propTypes = {
  playerId: PropTypes.string,
};
AEAudit.defaultProps = {
  playerId: undefined,
};

const COMPONENTS_MAP = {
  'player-achievements': AE,
  'clan-achievements': ClanAchievements,
  'audit-log': AEAudit,
  manage: ComingSoon,
};

const EmptyComponent = ({ isClan }) =>
  isClan ? (
    <Empty>Select a Clan ID to view their Achievements data</Empty>
  ) : (
    <Empty>Select a Player to view their Achievements data</Empty>
  );

EmptyComponent.propTypes = {
  isClan: PropTypes.bool,
};

EmptyComponent.defaultProps = {
  isClan: false,
};

const PlayerInfo = ({
  playerId,
  path,
  titleId,
  env,
  handleChange,
  handleClanIDChange,
}) => {
  const isClan = useIsClanAchievements();
  const Component = COMPONENTS_MAP[path];
  return (
    <>
      <PlayerTabsContainer
        playerId={playerId}
        tabs={isClan ? CLAN_TABS : TABS}
        tab={path}
        onPlayerChange={value => handleChange('id', value)}
        onClanIDChange={handleClanIDChange}
        onTabChange={value => handleChange('path', value)}
      />
      {playerId ? (
        <>
          {Component && (
            <Component
              key={`${playerId}-${titleId}-${env}`}
              playerId={playerId}
            />
          )}
        </>
      ) : (
        <EmptyComponent isClan={isClan} />
      )}
    </>
  );
};

PlayerInfo.propTypes = {
  playerId: PropTypes.string,
  path: PropTypes.string,
  titleId: PropTypes.string,
  env: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleClanIDChange: PropTypes.func.isRequired,
};

PlayerInfo.defaultProps = {
  playerId: undefined,
  path: undefined,
  titleId: undefined,
  env: undefined,
};

export default PlayerInfo;
