import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    background: theme.palette.primary.main,
    color: '#fff',
    cursor: 'pointer',
    border: 'transparent',
    borderRadius: '4px',
    padding: `2px ${theme.spacing(0.5)}px`,
    '&:disabled': {
      opacity: '0.6',
      cursor: 'not-allowed',
    },
  },
}));
