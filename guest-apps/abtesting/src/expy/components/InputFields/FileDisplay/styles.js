import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    borderRadius: '1px',
    background: `linear-gradient(135deg, ${theme.palette.grey[300]} 0%, ${theme.palette.grey[300]} 90%, transparent 90%, transparent 100%)`,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  name: {
    display: 'flex',
  },
  btnContainer: {
    marginTop: theme.spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));
