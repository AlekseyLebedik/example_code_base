import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(0.5),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    borderRadius: '4px',
    width: '100%',
    '&:hover': {
      background: theme.palette.grey[300],
    },
  },
  button: {
    padding: 0,
  },
  title: {
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(1),
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));
