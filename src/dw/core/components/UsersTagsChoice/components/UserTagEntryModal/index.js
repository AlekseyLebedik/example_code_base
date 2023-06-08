import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import IconButton from 'dw/core/components/IconButton';
import UserAutoComplete from 'dw/online-configuration/components/UserAutoComplete';

import { getTagDisplay } from '../../helpers';

import styles from './index.module.css';

const UserTagEntryModal = props => {
  const {
    dialogOpen,
    setDialogOpen,
    setTags,
    setUsers,
    tags,
    userId,
    users,
    validTags,
  } = props;
  const [entryType, setEntryType] = useState('user');
  const [manualTagEntry, setManualTagEntry] = useState(false);
  const [tagSearchType, setTagSearchType] = useState('equals');
  const [tagValue, setTagValue] = useState({ searchType: 'equals' });
  const [userValue, setUserValue] = useState(null);
  const addChipValue = () => {
    if (entryType === 'user' && userValue && !users.includes(userValue)) {
      const updatedUsers = [...users, userValue].sort();
      setUsers(updatedUsers);
      setDialogOpen(false);
    } else if (
      entryType === 'tag' &&
      tagValue.key &&
      tagValue.value &&
      !tags.find(
        tag => tag.key === tagValue.key && tag.value === tagValue.value
      )
    ) {
      const updatedTags = sortBy([...tags, tagValue], tag =>
        getTagDisplay(validTags, tag.key)
      );
      setTags(updatedTags);
      setDialogOpen(false);
    }
  };

  return (
    <Dialog
      data-cy="userTagEntryModal"
      fullWidth
      onClose={() => setDialogOpen(false)}
      open={dialogOpen}
    >
      <DialogTitle>Enter a search term</DialogTitle>
      <DialogContent>
        <div className={styles.userTagEntryRadioButtons}>
          <div>
            <Radio
              checked={entryType === 'user'}
              onChange={() => setEntryType('user')}
              value={entryType === 'user'}
            />
            <span>User</span>
          </div>
          <div>
            <Radio
              checked={entryType === 'tag'}
              onChange={() => setEntryType('tag')}
              value={entryType === 'tag'}
            />
            <span>Tag</span>
          </div>
          {validTags?.length > 0 && entryType === 'tag' ? (
            <IconButton
              color="primary"
              dataCy="toggleTagKeyEntryType"
              icon={manualTagEntry ? 'list' : 'edit'}
              onClick={() => setManualTagEntry(!manualTagEntry)}
              tooltip={
                manualTagEntry
                  ? 'Choose tag key from list'
                  : 'Enter key manually'
              }
            />
          ) : null}
        </div>
        <div>
          {entryType === 'user' ? (
            <UserAutoComplete
              size="normal"
              defaultValue={null}
              isClearable={false}
              key={userId}
              onChange={e => setUserValue(e)}
              placeholder="Enter User ID | Username"
              variant="box"
            />
          ) : (
            <div className={styles.tagInputsContainer}>
              {validTags?.length > 0 && !manualTagEntry ? (
                <FormControl>
                  <InputLabel shrink>Key</InputLabel>
                  <Select
                    onChange={e =>
                      setTagValue({ ...tagValue, key: e.target.value })
                    }
                    placeholder="Key"
                    value={tagValue?.key}
                  >
                    {validTags.map(validTag => (
                      <MenuItem value={validTag.key}>
                        {validTag.humanReadable}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label="Key"
                  onChange={e =>
                    setTagValue({ ...tagValue, key: e.target.value })
                  }
                  placeholder="Key"
                />
              )}
              <TextField
                label="Value"
                onChange={e =>
                  setTagValue({ ...tagValue, value: e.target.value })
                }
                placeholder="Value"
              />
              <div>
                <Radio
                  checked={tagSearchType === 'equals'}
                  onChange={() => {
                    setTagSearchType('equals');
                    setTagValue({ ...tagValue, searchType: 'equals' });
                  }}
                  value={tagSearchType === 'equals'}
                />
                <span>Equals</span>
              </div>
              <div>
                <Radio
                  checked={tagSearchType === 'wildcard'}
                  onChange={() => {
                    setTagSearchType('wildcard');
                    setTagValue({ ...tagValue, searchType: 'wildcard' });
                  }}
                  value={tagSearchType === 'wildcard'}
                />
                <span>Wildcard</span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button autoFocus onClick={addChipValue} color="primary">
          Add {entryType} to Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserTagEntryModal.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  setTags: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  validTags: PropTypes.arrayOf(PropTypes.object),
};

UserTagEntryModal.defaultProps = {
  userId: null,
  validTags: [],
};

export default UserTagEntryModal;
