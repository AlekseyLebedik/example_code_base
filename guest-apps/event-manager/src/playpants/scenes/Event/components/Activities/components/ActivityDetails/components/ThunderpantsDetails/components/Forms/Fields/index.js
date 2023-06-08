import React from 'react';
import PropTypes from 'prop-types';
import set from 'lodash/set';
import get from 'lodash/get';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { TPANTS_FORM_SCHEMA_LOCK_EL } from './constants';
import * as styles from './index.module.css';

export const IntegerField = ({
  description,
  formState,
  maximum,
  minimum,
  name,
  basePath,
  setFormState,
}) => {
  const path = `${basePath}.${name}`;
  const { value, error } = get(formState, path, {});
  return (
    <TextField
      data-cy="intField"
      className={styles.textField}
      fullWidth
      key={`field-${name}`}
      error={error}
      helperText={
        error &&
        `Should be an integer less than or equal to ${maximum} or greater than or equal to ${minimum}`
      }
      label={description}
      name={name}
      onChange={({ target: { value: eValue } }) =>
        setFormState({
          ...set(formState, path, {
            value: eValue,
            error: eValue > maximum || eValue < minimum,
          }),
        })
      }
      type="Number"
      value={value}
    />
  );
};

IntegerField.propTypes = {
  description: PropTypes.string.isRequired,
  formState: PropTypes.object.isRequired,
  maximum: PropTypes.number.isRequired,
  minimum: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  setFormState: PropTypes.func.isRequired,
};

export const StringField = ({
  basePath,
  description,
  disabled,
  formState,
  name,
  setFormState,
  startAdornment,
  type,
}) => {
  const path = `${basePath}.${name}`;
  const { error = false, helper = '', value } = get(formState, path, {});
  const handleStringClear = () => {
    setFormState({
      ...set(formState, path, { ...get(formState, path, {}), value: '' }),
    });
  };

  return (
    !disabled && (
      <TextField
        className={styles.textField}
        fullWidth
        key={`field-${name}`}
        error={error}
        helperText={helper}
        label={description}
        name={name}
        onChange={e =>
          setFormState({
            ...set(formState, path, {
              ...get(formState, path, {}),
              value: e.target.value,
            }),
          })
        }
        type={type}
        value={value}
        InputProps={{
          startAdornment,
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Clear Selection">
                <IconButton onClick={() => handleStringClear(name)}>
                  <Icon>clear</Icon>
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    )
  );
};

StringField.propTypes = {
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  formState: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  setFormState: PropTypes.func.isRequired,
  startAdornment: PropTypes.element,
  type: PropTypes.string,
};

StringField.defaultProps = {
  disabled: false,
  startAdornment: null,
  type: 'string',
};

export const PasswordFieldGroup = ({
  basePath,
  disabledFields,
  disabled,
  formState,
  setFormState,
}) => {
  const commentAdornment = (
    <InputAdornment position="start">
      <Tooltip title={get(formState, `deployment.lock.comment`, '')}>
        <Icon>help_outline_two_tone_icon</Icon>
      </Tooltip>
    </InputAdornment>
  );
  return (
    <>
      {!disabled &&
        TPANTS_FORM_SCHEMA_LOCK_EL.map(schemaEl => {
          const isPassword = schemaEl.name === 'password';
          return (
            <Grid item key={`grid-${schemaEl.name}`} xs={12}>
              <StringField
                {...schemaEl}
                basePath={basePath}
                formState={formState}
                key={`strField-${schemaEl.name}`}
                setFormState={setFormState}
                disabled={disabledFields.includes(schemaEl.name)}
                startAdornment={
                  disabledFields.includes('comment') ? commentAdornment : null
                }
                type={isPassword ? schemaEl.name : schemaEl.type}
              />
            </Grid>
          );
        })}
    </>
  );
};

PasswordFieldGroup.propTypes = {
  basePath: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  disabledFields: PropTypes.arrayOf(PropTypes.string),
  formState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
};

PasswordFieldGroup.defaultProps = {
  disabled: false,
  disabledFields: [],
};
