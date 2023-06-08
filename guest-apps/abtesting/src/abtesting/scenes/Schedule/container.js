import React from 'react';
import { connect } from 'react-redux';

import BaseViewProps from 'abtesting/components/BaseViewProps';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { SCHEDULED_STATUS } from 'dw/abtesting-utils';

import {
  upcomingTestsSelector,
  liveTestsSelector,
  finishedTestsSelector,
  scheduledTestsSelector,
} from './selectors';

import ScheduleStateless from './presentational';

const stateToProps = (state, props) => ({
  history: props.history,
  formatDateTime: formatDateTimeSelector(state),
  upcomingTests: upcomingTestsSelector(props.tests),
  liveTests: liveTestsSelector(props.tests),
  scheduledTests: scheduledTestsSelector(props.tests),
  recentlyFinishedTests: finishedTestsSelector(props.tests),
});

const ConnectedSchedule = connect(stateToProps)(ScheduleStateless);

const ScheduleWithBaseProps = props => (
  <BaseViewProps status={SCHEDULED_STATUS}>
    {baseProps => <ConnectedSchedule {...baseProps} {...props} />}
  </BaseViewProps>
);

export default ScheduleWithBaseProps;
