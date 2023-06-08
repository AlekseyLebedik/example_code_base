import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { positiveInt } from 'dw/core/components/FormFields/validation';

import { STORE_TABS_NAMES } from '../constants';

import styles from '../index.module.css';

const Actions = ({ selected, tab, players, playersError, onSubmit }) => {
  const [value, setValue] = useState(1);
  const [error, setError] = useState(undefined);
  const disabled =
    playersError || players.length === 0 || selected.length === 0;
  const changeValue = useCallback(
    v => {
      setValue(v);
      setError(positiveInt(v));
    },
    [setValue, setError]
  );
  return tab !== STORE_TABS_NAMES.currencies ? (
    <div className={styles.actions}>
      <IconButton
        color="primary"
        disabled={disabled}
        onClick={() => onSubmit(1)}
      >
        <Icon>playlist_add</Icon>
      </IconButton>
      {tab !== STORE_TABS_NAMES.products ? (
        <IconButton
          color="secondary"
          disabled={disabled}
          onClick={() => onSubmit(-1)}
        >
          <Icon>delete_sweep</Icon>
        </IconButton>
      ) : null}
    </div>
  ) : (
    <div className={styles.actions}>
      <ConfirmActionComponent
        component="IconButton"
        color="primary"
        onClick={() => onSubmit(parseInt(value, 10))}
        confirm={{
          title: 'Add Currency',
          confirmMsg: (
            <TextField
              value={value}
              onChange={e => changeValue(e.target.value)}
              placeholder="Value to add"
              error={Boolean(error)}
              helperText={error}
              label={error && 'error'}
              fullWidth
            />
          ),
          mainButtonLabel: 'Submit',
          disabled: !value || error,
        }}
        disabled={disabled}
      >
        playlist_add
      </ConfirmActionComponent>
      <ConfirmActionComponent
        component="IconButton"
        color="secondary"
        onClick={() => onSubmit(-parseInt(value, 10))}
        confirm={{
          title: 'Remove Currency',
          confirmMsg: (
            <TextField
              value={value}
              onChange={e => changeValue(e.target.value)}
              placeholder="Value to remove"
              error={Boolean(error)}
              helperText={error}
              label={error && 'error'}
              fullWidth
            />
          ),
          mainButtonLabel: 'Submit',
          disabled: !value || error,
        }}
        disabled={disabled}
      >
        delete_sweep
      </ConfirmActionComponent>
    </div>
  );
};

Actions.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.object).isRequired,
  tab: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  playersError: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Actions.defaultProps = { playersError: undefined };

export default Actions;
