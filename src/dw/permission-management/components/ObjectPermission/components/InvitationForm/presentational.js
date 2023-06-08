import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import MenuItem from '@material-ui/core/MenuItem';
import Select from 'dw/core/components/FormFields/Select';
import { required } from 'dw/core/components/FormFields/validation';

import EntityAutoCompleteInput from './components/EntityAutoCompleteInput';

import styles from './presentational.module.css';

const Invitation = ({ contentTypePermissions, entities, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        name="entities"
        component={EntityAutoCompleteInput}
        entities={entities}
        validate={[required]}
      />
      <Field
        name="permissions"
        component={Select}
        multiple
        fullWidth
        label="Permissions"
        validate={[required]}
        classes={{ root: styles.permissionsRoot }}
      >
        {contentTypePermissions.map(({ id, name }) => (
          <MenuItem value={id} key={id}>
            {name}
          </MenuItem>
        ))}
      </Field>
    </div>
  </form>
);

Invitation.propTypes = {
  contentTypePermissions: PropTypes.array.isRequired,
  entities: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Invitation;
