import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'dw/core/components/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import styles from './index.module.css';

const StatelessCreateVariable = props => {
  const {
    addVariable,
    clearVariableAddDialog,
    open,
    setOpen,
    setValue,
    setValueError,
    setVarError,
    setVariable,
    validateValue,
    validateVariable,
    value,
    valueError,
    variable,
    variableError,
  } = props;

  return (
    <>
      <IconButton
        color="primary"
        icon="add_circle"
        onClick={() => setOpen(true)}
        tooltip="Create Variable"
      />
      <Dialog fullWidth onClose={clearVariableAddDialog} open={open}>
        <DialogTitle>Create Variable</DialogTitle>
        <DialogContent>
          <TextField
            className={styles.variableField}
            error={Boolean(variableError)}
            fullWidth
            helperText={variableError}
            label="Variable"
            name="pubVarsVariable"
            onChange={e => {
              setVariable(e.target.value);
              setVarError(validateVariable(e.target.value));
            }}
            value={variable}
          />
          <TextField
            className={styles.variableField}
            error={Boolean(valueError)}
            fullWidth
            helperText={valueError}
            label="Value"
            name="pubVarsValue"
            onChange={e => {
              setValue(e.target.value);
              setValueError(validateValue(e.target.value));
            }}
            value={value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearVariableAddDialog} color="secondary">
            Cancel
          </Button>
          <Button color="primary" onClick={addVariable} type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

StatelessCreateVariable.propTypes = {
  addVariable: PropTypes.func.isRequired,
  clearVariableAddDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  setValueError: PropTypes.func.isRequired,
  setVarError: PropTypes.func.isRequired,
  setVariable: PropTypes.func.isRequired,
  validateValue: PropTypes.func.isRequired,
  validateVariable: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  valueError: PropTypes.string,
  variable: PropTypes.string.isRequired,
  variableError: PropTypes.string,
};

StatelessCreateVariable.defaultProps = {
  valueError: null,
  variableError: null,
};

export default StatelessCreateVariable;
