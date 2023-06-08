import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const ErrorText = ({ classes, ...props }) => (
  <div className={classes.root} {...props} />
);

ErrorText.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    color: theme.palette.secondary.main,
  },
});

export default withStyles(styles)(ErrorText);
