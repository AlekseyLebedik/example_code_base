import React, { useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import RequestErrorDialog from './components/RequestErrorDialog';

import * as selectors from './selectors';
import * as actions from './actions';
import styles from './index.module.css';

const FeedbackWrapper = ({ loading, error, children, resetFeedback }) => {
  useEffect(() => {
    resetFeedback();
  }, []);

  return (
    <>
      <RequestErrorDialog error={error} />
      <LinearProgress
        classes={{
          root: classNames(styles.loadingBar, {
            [styles.hide]: !loading,
          }),
        }}
      />
      {children}
    </>
  );
};

export const mapStateToProps = state => ({
  loading: selectors.feedbackLoadingSelector(state),
  error: selectors.feedbackErrorSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  resetFeedback: () => dispatch(actions.resetFeedback()),
});

FeedbackWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  resetFeedback: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackWrapper);
