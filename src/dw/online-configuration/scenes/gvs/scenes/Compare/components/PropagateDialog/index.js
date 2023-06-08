import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import cn from 'classnames';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import { generatePath, useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import { uuid } from 'dw/core/helpers/uuid';
import { useQueryParam } from 'dw/core/hooks';
import Dialog from 'dw/core/components/Dialog';

import { gvsUrlPattern, SCENES } from '@gvs/constants';
import {
  useNameMapping,
  usePropagateConfiguration,
  useTitleEnvByScopeUri,
  usePropagateDefinitions,
} from '@gvs/graphql/hooks';
import DraftNameField from '@gvs/components/DraftNameField';

const NO_DEFINITION = 'No definition found for key';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    '& label': { marginLeft: theme.spacing(3) },
    '& .material-icons': {
      color: 'rgba(0, 0, 0, 0.35)',
    },
  },
  content: {
    display: 'flex',
    '& label': {
      fontWeight: '600',
    },
    '& span': {
      color: theme.palette.primary.main,
      textTransform: 'uppercase',
      margin: `0 ${theme.spacing(4)}px`,
    },
  },
  error: {
    color: theme.palette.error.main,
    lineHeight: 3,
    '& .material-icons': {
      marginLeft: theme.spacing(2),
      color: 'rgba(0, 0, 0, 0.35)',
    },
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    lineHeight: 2.5,
    color: 'rgba(0, 0, 0, 0.67)',
    '& > div': {
      padding: `0 ${theme.spacing(1)}px`,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
    },
    '& .key': {
      fontWeight: 600,
      minWidth: '280px',
      maxWidth: '280px',
    },
    '& .platform': {
      minWidth: '120px',
      maxWidth: '120px',
    },
  },
  headers: {
    fontWeight: 600,
    borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  conflicts: {
    height: '250px',
    overflow: 'hidden',
    '& .scrollable': {
      height: '100%',
      overflowY: 'auto',
    },
  },
}));

