import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  dropzone: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '0',
    border: `1px dashed ${theme.palette.grey[400]}`,
    backgroundColor: '#FFFFFF',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: '100%',
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  heading: {
    color: theme.palette.grey[800],
    marginBottom: theme.spacing(1),
    fontSize: '18px',
  },
  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.grey[800],
  },
  warning: {
    color: theme.palette.grey[800],
    fontWeight: 700,
    marginTop: theme.spacing(1),
  },
  imageContainer: {
    backgroundColor: '#FFF',
    border: `1px solid ${theme.palette.grey[400]}`,
    textAlign: 'center',
  },
  imageContainerBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  deleteImage: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  image: {
    marginTop: theme.spacing(3),
    maxWidth: '100%',
  },
  pdf: {
    marginTop: theme.spacing(3),
  },
}));
