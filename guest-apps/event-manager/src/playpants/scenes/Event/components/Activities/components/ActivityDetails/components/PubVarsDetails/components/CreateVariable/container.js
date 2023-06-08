import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import StatelessCreateVariable from './presentational';

const CreateVariable = props => {
  const { createVariable, selectedNamespace } = props;
  const { liveVariables, oldVariables, variables } = selectedNamespace;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState(null);
  const [variable, setVariable] = useState('');
  const [variableError, setVarError] = useState(null);

  const validateValue = newValue =>
    isEmpty(newValue) ? 'Variable cannot be empty!' : null;

  const validateVariable = newVariable => {
    if (
      Object.keys(liveVariables).find(v => v === newVariable) ||
      Object.keys(oldVariables).find(v => v === newVariable) ||
      Object.keys(variables).find(v => v === newVariable)
    ) {
      return `Variable ${newVariable} already exists!`;
    }
    if (isEmpty(newVariable)) {
      return 'Variable cannot be empty';
    }
    return null;
  };

  const clearVariableAddDialog = () => {
    setOpen(false);
    setValue('');
    setValueError(null);
    setVariable('');
    setVarError(null);
  };

  const addVariable = () => {
    if (
      !valueError &&
      !variableError &&
      !validateValue(value) &&
      !validateVariable(variable)
    ) {
      clearVariableAddDialog();
      createVariable(variable, value);
    } else {
      setValueError(validateValue(value));
      setVarError(validateVariable(variable));
    }
  };

  const newProps = {
    ...props,
    addVariable,
    clearVariableAddDialog,
    open,
    setOpen,
    setValue,
    setValueError,
    setVariable,
    setVarError,
    validateValue,
    validateVariable,
    value,
    valueError,
    variable,
    variableError,
  };

  return <StatelessCreateVariable {...newProps} />;
};

CreateVariable.propTypes = {
  createVariable: PropTypes.func.isRequired,
  selectedNamespace: PropTypes.object.isRequired,
};

CreateVariable.defaultProps = {};

export default CreateVariable;
