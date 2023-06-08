import React from 'react';
import PropTypes from 'prop-types';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import styles from './index.module.css';

const ListItem = ({
  active,
  deleteGroup,
  description,
  id,
  index,
  name,
  onClick,
  selectedItemId,
}) => (
  <SearchableListItem
    active={active}
    onClick={onClick}
    selected={selectedItemId === id.toString()}
  >
    <div className="flex flex-col">
      <div>
        {index}) {name} ({id})
      </div>
      <small>{description}</small>
    </div>
    {deleteGroup && (
      <ConfirmActionComponent
        tooltip="Delete Group"
        className={styles.deleteButton}
        confirm={{
          title: 'Confirm Delete',
          confirmMsg: (
            <>
              <p>Are you sure you want to delete this group?</p>
              <p>You will not be able to undo this operation.</p>
            </>
          ),
          mainButtonLabel: 'Delete',
          destructive: true,
        }}
        component="IconButton"
        onClick={() => deleteGroup(id)}
        cancelOnBackdropClick
      >
        delete_forever
      </ConfirmActionComponent>
    )}
  </SearchableListItem>
);

ListItem.propTypes = {
  active: PropTypes.bool,
  deleteGroup: PropTypes.func,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
};

ListItem.defaultProps = {
  active: false,
  deleteGroup: null,
  selectedItemId: null,
};

export default ListItem;
