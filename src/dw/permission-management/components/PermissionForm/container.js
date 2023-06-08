import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import equal from 'fast-deep-equal';
import {
  change,
  getFormInitialValues,
  getFormValues,
  initialize,
  reduxForm,
} from 'redux-form';

import * as V from 'dw/core/components/FormFields/validation';
import { hasData } from 'dw/core/helpers/object';
import { companyIDsSelector } from 'dw/permission-management/scenes/selectors';

import PermissionsFormStateLess from './presentational';

const isPristine = form => state => {
  const initial = getFormInitialValues(form)(state);
  const values = getFormValues(form)(state);
  // for the Groups version of the form which has users as an extra field
  const usersPristine = initial?.users
    ? equal(initial.users, values.users)
    : true;
  return initial
    ? equal(initial.contentTypes, values.contentTypes) && usersPristine
    : true;
};

const stateToProps = (state, props) => ({
  companiesRequesterIsAdmin: companyIDsSelector(state),
  isPristine: isPristine(props.form)(state),
  onSubmit: value => {
    const { id } = props.selectedItem;
    props.editObjectPermissions(id, props.transformToObjectPerm(value));
    if (props.onSave) {
      props.onSave(value);
    }
  },
  onSubmitSuccess: (_, dispatch, { values }) => {
    dispatch(initialize(props.form, values));
  },
});

const dispatchToProps = (dispatch, props) => ({
  onMove: (fromIndex, toIndex, fields, toFieldName, item) => {
    if (fromIndex !== toIndex) {
      const fromField = fields.get(fromIndex);
      const toField = fields.get(toIndex);
      const fromFieldName = `${fields.name}[${fromIndex}]`;
      const type =
        item.type === props.dragTypeObjectPerm
          ? 'permissions'
          : 'selectedDetails';
      dispatch(
        change(props.form, fromFieldName, {
          ...fromField,
          [type]: fromField[type].filter(x => x !== item.id),
        })
      );
      if (!toField[type].some(x => x === item.id)) {
        dispatch(
          change(props.form, toFieldName, {
            ...toField,
            [type]: [...toField[type], item.id],
          })
        );
      }
    }
  },
});

export class PermissionsFormComponent extends Component {
  state = { selectedItemId: null, prevCompaniesRequesterIsAdmin: null };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      selectedItem,
      fetchObjectPermissions,
      reset,
      companiesRequesterIsAdmin,
      contentTypes,
      fetchContentTypesDetails,
    } = nextProps;
    if (
      selectedItem &&
      hasData(contentTypes) &&
      selectedItem.id !== prevState.selectedItemId
    ) {
      const { id: selectedItemId } = selectedItem;
      reset();
      // For group company membership is already featched.
      if (selectedItem.company || selectedItemId) {
        fetchContentTypesDetails(contentTypes, [
          selectedItem.company || selectedItemId,
        ]);
      }
      fetchObjectPermissions(selectedItemId);
      return { selectedItemId, prevCompaniesRequesterIsAdmin: null };
    }
    if (
      hasData(companiesRequesterIsAdmin) &&
      hasData(contentTypes) &&
      prevState.prevCompaniesRequesterIsAdmin !== companiesRequesterIsAdmin
    ) {
      fetchContentTypesDetails(contentTypes, companiesRequesterIsAdmin);
      return { prevCompaniesRequesterIsAdmin: companiesRequesterIsAdmin };
    }
    return null;
  }

  render() {
    return <PermissionsFormStateLess {...this.props} />;
  }
}

PermissionsFormComponent.propTypes = {
  selectedItem: PropTypes.object,
  selectedItemId: PropTypes.string,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  companiesRequesterIsAdmin: PropTypes.array,
  fetchContentTypesDetails: PropTypes.func.isRequired,
  fetchObjectPermissions: PropTypes.func.isRequired,
  editObjectPermissions: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  contentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      appLabel: PropTypes.string,
      model: PropTypes.string,
      details: PropTypes.array,
      permissions: PropTypes.array,
    })
  ),
  reset: PropTypes.func.isRequired,
};

PermissionsFormComponent.defaultProps = {
  selectedItem: null,
  selectedItemId: null,
  title: '',
  contentTypes: [],
  isLoading: false,
  onSave: () => {},
  companiesRequesterIsAdmin: [],
};

const PermissionsForm = reduxForm({
  validate: V.isPermissionInFormEmpty,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(PermissionsFormComponent);

const PermissionsConnected = connect(
  stateToProps,
  dispatchToProps
)(PermissionsForm);

export default PermissionsConnected;
