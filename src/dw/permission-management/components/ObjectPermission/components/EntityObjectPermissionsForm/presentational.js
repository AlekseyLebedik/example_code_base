import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import EntityObjectPermissionsItem from './components/EntityObjectPermissionsItem';

const EntityObjectPermissionsForm = props => {
  const { contentTypePermissions, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray
        name="entityPermissions"
        component={EntityObjectPermissionsItem}
        props={{ contentTypePermissions }}
      />
    </form>
  );
};

EntityObjectPermissionsForm.propTypes = {
  contentTypePermissions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EntityObjectPermissionsForm;
