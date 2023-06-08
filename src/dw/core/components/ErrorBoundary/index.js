import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Empty from 'dw/core/components/Empty';

const styles = theme => ({
  root: {
    color: theme.palette.error.main,
    lineHeight: '32px',
  },
});

const Error = withStyles(styles)(Empty);

class ErrorBoundary extends Component {
  state = { hasError: false };
  // eslint-disable-next-line
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error>
          Something went wrong.
          <br />
          Check logs for details.
        </Error>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

ErrorBoundary.defaultProps = {
  children: undefined,
};

export default ErrorBoundary;
