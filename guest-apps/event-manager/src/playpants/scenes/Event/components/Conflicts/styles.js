import { CONFLICT_TYPES } from 'playpants/constants/conflicts';

export default theme => ({
  'all-conflict-types': {
    color: theme.conflicts.palette['all-conflict-types'],
  },
  ...Object.assign(
    {},
    ...Object.keys(CONFLICT_TYPES).map(conflictType => ({
      [conflictType]: {
        color: theme.conflicts.palette[conflictType],
      },
    }))
  ),
  ...Object.assign(
    {},
    ...Object.keys(CONFLICT_TYPES).map(conflictType => ({
      [`${conflictType}-list-item`]: {
        borderLeft: `7px solid ${theme.conflicts.palette[conflictType]} !important`,
        borderBottom: 'none !important',
      },
    }))
  ),
  activityConflictContainer: {
    borderRadius: '0px',
    boxShadow: 'none',
  },
  activityConflictField: {
    color: 'rgba(0, 0, 0, 0.75) !important',
  },
  activityConflictFieldInConflict: {
    color: `${theme.conflicts.palette['activity-title-conflict']} !important`,
  },
  activityConflictInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activitySeverityIcon: {
    marginRight: '8px',
  },
  activityConflictTitles: {
    marginTop: '-16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activityConflictTitlesLabel: {
    color: 'rgba(0, 0, 0, 0.75) !important',
  },
  activityConflictTitlesLabelHidden: {
    color: 'rgba(0, 0, 0, 0.0) !important',
  },
  conflictTableCell: {
    backgroundColor: '#ffebee',
    fontWeight: '500',
  },
  selectableConflictType: {
    paddingLeft: '10px',
  },
});
