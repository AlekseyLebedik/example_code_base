import React from 'react';
import { connect } from 'react-redux';

import BaseViewProps from 'abtesting/components/BaseViewProps';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { TEST_STATUS } from 'dw/abtesting-utils';

import { killedTestsSelector } from './selectors';

import KilledStateless from './presentational';

const stateToProps = (state, props) => ({
  history: props.history,
  formatDateTime: formatDateTimeSelector(state),
  killedTests: killedTestsSelector(props.tests),
});

const ConnectedKilled = connect(stateToProps)(KilledStateless);

const KilledWithBaseProps = props => (
  <BaseViewProps status={TEST_STATUS.KILLED}>
    {baseProps => <ConnectedKilled {...baseProps} {...props} />}
  </BaseViewProps>
);

export default KilledWithBaseProps;
