import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { AE_PLAYER_ACHIEVEMENTS_USE_NEW_UX } from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';

import PlayerAchievementsNewUX from './container';
import UserAchievementsOldUX from '../UserAchievements';

const stateToProps = state => ({
  useNewUX: hasFeaturesEnabledFuncSelector(state)(
    [AE_PLAYER_ACHIEVEMENTS_USE_NEW_UX],
    false
  ),
});

const PlayerAchievements = ({ useNewUX, ...props }) =>
  useNewUX ? (
    <PlayerAchievementsNewUX {...props} />
  ) : (
    <UserAchievementsOldUX {...props} />
  );

PlayerAchievements.propTypes = {
  useNewUX: PropTypes.bool.isRequired,
};

export default connect(stateToProps)(PlayerAchievements);
