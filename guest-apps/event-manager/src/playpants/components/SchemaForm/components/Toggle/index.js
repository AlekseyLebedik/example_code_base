import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Delete from '../Delete';

import styles from '../../index.module.css';

const Toggle = ({
  deletable,
  disabled,
  handleChange,
  handleDelete,
  label,
  value,
}) => (
  <>
    <FormControlLabel
      className={styles.toggle}
      control={
        <Switch
          checked={value}
          color="primary"
          disabled={disabled}
          name={label}
          onChange={handleChange}
          value={value}
        />
      }
      label={value ? 'ON' : 'OFF'}
    />
    {deletable && (
      <Delete handleDelete={handleDelete} name={label} disabled={disabled} />
    )}
  </>
);

Toggle.propTypes = {
  deletable: PropTypes.bool,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

Toggle.defaultProps = {
  deletable: false,
  disabled: false,
  handleDelete: () => {},
  value: false,
};

export default Toggle;
