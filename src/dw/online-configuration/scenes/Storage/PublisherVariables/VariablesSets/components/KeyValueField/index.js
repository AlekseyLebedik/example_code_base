import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Input from 'dw/core/components/FormFields/Input';

import { STORAGE_ADD_PUBLISHER_VARIABLES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import styles from './index.module.css';

const RenderKeyValue = ({ fields, meta: { error }, variableMapping = {} }) => {
  const hasAddPermission = useCurrentEnvPermission(
    STORAGE_ADD_PUBLISHER_VARIABLES
  );
  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <div className={styles.key}>Key</div>
        <div className={styles.value}>Value</div>
        {(hasAddPermission && (
          <Tooltip title="Add new (key, value) pair" placement="left">
            <IconButton onClick={() => fields.push({})}>
              <Icon>playlist_add</Icon>
            </IconButton>
          </Tooltip>
        )) ||
          null}
      </div>
      {fields.map((record, index) => {
        const item = fields.get(index);
        return (
          <div key={record} className={styles.row}>
            <Field
              name={`${record}.key`}
              component={Input}
              className={styles.key}
              customError={
                error && error.length && error[index] && error[index].key
              }
              disabled={!hasAddPermission}
              helperText={variableMapping[item.key]}
            />
            <Field
              name={`${record}.value`}
              component={Input}
              className={styles.value}
              customError={
                error && error.length && error[index] && error[index].value
              }
              disabled={!hasAddPermission}
            />
            {hasAddPermission &&
              ((
                <Tooltip title="Delete (Key, Value) pair" placement="left">
                  <IconButton onClick={() => fields.remove(index)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </Tooltip>
              ) ||
                null)}
          </div>
        );
      })}
    </div>
  );
};

RenderKeyValue.propTypes = {
  variableMapping: PropTypes.object,
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

RenderKeyValue.defaultProps = {
  variableMapping: {},
};

export default RenderKeyValue;
