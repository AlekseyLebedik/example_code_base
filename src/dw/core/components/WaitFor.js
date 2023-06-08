import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from 'dw/core/components/BackdropLoading';
import { hasData } from 'dw/core/helpers/object';

function WaitFor({ showLoading, isReady, children }) {
  if (isReady) return React.Children.only(children);
  return showLoading ? <Loading open /> : null;
}

WaitFor.propTypes = {
  showLoading: PropTypes.bool,
  isReady: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
WaitFor.defaultProps = {
  showLoading: false,
};

const stateToProps = (state, ownProps) => ({
  isReady: ownProps.selectors.every(select => {
    try {
      const result = select(state);
      return ['boolean', 'number', 'string'].includes(typeof result)
        ? Boolean(result)
        : hasData(result);
    } catch (e) {
      return false;
    }
  }),
});

/**
 * It's mandatory here to connect WaitFor with the router to avoid blocking
 * any children rendering when the URL change.
 */
export default connect(stateToProps)(WaitFor);
