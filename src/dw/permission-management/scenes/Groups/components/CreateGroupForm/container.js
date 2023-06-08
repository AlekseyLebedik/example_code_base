import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValues } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { isStaffSelector } from '@demonware/devzone-core/modules/user/selectors';
import { CREATE_GROUP_FORM_NAME } from 'dw/permission-management/scenes/Groups/constants';
import { companiesSelector } from 'dw/permission-management/scenes/selectors';

import { fetchAvailableCompanyGroupUsersModal } from 'dw/permission-management/scenes/actionCreators';
import CreateGroupFormStateless from './presentational';
import { initialValuesSelector, availableGroupUsersList } from './selectors';

const stateToProps = state => ({
  initialValues: initialValuesSelector(state),
  companies: companiesSelector(state),
  availableGroupUsersList: availableGroupUsersList(state),
  isStaff: isStaffSelector(state),
});

const dispatchToProps = {
  fetchUsers: fetchAvailableCompanyGroupUsersModal,
};

class CreateGroupForm extends Component {
  state = {
    fetched: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { fetchUsers, change } = nextProps;
    const { fetched } = prevState;
    if (!fetched && fetchUsers && change) {
      fetchUsers();
      change('members', []);
      return { fetched: true };
    }
    return null;
  }

  render() {
    return <CreateGroupFormStateless {...this.props} />;
  }
}

CreateGroupForm.propTypes = {
  change: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  isStaff: PropTypes.bool.isRequired,
};

CreateGroupForm.defaultProps = {};

export default compose(
  connect(stateToProps, dispatchToProps),
  reduxForm({
    form: CREATE_GROUP_FORM_NAME,
    enableReinitialize: true,
  }),
  formValues({ companyId: 'companyId' })
)(CreateGroupForm);
