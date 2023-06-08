import React from 'react';
import PropTypes from 'prop-types';

import Table from 'dw/core/components/TableHydrated';
import Search from 'dw/core/components/Search';
import NextPageButton from 'dw/core/components/NextPageButton';
import {
  COLUMNS,
  SEARCH_DEFAULT_FIELD,
  SEARCH_ADVANCED_FIELDS,
} from './constants';
import './presentational.css';

const TabUserFriendsStateless = props => {
  const {
    userID,
    userFriends,
    onSearch,
    onShowMore,
    nextPageToken,
    history,
    onClickFriendID,
    formatDateTime,
  } = props;

  const friendIDColumn = {
    title: 'Friend ID',
    key: 'friendID',
    render: (text, record) => (
      <a onClick={() => onClickFriendID(history, record.friendID)}>
        {record.friendID}
      </a>
    ),
    width: '28%',
  };

  const columns = [friendIDColumn, ...COLUMNS];

  const table = () => (
    <Table
      data={userFriends}
      columns={columns}
      size="small"
      pagination={false}
      formatDateTime={formatDateTime}
    />
  );

  const search = () => (
    <Search
      placeholder="Friend ID | use complete numeric Ids"
      onSearch={payload => onSearch(userID, payload)}
      defaultSearchField={SEARCH_DEFAULT_FIELD}
      advancedSearchFields={SEARCH_ADVANCED_FIELDS}
    />
  );

  const empty = () => <div className="empty">No data to display</div>;

  const hasFriends = userFriends.length !== 0;

  return (
    <div className="user-friends flex-rows-container">
      {search()}
      <div className="scrollable-content table-content with-inner-padding">
        {hasFriends ? table() : empty()}
      </div>
      {nextPageToken && (
        <NextPageButton
          nextPageToken={nextPageToken}
          onClick={() => onShowMore(userID, nextPageToken)}
        />
      )}
    </div>
  );
};

TabUserFriendsStateless.propTypes = {
  userFriends: PropTypes.array.isRequired,
  userID: PropTypes.string || PropTypes.number,
  onSearch: PropTypes.func,
  onShowMore: PropTypes.func,
  nextPageToken: PropTypes.string,
  history: PropTypes.array,
  onClickFriendID: PropTypes.func,
  formatDateTime: PropTypes.func,
};

TabUserFriendsStateless.defaultProps = {
  userID: undefined,
  onSearch: () => {},
  onShowMore: () => {},
  nextPageToken: undefined,
  history: undefined,
  onClickFriendID: () => {},
  formatDateTime: undefined,
};

export default TabUserFriendsStateless;
