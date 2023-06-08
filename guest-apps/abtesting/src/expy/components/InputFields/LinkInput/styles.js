import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  btnContainer: {
    display: 'flex',
    justifyContent: 'end',
    width: '100%',
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
}));
