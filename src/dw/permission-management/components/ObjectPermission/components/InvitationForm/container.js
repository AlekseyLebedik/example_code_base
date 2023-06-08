import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import groupBy from 'lodash/groupBy';
import flatMap from 'lodash/flatMap';

import InvitationFormPresentational from './presentational';
import * as actions from '../../actions';
import { entitiesSelector } from './selectors';
import { permissionsSelector } from '../../selectors';

class InvitationForm extends React.Component {
  componentDidMount() {
    this.props.loadPermissions();
    this.props.loadEntities();
  }

  render() {
    return <InvitationFormPresentational {...this.props} />;
  }
}

InvitationForm.propTypes = {
  loadPermissions: PropTypes.func.isRequired,
  loadEntities: PropTypes.func.isRequired,
};

const stateToProps = (state, props) => ({
  initialValues: {
    entities: [],
    permissions: [],
  },
  contentTypePermissions: permissionsSelector(state, props),
  entities: entitiesSelector(state, props),
});

const dispatchToProps = (dispatch, props) => ({
  fetchContentType: bindActionCreators(actions.fetchContentType, dispatch),
  fetchCompanies: bindActionCreators(actions.fetchCompanies, dispatch),
  fetchCompanyGroups: bindActionCreators(actions.fetchCompanyGroups, dispatch),

  onSubmit: ({ entities, permissions }) => {
    const { ctypeId, objectId } = props;
    const {
      user: users = [],
      company: companies = [],
      group: companyGroups = [],
    } = groupBy(entities, 'type');

    const userPermissions = flatMap(users, ({ id }) =>
      permissions.map(permissionId => ({
        userEmail: id,
        permissionId,
      }))
    );

    const companyPermissions = flatMap(companies, ({ id }) =>
      permissions.map(permissionId => ({
        companyId: id,
        permissionId,
      }))
    );

    const companyGroupPermissions = flatMap(companyGroups, ({ id }) =>
      permissions.map(permissionId => ({
        companyGroupId: id,
        permissionId,
      }))
    );

    dispatch(
      actions.grantPermissions('user', ctypeId, objectId, userPermissions)
    );
    dispatch(
      actions.grantPermissions('company', ctypeId, objectId, companyPermissions)
    );
    dispatch(
      actions.grantPermissions(
        'group',
        ctypeId,
        objectId,
        companyGroupPermissions
      )
    );
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  loadPermissions: () => {
    if (stateProps.contentTypePermissions.length === 0) {
      dispatchProps.fetchContentType(ownProps.ctypeId);
    }
  },
  loadEntities: () => {
    if (stateProps.entities.length === 0) {
      dispatchProps.fetchCompanies();
      dispatchProps.fetchCompanyGroups();
    }
  },
});

export default compose(
  connect(stateToProps, dispatchToProps, mergeProps),
  reduxForm({
    form: 'InvitationForm',
    enableReinitialize: true,
  })
)(InvitationForm);
