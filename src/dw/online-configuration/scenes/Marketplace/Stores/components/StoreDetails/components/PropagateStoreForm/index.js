import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, Form, formValues } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';
import ContextComponentBase from 'dw/online-configuration/components/TitleEnvContext';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import * as V from 'dw/core/components/FormFields/validation';
import { FORM_NAME } from './constants';
import styles from './index.module.css';

const MultipleContextComponentBase = ({ environment, ...props }) => {
  if (environment) {
    const { key: env, label } = environment;
    return (
      <ContextComponentBase
        {...props}
        environment={env}
        key={env}
        envLabel={label}
        name={`${props.input.name}.${env}`}
      />
    );
  }
  return null;
};
MultipleContextComponentBase.propTypes = {
  environment: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

const MultipleContextComponent = formValues('environment')(
  MultipleContextComponentBase
);

const PropagateStoreForm = props => {
  const { handleSubmit, onSubmit, change, touch, untouch } = props;

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="context"
            component={MultipleContextComponent}
            change={change}
            touch={touch}
            untouch={untouch}
            validate={[V.required]}
            serviceName={Services.Marketplace}
            endpoint={ServiceEndpoints.Marketplace.createStore}
          />
          <Field
            name="label"
            component={Input}
            label="Label"
            validate={[V.required]}
            className="label"
            fullWidth
          />
        </div>
        <div>
          <Field
            name="environment"
            component={TitleEnvSelect}
            label="Environment"
            validate={[V.required]}
            serviceName={SERVICE_NAMES.MARKETPLACE}
            showSearch
            excludeCurrent
            labelInValue
            sameProjectOnTop
          />
        </div>
      </Form>
    </div>
  );
};

PropagateStoreForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
};

const PropagateStoreReduxForm = reduxForm({
  form: FORM_NAME,
  validate: values =>
    values.context === null ? { context: 'Required' } : null,
  initialValues: {
    context: null,
  },
})(PropagateStoreForm);

export default PropagateStoreReduxForm;
