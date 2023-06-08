import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { muiStyles } from '../../../styles';
import styles from '../../index.module.css';
import AddItemModal from '../../../components/AddItemModal';

const AddButton = ({
  hasEditPermission,
  grantItems,
  selectedItems,
  classes,
}) => {
  const [isAddModalOpen, setModal] = useState(false);
  const openAddModal = () => {
    setModal(true);
  };
  const closeAddModal = () => {
    setModal(false);
  };
  const handleSubmitAddModal = quantity => {
    grantItems(selectedItems, quantity);
    closeAddModal();
  };
  const firstItem = selectedItems.length === 1 ? selectedItems[0] : null;
  const maxQuantity =
    selectedItems && firstItem && firstItem.maxQuantity > 0
      ? firstItem.maxQuantity
      : 1;
  const noSelectedItems = selectedItems && selectedItems.length === 0;

  return (
    <div className={classes.actionButtonContainer}>
      <div
        className={classNames({
          [styles.hidden]: noSelectedItems,
        })}
      >
        <Tooltip title="Add selected items">
          <IconButton
            onClick={openAddModal}
            color="primary"
            classes={{
              root: classes.rootButton,
              disabled: classes.disabledButton,
            }}
            disabled={!hasEditPermission}
          >
            <Icon>playlist_add</Icon>
          </IconButton>
        </Tooltip>

        {isAddModalOpen && (
          <AddItemModal
            visible
            title="Confirm Add Selected"
            multiple={false}
            maxQuantity={maxQuantity}
            showInput={selectedItems && firstItem && firstItem.maxQuantity > 0}
            onSubmit={handleSubmitAddModal}
            onCancel={closeAddModal}
          />
        )}
      </div>
    </div>
  );
};

AddButton.propTypes = {
  hasEditPermission: PropTypes.bool.isRequired,
  grantItems: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.array,
};

AddButton.defaultProps = {
  selectedItems: [],
};

export default withStyles(muiStyles)(AddButton);
