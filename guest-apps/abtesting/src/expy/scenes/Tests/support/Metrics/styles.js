import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  metric: {
    marginRight: theme.spacing(4),
  },
  badge: {
    backgroundColor: theme.palette.grey[300],
    padding: '2px 4px',
    fontSize: '10px',
    lineHeight: '11px',
    borderRadius: '3px',
    textAlign: 'center',
    marginRight: theme.spacing(0.5),
  },
  badgeClickable: {
    border: 0,
    cursor: 'pointer',
  },
  badgeInActive: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[500],
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    color: '#000',
  },
  dot: {
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    marginRight: theme.spacing(1),
  },
  number: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginRight: theme.spacing(0.75),
  },
  heading: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '11px',
  },
  live: {
    backgroundColor: theme.palette.statuses.live.main,
  },
  proposal: {
    backgroundColor: theme.palette.statuses.proposal.main,
  },
  done: {
    backgroundColor: theme.palette.statuses.done.main,
  },
}));
