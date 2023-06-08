import React from 'react';
import PropTypes from 'prop-types';

import Select from 'dw/core/components/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './index.module.css';

const PyScriptDetailsStateless = ({
  selectedActivity,
  onSchemaModelUpdate,
  templates,
  disabled,
}) => (
  <Select
    data-cy="pyscriptTemplates"
    onChange={e => onSchemaModelUpdate(e.target.value)}
    value={selectedActivity.activity.template_id}
    disabled={!!selectedActivity.activity.template_id || disabled}
    classes={{
      root: styles.selectorRoot,
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Template</InputAdornment>
      ),
    }}
  >
    <MenuItem value="" disabled>
      Select a Template
    </MenuItem>
    {templates.map(pyScript => (
      <MenuItem
        data-cy="pyscriptTemplateOption"
        key={pyScript.name}
        value={pyScript.id}
        className={styles.select}
      >
        {pyScript.name}
        <span className={styles.version}>
          {selectedActivity.activity.version || pyScript.version}
        </span>
      </MenuItem>
    ))}
  </Select>
);

PyScriptDetailsStateless.propTypes = {
  selectedActivity: PropTypes.object.isRequired,
  onSchemaModelUpdate: PropTypes.func.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PyScriptDetailsStateless;
