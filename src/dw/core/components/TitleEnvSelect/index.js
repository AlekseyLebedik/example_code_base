import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Select from 'dw/core/components/FormFields/CustomSelect';
import { useEnvironments } from './hooks';

const TitleEnvSelect = ({
  excludeCurrent,
  serviceName,
  valueSelector,
  displayEnvsFromCurrentProject,
  excludeLive,
  filterByPermissionName,
  sameProjectOnTop,
  input,
  component: Component,
  optionGroupName,
  helperText,
  ...props
}) => {
  const { loading, error, environments } = useEnvironments({
    serviceName,
    requiredPermission: filterByPermissionName,
    excludeCurrent,
    displayEnvsFromCurrentProject,
    excludeLive,
    sameProjectOnTop,
  });

  const newInput = useMemo(() => {
    if (!input) return {};
    if (loading || !input.value) {
      return input;
    }
    const availableValues = environments.map(e => valueSelector(e));
    let newValue;
    if (Array.isArray(input.value)) {
      newValue = input.value.filter(v => availableValues.includes(v.key || v));
    } else {
      newValue = availableValues.includes(input.value.key || input.value)
        ? input.value
        : '';
    }
    return { ...input, value: newValue };
  }, [input, loading, environments]);

  if (loading) {
    return (
      <Component
        {...props}
        input={{ value: 'Loading...' }}
        disabled
        options={[]}
      />
    );
  }

  const envOptions = [];
  let lastGroup = {};
  environments.forEach(e => {
    const value = `project-${e.project.id}`;
    if (value !== lastGroup.value) {
      lastGroup = {
        value,
        label: e.project.name,
        [optionGroupName]: [],
      };
      envOptions.push(lastGroup);
    }
    lastGroup[optionGroupName].push({
      value: valueSelector(e),
      label: `(${e.title.id}) ${e.title.name} ${e.title.platform} ${e.environment.shortType}`,
    });
  });
  return (
    <Component
      {...props}
      input={newInput}
      options={envOptions}
      error={Boolean(error)}
      helperText={error || helperText}
    />
  );
};

TitleEnvSelect.propTypes = {
  excludeCurrent: PropTypes.bool,
  displayEnvsFromCurrentProject: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  excludeLive: PropTypes.bool,
  serviceName: PropTypes.string,
  valueSelector: PropTypes.func,
  filterByPermissionName: PropTypes.string,
  input: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  meta: PropTypes.object,
  component: PropTypes.elementType,
  optionGroupName: PropTypes.string,
  helperText: PropTypes.string,
  sameProjectOnTop: PropTypes.bool,
};

TitleEnvSelect.defaultProps = {
  excludeCurrent: false,
  serviceName: undefined,
  valueSelector: e => `${e.title.id}:${e.environment.shortType}`,
  displayEnvsFromCurrentProject: false,
  excludeLive: false,
  filterByPermissionName: undefined,
  input: undefined,
  meta: {},
  component: Select,
  optionGroupName: 'children',
  helperText: undefined,
  sameProjectOnTop: false,
};

export default TitleEnvSelect;
