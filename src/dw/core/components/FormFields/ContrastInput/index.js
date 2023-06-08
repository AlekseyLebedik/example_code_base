import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiTextField from '@material-ui/core/TextField';

const styles = theme => {
  const color = theme.palette.primary.contrastText;
  return {
    root: {
      color,
    },
    focused: {
      color: color.concat(' !important'),
    },
    disabled: {},
    error: {},
    underline: {
      '&:after': {
        borderBottom: '2px solid '.concat(color),
      },
      '&:before': {
        borderBottom: '1px solid '.concat(color),
      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `2px solid ${color} !important`,
      },
    },
  };
};

const ContrastInput = ({
  InputProps = {},
  SelectProps = {},
  InputLabelProps = {},
  classes: { underline, ...classes },
  wraps,
  ...props
}) => {
  const Component = wraps;
  return (
    <Component
      InputProps={{
        ...InputProps,
        classes: {
          ...classes,
          underline,
          input: classes.root,
        },
      }}
      InputLabelProps={{
        ...InputLabelProps,
        classes,
      }}
      FormHelperTextProps={{ classes }}
      SelectProps={{ ...SelectProps, classes: { icon: classes.root } }}
      {...props}
    />
  );
};

ContrastInput.propTypes = {
  InputProps: PropTypes.object,
  SelectProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  classes: PropTypes.object,
  wraps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ContrastInput.defaultProps = {
  InputProps: {},
  SelectProps: {},
  InputLabelProps: {},
  classes: {},
  wraps: MuiTextField,
};

export default withStyles(styles)(ContrastInput);
