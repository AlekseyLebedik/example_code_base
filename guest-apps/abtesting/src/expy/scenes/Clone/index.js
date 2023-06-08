import React, { useState, useEffect } from 'react';
import axios from 'dw/core/axios';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';

import Loading from 'dw/core/components/Loading';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Form from '../../components/Form';
import { validationSchema } from '../../components/Form/validationSchema';

import { useStyles } from './styles';

const Clone = () => {
  const classes = useStyles();
  const history = useHistory();
  const { testId } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    title: '',
    status: '',
    summary: '',
    hypothesis: '',
    moreUrl: '',
    kpi: '',
    dateStart: null,
    dateEnd: null,
    treatments: [],
    approvers: [],
    categories: [],
    owner: '',
    responsibilities: '',
  });
  const [pending, setPending] = useState(true);
  const [error, setSubmitError] = useState();

  const fetchTest = async ({ testId: id }) => {
    const response = await axios.get(`/expy/v1/tests/${id}`);
    const { data } = response;
    setFormData(data);
    setPending(false);
  };

  useEffect(() => {
    if (testId) fetchTest({ testId });
  }, [testId]);

  const setDesignScreen = ({ id }) =>
    history.push(`/abtesting/expy/test-catalog/${id || testId}`);

  const handleSubmit = async values => {
    const response = await axios.post('/expy/v1/tests/', { ...values });
    if (response.hasOwnProperty('error'))
      return setSubmitError('Could not clone test. Try again.');

    const { data } = response;
    return setDesignScreen({ id: data.test.id });
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
          <h2 className={classes.header}>Clone Proposal</h2>
          <Formik
            enableReinitialize
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {props => (
              <Form
                {...props}
                onCancel={setDesignScreen}
                submitBtnText="Clone"
              />
            )}
          </Formik>
          {error && <div className={classes.error}>{error}</div>}
        </div>
      </Container>
    </div>
  );
};

export default Clone;
