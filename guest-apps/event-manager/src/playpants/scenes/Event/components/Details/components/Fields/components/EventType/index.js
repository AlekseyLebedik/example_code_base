import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeEventTypeNameSelector } from 'playpants/components/App/selectors';

import TextField from '@material-ui/core/TextField';

export const EventTypeBase = ({ eventTypeName }) => (
  <TextField label="Type" fullWidth value={eventTypeName} disabled />
);

EventTypeBase.propTypes = {
  eventTypeName: PropTypes.string.isRequired,
};

const makeMapStateToProps = () => {
  const eventTypeNameSelector = makeEventTypeNameSelector();
  const mapStateToProps = (state, props) => {
    eventTypeNameSelector(state)(props.eventData.event_type);
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(EventTypeBase);
