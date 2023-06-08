import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'dw/core/components/FormFields/Select';

import styles from './index.module.css';

const EntityObjectPermissionsItem = props => {
  const { fields, contentTypePermissions } = props;
  return (
    <div>
      {fields.map((item, index) => (
        <div key={item} className={styles.item}>
          <Field
            name={`${item}.name`}
            component={({ input: { value } }) => <div>{value}</div>}
          />
          <div className={styles.selectWrapper}>
            <Field
              component={Select}
              fullWidth
              multiple
              name={`${item}.permissions`}
              label="Permissions"
            >
              {contentTypePermissions.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Field>

            <IconButton onClick={() => fields.remove(index)}>
              <Icon color="error">highlight_off</Icon>
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};

EntityObjectPermissionsItem.propTypes = {
  fields: PropTypes.object.isRequired, // from redux-form
  contentTypePermissions: PropTypes.array.isRequired,
};

export default withStyles(styles)(EntityObjectPermissionsItem);
