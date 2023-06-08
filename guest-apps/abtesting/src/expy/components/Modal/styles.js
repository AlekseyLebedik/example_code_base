import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '3px',
    padding: '60px 40px 40px 40px',
  },
  closeBtn: {
    position: 'absolute',
    right: '0',
    top: '15px',
    textAlign: 'right',
    paddingRight: '15px',
  },
}));
