import React, { useState } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Form from '../../components/Form';
import { validationSchema } from '../../components/Form/validationSchema';

import { createTest } from './helpers';

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  header: {
    fontSize: '2.25rem',
  },
  error: {
    color: theme.palette.error.main,
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(3),
  },
}));

const Create = () => {
  const classes = useStyles();
  const history = useHistory();

  const [error, setSubmitError] = useState();

  const onCancelCreate = e => {
    e.preventDefault();
    history.push(`/abtesting/expy/test-catalog`);
  };

  const handleSubmit = async values => {
    try {
      const { test } = await createTest({ values });
      history.push(`/abtesting/expy/test-catalog/${test.id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Create error: ', err);
      setSubmitError('Error on create. Please try again.');
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.container}>
          <h2 className={classes.header}>Create Proposal</h2>
          <Formik
            initialValues={{
              name: '',
              type: '',
              title: '',
              hypothesis: '',
              summary: '',
              kpi: '',
              moreUrl: '',
              status: 'Proposal',
              categories: [],
              owner: '',
              responsibilities: '',
              dateStart: null,
              dateEnd: null,
              treatments: [],
            }}
            validationSchema={validationSchema}
            onSubmit={values => handleSubmit(values)}
          >
            {props => (
              <Form
                {...props}
                onCancel={onCancelCreate}
                submitBtnText="Create"
              />
            )}
          </Formik>
          {error && <div className={classes.error}>{error}</div>}
        </div>
      </Container>
    </div>
  );
};

export default Create;
