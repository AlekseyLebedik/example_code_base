import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import set from 'lodash/set';
import get from 'lodash/get';

import {
  formDataSelector,
  formNextSelector,
  formTypeSelector,
  makeActivityDeployerSelector,
  makeActivityViewSelector,
} from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import { PasswordFieldGroup } from '../Fields';
import { THUNDERPANTS_PASSWORD_CHECK_FORM_NAME } from './constants';
import * as styles from './index.module.css';
import { DEFAULT_LOCK_VALUES } from '../ThunderpantsDeploymentForm/constants';

export const PasswordCheckFormBase = ({
  currentProjectID,
  deployer,
  formData: { uid, deploymentType, lock },
  formNext,
  formType,
  onSubmit,
  view,
}) => {
  const { password: defaultPassword } = DEFAULT_LOCK_VALUES;
  const [formState, setFormState] = useState({
    deployment: { uid, deploymentType, lock },
    form: { lock: { password: defaultPassword } },
  });
  const renderPasswordFields = () => (
    <PasswordFieldGroup
      basePath="form.lock"
      disabledFields={[formType !== 'setLock' ? 'comment' : '']}
      formState={formState}
      setFormState={setFormState}
    />
  );

  return (
    <form
      id={THUNDERPANTS_PASSWORD_CHECK_FORM_NAME}
      onSubmit={e => {
        const onFailure = () => {
          const path = 'form.lock.password';
          setFormState({
            ...set(formState, path, {
              ...get(formState, path, {}),
              error: true,
              helper: 'Incorrect password!',
            }),
          });
        };
        e.preventDefault();
        if (
          get(formState, 'deployment.lock.password', null) &&
          formState.deployment.lock.password !==
            formState.form.lock.password.value
        ) {
          onFailure();
        } else {
          onSubmit({
            currentProjectID,
            data: formState,
            deployer,
            formNext,
            formType,
            onFailure,
            view,
          });
        }
      }}
    >
      <Grid container className={styles.gridContainer}>
        {renderPasswordFields()}
      </Grid>
    </form>
  );
};

const makeMapStateToProps = () => {
  const activityDeployerSelector = makeActivityDeployerSelector();
  const activityViewSelector = makeActivityViewSelector();
  const mapStateToProps = (state, props) => ({
    currentProjectID: currentProjectIdSelector(state),
    deployer: activityDeployerSelector(state, props),
    formData: formDataSelector(state),
    formNext: formNextSelector(state),
    formType: formTypeSelector(state),
    view: activityViewSelector(state, props),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(PasswordCheckFormBase);

PasswordCheckFormBase.propTypes = {
  currentProjectID: PropTypes.number.isRequired,
  deployer: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  formNext: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};
