import { connect } from '../../../AppStore';
import { actions as userActions } from '../index';

const stateToProps = state => ({
  profile: state.user.profile,
});

const dispatchToProps = dispatch => ({
  updateUserProfile: (...args) =>
    dispatch(userActions.updateUserProfile(...args)),
  updateUserProfileSetting: (...args) =>
    dispatch(userActions.updateUserProfileSetting(...args)),
  createUserProfileSetting: (...args) =>
    dispatch(userActions.createUserProfileSetting(...args)),
  logoutUser: (...args) => dispatch(userActions.logoutUser(...args)),
  addUserProfileFavoritePlayer: (...args) =>
    dispatch(userActions.addFavoritePlayer(...args)),
  removeUserProfileFavoritePlayer: (...args) =>
    dispatch(userActions.deleteFavoritePlayer(...args)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  user: {
    profile: stateProps.profile,
    actions: dispatchProps,
  },
});

export const withUserProfileActions = connect(
  stateToProps,
  dispatchToProps,
  mergeProps
);
