import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { FORM_NAME } from './constants';
import EditChallengeFormStateless from './presentational';

import { currentChallengeSelector } from '../../selectors';
import { monitoringGroupsSelector } from '../../../selectors';

const stateToProps = state => ({
  initialValues: currentChallengeSelector(state),
  monitoringGroups: monitoringGroupsSelector(state),
});

const EditChallengesForm = reduxForm({
  form: FORM_NAME,
})(EditChallengeFormStateless);

export default connect(stateToProps)(EditChallengesForm);
