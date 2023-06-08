import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AdapterLink from 'dw/core/components/AdapterLink';

const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
});

const Link = React.forwardRef(({ classes, className, ...props }, ref) => (
  <AdapterLink
    {...props}
    className={classNames(classes.root, className)}
    ref={ref}
  />
));

Link.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

Link.defaultProps = {
  classes: {},
  className: null,
};

export default withStyles(styles)(Link);
