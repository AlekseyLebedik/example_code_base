import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  button: {
    background: 'transparent',
    cursor: 'pointer',
    border: 'transparent',
    padding: `2px ${theme.spacing(0.5)}px`,
  },
}));
