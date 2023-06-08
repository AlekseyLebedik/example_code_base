import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'dw/core/components/Select';

import styles from './index.module.css';

const pubVarSelector = (
  type,
  label,
  filter,
  selectedValues,
  filterValues,
  disabled
) => (
  <Select
    data-cy={`pubvar${label}`}
    classes={{
      root: styles.pubVarsSelector,
    }}
    disabled={disabled}
    InputProps={{
      startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
    }}
    onChange={e => filter(type, e.target.value)}
    value={selectedValues[type] || ''}
  >
    <MenuItem value="" disabled>
      Select a Title
    </MenuItem>
    {filterValues[type].map(value => (
      <MenuItem
        key={`namespaceSelect/${type}/${value}`}
        value={value}
        data-cy={`${type}Option`}
      >
        {value}
      </MenuItem>
    ))}
  </Select>
);

const CustomTitleComponent = ({
  disabled,
  filterNamespaces,
  filterValues,
  hideChangedVarSets,
  selectedValues,
  toggleChangedVarSets,
}) => (
  <div className={styles.pubVarsControls}>
    {hideChangedVarSets && !disabled && (
      <>
        {pubVarSelector(
          'context',
          'Context',
          filterNamespaces,
          selectedValues,
          filterValues,
          disabled
        )}
        {pubVarSelector(
          'group_id',
          'GroupID',
          filterNamespaces,
          selectedValues,
          filterValues,
          disabled
        )}
        {pubVarSelector(
          'namespace',
          'Namespace',
          filterNamespaces,
          selectedValues,
          filterValues,
          disabled || !hideChangedVarSets
        )}
      </>
    )}
    {!disabled && (
      <Button
        className={styles.viewChangedVariables}
        color="primary"
        onClick={toggleChangedVarSets}
        size="small"
        variant="contained"
      >
        <Icon className={styles.viewChangedVariablesIcon}>
          {hideChangedVarSets ? 'list' : 'filter_list'}
        </Icon>
        {hideChangedVarSets ? 'View All Changes' : 'Select Namespace'}
      </Button>
    )}
  </div>
);

CustomTitleComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  filterNamespaces: PropTypes.func.isRequired,
  filterValues: PropTypes.object.isRequired,
  hideChangedVarSets: PropTypes.bool.isRequired,
  selectedValues: PropTypes.object.isRequired,
  toggleChangedVarSets: PropTypes.func.isRequired,
};

export default CustomTitleComponent;
