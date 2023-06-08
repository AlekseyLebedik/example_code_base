import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  loadingContainer: {
    paddingTop: theme.spacing(1),
    height: '80vh',
  },
  nameContainer: {
    width: '65%',
    marginBottom: theme.spacing(1),
  },
  name: {
    fontWeight: 'bold',
  },
  actions: {
    marginTop: theme.spacing(2),
  },
  actionBtn: {
    marginRight: theme.spacing(1),
    marginBottom: '5px',
    fontSize: '11px',
    '&:hover': {
      color: '#000',
    },
  },
  slackBtn: {
    marginBottom: theme.spacing(2),
  },
  date: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  kpi: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  type: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  moreActionBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    border: 'none',
    padding: '0px',
    '&:hover': {
      color: '#000',
      backgroundColor: 'transparent',
    },
  },
}));
