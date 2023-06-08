import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FORM_NAME } from 'dw/online-configuration/scenes/MMPTrace/constants';

import { initialValuesSelector } from 'dw/online-configuration/scenes/MMPTrace/selectors';

import EventsFilterFormStateless from './presentational';

const stateToProps = (state, props) => ({
  initialValues: initialValuesSelector(state, props),
});

export default compose(
  connect(stateToProps),
  reduxForm({
    form: FORM_NAME,
  })
)(EventsFilterFormStateless);
