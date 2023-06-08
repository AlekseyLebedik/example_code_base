import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  loadingContainer: {
    height: '80vh',
  },
  root: {
    overflow: 'auto',
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  header: {
    fontSize: '2.25rem',
  },
  backBtn: {
    marginBottom: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(3),
  },
}));
