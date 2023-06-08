import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';

import { selectedViewSelector } from 'dw/core/components/EventsCalendar/selectors';
import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';

import ABTestDetailsStateless from './presentational';
import * as display from './helpers';

export const ABTestDetails = props => {
  const { event, userTimezone } = props;

  if (isEmpty(event)) {
    return null;
  }

  const { creator, environment, id, testPeriodFrom, testPeriodTo, titleID } =
    event;

  const testLink = `/abtesting/view/${titleID}/${environment}/${id}`;
  const testPeriodToDate = display.displayViewTestDate(
    testPeriodTo,
    userTimezone
  );
  const testPeriodFromDate = display.displayViewTestDate(
    testPeriodFrom,
    userTimezone
  );
  const eventDuration = display.displayViewEventDuration(
    testPeriodTo,
    testPeriodFrom,
    userTimezone
  );

  const newProps = {
    ...props,
    testLink,
    testPeriodToDate,
    testPeriodFromDate,
    eventDuration,
    creator,
  };

  return <ABTestDetailsStateless {...newProps} />;
};

ABTestDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  openEventInNewTab: PropTypes.bool,
  userTimezone: PropTypes.string.isRequired,
  selectedView: PropTypes.string.isRequired,
};

ABTestDetails.defaultProps = {
  openEventInNewTab: false,
};

const mapStateToProps = (state, props) => ({
  userTimezone: timezoneOrDefaultSelector(state),
  selectedView: selectedViewSelector(state),
  visible: ModalHandlers.isVisibleSelector(state, props.baseModalId),
});

const mapDispatchToProps = (dispatch, props) => ({
  onOpen: () => dispatch(ModalHandlers.open(props.baseModalId)),
  onClose: () => dispatch(ModalHandlers.close(props.baseModalId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(eventSummaryStyles)(ABTestDetails));
