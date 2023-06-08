import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from 'dw/core/components/FormFields/Input';
import * as V from 'dw/core/components/FormFields/validation';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';

import {
  MIN_GROUP_ID,
  MAX_GROUP_ID,
  PROPAGAT_VARIABLES_SET_FORM_NAME,
} from '../../constants';
import { ConfirmOverride } from '../AddVariablesSetsForm/presentational';
import styles from './index.module.css';

const validateGroupId = V.intRangeValidator(MIN_GROUP_ID, MAX_GROUP_ID);

const PropagateVariablesSetFormBase = props => {
  const { handleSubmit, externalSubmit, isAllowed, setAllowed } = props;

  const label = (
    <span>
      Are you sure you want to propagate this publisher variable?
      <br />
      Propagating a wrong pubvar can be destructive including taking a live
      title down.
    </span>
  );

  return (
    <>
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="environment"
          component={TitleEnvSelect}
          label="Environment"
          validate={[V.required]}
          className={styles.environment}
          displayEnvsFromCurrentProject
          labelInValue
        />
        <Field
          name="namespace"
          component={Input}
          label="Namespace"
          validate={[V.required]}
          maxLength={20}
          fullWidth
        />
        <Field
          name="context"
          component={Input}
          label="Context"
          maxLength={16}
          validate={[V.required]}
          fullWidth
        />
        <Field
          name="groupId"
          component={Input}
          type="number"
          label="Group ID"
          min={MIN_GROUP_ID}
          max={MAX_GROUP_ID}
          validate={[V.required, validateGroupId]}
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox onChange={setAllowed} checked={isAllowed} />}
          label={label}
          key="allowed"
        />
        <Field
          component={ConfirmOverride}
          name="confirmed"
          label="Override existing Variable Set"
        />
      </Form>
    </>
  );
};

PropagateVariablesSetFormBase.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  setAllowed: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
};

const PropagateVariablesSetForm = reduxForm({
  form: PROPAGAT_VARIABLES_SET_FORM_NAME,
})(PropagateVariablesSetFormBase);

export default connect()(PropagateVariablesSetForm);
