import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SuccessABTesting from './SuccessABTesting';
import {
  closeModal,
  setModalView,
} from '../../../../../components/Modal/state/actions';
import { addDWTest, getTestTitle, getInvalidFieldsErrorMsg } from '../helpers';

import { useStyles } from './styles';

const ExportABTesting = ({ test }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      const testId = await addDWTest(test);
      setIsLoading(false);
      dispatch(
        setModalView({
          view: SuccessABTesting,
          props: { testId, title: getTestTitle({ title: test.title }) },
        })
      );
    } catch (err) {
      const message = getInvalidFieldsErrorMsg(err);
      setIsLoading(false);
      setError(message);
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.container}>
        <h3 className={classes.heading}>Create an AB Test</h3>
        <p className={classes.description}>
          Are you sure you want to create an AB Test from{' '}
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
          onClick={onConfirm}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? 'Sending...' : 'Yes!'}
        </Button>
        {error && <div className={classes.error}>{error}</div>}
      </div>
    </Container>
  );
};

ExportABTesting.propTypes = {
  test: PropTypes.object.isRequired,
};

export default ExportABTesting;
