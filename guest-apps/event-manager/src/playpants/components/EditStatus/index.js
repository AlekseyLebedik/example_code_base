import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import * as selectors from 'playpants/components/FeedbackWrapper/selectors';

export const EditStatusBase = ({
  feedbackError,
  feedbackLoading,
  feedbackSaved,
  lockedBy,
  status,
  classes,
}) => {
  let statusMsg;
  let className = 'success';
  if (status.locked) {
    statusMsg = `Locked By ${lockedBy && lockedBy.name}`;
    className = 'failed';
  } else if (feedbackLoading) {
    statusMsg = 'Loading...';
    className = 'pending';
  } else if (feedbackSaved && !feedbackLoading && !feedbackError) {
    statusMsg = 'Changes Saved';
  } else if (!feedbackSaved && !feedbackLoading && !!feedbackError) {
    statusMsg = (
      <Tooltip title={feedbackError} TransitionComponent={Zoom}>
        <div className={classes.failedMsgContainer}>
          <Icon fontSize="small">error_outline</Icon>{' '}
          <div className={classes.failedMsg}>Changes Not Saved</div>
        </div>
      </Tooltip>
    );
    className = 'failed';
  }
  return <span className={classes[className]}>{statusMsg}</span>;
};

EditStatusBase.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.object,
  lockedBy: PropTypes.object,
  feedbackError: PropTypes.string.isRequired,
  feedbackSaved: PropTypes.bool.isRequired,
  feedbackLoading: PropTypes.bool.isRequired,
};
EditStatusBase.defaultProps = {
  lockedBy: null,
  status: {},
};

const mapStateToProps = state => ({
  feedbackLoading: selectors.feedbackLoadingSelector(state),
  feedbackError: selectors.feedbackErrorSelector(state),
  feedbackSaved: selectors.feedbackSavedSelector(state),
});

export default connect(mapStateToProps)(EditStatusBase);
