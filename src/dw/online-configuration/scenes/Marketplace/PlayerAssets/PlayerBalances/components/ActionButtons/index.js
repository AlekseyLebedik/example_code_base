import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { muiStyles } from '../../../styles';
import styles from '../../presentational.module.css';
import DeleteItemsModal from '../../../components/DeleteItemsModal';

const ActionButtons = ({
  hasEditPermission,
  selectedBalances,
  isEditing,
  onToggleEdit,
  onSubmitEdit,
  onToggleDeleteModal,
  onSubmitDelete,
  isDeleteModalOpen,
  classes,
  reset,
  pristine,
  submitting,
  handleSubmit,
}) => {
  const noSelectedItems = selectedBalances && selectedBalances.length === 0;
  return (
    <div className={styles.actionButtonContainer}>
      {isEditing ? (
        <div className={styles.buttonGroup}>
          <Tooltip title="Cancel">
            <div>
              <IconButton
                key="primary"
                color="primary"
                focusRipple
                disabled={submitting}
                onClick={() => {
                  reset();
                  onToggleEdit();
                }}
                classes={{
                  root: classes.rootButton,
                  disabled: classes.disabledButton,
                }}
              >
                <Icon>cancel_presentation</Icon>
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title="Save"
            className={classNames({
              [styles.hidden]: pristine || submitting,
            })}
          >
            <div>
              <IconButton
                key="primary"
                color="primary"
                type="submit"
                disabled={!hasEditPermission || pristine || submitting}
                onClick={handleSubmit(onSubmitEdit)}
                focusRipple
                classes={{
                  root: classes.rootButton,
                  disabled: classes.disabledButton,
                }}
              >
                <Icon>save</Icon>
              </IconButton>
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className={styles.buttonGroup}>
          <Tooltip title="Edit">
            <div>
              <IconButton
                key="primary"
                color="primary"
                focusRipple
                disabled={!hasEditPermission}
                onClick={onToggleEdit}
                classes={{
                  root: classes.rootButton,
                  disabled: classes.disabledButton,
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </div>
          </Tooltip>
          <div
            className={classNames({
              [styles.dontShowButton]: noSelectedItems,
            })}
          >
            <Tooltip title="Delete All Selected">
              <div>
                <IconButton
                  onClick={onToggleDeleteModal}
                  classes={{
                    root: classNames(classes.rootButton, styles.redButton),
                    disabled: classes.disabledButton,
                  }}
                  disabled={!hasEditPermission}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
            </Tooltip>

            {isDeleteModalOpen && (
              <DeleteItemsModal
                visible
                multiple={false}
                message={`Please note the selected quantities will be set to 0 for this player.
                      The selected currencies are: ${selectedBalances
                        .map(b => b.currencyCode)
                        .join(', ')}`}
                onSubmit={onSubmitDelete}
                onCancel={onToggleDeleteModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

ActionButtons.propTypes = {
  hasEditPermission: PropTypes.bool.isRequired,
  selectedBalances: PropTypes.array,
  isEditing: PropTypes.bool.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  onToggleDeleteModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmitDelete: PropTypes.func.isRequired,
  isDeleteModalOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

ActionButtons.defaultProps = {
  selectedBalances: [],
  reset: null,
  pristine: null,
  submitting: null,
};

export default withStyles(muiStyles)(ActionButtons);
