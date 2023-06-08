import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from 'dw/core/components/IconButton';
import setupApollo from 'dw/core/helpers/setupApollo';
import { useCompare } from 'dw/core/hooks';

import Select from 'dw/core/components/Select';

import TitleEnvSelect from './components/TitleEnvSelect';
import { GET_DRAFTS_QUERY, GET_EVENTS_QUERY } from './queries';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    height: '100%',
  },
  header: {
    display: 'flex',
    '& > div:first-child': {
      marginRight: theme.spacing(2),
    },
  },
  saveBtn: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const DraftField = ({
  title,
  selectedActivity,
  setDraftId,
  draftError,
  disabled: activityDisabled,
}) => {
  const draftId = selectedActivity?.activity?.draft_id;
  const { data, loading: draftsLoading } = useQuery(GET_DRAFTS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      titleId: title?.id,
      env: title?.env?.shortType,
    },
    skip: !title,
  });
  const { data: events, loading: eventsLoading } = useQuery(GET_EVENTS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      titleId: title?.id,
      env: title?.env?.shortType,
      scopeURI: title?.env?.options?.scopeURI,
      filterByDraftId: draftId,
    },
    skip: !(title && draftId),
  });
  const event = useMemo(() => {
    if (!events) return null;
    const [evt] = events.gvsEvents.events;
    return evt;
  }, [events]);
  const eventId = event?.eventID;
  const disabled = activityDisabled || Boolean(eventId);
  const drafts = useMemo(() => {
    if (!(data && title)) return [];
    return (
      data?.gvsDrafts?.find(s => s.scopeURI === title?.env?.options?.scopeURI)
        ?.drafts || []
    );
  }, [data, title]);
  if (draftsLoading || eventsLoading) {
    return <CircularProgress />;
  }
  if (!eventId) {
    return (
      <>
        <Select
          label="Draft"
          value={draftId || ''}
          options={drafts.map(d => ({ label: d.name, value: d.id }))}
          InputLabelProps={{ shrink: true }}
          onChange={e => setDraftId(e.target.value)}
          error={Boolean(draftError)}
          helperText={
            draftError ||
            `The draft would be released on event ${
              selectedActivity.publish_on === 'on_start' ? 'start' : 'end'
            }`
          }
          disabled={disabled}
          fullWidth
        />
        {draftId && (
          <IconButton
            icon="link"
            onClick={() =>
              window.open(
                `/online-configuration/${title.id}/dev/gvs/drafts/${title.env.options.scopeURI}/${draftId}?viewMode=diff`,
                '_blank'
              )
            }
            tooltip="View Draft Details (will open in a new window)"
          />
        )}
      </>
    );
  }
  return (
    <Typography>
      The draft <strong>{event.eventDraft.name}</strong> was successfully
      released
      <IconButton
        icon="link"
        onClick={() =>
          window.open(
            `/online-configuration/${title.id}/dev/gvs/events/${title.env.options.scopeURI}/${eventId}?viewMode=diff`,
            '_blank'
          )
        }
        tooltip="View Event Details (will open in a new window)"
      />
    </Typography>
  );
};

DraftField.propTypes = {
  title: PropTypes.object,
  selectedActivity: PropTypes.object.isRequired,
  setDraftId: PropTypes.func,
  draftError: PropTypes.string,
  disabled: PropTypes.bool,
};
DraftField.defaultProps = {
  title: {},
  setDraftId() {},
  draftError: null,
  disabled: false,
};

const GVS = ({
  currentProject,
  titles,
  selectedActivity: { exec_order: execOrder, ...selectedActivityRaw },
  onUpdate,
  disabled,
}) => {
  const classes = useStyles();
  const selectedActivity = useCompare(selectedActivityRaw);
  const [updatedActivity, setUpdatedActivity] = useState(
    cloneDeep(selectedActivity)
  );
  const titleEnvId = useMemo(() => {
    const [id] = updatedActivity?.title_envs || [];
    return id;
  }, [updatedActivity]);
  const setTitleEnvId = useCallback(
    id =>
      setUpdatedActivity(a => ({
        ...a,
        title_envs: [id],
        activity: { ...a.activity, draft_id: '' },
      })),
    []
  );

  const [draftError, setDraftError] = useState();
  const setDraftId = useCallback(
    draftId =>
      setUpdatedActivity(a => ({
        ...a,
        activity: { ...a.activity, draft_id: draftId },
      })),
    []
  );
  const onRevertDraftChanged = useCallback(
    e =>
      setUpdatedActivity(a => ({
        ...a,
        activity: { ...a.activity, create_revert_draft: e.target.checked },
      })),
    []
  );

  const setActivityName = useCallback(
    name => setUpdatedActivity(a => ({ ...a, name })),
    []
  );
  const title = useMemo(() => {
    if (!titles) return null;
    return titles.find(t => t.env.id === titleEnvId);
  }, [titles, titleEnvId]);
  useEffect(() => {
    setUpdatedActivity(selectedActivity);
    setDraftError(null);
  }, [selectedActivity]);

  const onSave = useCallback(
    activity => {
      setDraftError(null);
      if (!activity?.activity?.draft_id) {
        setDraftError('The draft is required');
        return;
      }
      onUpdate(activity);
    },
    [onUpdate]
  );

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <TextField
          label="Name"
          value={updatedActivity?.name || ''}
          InputLabelProps={{ shrink: true }}
          onChange={e => setActivityName(e.target.value)}
          disabled={disabled}
          fullWidth
        />
        <TitleEnvSelect
          currentProject={currentProject}
          onChange={setTitleEnvId}
          titleEnvId={titleEnvId}
          disabled={disabled}
        />
      </div>
      <div className={classes.row}>
        <DraftField
          title={title}
          selectedActivity={updatedActivity}
          setDraftId={setDraftId}
          draftError={draftError}
          disabled={disabled}
        />
      </div>
      {selectedActivity.publish_on === 'on_start' && (
        <div className={classes.row}>
          <FormControlLabel
            control={
              <Checkbox
                checked={updatedActivity?.activity?.create_revert_draft}
                onChange={onRevertDraftChanged}
                color="primary"
                disabled={disabled}
              />
            }
            label="Create and release revert draft automatically"
          />
          <Tooltip title="The revert draft and the related end activity would be created automatically when this activity starts. By checking this you don't need to create the end activity and select revert draft manually unless you need another draft to be released at the end.">
            <Icon>help</Icon>
          </Tooltip>
        </div>
      )}
      {!disabled && (
        <Tooltip title="Save Changes">
          <div className={classes.saveBtn}>
            <Fab
              color="primary"
              onClick={() =>
                onSave({ ...updatedActivity, exec_order: execOrder })
              }
              disabled={isEqual(selectedActivity, updatedActivity)}
            >
              <Icon>save</Icon>
            </Fab>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

GVS.propTypes = {
  currentProject: PropTypes.object,
  titles: PropTypes.arrayOf(PropTypes.object),
  selectedActivity: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
GVS.defaultProps = {
  currentProject: {},
  titles: undefined,
  selectedActivity: {},
  disabled: false,
};

const WithProvider = props => (
  <ApolloProvider client={setupApollo('gvs')}>
    <GVS {...props} />
  </ApolloProvider>
);

export default WithProvider;
