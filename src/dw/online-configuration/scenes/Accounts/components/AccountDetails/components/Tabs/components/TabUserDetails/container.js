import { connect } from 'react-redux';

import * as actions from './actions';

import TabUserDetailsStateless from './presentational';
import { profilesSelector, userIdSelector } from './selectors';

const stateToProps = state => ({
  profiles: profilesSelector(state),
  userID: userIdSelector(state),
});

const dispatchToProps = {
  onChange: actions.changeUserProfile,
  onDeleteProfile: actions.deleteUserProfile,
  onChangeReputation: actions.changeReputation,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...dispatchProps,
  ...stateProps,
  reputation: {
    score: stateProps.profiles.reputation,
    onChange: (score, resolve, reject) =>
      dispatchProps.onChangeReputation(
        stateProps.userID,
        score,
        resolve,
        reject
      ),
  },
  onDelete: (profileType, resetKeys) => {
    const values = stateProps.profiles[profileType].map(item =>
      resetKeys.includes(item.key) ? '' : item.value
    );
    return dispatchProps.onChange(stateProps.userID, profileType, values);
  },
  key: stateProps.userID,
});

export default connect(
  stateToProps,
  dispatchToProps,
  mergeProps
)(TabUserDetailsStateless);
