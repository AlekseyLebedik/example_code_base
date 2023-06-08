import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    opacity: '0.5',
  },
  spinner: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
  },
  image: {
    top: '20px',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },
}));
