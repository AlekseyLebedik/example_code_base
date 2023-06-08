import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { TEST_STATUS } from 'dw/abtesting-utils';
import ActionsPanelStateless from './presentational';
import { changeTestStatus, deleteTest } from './actions';

export const dispatchToProps = dispatch => ({
  events: {
    approveHandler: (titleID, envShortType, testID) => {
      dispatch(
        changeTestStatus(titleID, envShortType, testID, TEST_STATUS.LIVE)
      );
    },
    deleteHandler: (titleID, envShortType, testID) =>
      dispatch(deleteTest(titleID, envShortType, testID)),
    killHandler: (titleID, envShortType, testID) =>
      dispatch(
        changeTestStatus(titleID, envShortType, testID, TEST_STATUS.KILLED)
      ),
    archiveHandler: (titleID, envShortType, testID) => {
      dispatch(
        changeTestStatus(titleID, envShortType, testID, TEST_STATUS.ARCHIVED)
      );
    },
  },
});

export const ActionsPanelBase = withRouter(ActionsPanelStateless);

export default connect(null, dispatchToProps)(ActionsPanelBase);