const Conflicts = ({ conflicts: raw }) => {
  const conflicts = useMemo(() => {
    return Object.entries(groupBy(raw, 'key')).reduce(
      (acc, [key, values]) => [
        ...acc,
        {
          key,
          platform: values.reduce(
            (platformAcc, { platform }) => uniq([...platformAcc, platform]),
            []
          ),
          msg: values.reduce(
            (msgAcc, { msg }) => uniq([...msgAcc, ...msg]),
            []
          ),
        },
      ],
      []
    );
  }, [raw]);
  const classes = useStyles();
  return (
    <>
      <div className={cn(classes.row, classes.headers)}>
        <div className="key">Key</div>
        <div className="platform">Platform</div>
        <div className="message">Message</div>
      </div>
      <div className={classes.conflicts}>
        <div className="scrollable">
          {conflicts.map(({ key, platform, msg }) => (
            <div key={key} className={classes.row}>
              <div className="key">{key}</div>
              <div className="platform">
                {[...platform]
                  .sort()
                  .map(p => (p === '*' ? 'Default' : p))
                  .join(', ')}
              </div>
              <div className="message">{msg.join('. ')}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
Conflicts.propTypes = {
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const PropagateDialog = ({ onClose }) => {
  const classes = useStyles();
  const draftRef = useRef();
  const [draftNameError, setDraftNameError] = useState();
  const [syncSource, setSyncSource] = useState(true);
  const [error, setError] = useState();
  const [conflicts, setConflicts] = useState();
  const force = useMemo(() => Boolean(conflicts), [conflicts]);
  const reset = useCallback(() => {
    setError(null);
  }, []);
  const { scopeURI } = useParams();
  const [targetScopeURI] = useQueryParam('targetScopeURI');
  const [
    propagateConfiguration,
    { loading: confLoading, error: confError, data },
  ] = usePropagateConfiguration();
  const [propagateDefinitions, { loading: defLoading }] =
    usePropagateDefinitions(targetScopeURI);
  const loading = useMemo(
    () => confLoading || defLoading,
    [confLoading, defLoading]
  );
  useEffect(() => {
    if (!confError) return;
    const {
      graphQLErrors: [{ message }],
    } = confError;
    const parsed = JSON.parse(message);
    const {
      error: { msg },
      status_code: statusCode,
    } = parsed;
    setError(msg);
    switch (statusCode) {
      case 409:
        {
          const {
            error: {
              conflicts: [{ errors }],
            },
          } = parsed;
          setConflicts(errors);
        }
        break;
      case 400: {
        const {
          error: { invalid },
        } = parsed;
        invalid.forEach(({ path, msg: m }) => {
          switch (path) {
            case 'draftName':
              setDraftNameError(m);
              break;
            default:
          }
        });
        break;
      }
      default:
    }
  }, [confError]);
  const missingDefinitions = useMemo(() => {
    if (!conflicts) return null;
    return conflicts.reduce(
      (acc, { key, msg }) =>
        msg.join('').includes(NO_DEFINITION) && !acc.includes(key)
          ? [...acc, key]
          : acc,
      []
    );
  }, [conflicts]);
  const nameMapping = useNameMapping();
  const getLabel = useCallback(
    scope => {
      const [, , ...parts] = scope.split(':');
      return parts
        .filter(Boolean)
        .map(item =>
          nameMapping[item] ? `(${item}) ${nameMapping[item]}` : item
        )
        .join(' > ');
    },
    [nameMapping]
  );
  const draftNamePlaceholder = useMemo(
    () => `Applied from ${getLabel(scopeURI)}`,
    [getLabel, scopeURI]
  );
  const history = useHistory();

  const { env: targetEnv, titleId: targetTitleId } =
    useTitleEnvByScopeUri(targetScopeURI);
  const redirectToDraft = useCallback(
    draftId => {
      const url = generatePath(gvsUrlPattern, {
        scene: SCENES.DRAFTS,
        env: targetEnv,
        titleId: targetTitleId,
        scopeURI: targetScopeURI,
      });
      history.push([url, draftId].join('/'), uuid());
    },
    [history, targetEnv, targetTitleId, targetScopeURI]
  );
  useEffect(() => {
    if (!data) return;
    const {
      gvsPropagateConfiguration: { id },
    } = data;
    setTimeout(() => {
      redirectToDraft(id);
    }, 500);
  }, [data, redirectToDraft]);
  const onPropagate = useCallback(async () => {
    setError();
    setDraftNameError();
    const err = draftRef?.current?.validate(true);
    if (err) {
      setDraftNameError(err);
      return;
    }
    if (force) {
      try {
        await propagateDefinitions(missingDefinitions, force);
      } catch (e) {
        // Errors are handled within useMutation
      }
    }
    try {
      await propagateConfiguration(
        draftRef?.current?.getValue() || draftNamePlaceholder,
        syncSource,
        force
      );
    } catch (e) {
      // Errors are handled within useMutation
    }
  }, [
    propagateConfiguration,
    propagateDefinitions,
    syncSource,
    draftNamePlaceholder,
    force,
    missingDefinitions,
  ]);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={onClose} disabled={loading}>
        Cancel
      </Button>,
      <Button
        key="delete"
        color={force ? 'secondary' : 'primary'}
        onClick={onPropagate}
        disabled={loading}
      >
        {loading
          ? 'Submitting ...'
          : `${
              force ? 'Force Propagate with Conflicts' : 'Confirm Propagation'
            }`}
      </Button>,
    ],
    [onClose, onPropagate, loading, force]
  );
  useEffect(() => {
    reset();
  }, []);
  return (
    <Dialog
      modal
      open
      onRequestClose={onClose}
      title={
        <div className={classes.title}>
          Propagate
          <FormControlLabel
            control={
              <Checkbox
                checked={!syncSource}
                onChange={() => setSyncSource(value => !value)}
                name="syncSource"
              />
            }
            label="Additive changes only"
          />
          <Tooltip title="It will not overwrite or remove any existing variables.">
            <Icon>help</Icon>
          </Tooltip>
        </div>
      }
      actions={actions}
      maxWidth="md"
      fullWidth
    >
      <div className={classes.content}>
        <label>{getLabel(scopeURI)}</label>
        <span>to</span>
        <label>{getLabel(targetScopeURI)}</label>
      </div>
      <br />
      <p>The draft would be created automatically on the target environment</p>
      <DraftNameField
        ref={draftRef}
        scopeURI={targetScopeURI}
        initialValue={draftNamePlaceholder}
        label="Draft Name"
        InputLabelProps={{ shrink: true }}
        error={Boolean(draftNameError)}
        helperText={draftNameError}
        fullWidth
        autoFocus
      />
      <br />
      <br />
      <p>You have to review and release it to apply the changes.</p>
      {error && <div className={classes.error}>{error}</div>}
      {conflicts && <Conflicts conflicts={conflicts} />}
      {force && (
        <div className={classes.error}>
          To continue you must Force the Propagation or Cancel
          <Tooltip title="This will override the definitions in the destination with the ones in the source">
            <Icon>help</Icon>
          </Tooltip>
        </div>
      )}
      {!force && <p>Are you sure you want to continue?</p>}
    </Dialog>
  );
};
PropagateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PropagateDialog;
