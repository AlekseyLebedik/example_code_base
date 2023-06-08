import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { muiStyles } from '../../../styles';
import styles from '../../index.module.css';
import DeleteItemsModal from '../../../components/DeleteItemsModal';

const DeleteButton = ({
  hasEditPermission,
  onRemoveItems,
  selectedItems,
  maxQuantity,
  classes,
}) => {
  const [isDeleteModalOpen, setModal] = useState(false);
  const openDeleteModal = () => {
    setModal(true);
  };
  const closeDeleteModal = () => {
    setModal(false);
  };
  const handleSubmitDeleteModal = quantity => {
    onRemoveItems(selectedItems, quantity);
    closeDeleteModal();
  };
  const noSelectedItems = selectedItems && selectedItems.length === 0;

  return (
    <div className={classes.actionButtonContainer}>
      <div
        className={classNames({
          [styles.hidden]: noSelectedItems,
        })}
      >
        <Tooltip title="Delete All Selected">
          <IconButton
            onClick={openDeleteModal}
            classes={{
              root: classNames(classes.rootButton, styles.redButton),
              disabled: classes.disabledButton,
            }}
            disabled={!hasEditPermission}
          >
            <Icon>delete</Icon>
          </IconButton>
        </Tooltip>

        {isDeleteModalOpen && (
          <DeleteItemsModal
            visible
            multiple={false}
            maxQuantity={maxQuantity}
            showInput={selectedItems.length === 1}
            onSubmit={handleSubmitDeleteModal}
            onCancel={closeDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

DeleteButton.propTypes = {
  hasEditPermission: PropTypes.bool.isRequired,
  onRemoveItems: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.array,
  maxQuantity: PropTypes.number.isRequired,
};

DeleteButton.defaultProps = {
  selectedItems: [],
};

export default withStyles(muiStyles)(DeleteButton);
