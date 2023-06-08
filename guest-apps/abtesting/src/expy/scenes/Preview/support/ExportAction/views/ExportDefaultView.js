import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import find from 'lodash/find';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { closeModal } from '../../../../../components/Modal/state/actions';
import { TEST_TYPES } from '../../../../../constants';

import { useStyles } from './styles';

const ExportDefaultView = ({ test, onConfirm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const type = find(TEST_TYPES, { id: test.type }).pretty_name;

  const onClick = async () => {
    try {
      setIsLoading(true);
      await onConfirm({ test });
      setIsLoading(false);
      dispatch(closeModal());
    } catch (err) {
      setIsLoading(false);
      setError('Error. Please try again.');
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.container}>
        <h3 className={classes.heading}>{`Create a ${type} Test`}</h3>
        <p className={classes.description}>
          This will enable automated statistics tracking and reporting features.
          {' \n'}
          Are you sure you want to create a test from{' '}
          <span className={classes.name}>{test.name}</span>?
        </p>
        <Button
          className={classes.noBtn}
          variant="contained"
          color="primary"
          onClick={() => dispatch(closeModal())}
        >
          Whoops, nope
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onClick}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? 'Sending...' : 'Yes!'}
        </Button>
        {error && <div className={classes.error}>{error}</div>}
      </div>
    </Container>
  );
};

ExportDefaultView.propTypes = {
  test: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ExportDefaultView;
