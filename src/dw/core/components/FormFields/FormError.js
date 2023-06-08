import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const FormError = ({ meta: { error }, classes, prefix }) =>
  error ? (
    <div className={classes.root}>
      {prefix}
      {error}
    </div>
  ) : null;

FormError.propTypes = {
  meta: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  prefix: PropTypes.string,
};

FormError.defaultProps = {
  prefix: '',
};

export default withStyles(theme => ({
  root: {
    color: theme.palette.secondary.main,
  },
}))(FormError);
