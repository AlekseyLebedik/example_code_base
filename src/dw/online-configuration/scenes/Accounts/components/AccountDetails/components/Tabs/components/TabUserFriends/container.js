import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';

import { AccountsActions } from 'dw/online-configuration/scenes/Accounts';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { fetchUserFriends } from './actions';
import TabUserFriendsStateless from './presentational';
import { userFriendsSelector } from './selectors';

const stateToProps = (state, props) => ({
  userID: state.Scenes.Accounts.selectedAccount.userID,
  userFriends: userFriendsSelector(state),
  nextPageToken: state.Scenes.Accounts.Tabs.TabUserFriends.nextPageToken,
  history: props.history,
  formatDateTime: formatDateTimeSelector(state),
});

const dispatchToProps = dispatch => ({
  onShowMore: (userID, nextPageToken) =>
    dispatch(fetchUserFriends(userID, { nextPageToken }, true)),
  onSearch: (userID, payload) => {
    const params = payload.default ? { friendId: payload.q } : payload.values;
    dispatch(fetchUserFriends(userID, params));
  },
  onClickFriendID: (history, friendID) => {
    history.push(`?q=${friendID}`);
    dispatch(AccountsActions.fetchAccounts({ q: friendID }));
    dispatch(fetchUserFriends(friendID));
  },
});

TabUserFriendsStateless.propTypes = {
  ...TabUserFriendsStateless.propTypes,
  onShowMore: PropTypes.func,
};

export default connect(stateToProps, dispatchToProps, TabUserFriendsStateless);
