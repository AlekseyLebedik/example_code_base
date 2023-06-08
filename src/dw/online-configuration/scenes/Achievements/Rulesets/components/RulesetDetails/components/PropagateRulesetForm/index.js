import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  Form,
  formValues,
  formValueSelector,
} from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';
import ContextComponentBase from 'dw/online-configuration/components/TitleEnvContext';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';

import * as V from 'dw/core/components/FormFields/validation';
import { FORM_NAME } from './constants';
import './index.css';

const MultipleContextComponentBase = ({ environment, ...props }) =>
  environment
    ? environment.map(({ key: env, label }) => (
        <ContextComponentBase
          {...props}
          environment={env}
          key={env}
          envLabel={label}
          name={`${props.input.name}.${env}`}
        />
      ))
    : null;

const MultipleContextComponent = formValues('environment')(
  MultipleContextComponentBase
);

const PropagateRulesetForm = props => {
  const { handleSubmit, onSubmit, change, touch, untouch, isActive } = props;

  return (
    <div className="rulesets__ruleset-detail__propagate-ruleset-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="context"
            component={MultipleContextComponent}
            change={change}
            touch={touch}
            untouch={untouch}
            validate={[V.required]}
            serviceName={Services.AE}
            endpoint={ServiceEndpoints.AE.putRulesetsDetail}
          />
          <Field
            name="label"
            component={Input}
            label="Label"
            validate={[V.required]}
            className="label"
          />
        </div>
        <div>
          <Field
            name="environment"
            component={TitleEnvSelect}
            label="Environment"
            validate={[V.required]}
            mode="multiple"
            serviceName={SERVICE_NAMES.ACHIEVEMENTS}
            excludeCurrent
            labelInValue
            sameProjectOnTop
          />
        </div>
        <div>
          <Field name="isActive" component={Checkbox} label="Is Active" />
          {isActive && (
            <p className="rulesets__ruleset-detail__warning-message">
              Activating a ruleset directly when propagating will miss ruleset
              checking.{' '}
            </p>
          )}
        </div>
      </Form>
    </div>
  );
};

PropagateRulesetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
  untouch: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

PropagateRulesetForm.defaultProps = {
  isActive: false,
};

// eslint-disable-next-line
let PropagateRulesetReduxForm = reduxForm({
  form: FORM_NAME,
})(PropagateRulesetForm);

const propagateRulesetFormselector = formValueSelector(FORM_NAME);

PropagateRulesetReduxForm = connect(state => {
  return {
    isActive: propagateRulesetFormselector(state, 'isActive'),
  };
})(PropagateRulesetReduxForm);

export default PropagateRulesetReduxForm;
