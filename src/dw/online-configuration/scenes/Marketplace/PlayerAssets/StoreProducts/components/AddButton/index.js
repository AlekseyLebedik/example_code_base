import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import { muiStyles } from '../../../styles';
import styles from '../../index.module.css';

const AddButton = ({
  hasEditPermission,
  grantItems,
  selectedItems,
  classes,
}) => (
  <div className={classes.actionButtonContainer}>
    <ConfirmActionComponent
      tooltip="Add selected products"
      confirm={{
        title: 'Confirm Add Selected',
        confirmMsg: (
          <div key="dialogDiv">
            Are you sure you want to add the selected products to the player?
            <br />
          </div>
        ),
        mainButtonLabel: 'Confirm',
        destructive: false,
      }}
      className={
        selectedItems && selectedItems.length > 0 ? null : styles.hidden
      }
      component="IconButton"
      focusRipple
      color="primary"
      onClick={() => grantItems(selectedItems)}
      classes={{
        root: classes.rootButton,
        disabled: classes.disabledButton,
      }}
      disabled={!hasEditPermission}
    >
      <Icon>playlist_add_check</Icon>
    </ConfirmActionComponent>
  </div>
);

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
