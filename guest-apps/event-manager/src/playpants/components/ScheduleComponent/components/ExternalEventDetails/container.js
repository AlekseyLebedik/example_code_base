import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';

import { selectedViewSelector } from 'dw/core/components/EventsCalendar/selectors';
import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';

import ExternalDetailsStateless from './presentational';

export const ExternalDetails = props => {
  const { event } = props;
  if (isEmpty(event)) {
    return null;
  }
  return <ExternalDetailsStateless {...props} />;
};

ExternalDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  openEventInNewTab: PropTypes.bool,
  userTimezone: PropTypes.string.isRequired,
  selectedView: PropTypes.string.isRequired,
};

ExternalDetails.defaultProps = {
  openEventInNewTab: false,
};

const mapStateToProps = (state, props) => ({
  selectedView: selectedViewSelector(state),
  userTimezone: timezoneOrDefaultSelector(state),
  visible: ModalHandlers.isVisibleSelector(state, props.baseModalId),
});

const mapDispatchToProps = (dispatch, props) => ({
  onOpen: () => dispatch(ModalHandlers.open(props.baseModalId)),
  onClose: () => dispatch(ModalHandlers.close(props.baseModalId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(eventSummaryStyles)(ExternalDetails));
