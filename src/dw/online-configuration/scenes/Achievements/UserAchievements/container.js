import React from 'react';
import PropTypes from 'prop-types';

import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { getAccounts } from 'dw/online-configuration/services/accounts';
import { selectedRowKeysSelector } from 'dw/core/components/TableHydrated';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import {
  fetchUserAchievements,
  deleteUserAchievements,
} from '../PlayerAchievements/components/AE/actions';
import UserAchievementsStatelessComponent from './presentational';

const mapStateToProps = (state, props) => ({
  playerId: props.match.params.id,
  userAchievements: state.Scenes.Achievements.UserAchievements.userAchievements,
  nextPageToken: state.Scenes.Achievements.UserAchievements.nextPageToken,
  apiCallFunc: input => getAccounts({ q: input }),
  renderOptionFunc: item => `${item.userName} | ${item.userID}`,
  selectedRowKeys: selectedRowKeysSelector(state),
  formatDateTime: formatDateTimeSelector(state),
});

const dispatchToProps = dispatch => {
  const fetch = (playerId, nextPageToken, append = false) =>
    dispatch(fetchUserAchievements(playerId, nextPageToken, append));
  return {
    onLoad: playerId => fetch(playerId),
    onSelect: playerId => fetch(playerId),
    onShowMore: (playerId, nextPageToken) =>
      fetch(playerId, nextPageToken, true),
    deleteAchievements: (playerId, values) =>
      dispatch(deleteUserAchievements(playerId, values)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSelect: itemSelected => {
    const { history, location, match } = ownProps;
    const playerId = itemSelected.split(' | ')[1];
    let pathname = match.url;
    const { id } = match.params;
    pathname = !id
      ? joinPath(pathname, playerId)
      : pathname.replace(id, playerId);
    history.replace({ ...location, pathname });

    dispatchProps.onSelect(playerId);
  },
});

class UserAchievements extends React.Component {
  componentDidMount() {
    const { onLoad, playerId } = this.props;

    if (playerId) {
      onLoad(playerId);
    }
  }

  render() {
    return UserAchievementsStatelessComponent(this.props);
  }
}

UserAchievements.propTypes = {
  ...UserAchievementsStatelessComponent.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  dispatchToProps,
  UserAchievements,
  mergeProps
);
