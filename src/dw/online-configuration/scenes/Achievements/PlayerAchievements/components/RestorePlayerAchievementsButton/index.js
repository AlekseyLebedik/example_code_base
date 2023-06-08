import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import {
  useCancellablePromise,
  useCurrentEnvPermission,
  useSnackbar,
} from 'dw/core/hooks';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import {
  getBackupPlayerAchievements as getBackupPlayerAchievementsAPI,
  restorePlayerAchievements as restorePlayerAchievementsAPI,
} from 'dw/online-configuration/services/achievements';

import { CLONE_PLAYER_ACHIEVEMENTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

const useStyles = theme => ({
  restoreContainer: {
    margin: '0px 5px 0px 0px !important',
    minWidth: '40px',
  },
  restoreButton: {
    ...theme.grayButton,
  },
  restoreIcon: {
    color: 'white',
  },
});

const RestorePlayerAchievementsButton = ({
  playerId,
  onRefresh,
  setCreatingBackup,
  backupCreated,
  classes,
}) => {
  const [hasBackup, setHasBackup] = useState(false);
  const [restoreDate, setRestoreDate] = useState(undefined);
  const { AE: endpoints } = ServiceEndpoints;
  const canCloneAchievements = useCurrentEnvPermission(
    CLONE_PLAYER_ACHIEVEMENTS
  );
  const formatDateTime = useSelector(formatDateTimeSelector);
  const snackbarActions = useSnackbar();

  const cancellablePromise = useCancellablePromise();
  const fetchPlayerAchievementsBackup = useCallback(
    async (id, context) => {
      try {
        const {
          data: { backup, date },
        } = await cancellablePromise(getBackupPlayerAchievementsAPI, id, {
          context,
        });
        setHasBackup(backup);
        setRestoreDate(formatDateTime(date));
      } catch (e) {
        // promise.cancel() might be called
      }
    },
    [cancellablePromise]
  );

  const backupContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: endpoints.backupUserInventory,
    })
  );
  const restoreContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: endpoints.restoreUserInventory,
    })
  );

  useEffect(() => {
    if (canCloneAchievements && backupContext) {
      fetchPlayerAchievementsBackup(playerId, backupContext);
    }
    if (backupCreated) setCreatingBackup(false);
  }, [canCloneAchievements, playerId, backupContext, backupCreated]);

  const restorePlayerAchievements = async (id, context, backupCxt) => {
    try {
      await restorePlayerAchievementsAPI(id, { context });
      onRefresh('table');
      onRefresh('userState');
      fetchPlayerAchievementsBackup(id, backupCxt);
      snackbarActions.success('Achievements restored successfully');
    } catch (e) {
      const {
        response: { data },
      } = e;
      snackbarActions.error(data?.error?.msg);
    }
  };

  return (
    <div
      className={classNames({
        [classes.restoreContainer]: canCloneAchievements,
      })}
    >
      {canCloneAchievements && hasBackup && (
        <ConfirmActionComponent
          component="fab"
          onClick={() =>
            restorePlayerAchievements(playerId, restoreContext, backupContext)
          }
          confirm={{
            title: 'Confirm Restore',
            confirmMsg: `Are you sure you want to restore this player's achievements to ${restoreDate}?`,
            mainButtonLabel: 'Restore',
          }}
          iconClassName={classes.restoreIcon}
          className={classes.restoreButton}
          tooltip="Restore this Player's Achievements"
          size="small"
        >
          restore
        </ConfirmActionComponent>
      )}
    </div>
  );
};

RestorePlayerAchievementsButton.propTypes = {
  playerId: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onRefresh: PropTypes.func.isRequired,
  setCreatingBackup: PropTypes.func,
  backupCreated: PropTypes.bool,
};

RestorePlayerAchievementsButton.defaultProps = {
  playerId: undefined,
  setCreatingBackup: undefined,
  backupCreated: undefined,
};

export default withStyles(useStyles)(RestorePlayerAchievementsButton);
