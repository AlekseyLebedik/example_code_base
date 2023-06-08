import { StyleRules, Theme } from '@material-ui/core';
import styles from 'playpants/components/ScheduleComponent/styles';
import { CSSProperties } from 'react';
import { CONFLICT_LEVELS } from './constants';

export default (theme: Theme): StyleRules<string, CSSProperties> => ({
  ...(styles(theme) as StyleRules<string, CSSProperties>),
  ...(Object.assign(
    {},
    ...CONFLICT_LEVELS.map(conflictLevel => ({
      [`conflict-${conflictLevel}`]: {
        backgroundColor: `${
          theme.conflicts.palette[conflictLevel]?.toString() || ''
        } !important`,
      },
    }))
  ) as StyleRules<string, CSSProperties>),

  activityAvatar: {
    color: '#fff !important',
    backgroundColor: theme.eventManager.bg.active,
    height: `${theme.spacing(4)}px !important`,
    width: `${theme.spacing(4)}px !important`,
    border: '2px solid #fff',
    marginLeft: '0 !important',
  },

  activityChip: {
    height: theme.spacing(3),
    justifyContent: 'flex-start !important',
    minWidth: '0 !important',
  },

  chipContainer: {
    marginTop: '-10px',
  },

  conflictsSummaryLinks: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '200px',
    overflowY: 'scroll',
    padding: '0px 0px 10px 25px',
  },

  confirmProceed: {
    paddingLeft: '7px',
  },

  confirmProceedCheckbox: {
    color: theme.conflicts.palette.conflictToggleBlock,
  },

  eventSummaryDivider: {
    margin: `0px 68px`,
  },

  eventSummaryStatusDot: {
    borderRadius: '50%',
    marginRight: theme.spacing(),
    width: theme.spacing(),
    height: theme.spacing(),
    margin: 'auto',
  },

  eventSummaryTitleContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  eventSummaryTitleIcon: {
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginTop: '3px',
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },

  fetchErrorIcon: {
    color: theme.eventManager.palette.red,
  },

  fetchErrorItem: {
    cursor: 'pointer',
  },

  iconButton: {
    top: '-6px',
  },

  taskStatus: {
    display: 'in-line',
  },

  story: {
    display: 'in-line',
    paddingLeft: '16px !important',
  },

  newTabIcon: {
    fontSize: '12px',
    marginBottom: 'auto',
    marginLeft: '4px',
  },

  statusGridContainer: {
    flexGrow: 1,
    flexBasis: 0,
    marginTop: 'auto',
  },
});
