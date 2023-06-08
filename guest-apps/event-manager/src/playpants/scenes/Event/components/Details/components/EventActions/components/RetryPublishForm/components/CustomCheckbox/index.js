import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const CustomCheckbox = ({ classes, input, label }) => (
  <FormControlLabel
    classes={classes}
    control={
      <Checkbox
        color="primary"
        checked={input.value}
        onChange={input.onChange}
      />
    }
    label={label}
  />
);

CustomCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.shape({
    value: PropTypes.bool,
    onChange: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default withStyles(styles)(CustomCheckbox);
