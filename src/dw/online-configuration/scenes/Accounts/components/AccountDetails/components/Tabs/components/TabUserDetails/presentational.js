import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ACCOUNTS_RESET_STATS,
  ACCOUNTS_CHANGE_REPUTATION,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import Profile from './components/Profile';
import styles from './presentational.module.css';

const TabUserDetailsStateless = props => {
  const {
    profiles: { private: privateProfileSource, public: publicProfileSource },
    reputation,
    onDelete,
    onDeleteProfile,
    userID,
  } = props;
  const [score, changeScore] = useState(reputation.score);
  const [editable, toggleEditable] = useState(false);
  const [submitting, setSubmit] = useState(false);
  const [error, setError] = useState(undefined);
  const canResetProfile = useCurrentEnvPermission(ACCOUNTS_RESET_STATS);
  const canChangeReputation = useCurrentEnvPermission(
    ACCOUNTS_CHANGE_REPUTATION
  );
  const scoreValue = score || reputation.score;
  return (
    <div className={styles.container}>
      <Typography variant="subtitle1">
        Reputation
        {canChangeReputation && (
          <>
            <Tooltip title={editable ? 'Cancel Editing' : 'Edit Reputation'}>
              <IconButton
                onClick={() => {
                  changeScore(reputation.score);
                  toggleEditable(!editable);
                }}
                disabled={submitting}
              >
                <Icon>{editable ? 'cancel' : 'edit'}</Icon>
              </IconButton>
            </Tooltip>
            {editable && (
              <Tooltip title="Apply Changes">
                <IconButton
                  onClick={() => {
                    new Promise((resolve, reject) => {
                      setSubmit(true);
                      reputation.onChange(score, resolve, reject);
                    })
                      .then(() => {
                        setSubmit(false);
                        toggleEditable(false);
                      })
                      .catch(e => {
                        setSubmit(false);
                        setError(e.score);
                      });
                  }}
                  disabled={submitting}
                >
                  <Icon>save</Icon>
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </Typography>
      <div className={styles.reputationContainer}>
        <div>Score:</div>
        <div className={styles.reputation}>
          {editable ? (
            <TextField
              value={score}
              onChange={e => changeScore(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          ) : (
            scoreValue
          )}
        </div>
      </div>
      {canResetProfile && (
        <ConfirmActionComponent
          tooltip="Reset Profiles"
          className={styles.deleteProfileBtn}
          confirm={{
            title: 'Confirm Reset',
            confirmMsg: 'Are you sure you want to reset these profiles?',
            mainButtonLabel: 'Reset',
            destructive: true,
          }}
          component="IconButton"
          onClick={() => onDeleteProfile(userID)}
        >
          delete
        </ConfirmActionComponent>
      )}
      <Profile
        key="private"
        profileType="private"
        data={privateProfileSource}
        onDelete={onDelete}
        canResetProfile={canResetProfile}
      />
      <Profile
        key="public"
        profileType="public"
        data={publicProfileSource}
        onDelete={onDelete}
        canResetProfile={canResetProfile}
      />
    </div>
  );
};

TabUserDetailsStateless.propTypes = {
  profiles: PropTypes.shape({
    private: PropTypes.arrayOf(PropTypes.object),
    public: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  reputation: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteProfile: PropTypes.func.isRequired,
  userID: PropTypes.string,
};

TabUserDetailsStateless.defaultProps = {
  userID: undefined,
};

export default TabUserDetailsStateless;
