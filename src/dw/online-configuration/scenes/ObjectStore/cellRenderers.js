import React from 'react';

import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import DDLEditor from './components/DDLEditor';

const useStyles = makeStyles(theme => ({
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  badge: {
    right: 12,
    top: 12,
    fontSize: '9px',
    height: 13,
    minWidth: 13,
  },
}));

export const categoryRenderer = params => {
  if (params.data) {
    return params.data.category === null ? 'N/A' : params.data.category;
  }
  return '';
};

export const downloadRenderer = React.forwardRef((params, ref) => {
  const isDDLEnabled = useSelector(
    state =>
      state.Components.App?.servicesAvailability?.find(
        service => service.name === SERVICE_NAMES.DDL_TRANSLATION
      )?.configured
  );
  const classes = useStyles();
  if (params.data) {
    const {
      context: { onDownload, onRestore, formatDateTime },
      data: { name, backups, created, origCreated, objectVersion },
    } = params;
    const isMaster = backups !== undefined;
    let restoreTooltip;
    let restoreDisabled = false;
    if (isMaster) {
      if (backups === null) {
        restoreDisabled = true;
        restoreTooltip = `${name} is not configured for backups`;
      } else {
        restoreTooltip = 'Click to view backups';
      }
    }
    return (
      <div ref={ref}>
        <Tooltip title="Download" placement="top">
          <IconButton
            data-cy="objectStoreFileDownloadButton"
            onClick={() =>
              onDownload(
                name,
                backups === undefined ? objectVersion : undefined
              )
            }
          >
            <Icon>file_download</Icon>
          </IconButton>
        </Tooltip>
        {isMaster ? (
          <Tooltip title={restoreTooltip} placement="top">
            <span>
              <Badge
                color="primary"
                badgeContent={backups && backups.length}
                invisible={restoreDisabled}
                classes={{ badge: classes.badge }}
              >
                <IconButton
                  onClick={() =>
                    params.api
                      .getDisplayedRowAtIndex(params.node.rowIndex)
                      .setExpanded(!params.node.expanded)
                  }
                  disabled={restoreDisabled}
                >
                  <Icon>restore</Icon>
                </IconButton>
              </Badge>
            </span>
          </Tooltip>
        ) : (
          <ConfirmActionComponent
            confirm={{
              title: 'Confirm Restore',
              confirmMsg: (
                <div key="dialogDiv">
                  Are you sure you want to replace <br />
                  <strong>{name}</strong> created on{' '}
                  <strong>{formatDateTime(origCreated)}</strong>
                  <br />
                  with backup
                  <br />
                  <strong>{name}</strong> created on{' '}
                  <strong className={classes.primary}>
                    {formatDateTime(created)}
                  </strong>
                  <br />
                  You will <strong className={classes.secondary}>not</strong> be
                  able to undo this operation.
                </div>
              ),
              mainButtonLabel: 'Restore',
              destructive: false,
            }}
            component="IconButton"
            tooltipProps={{ title: 'Restore', placement: 'top' }}
            onClick={() => onRestore(name, objectVersion)}
          >
            restore
          </ConfirmActionComponent>
        )}
        {isDDLEnabled && (
          <DDLEditor data={params.data} api={params.api} node={params.node} />
        )}
      </div>
    );
  }
  return '';
});

export const extraRenderer = params =>
  params.data && params.data.extraData ? params.data.extraData : 'N/A';

export const pooledTagCountRenderer = React.forwardRef((params, ref) => {
  if (params.data) {
    const {
      data: { tags },
    } = params;

    const tagsLen = tags && tags.length;

    return <div ref={ref}>{tagsLen || 0}</div>;
  }
  return '';
});

export const pooledOwnerCountRenderer = React.forwardRef((params, ref) => {
  if (params.data) {
    const {
      data: { owners },
    } = params;

    const ownersLen = owners && owners.length;

    return <div ref={ref}>{ownersLen || 0}</div>;
  }
  return '';
});
