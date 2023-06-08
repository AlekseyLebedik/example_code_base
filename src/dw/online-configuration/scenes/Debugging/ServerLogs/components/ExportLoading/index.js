import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: `${theme.zIndex.drawer + 1} !important`,
    color: '#fff',
  },
}));

const ExportLoading = ({ exportIsLoading }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={exportIsLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

ExportLoading.propTypes = {
  exportIsLoading: PropTypes.bool.isRequired,
};

export default ExportLoading;
