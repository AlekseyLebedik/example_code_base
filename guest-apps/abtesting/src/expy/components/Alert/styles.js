import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    padding: '5px',
    borderRadius: '4px',
    border: '3px transparent solid',
    backgroundColor: '#FFF',
    marginBottom: '1rem',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'end',
  },
  title: {
    fontWeight: 700,
    marginBottom: '0px',
  },
  description: {
    marginTop: '5px',
    marginLeft: '26px',
    marginBottom: '0px',
    color: '#000',
  },
  icon: {
    marginLeft: '5px',
    marginRight: '7px',
  },
  denied: {
    borderLeftColor: theme.palette.statuses.denied.main,
  },
  approved: {
    borderLeftColor: theme.palette.statuses.approved.main,
  },
  pending: {
    borderLeftColor: theme.palette.statuses.pending.main,
  },
  info: {
    borderLeftColor: theme.palette.statuses.info.main,
  },
}));
