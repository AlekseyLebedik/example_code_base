import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from 'dw/core/components/Dialog';

const useStyles = makeStyles(theme => ({
  addButton: {
    margin: `0 0 ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    width: 43,
    zIndex: 1,
  },
}));

const KeyValueEditor = ({ gridApi, node, onDataChanged }) => {
  const valueRef = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(node?.data?.key || '');
  const [value, setValue] = useState(node?.data?.value || '');
  const [error, setError] = useState();

  const onClose = useCallback(() => {
    setKey(node?.data?.key || '');
    setValue(node?.data?.value || '');
    setError(null);
    setOpen(false);
  }, [node]);

  const onSave = useCallback(() => {
    setError(null);
    const existing = [];
    gridApi.forEachLeafNode(({ data }) => existing.push(data.key));
    if (!key) {
      setError('Required');
      return;
    }
    if (existing.includes(key) && key !== node?.data?.key) {
      setError('The key already exists');
      return;
    }
    if (node) {
      node.setData({ key, value });
    } else {
      gridApi.applyTransaction({
        addIndex: 0,
        add: [{ key, value }],
      });
    }
    onDataChanged({ api: gridApi });
    if (!node) {
      setKey('');
      setValue('');
    }
    setOpen(false);
    setTimeout(() => {
      // Highlight the changed row
      gridApi.flashCells({
        rowNodes: [node || gridApi.getDisplayedRowAtIndex(0)],
        cellFlashDelay: 2000,
      });
    }, 0);
  }, [gridApi, node, key, value]);

  const actions = useMemo(
    () => [
      <Button onClick={onClose}>Cancel</Button>,
      <Button onClick={onSave} color="primary">
        Save
      </Button>,
    ],
    [onSave]
  );
  const handleKeyPress = useCallback(
    event => {
      if (event.key === 'Enter') {
        if (event.target.name === 'key') valueRef.current.focus();
        else onSave();
      }
    },
    [onSave]
  );

  return (
    <>
      {node ? (
        <Tooltip title="Edit key / value pair" placement="left">
          <IconButton onClick={() => setOpen(true)}>
            <Icon>edit</Icon>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add a new key / value pair" placement="left">
          <Fab
            color="primary"
            size="small"
            onClick={() => setOpen(true)}
            className={classes.addButton}
          >
            <Icon>playlist_add</Icon>
          </Fab>
        </Tooltip>
      )}
      {open && (
        <Dialog
          title={node ? 'Edit Key / Value pair' : 'Add new Key / Value pair'}
          actions={actions}
          onRequestClose={onClose}
          fullWidth
          open
          modal
        >
          <div className="flex flex-col">
            <TextField
              name="key"
              value={key}
              label="Key"
              onChange={e => setKey(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              InputLabelProps={{ shrink: true }}
              onKeyPress={handleKeyPress}
              fullWidth
              autoFocus
            />
            <TextField
              name="value"
              inputRef={valueRef}
              value={value}
              label="Value"
              onChange={e => setValue(e.target.value)}
              InputLabelProps={{ shrink: true }}
              onKeyPress={handleKeyPress}
              fullWidth
            />
          </div>
        </Dialog>
      )}
    </>
  );
};
KeyValueEditor.propTypes = {
  gridApi: PropTypes.object.isRequired,
  node: PropTypes.object,
  onDataChanged: PropTypes.func.isRequired,
};
KeyValueEditor.defaultProps = {
  node: undefined,
};

export default KeyValueEditor;
