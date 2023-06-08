import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  editContainer: {
    '& .easy-edit-button-wrapper': {
      textAlign: 'right',
      display: 'block',
    },
  },
  saveBtn: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    background: theme.palette.primary.main,
    color: '#fff',
    cursor: 'pointer',
    border: 'transparent',
    borderRadius: '4px',
    padding: `2px ${theme.spacing(0.5)}px`,
  },
  cancelBtn: {
    marginTop: theme.spacing(1),
    background: 'transparent',
    cursor: 'pointer',
    border: 'transparent',
    padding: `2px ${theme.spacing(0.5)}px`,
  },
  textHoverClass: {
    fontStyle: 'none',
    background: theme.palette.grey[300],
    width: '100%',
    cursor: 'pointer',
  },
  error: {
    border: `2px solid ${theme.palette.error.main}`,
    borderRadius: '4px',
  },
}));
