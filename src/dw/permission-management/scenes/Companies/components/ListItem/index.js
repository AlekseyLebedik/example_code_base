import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import styles from './index.module.css';

const ListItem = ({ id, name, selectedItem, onClick, isGroupOption }) => {
  const isSelected = selectedItem && selectedItem.id === id;
  return (
    <SearchableListItem
      className={classNames({
        [styles.listItem]: !isGroupOption,
      })}
      selected={isSelected}
      onClick={onClick}
      disabled={isGroupOption}
    >
      <div>{name}</div>
    </SearchableListItem>
  );
};
ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  isGroupOption: PropTypes.bool,
};
ListItem.defaultProps = {
  selectedItem: undefined,
  isGroupOption: false,
};

export default ListItem;
