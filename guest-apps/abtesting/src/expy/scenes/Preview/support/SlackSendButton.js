import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    maxWidth: '100%',
    width: '100%',
  },
  initial: {
    '&:hover': {
      backgroundColor: '#008376',
    },
  },
  success: {
    '&:hover': {
      backgroundColor: '#008376',
    },
  },
}));

const SlackSendButton = ({ buttonStatus, disabled, onClick, children }) => {
  const classes = useStyles();

  const renderButton = () => {
    switch (buttonStatus) {
      case 'initial':
        return (
          <Button
            disabled={disabled}
            color="primary"
            variant="contained"
            className={cn(classes.button, classes.initial)}
            onClick={onClick}
          >
            {children}
          </Button>
        );
      case 'success':
        return (
          <Button
            className={cn(classes.button, classes.success)}
            color="primary"
            variant="contained"
            startIcon={<CheckCircleOutlineIcon size={15} />}
          >
            Success!
          </Button>
        );
      case 'sending':
        return (
          <Button
            disabled
            className={cn(classes.button)}
            variant="contained"
            color="primary"
            startIcon={<CircularProgress color="inherit" size={15} />}
          >
            Sending...
          </Button>
        );
      case 'error':
        return (
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
          >
            Failed
          </Button>
        );
      default:
        return (
          <Button
            disabled={disabled}
            color="primary"
            className={cn(classes.button, classes.initial)}
            onClick={onClick}
            variant="contained"
          >
            {children}
          </Button>
        );
    }
  };

  return renderButton();
};

export default SlackSendButton;
