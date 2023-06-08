import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import PermissionForm from 'dw/permission-management/components/PermissionForm';
import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoComplete from 'dw/core/components/AutocompleteGeneral';

const Details = props => (
  <PermissionForm
    {...props}
    context="company"
    extraFields={
      <FieldArray
        name="users"
        props={{
          availableUsers: props.availableCompanyUsersList.map(user => ({
            label: user.name,
            value: `${user.name} ${user.email}`,
            ...user,
          })),
          userInputComponent: UserAutoComplete,
          isMulti: true,
        }}
        component={UsersList}
      />
    }
    title={props.selectedItem ? props.selectedItem.name : ''}
    exportUsers
  />
);

Details.propTypes = {
  selectedItem: PropTypes.object,
  availableCompanyUsersList: PropTypes.array,
};

Details.defaultProps = {
  selectedItem: {},
  availableCompanyUsersList: [],
};

export default Details;
