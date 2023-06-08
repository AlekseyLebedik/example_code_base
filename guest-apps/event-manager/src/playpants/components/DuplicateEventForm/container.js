import React, { useState } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { defaultStartDateSelector } from 'playpants/components/ScheduleComponent/selectors';
import DuplicateEventFormStateless from './presentational';
import { DUPLICATE_EVENT_FORM_NAME } from './constants';

export const DuplicateEventForm = props => {
  const {
    currentPlatforms,
    eventData: { env_type: env },
  } = props;

  const [targetEnvironment, setTargetEnvironment] = useState(env);
  const [targetPlatforms, setTargetPlatforms] = useState(currentPlatforms);

  const newProps = {
    ...props,
    setTargetEnvironment,
    setTargetPlatforms,
    targetEnvironment,
    targetPlatforms,
  };

  return <DuplicateEventFormStateless {...newProps} />;
};

const stateToProps = (_, props) => ({
  initialValues: {
    formDateTime: { startDate: props.publishAt, endDate: props.endAt },
    formEnvironment: props.eventData.env_type,
    formPlatforms: props.currentPlatforms,
  },
});

const connectedReduxForm = connect(stateToProps, null);

const decoratedForm = reduxForm({
  enableReinitialize: true,
  form: DUPLICATE_EVENT_FORM_NAME,
});

DuplicateEventForm.propTypes = {
  currentPlatforms: PropTypes.arrayOf(PropTypes.string).isRequired,
  eventData: PropTypes.object.isRequired,
};

const formSelector = formValueSelector(DUPLICATE_EVENT_FORM_NAME);
const connectedFormComponent = connect(state => ({
  publishAtMaxDate: formSelector(state, 'formEndAt'),
  publishAtMinDate: defaultStartDateSelector(state),
}));

const connectedDuplicateEventForm = compose(
  connectedReduxForm,
  decoratedForm,
  connectedFormComponent
)(DuplicateEventForm);

export default connectedDuplicateEventForm;
