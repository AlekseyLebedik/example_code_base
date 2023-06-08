import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  generatePath,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from 'dw/core/components/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useCreateDraft, useEvents, useNameMapping } from '@gvs/graphql/hooks';
import { gvsUrlPattern, SCENES } from '@gvs/constants';
import DraftNameField from '@gvs/components/DraftNameField';
import { uuid } from 'dw/core/helpers/uuid';
import Typography from '@material-ui/core/Typography';

const DRAFT_EXISTS_ERROR = 'Draft names already in use';

const useStyles = makeStyles(theme => ({
  eventDetails: {
    fontSize: '0.8rem',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    lineHeight: 1.2,
    color: theme.palette.grey[700],
  },
  confirm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paragraph: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const RestoreEventButton = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { eventId } = useParams();
  const { events } = useEvents();
  const item = useMemo(
    () => events?.find(e => e.eventID === eventId) || {},
    [events, eventId]
  );
  const disabled = useMemo(() => {
    const [firstEvent] = events || [];
    return firstEvent?.eventID === eventId;
  }, [events, eventId]);

  return (
    <>
      <Typography variant="h6" className={classes.eventDetails}>
        Released By: {item.createdBy?.username}
        <br />
        Description: {item.comment}
      </Typography>
      <Tooltip
        title={
          disabled
            ? 'Not possible to restore to latest event'
            : 'Restore Event (creates a draft)'
        }
      >
        <span>
          <IconButton
            onClick={e => {
              e.stopPropagation();
              setOpen(true);
            }}
            disabled={disabled}
          >
            <Icon>restore</Icon>
          </IconButton>
        </span>
      </Tooltip>
      {open && (
        <RestoreEventModal
          open={open}
          handleClose={() => setOpen(false)}
          item={item}
        />
      )}
    </>
  );
};

const RestoreEventModal = ({ open, handleClose, item }) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch(gvsUrlPattern);
  const { eventId } = useParams();
  const displayNames = useNameMapping();
  const [error, setError] = useState();
  const [nameError, setNameError] = useState();
  const [redirect, setRedirect] = useState(true);
  const defaultDraftName = `restore_${item.eventName}`;
  const draftNameRef = useRef();
  const [createDraft, { loading }] = useCreateDraft();
  const redirectToDraftPage = useCallback(
    id => {
      const url = generatePath(`${gvsUrlPattern}/${id}`, {
        ...match.params,
        scene: SCENES.DRAFTS,
      });
      history.push(url, uuid());
    },
    [history, match]
  );
  const handleRestoreEvent = useCallback(async () => {
    setError(null);
    setNameError(null);
    const err = draftNameRef.current.validate(true);
    if (err) {
      setNameError(err);
      return;
    }

    const scopes = item.scopes.map(s => ({ scopeURI: s.scopeURI }));
    // Create the Draft + Edit
    try {
      const {
        data: {
          gvsCreateDraft: { id },
        },
      } = await createDraft({
        draftData: { name: draftNameRef.current.getValue() },
        restoreData: {
          eventID: eventId,
          scopes,
          comment: defaultDraftName,
        },
      });
      if (redirect) {
        setTimeout(() => redirectToDraftPage(id), 200);
      }
      handleClose();
    } catch (e) {
      if (String(e).includes(DRAFT_EXISTS_ERROR)) {
        setNameError(DRAFT_EXISTS_ERROR);
      } else {
        setError(String(e));
      }
    }
  }, [
    createDraft,
    defaultDraftName,
    item.value,
    eventId,
    handleClose,
    redirect,
    redirectToDraftPage,
  ]);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={handleClose} disabled={loading}>
        Cancel
      </Button>,
      <Button
        key="restore"
        color="primary"
        onClick={handleRestoreEvent}
        disabled={loading}
      >
        {loading ? 'loading...' : 'Restore'}
      </Button>,
    ],
    [handleClose, handleRestoreEvent, loading]
  );
  useEffect(() => {
    setError(null);
    setNameError(null);
  }, [open]);
  return (
    <Dialog
      modal
      open={open}
      onRequestClose={handleClose}
      title="Confirm Restore Event"
      actions={actions}
    >
      <div className={classes.paragraph}>
        {error && (
          <div className={classes.error}>
            Error happen when restoring event: {error}
          </div>
        )}
        You are restoring configuration to it&apos;s state{' '}
        <strong>after</strong> the release of <strong>{item.eventName}</strong>.
        This will restore any changes made to the following scopes:
      </div>
      <div className={classes.paragraph}>
        {item.scopes.map(({ scopeName }) => (
          <div>
            <strong>
              {displayNames[scopeName]
                ? `(${scopeName}) - ${displayNames[scopeName]}`
                : scopeName}
            </strong>
          </div>
        ))}
      </div>
      <div className={classes.paragraph}>
        Restore will generate a draft which you can name below and redirect you
        to it. You must review the diff and release the draft to apply the
        changes. Uncheck the <strong>Redirect to Draft</strong> checkbox if you
        would like to stay on this page.
      </div>
      <div className={classes.paragraph}>
        <DraftNameField
          ref={draftNameRef}
          initialValue={defaultDraftName}
          InputLabelProps={{ shrink: true }}
          label="Draft Name"
          error={Boolean(nameError)}
          helperText={nameError}
          fullWidth
          autoFocus
        />
      </div>
      <div className={cn(classes.paragraph, classes.confirm)}>
        Are you sure you want to continue?
        <FormControlLabel
          control={
            <Checkbox
              checked={redirect}
              onChange={e => setRedirect(e.target.checked)}
              color="primary"
            />
          }
          label="Redirect to Draft"
        />
      </div>
    </Dialog>
  );
};
RestoreEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default RestoreEventButton;
