import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  select: {
    width: '100%',
    '& .abtesting-MuiSelect-select:focus': {
      backgroundColor: '#FFF',
    },
  },
  selectItem: {
    width: '100% !important',
  },
  btnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
  submitBtn: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  errorText: {
    fontSize: '0.8571428571428571rem',
    color: theme.palette.error.main,
    marginLeft: '14px',
    marginTop: '3px',
  },
}));
