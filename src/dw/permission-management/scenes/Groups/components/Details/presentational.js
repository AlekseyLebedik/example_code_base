import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import PermissionForm from 'dw/permission-management/components/PermissionForm';

import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoComplete from 'dw/core/components/AutocompleteGeneral';

const Details = props => (
  <PermissionForm
    {...props}
    extraFields={
      <FieldArray
        name="users"
        props={{
          availableUsers: props.availableGroupUsersList.map(user => ({
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
  selectedItemId: PropTypes.string,
  isLoading: PropTypes.bool,
  availableGroupUsersList: PropTypes.array,
  contentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      appLabel: PropTypes.string,
      model: PropTypes.string,
      details: PropTypes.array,
      permissions: PropTypes.array,
    })
  ),
};

Details.defaultProps = {
  selectedItem: null,
  selectedItemId: null,
  availableGroupUsersList: [],
  contentTypes: [],
  isLoading: false,
};

export default Details;
