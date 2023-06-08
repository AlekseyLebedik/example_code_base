import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import axios from 'dw/core/axios';
import { useDebouncedCallback } from 'dw/core/hooks';
import AutocompleteGeneral from '../AutocompleteGeneral';

const UsersApi = ({ cancelToken, ...params }) =>
  axios.get('users/', { params, cancelToken });

const UserAutocomplete = ({ value, ...props }) => {
  const loadOptions = useCallback((input, callback) => {
    UsersApi({ q: input })
      .then(({ data: { data } }) => {
        callback(
          data.map(({ username, name }) => ({
            value: username,
            label: `${name}(${username})`,
          }))
        );
      })
      .catch(() => callback([]));
  }, []);
  const debouncedLoadOptions = useDebouncedCallback(loadOptions);
  const [defaultValue, setDefaultValue] = useState(value ? null : undefined);
  useEffect(() => {
    const load = async () => {
      if (!value) return;
      try {
        const {
          data: {
            data: [user],
          },
        } = await UsersApi({ q: value });
        setDefaultValue({
          value: user.username,
          label: `${user.name}(${user.username})`,
        });
      } catch (e) {
        setDefaultValue(value);
      }
    };
    load();
  }, []);
  return defaultValue === null ? (
    <TextField
      label={props.label}
      value={value}
      variant="outlined"
      margin="dense"
      disabled
    />
  ) : (
    <AutocompleteGeneral
      {...props}
      value={value}
      defaultValue={defaultValue}
      loadOptions={debouncedLoadOptions}
    />
  );
};
UserAutocomplete.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};
UserAutocomplete.defaultProps = {
  value: '',
  label: undefined,
};

export default UserAutocomplete;
