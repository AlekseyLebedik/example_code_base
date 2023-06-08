import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    border: `1px solid ${theme.palette.grey[300]}`,
    background: theme.palette.grey[100],
    borderRadius: '4px',
  },
}));
