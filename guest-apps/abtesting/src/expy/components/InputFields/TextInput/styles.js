import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  editContainer: {
    '& .easy-edit-component-wrapper': {
      width: '100%',
    },
    '& .easy-edit-button-wrapper': {
      float: 'right',
      display: 'block',
    },
  },
  textHoverClass: {
    fontStyle: 'none',
    background: theme.palette.grey[300],
    width: '100%',
    cursor: 'pointer',
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
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
  },
  cancelBtn: {
    marginTop: theme.spacing(1),
    background: 'transparent',
    cursor: 'pointer',
    border: 'transparent',
    padding: `0px ${theme.spacing(1)}px`,
  },
  error: {
    border: `2px solid ${theme.palette.error.main}`,
    borderRadius: '4px',
  },
}));
