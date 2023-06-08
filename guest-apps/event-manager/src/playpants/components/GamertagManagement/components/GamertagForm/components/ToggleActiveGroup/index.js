import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import styles from './index.module.css';

const Toggle = ({ onChange, value }) => (
  <FormControlLabel
    classes={{ root: styles.toggle, label: styles.label }}
    control={
      <Switch
        checked={value}
        color="primary"
        onChange={onChange}
        value={value}
      />
    }
    label="Hide On Calendar"
    labelPlacement="start"
  />
);

Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
Toggle.defaultProps = { value: false };

export default Toggle;
