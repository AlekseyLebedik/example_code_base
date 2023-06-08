import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: `${theme.zIndex.tooltip + 1} !important`,
    color: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const IsLoading = ({ open, MsgComponent }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <div className={classes.container}>
        <CircularProgress color="inherit" />
        {MsgComponent && <MsgComponent />}
      </div>
    </Backdrop>
  );
};
IsLoading.propTypes = {
  open: PropTypes.bool.isRequired,
  MsgComponent: PropTypes.node,
};

IsLoading.defaultProps = {
  MsgComponent: undefined,
};

export default IsLoading;
