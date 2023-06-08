import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  btnContainer: {
    marginBottom: theme.spacing(2),
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  attachBtn: {
    marginRight: theme.spacing(1),
  },
  container: {
    marginBottom: theme.spacing(2),
  },
  subheading: {
    marginBottom: theme.spacing(1),
  },
  textInput: {
    padding: theme.spacing(0.5),
    '&:hover': {
      background: theme.palette.grey[300],
      width: '100%',
      cursor: 'pointer',
    },
  },
}));
