import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#FFF',
    borderRadius: '4px',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '4px',
    display: 'inline-block',
  },
  circle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[700],
  },
  green: {
    backgroundColor: theme.palette.statuses.approved.light,
  },
  grey: {
    backgroundColor: theme.palette.grey[300],
    padding: '0.525rem 0.825rem',
  },
  red: {
    backgroundColor: theme.palette.statuses.denied.light,
  },
  title: {
    fontWeight: 700,
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    marginBottom: 0,
    marginLeft: theme.spacing(1),
  },
  value: {
    fontWeight: 700,
    marginBottom: 0,
  },
}));
