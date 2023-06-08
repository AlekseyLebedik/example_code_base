import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { closeModal } from '../../../../../components/Modal/state/actions';
import { getDWTestUrl } from '../helpers';

import { useStyles } from './styles';

const SuccessABTesting = ({ testId, title }) => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <Container className={classes.root}>
      <div className={classes.container}>
        <h3 className={classes.heading}>Success!</h3>
        <p className={classes.description}>
          Your test was created successfully. The id is:{' '}
          <span className={classes.id}>{testId}</span>.
        </p>
        <Button
          className={classes.viewBtn}
          variant="contained"
          color="primary"
          onClick={() => {
            const url = getDWTestUrl({
              dwTestId: testId,
              title,
            });
            history.push(url);
            dispatch(closeModal());
          }}
        >
          View Test
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dispatch(closeModal())}
        >
          Close
        </Button>
      </div>
    </Container>
  );
};

SuccessABTesting.propTypes = {
  testId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SuccessABTesting;
