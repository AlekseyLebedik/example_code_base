import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { updateThenRevertActivity } from 'playpants/scenes/Event/components/Activities/actions';

import { GRID_OPTIONS } from '../../constants';
import { modifyRevertVariableValues } from '../../helpers';
import { REVERT_PUBVARS_COLUMN_DEFS } from './constants';
import { getRowData } from './helpers';

export const RevertNewPubVarsDialog = props => {
  const {
    open,
    revertCallback,
    selectedActivity,
    toggleRevertDialog,
    updateRevertActivity,
  } = props;
  const { variable_sets: variableSets } = selectedActivity.activity;
  const [revertVars, setRevertVars] = useState(getRowData(variableSets));

  const updateRevertVars = () => {
    setRevertVars(getRowData(variableSets));
  };

  useEffect(() => {
    updateRevertVars();
  }, [variableSets]);

  const modifyRevertVariables = params => {
    const { data, newValue } = params;
    const { context, groupId, namespace, variable } = data;
    const idx = revertVars.findIndex(
      set =>
        set.context === context &&
        set.groupId === groupId &&
        set.namespace === namespace &&
        set.variable === variable
    );
    if (idx > -1) {
      const newRevertVars = [...revertVars];
      newRevertVars[idx].revertValue = newValue;
      setRevertVars(newRevertVars);
    } else setRevertVars([]);
  };

  const confirmRevertAction = () => {
    const updatedActivity = modifyRevertVariableValues(
      selectedActivity,
      revertVars
    );
    updateRevertActivity(updatedActivity, revertCallback);
    toggleRevertDialog(false);
  };

  const cancelRevertDialog = () => {
    toggleRevertDialog(false);
    updateRevertVars();
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={cancelRevertDialog} open={open}>
      <DialogTitle>Confirm Revert Values</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          If you wish for the values of new variables to default to a different
          value when the event ends, change the value under Revert Values and
          confirm your changes.
        </Typography>
        <div className="ag-theme-material">
          <AgGridReact
            {...GRID_OPTIONS}
            columnDefs={REVERT_PUBVARS_COLUMN_DEFS}
            onCellValueChanged={params => modifyRevertVariables(params)}
            rowData={revertVars}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelRevertDialog} color="secondary">
          Cancel Changes
        </Button>
        <Button color="primary" onClick={confirmRevertAction} type="submit">
          Confirm Revert Values
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RevertNewPubVarsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  revertCallback: PropTypes.func.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  toggleRevertDialog: PropTypes.func.isRequired,
  updateRevertActivity: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateRevertActivity: bindActionCreators(updateThenRevertActivity, dispatch),
});

export default connect(null, mapDispatchToProps)(RevertNewPubVarsDialog);
