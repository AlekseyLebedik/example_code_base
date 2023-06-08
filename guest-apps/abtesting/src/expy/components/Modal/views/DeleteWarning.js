import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'dw/core/axios';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { fetchAllTests } from '../../../scenes/Table/helpers';
import { closeModal } from '../state/actions';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(1),
  },
  noBtn: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    color: theme.palette.error.main,
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const DeleteWarning = props => {
  const classes = useStyles();
  const history = useHistory();
  const { activeTestId } = props;

  const dispatch = useDispatch();

  const [error, setError] = useState();

  const setDashboardScreen = () => history.push(`/abtesting/expy/test-catalog`);

  const onConfirmDelete = async () => {
    try {
      axios.delete(`/expy/v1/tests/${activeTestId}`);
      setDashboardScreen();
      dispatch(fetchAllTests());
      dispatch(closeModal());
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Delete error: ', err);
      setError('Error on delete. Please try again.');
    }
  };

  return (
    <Container className={classes.container} justify="center" align="center">
      <Typography variant="h5" component="h3">
        Delete
      </Typography>
      <p>Are you sure you want to delete this test?</p>
      <Button
        className={classes.noBtn}
        variant="contained"
        color="primary"
        onClick={() => dispatch(closeModal())}
      >
        Whoops, nope
      </Button>
      <Button variant="outlined" color="primary" onClick={onConfirmDelete}>
        Yes!
      </Button>
      {error && <div className={classes.error}>{error}</div>}
    </Container>
  );
};

DeleteWarning.propTypes = {
  activeTestId: PropTypes.string.isRequired,
};

export default DeleteWarning;
