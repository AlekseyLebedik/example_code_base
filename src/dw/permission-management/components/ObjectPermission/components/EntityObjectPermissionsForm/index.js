import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { difference } from 'lodash';

import EmptyComponent from 'dw/core/components/Empty';
import * as entityTypes from '../../entityTypes';
import * as actions from '../../actions';
import EntityObjectPermissionFormPresentational from './presentational';
import { entityPermissionsSelector } from './selectors';
import { permissionsSelector } from '../../selectors';

class EntityObjectPermissionFormContainer extends React.Component {
  componentDidMount() {
    this.props.loadObjectPermissions();
  }

  render() {
    if (this.props.initialValues.entityPermissions.length === 0)
      return <EmptyComponent />;

    return <EntityObjectPermissionFormPresentational {...this.props} />;
  }
}

const stateToProps = (state, props) => ({
  contentTypePermissions: permissionsSelector(state, props),
  initialValues: {
    entityPermissions: entityPermissionsSelector(state, props),
  },
});

const dispatchToProps = (dispatch, props) => ({
  onPermissionsUpdate: ({ toAdd, toRemove }) => {
    if (toAdd.length > 0) {
      dispatch(
        actions.grantPermissions(
          [props.entityType],
          props.ctypeId,
          props.objectId,
          toAdd
        )
      );
    }
    if (toRemove.length > 0) {
      dispatch(
        actions.revokePermissions(
          [props.entityType],
          props.ctypeId,
          props.objectId,
          toRemove
        )
      );
    }
  },
  loadObjectPermissions: () => {
    dispatch(
      actions.fetchObjectPermissions(
        props.entityType,
        props.ctypeId,
        props.objectId
      )
    );
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onSubmit: formData => {
    const toAdd = [];
    const toRemove = [];

    const parseId = {
      [entityTypes.COMPANY]: id => parseInt(id, 10),
      [entityTypes.GROUP]: id => parseInt(id, 10),
      [entityTypes.USER]: id => id,
    }[ownProps.entityType];

    const entityIdFieldName = {
      [entityTypes.COMPANY]: 'companyId',
      [entityTypes.GROUP]: 'companyGroupId',
      [entityTypes.USER]: 'userEmail',
    }[ownProps.entityType];

    stateProps.initialValues.entityPermissions.forEach(item => {
      const updatedItem = formData.entityPermissions.find(
        i => i[entityIdFieldName] === item[entityIdFieldName]
      );
      const newPerms = updatedItem ? updatedItem.permissions : [];

      difference(newPerms, item.permissions).forEach(permId => {
        toAdd.push({
          [entityIdFieldName]: parseId(item[entityIdFieldName]),
          permissionId: permId,
        });
      });

      difference(item.permissions, newPerms).forEach(permId => {
        toRemove.push({
          [entityIdFieldName]: parseId(item[entityIdFieldName]),
          permissionId: permId,
        });
      });
    });
    dispatchProps.onPermissionsUpdate({ toAdd, toRemove });
  },
});

EntityObjectPermissionFormContainer.propTypes = {
  loadObjectPermissions: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

EntityObjectPermissionFormContainer.defaultProps = {
  initialValues: {},
};

const EntityObjectPermissionForm = compose(
  connect(stateToProps, dispatchToProps, mergeProps),
  reduxForm({
    form: 'ObjectPermission/EntityObjectPermissionsList',
    enableReinitialize: true,
  })
)(EntityObjectPermissionFormContainer);

EntityObjectPermissionForm.propTypes = {
  ctypeId: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(Object.values(entityTypes)),
};

export default EntityObjectPermissionForm;
