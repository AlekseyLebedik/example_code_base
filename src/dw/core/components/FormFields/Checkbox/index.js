import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabelBase from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from './index.module.css';

const FormControlLabel = withStyles({
  labelPlacementStart: {
    marginLeft: 0,
  },
})(FormControlLabelBase);

const Component = ({
  input,
  label,
  labelPlacement,
  labelProps,
  className,
  disabled,
  color,
  helperText: helpText,
  formControlProps,
  meta: { touched, error },
}) => {
  const helperText = touched && error ? String(error) : helpText;
  const checkbox = (
    <Checkbox
      color={color}
      checked={!!input.value}
      onChange={e => input.onChange(e.target.checked)}
      className={className}
      disabled={!!disabled}
    />
  );
  return (
    <FormControl {...formControlProps} error={Boolean(touched && error)}>
      {label ? (
        <FormControlLabel
          label={label}
          control={checkbox}
          labelPlacement={labelPlacement}
          {...labelProps}
        />
      ) : (
        checkbox
      )}
      {helperText && (
        <FormHelperText className={styles.helperText}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

Component.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  color: PropTypes.string,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  labelProps: PropTypes.object,
  formControlProps: PropTypes.object,
};

Component.defaultProps = {
  meta: {},
  color: 'default',
  label: undefined,
  labelPlacement: undefined,
  className: undefined,
  disabled: false,
  helperText: undefined,
  labelProps: {},
  formControlProps: {},
};

export default Component;
