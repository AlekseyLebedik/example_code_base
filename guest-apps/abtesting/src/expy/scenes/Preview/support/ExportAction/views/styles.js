import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '600px',
  },
  container: {
    textAlign: 'center',
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  name: {
    fontWeight: 700,
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  id: {
    fontWeight: 700,
  },
  viewBtn: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  noBtn: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    color: theme.palette.error.main,
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));
