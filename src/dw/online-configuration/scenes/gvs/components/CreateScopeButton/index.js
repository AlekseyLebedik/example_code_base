import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import cn from 'classnames';

import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import { GVS_EDIT_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import Dialog from 'dw/core/components/Dialog';
import { useCurrentEnvPermission, useSnackbar } from 'dw/core/hooks';
import { ERROR_MSG } from 'dw/online-configuration/constants';
import {
  useCreateScope,
  useAssignedObfuscationAlgorithms,
  useInstancedObfuscationAlgorithms,
} from '@gvs/graphql/hooks';
import Select from 'dw/core/components/Select';

const nameRegexp = /^[a-zA-Z0-9-_]+$/;

const useStyles = makeStyles(theme => ({
  addButton: {
    marginTop: -theme.spacing(1),
  },
  algorithmType: { marginBottom: theme.spacing(2) },
  field: { marginTop: theme.spacing(2) },
  parameters: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0, 0, 0, 0.35)',
    color: 'rgba(0, 0, 0, 0.35)',
    padding: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
    fontSize: '12px',
  },
}));

const CreateScopeButton = ({ refetchScopes, onScopeChange }) => {
  const { scene } = useParams();
  const classes = useStyles();
  const snackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [algorithmID, setAlgorithmID] = useState();

  const { data: assignedObfuscationAlgorithms } =
    useAssignedObfuscationAlgorithms();
  const { data: instancedObfuscationAlgorithms } =
    useInstancedObfuscationAlgorithms();

  const algorithms = useMemo(() => {
    return uniqBy(
      [
        ...(assignedObfuscationAlgorithms?.gvsAssignedObfuscationAlgorithms ||
          []),
        ...(instancedObfuscationAlgorithms?.gvsInstancedObfuscationAlgorithms ||
          []),
      ],
      'algorithmID'
    );
  }, [assignedObfuscationAlgorithms, instancedObfuscationAlgorithms]);

  useEffect(() => {
    if (algorithmID || algorithms.length === 0) return;
    const algorithm =
      assignedObfuscationAlgorithms?.gvsAssignedObfuscationAlgorithms &&
      assignedObfuscationAlgorithms.gvsAssignedObfuscationAlgorithms.length > 0
        ? assignedObfuscationAlgorithms.gvsAssignedObfuscationAlgorithms[0]
        : algorithms[0];
    setAlgorithmID(algorithm.algorithmID);
  }, [algorithmID, algorithms, assignedObfuscationAlgorithms]);

  const selectedAlgorithm = useMemo(
    () => algorithms.find(a => a.algorithmID === algorithmID) || {},
    [algorithmID, algorithms]
  );

  useEffect(() => {
    setError(null);
    setName('');
  }, [open]);
  const handleClose = useCallback(() => setOpen(false), []);
  const editConfigurationPermission = useCurrentEnvPermission([
    GVS_EDIT_CONFIGURATION,
  ]);
  const [createScope, { loading }] = useCreateScope();
  const handleSubmit = useCallback(async () => {
    if (!nameRegexp.test(name)) {
      setError('You can use only alphanumeric symbols, dashes and underscores');
      return;
    }
    setError(null);
    try {
      const {
        data: {
          gvsCreateScope: { scopeURI },
        },
      } = await createScope(name, algorithmID);
      await refetchScopes();
      snackbar.success('Game Build has been created successfully');
      handleClose();
      setTimeout(() => onScopeChange(scopeURI), 200);
    } catch (err) {
      if (String(err).includes('Error:ClientError:Conflict')) {
        setError(`The game build "${name}" already exists`);
        return;
      }
      // eslint-disable-next-line
      console.log(err);
      snackbar.error(ERROR_MSG);
    }
  }, [name, createScope, refetchScopes, snackbar, handleClose, algorithmID]);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={handleClose}>
        Cancel
      </Button>,
      <Button
        key="submit"
        onClick={handleSubmit}
        color="primary"
        disabled={loading || !name}
      >
        {loading ? 'Creating...' : 'Create'}
      </Button>,
    ],
    [handleClose, handleSubmit, loading, name]
  );
  if (!(scene === 'configuration' && editConfigurationPermission)) return null;
  return (
    <>
      <Tooltip title="Create a new Game Build">
        <IconButton className={classes.addButton} onClick={() => setOpen(true)}>
          <Icon>playlist_add</Icon>
        </IconButton>
      </Tooltip>
      {open ? (
        <Dialog
          open
          fullWidth
          maxWidth="sm"
          actions={actions}
          title="Create a Game Build"
          onRequestClose={handleClose}
        >
          <TextField
            autoFocus
            margin="dense"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            error={Boolean(error)}
            helperText={error}
            label="Game Build Name"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Select
            value={algorithmID}
            options={algorithms.map(a => ({
              value: a.algorithmID,
              label: a.algorithmName,
            }))}
            label="Algorithm Name"
            InputLabelProps={{ shrink: true }}
            onChange={e => setAlgorithmID(e.target.value)}
            className={classes.field}
            helperText="(contact dw/storage if algorithm is not listed)"
            fullWidth
          />
          <div className={cn(classes.field, classes.parameters)}>
            <div className={classes.algorithmType}>
              Algorithm Type: {selectedAlgorithm?.algorithmType}
            </div>
            {sortBy(selectedAlgorithm?.parameters || [], 'name').map(p => (
              <div key={p.name}>
                {p.name}: {p.value}
              </div>
            ))}
          </div>
        </Dialog>
      ) : null}
    </>
  );
};

CreateScopeButton.propTypes = {
  refetchScopes: PropTypes.func,
  onScopeChange: PropTypes.func.isRequired,
};
CreateScopeButton.defaultProps = {
  refetchScopes() {},
};

export default CreateScopeButton;
