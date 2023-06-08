import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { FORM_NAME } from 'dw/online-configuration/scenes/ObjectStore/ObjectGroups/constants';
import { createObjectGroup } from 'dw/online-configuration/scenes/ObjectStore/ObjectGroups/actions';

import CreateGroupFormStateless from './presentational';

const selector = formValueSelector(FORM_NAME);
const stateToProps = state => ({
  source: selector(state, 'source'),
  members: selector(state, 'members'),
});
const dispatchToProps = dispatch => ({
  onSubmit: values =>
    dispatch(
      createObjectGroup({
        groupName: values.groupName,
        description: values.description,
        members:
          values.members && values.members.length
            ? values.members.map(member => member.id)
            : undefined,
        fromCsv: values && values.source ? values.source.base64 : undefined,
      })
    ),
});

export default compose(
  connect(stateToProps, dispatchToProps),
  reduxForm({
    form: FORM_NAME,
  })
)(CreateGroupFormStateless);
