import React, { useCallback, useEffect, useMemo, useState } from 'react';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';

import { makeStyles } from '@material-ui/core/styles';
import { useCreateEditDefinition } from '@gvs/graphql/hooks';
import {
  useScopeURI,
  useHandleConflictError,
} from '@gvs/scenes/VariableDefinition/hooks';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  addDefinitions: {
    flexGrow: 1,
    margin: theme.spacing(2),
    width: '400px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  text: {
    width: '400px',
    margin: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.5)',
  },
  error: {
    width: '400px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.error.main,
  },
}));

const AddDefinitions = ({
  gridApi,
  scopeURI,
  gridData,
  currentEdits,
  definitions,
  refetchDefinitions,
}) => {
  const classes = useStyles();

  const [keysToAdd, setKeysToAdd] = useState(() => []);
  const [keys, setKeys] = useState(() => ({}));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const recalculateKeys = useCallback(() => {
    const result = [];
    if (!gridData) return;
    const { variables: rawVariables } = gridData;
    rawVariables.forEach(({ key }) => {
      result.push(key);
    });
    currentEdits.forEach(({ key }) => {
      result.push(key);
    });
    setKeys(prevKeys => ({ ...prevKeys, [scopeURI]: result }));
  }, [gridData, currentEdits, scopeURI]);

  const onClose = useCallback(() => {
    setKeysToAdd([]);
    setOpen(false);
    setError();
    setTimeout(recalculateKeys, 10);
  }, [recalculateKeys]);

  useEffect(() => {
    recalculateKeys();
  }, [definitions, gridData, currentEdits, scopeURI]);

  const options = useMemo(() => {
    if (!definitions) return [];

    return definitions
      .filter(
        ({ key, isArchived }) =>
          !(isArchived || get(keys, scopeURI, []).includes(key))
      )
      .map(({ key }) => ({ value: key, label: key }));
  }, [definitions, keys, scopeURI]);

  const onAddKeys = useCallback(() => {
    gridApi.setPinnedTopRowData(
      sortBy(
        [
          ...keysToAdd.map(key => ({ key })),
          ...gridApi.pinnedRowModel.pinnedTopRows.map(({ data }) => data),
        ],
        'key'
      )
    );
    onClose();
  }, [gridApi, keysToAdd, recalculateKeys, onClose]);

  const [addDefinition, { loading, error: createError }] =
    useCreateEditDefinition(useScopeURI());
  const handleError = useHandleConflictError(true);
  useEffect(() => {
    if (createError) {
      setError(handleError(createError));
    }
  }, [createError]);

  const onAddNewDefinition = useCallback(
    async key => {
      setError();
      try {
        await addDefinition({ key, type: 'char', validation: '{}' });
        await refetchDefinitions();
      } catch (e) {
        // eslint-disable-next-line
        setKeysToAdd(lst => lst.filter(k => k !== key));
      }
    },
    [addDefinition, refetchDefinitions, setKeysToAdd]
  );

  return (
    <>
      <Tooltip title="Add existing keys to the table or create a new">
        <span>
          <IconButton
            onClick={() => setOpen(true)}
            disabled={options.length === 0}
            color="primary"
          >
            <Icon>playlist_add</Icon>
          </IconButton>
        </span>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Typography variant="body1" className={classes.text} component="span">
          You may select existing <strong>Variable Definition</strong> from a
          list or type a new Variable Definition name and hit create in
          dropdown. It will create a new Variable Definition of{' '}
          <strong>String</strong> type. You can change the type anytime on
          Variable Definitions page as well as add required validation rules to
          it.
        </Typography>
        {error && (
          <Typography
            variant="body2"
            className={classes.error}
            component="span"
          >
            {error}
          </Typography>
        )}
        <AutocompleteGeneral
          key={keysToAdd.join(':')}
          defaultValue={keysToAdd.map(key => ({ value: key, label: key }))}
          onChange={values => {
            setError();
            setKeysToAdd(values);
          }}
          options={options}
          classes={{ root: classes.addDefinitions }}
          placeholder="Select definitions to add to the table"
          onAdd={onAddNewDefinition}
          autoFocus
          defaultMenuIsOpen
          fullWidth
          isMulti
        />
        <div className={classes.actions}>
          <Button
            color="default"
            variant="contained"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={onAddKeys}
            disabled={keysToAdd.length === 0 || loading}
          >
            Add
          </Button>
        </div>
      </Drawer>
    </>
  );
};
AddDefinitions.propTypes = {
  gridApi: PropTypes.object.isRequired,
  scopeURI: PropTypes.string.isRequired,
  gridData: PropTypes.object,
  currentEdits: PropTypes.arrayOf(PropTypes.object),
  definitions: PropTypes.arrayOf(PropTypes.object),
  refetchDefinitions: PropTypes.func,
};
AddDefinitions.defaultProps = {
  gridData: undefined,
  currentEdits: undefined,
  definitions: [],
  refetchDefinitions() {},
};

export default AddDefinitions;
