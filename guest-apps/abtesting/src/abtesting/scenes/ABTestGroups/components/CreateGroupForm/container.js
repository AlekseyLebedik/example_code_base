import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { FORM_NAME } from 'abtesting/scenes/ABTestGroups/constants';
import { createGroup } from 'abtesting/scenes/ABTestGroups/actions';

import CreateGroupFormStateless from './presentational';

const selector = formValueSelector(FORM_NAME);
const stateToProps = (state, props) => ({
  source: selector(state, 'source'),
  members: selector(state, 'members'),
  initialValues: {
    context: props.context,
  },
});
const dispatchToProps = dispatch => ({
  onSubmit: values =>
    dispatch(
      createGroup(
        {
          groupName: values.groupName,
          description: values.description,
          members:
            values.members && values.members.length
              ? values.members.map(member => member.id)
              : undefined,
          fromCsv: values && values.source ? values.source.base64 : undefined,
        },
        values.context
      )
    ),
});

export default compose(
  connect(stateToProps, dispatchToProps),
  reduxForm({
    form: FORM_NAME,
  })
)(CreateGroupFormStateless);
