import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import Loading from 'dw/core/components/Loading';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Form from '../../components/Form';
import { validationSchema } from '../../components/Form/validationSchema';

import { fetchTest, updateTest } from './helpers';

import { useStyles } from './styles';

const Edit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();
  const { testId } = useParams();

  const [error, setSubmitError] = useState();

  const pending = useSelector(state => state.Expy.edit.pending);
  const formValues = useSelector(state => state.Expy.edit.data);

  const getTest = async () => {
    if (!testId) return;

    try {
      dispatch(fetchTest({ testId }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
    }
  };

  useEffect(() => {
    getTest();
  }, []);

  const setDesignScreen = () =>
    history.push(`/abtesting/expy/test-catalog/${testId}`);

  const handleSubmit = async values => {
    const response = await updateTest({ values, testId });
    if (response.hasOwnProperty('status') && response.status === 'success') {
      return setDesignScreen();
    }
    return setSubmitError('Could not save changes. Try again.');
  };

  if (pending)
    return (
      <div className={classes.loadingContainer}>
        <Loading />
      </div>
    );

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.container}>
          <Button
            className={classes.backBtn}
            variant="outlined"
            color="primary"
            onClick={setDesignScreen}
            size="small"
          >
            Back
          </Button>
          <h2 className={classes.header}>Edit Proposal</h2>
          <Formik
            enableReinitialize
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {props => (
              <Form
                {...props}
                onCancel={setDesignScreen}
                submitBtnText="Save Changes"
              />
            )}
          </Formik>
          {error && <div className={classes.error}>{error}</div>}
        </div>
      </Container>
    </div>
  );
};

export default Edit;
