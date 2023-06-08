import React from 'react';
import { Field, Form } from 'redux-form';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';

import './presentational.css';
import * as C from '../../constants';

export const TypeSelectField = props => {
  const { type, onChangeType, isTypeInputDisabled } = props;
  const whitelistType = C.WL_TYPE_OPTIONS;

  return (
    <TextField
      id="outlined-select-whitelist-type"
      select
      required
      fullWidth
      variant="outlined"
      size="small"
      label="Whitelist Type"
      disabled={isTypeInputDisabled()}
      value={type}
      defaultValue={C.WL_TYPE_VALUE_IP}
      onChange={e => onChangeType(e.target.value)}
    >
      {whitelistType.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
TypeSelectField.propTypes = {
  type: PropTypes.string.isRequired,
  onChangeType: PropTypes.func.isRequired,
  isTypeInputDisabled: PropTypes.func.isRequired,
};

export const IPRangeField = props => {
  const { currentIp, onChangeIp, error } = props;

  return (
    <TextField
      label="IP/Ranges"
      fullWidth
      autoFocus
      error={!!error}
      value={currentIp || ''}
      onChange={e => onChangeIp(e.target.value)}
      helperText={
        error ||
        'IP/Ranges to be whitelisted in form 1.2.3.4+1 (+1 being range, default 0), separated by comma or space'
      }
    />
  );
};
IPRangeField.propTypes = {
  currentIp: PropTypes.string,
  onChangeIp: PropTypes.func.isRequired,
  error: PropTypes.string,
};
IPRangeField.defaultProps = {
  currentIp: null,
  error: null,
};

export const UserInputField = props => {
  const { currentUserId, currentGamerTag, onChangePlayer } = props;

  return (
    <Field
      name="playerId"
      component={UserInput}
      regularInputMode
      isSear
      valuesOnly={false}
      isClearable
      label="Player ID | GamerTag"
      defaultValue={undefined}
      inputValue={currentUserId || currentGamerTag || undefined}
      onChange={onChangePlayer}
      helperText="GamerTag is optional for IP/Ranges whitelisting"
    />
  );
};
UserInputField.propTypes = {
  currentUserId: PropTypes.string,
  currentGamerTag: PropTypes.string,
  onChangePlayer: PropTypes.func.isRequired,
};
UserInputField.defaultProps = {
  currentUserId: '',
  currentGamerTag: '',
};

export const ConsoleInputField = props => {
  const { currentConsoleId, onChangeConsoleId } = props;

  return (
    <TextField
      label="Console ID"
      placeholder="Console ID"
      variant="standard"
      fullWidth
      inputProps={{ maxLength: 255 }}
      value={currentConsoleId || ''}
      onChange={e => onChangeConsoleId(e.target.value)}
    />
  );
};
ConsoleInputField.propTypes = {
  currentConsoleId: PropTypes.string,
  onChangeConsoleId: PropTypes.func.isRequired,
};
ConsoleInputField.defaultProps = {
  currentConsoleId: null,
};

const AddIPControlForm = props => {
  const {
    type,
    allValues,
    handleSubmit,
    externalSubmit,
    currentNote,
    onChangeNote,
    onAdd,
    onDelete,
    onEdit,
    getKey,
    getValue,
  } = props;

  return (
    <div className="add-ip-control-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <div className="selectType">
          <TypeSelectField {...props} />
          {type === C.WL_TYPE_VALUE_IP && <IPRangeField {...props} />}
          {(type === C.WL_TYPE_VALUE_USER_ID ||
            type === C.WL_TYPE_VALUE_GAMER_TAG ||
            (false && type === C.WL_TYPE_VALUE_IP)) && (
            <UserInputField {...props} />
          )}
          {type === C.WL_TYPE_VALUE_CONSOLE_ID && (
            <ConsoleInputField {...props} />
          )}
          <TextField
            label="Note"
            placeholder="Add note"
            variant="standard"
            multiline
            fullWidth
            rows={2}
            inputProps={{ maxLength: 255 }}
            value={currentNote || ''}
            onChange={e => onChangeNote(e.target.value)}
          />
          <div className="buttonContainer">
            <Tooltip title="Add to whitelist" placement="bottom-start">
              <Button
                className="add"
                variant="contained"
                size="small"
                color="primary"
                onClick={onAdd}
              >
                Add
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="values">
          {allValues.length === 0 ? (
            <span className="empty">No Anticheat whitelist to save</span>
          ) : (
            <span className="h1">Anticheat whitelist to save</span>
          )}
          <Paper className="rows" variant="outlined">
            {allValues.map(v => (
              <div key={getKey(v)}>
                <div>{getValue(v)}</div>
                <div>{v.note}</div>
                <Tooltip title="Edit" placement="bottom-start">
                  <IconButton onClick={() => onEdit(getKey(v))}>
                    <Icon>create</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="bottom-start">
                  <IconButton onClick={() => onDelete(getKey(v))}>
                    <Icon>delete</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            ))}
          </Paper>
        </div>
      </Form>
    </div>
  );
};
AddIPControlForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
  onChangeIp: PropTypes.func.isRequired,
  onChangeNote: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  getKey: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    C.WL_TYPE_VALUE_USER_ID,
    C.WL_TYPE_VALUE_GAMER_TAG,
    C.WL_TYPE_VALUE_CONSOLE_ID,
    C.WL_TYPE_VALUE_IP,
    C.WL_TYPE_VALUE_IP_AND_GAMER_TAG,
  ]).isRequired,
  currentIp: PropTypes.string,
  currentUserId: PropTypes.string,
  currentGamerTag: PropTypes.string,
  currentConsoleId: PropTypes.string,
  currentNote: PropTypes.string,
  allValues: PropTypes.arrayOf(
    PropTypes.shape({
      groupID: PropTypes.number,
      note: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
};
AddIPControlForm.defaultProps = {
  error: null,
  currentIp: null,
  currentUserId: null,
  currentGamerTag: null,
  currentConsoleId: null,
  currentNote: '',
};

export default AddIPControlForm;
