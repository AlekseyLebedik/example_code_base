import React from 'react';
import PropTypes from 'prop-types';

import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import SectionTitle from 'dw/core/components/SectionTitle';

const ListItem = ({ id, name, onClick, selectedItemId, username }) => (
  <SearchableListItem
    onClick={onClick}
    selected={selectedItemId === id.toString()}
  >
    <div className="flex flex-col">
      <div>{name}</div>
      <div>{username}</div>
    </div>
  </SearchableListItem>
);

ListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
  username: PropTypes.string.isRequired,
};
ListItem.defaultProps = {
  id: '',
  name: null,
  selectedItemId: '',
};

const getRenderItemFunc = (onSelectItem, selectedItemId) => item =>
  (
    <ListItem
      {...item}
      key={item.id}
      onClick={() => onSelectItem(item)}
      selectedItemId={selectedItemId}
    />
  );

export const UserListBase = ({
  initialValue,
  nextPage,
  onSearch,
  onSelectItem,
  onShowMore,
  selectedItemId,
  userList,
}) => (
  <>
    <SectionTitle
      color="default"
      shown={userList ? userList.length : 0}
      title="Available Users"
    />
    <SearchableList
      initialValue={initialValue}
      items={userList}
      loadingTimeout={0}
      onSearch={onSearch}
      onShowMore={() => onShowMore(nextPage)}
      placeholder="UserID | Username"
      showMore={!!nextPage}
      toRenderFunc={getRenderItemFunc(item => {
        onSelectItem(item.id);
      }, selectedItemId)}
    />
  </>
);

UserListBase.propTypes = {
  initialValue: PropTypes.string,
  nextPage: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
  userList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
UserListBase.defaultProps = {
  initialValue: '',
  nextPage: null,
  selectedItemId: 'null',
};

export default UserListBase;
