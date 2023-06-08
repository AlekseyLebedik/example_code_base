import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeHasFeaturesEnabledSelector } from 'dw/core/components/ConfigFeatureFlags/selectors';
import { ACCOUNTS_USER_TEAMS_DISABLED } from 'dw/core/components/ConfigFeatureFlags/configFeatureFlags';
import { sourceSelector } from 'dw/core/components/OCFeatureFlags/selectors';

import StatelessComponent from './presentational';
import { tabChange } from './actions';

const hasFeatureFlagSelector = makeHasFeaturesEnabledSelector();

const stateToProps = state => {
  const projectTitleSource = sourceSelector(state);
  return {
    userTeamsState: state.Scenes.Accounts.Tabs.TabUserTeams,
    hasUserTeamsDisabled: hasFeatureFlagSelector(state, {
      configFeatureFlags: ACCOUNTS_USER_TEAMS_DISABLED,
      isStaffAllowed: false,
      projectTitleSource,
    }),
  };
};

const dispatchToProps = dispatch => ({
  onChange: key => dispatch(tabChange(key)),
});

StatelessComponent.propTypes = {
  ...StatelessComponent.propTypes,
  onChange: PropTypes.func.isRequired,
};

export default compose(connect(stateToProps, dispatchToProps))(
  StatelessComponent
);
