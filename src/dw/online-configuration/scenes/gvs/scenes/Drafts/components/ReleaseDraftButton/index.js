import React, { useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  generatePath,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { GVS_PUBLISH_CONFIGURATION } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission, useSnackbar } from 'dw/core/hooks';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import {
  useDrafts,
  useReleaseDraft,
  useRefreshConfigQueries,
} from 'dw/online-configuration/scenes/gvs/graphql/hooks';
import { ERROR_MSG } from 'dw/online-configuration/constants';
import { gvsUrlPattern } from 'dw/online-configuration/scenes/gvs/constants';
import { CurrentDraftContext } from 'dw/online-configuration/scenes/gvs/context';
import { CONFLICT_MSG, SUCCESS_MSG } from './constants';

const useStyles = makeStyles(theme => ({
  settingsRoot: {
    marginTop: theme.spacing(3),
  },
  settingsHeader: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ReleaseDraftButton = ({ OCCToken, refetchDraftDetails }) => {
  const classes = useStyles();
  const snackbar = useSnackbar();
  const { draftId } = useParams();
  const [, setCurrentDraftId] = useContext(CurrentDraftContext);
  const [comment, setComment] = useState('');
  const [sendPushMessage, setSendPushMessage] = useState(true);
  const releaseDraftMutation = useReleaseDraft();
  const { drafts } = useDrafts();
  const draftName = useMemo(() => {
    if (!drafts) return null;
    const { name } = drafts.find(d => d.id === draftId) || {};
    return name;
  }, [drafts, draftId]);
  const defaultComment = useMemo(
    () => `Releasing the draft ${draftName}`,
    [draftName]
  );
  const setRefetchQueries = useRefreshConfigQueries();

  // Redirect to the configuration after draft has been released
  const match = useRouteMatch(gvsUrlPattern);
  const history = useHistory();
  const redirect = useCallback(() => {
    history.push(
      generatePath(gvsUrlPattern, {
        ...match.params,
        scene: 'configuration',
      })
    );
  }, [match, history]);

  const onRelease = useCallback(async () => {
    try {
      const {
        data: {
          gvsReleaseDraft: { statusCode, body },
        },
      } = await releaseDraftMutation(
        draftId,
        OCCToken,
        comment || defaultComment,
        sendPushMessage
      );
      if (statusCode === 409) {
        refetchDraftDetails.current();
        snackbar.error(CONFLICT_MSG);
        return;
      }
      if (statusCode !== 201) {
        throw new Error(body);
      }
      setCurrentDraftId(null);
      setRefetchQueries();
      setTimeout(redirect, 200);
      snackbar.success(SUCCESS_MSG);
    } catch (err) {
      // eslint-disable-next-line
      console.log(String(err));
      snackbar.error(ERROR_MSG);
    }
  }, [
    snackbar,
    releaseDraftMutation,
    draftId,
    OCCToken,
    comment,
    defaultComment,
    setRefetchQueries,
    redirect,
    sendPushMessage,
    setCurrentDraftId,
  ]);
  const publishConfigurationPermission = useCurrentEnvPermission([
    GVS_PUBLISH_CONFIGURATION,
  ]);
  return publishConfigurationPermission ? (
    <ConfirmActionComponent
      onClick={onRelease}
      confirm={{
        title: 'Confirm Release',
        confirmMsg: (
          <>
            <p>Are you sure you want to Release the draft {draftName}?</p>
            <TextField
              label="Comment describing release"
              InputLabelProps={{ shrink: true }}
              placeholder={defaultComment}
              value={comment}
              onChange={e => setComment(e.target.value)}
              fullWidth
            />
            <div className={classes.settingsRoot}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<Icon>expand_more</Icon>}
                  aria-controls="advanced-content"
                  id="advanced-header"
                >
                  <Typography className={classes.settingsHeader}>
                    Advanced Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendPushMessage}
                        onChange={event =>
                          setSendPushMessage(event.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Send Push Message"
                  />
                </AccordionDetails>
              </Accordion>
            </div>
          </>
        ),
        variant: 'warning',
        mainButtonLabel: 'Release',
      }}
      tooltip={
        OCCToken
          ? 'Release Draft'
          : 'You need to review draft diff before release'
      }
      component="IconButton"
      disabled={!OCCToken}
    >
      call_merge
    </ConfirmActionComponent>
  ) : null;
};

ReleaseDraftButton.propTypes = {
  OCCToken: PropTypes.string,
  refetchDraftDetails: PropTypes.object.isRequired,
};

ReleaseDraftButton.defaultProps = {
  OCCToken: null,
};

export default ReleaseDraftButton;
