import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  ...theme.header,
});

const Component = ({ classes, type, className, ...props }) => (
  <div {...props} className={classNames(classes[type], className)} />
);

Component.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
};

Component.defaultProps = {
  classes: {},
  className: undefined,
  type: 'dark',
};

export default withStyles(styles)(Component);
