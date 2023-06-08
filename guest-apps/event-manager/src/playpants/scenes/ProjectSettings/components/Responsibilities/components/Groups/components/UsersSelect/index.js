import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import UsersList from 'dw/core/components/FormFields/UsersList';
import UserAutoComplete from 'dw/core/components/AutocompleteGeneral';

const UsersSelect = ({
  availableUsers,
  availableUsersNext,
  inputValue,
  onInputChange,
  onShowMore,
}) => (
  <FieldArray
    component={UsersList}
    name="members"
    props={{
      availableUsers,
      availableUsersNext,
      cancelOnBackdropClick: true,
      isMulti: true,
      userInputComponent: UserAutoComplete,
      onInputChange,
      onMenuScrollToBottom: onShowMore,
      inputValue,
    }}
  />
);

UsersSelect.propTypes = {
  availableUsers: PropTypes.arrayOf(PropTypes.object),
  availableUsersNext: PropTypes.string,
  onInputChange: PropTypes.func,
  onShowMore: PropTypes.func,
  inputValue: PropTypes.string,
};
UsersSelect.defaultProps = {
  availableUsers: [],
  availableUsersNext: null,
  onInputChange: () => {},
  onShowMore: () => {},
  inputValue: '',
};

export default UsersSelect;
