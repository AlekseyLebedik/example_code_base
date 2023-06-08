import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import {
  formDataSelector,
  formTypeSelector,
} from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';
import { THUNDERPANTS_CONFIRM_ACTION_FORM_NAME } from './constants';
import styles from './index.module.css';

export const ConfirmActionFormBase = ({
  formData: { build, ...deployment },
  formType,
  onSubmit,
}) => {
  const { message } = deployment;
  return (
    <form
      id={THUNDERPANTS_CONFIRM_ACTION_FORM_NAME}
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ build, deployment, type: formType });
      }}
    >
      <Grid className={styles.gridContainer}>
        <Grid>{message}</Grid>
      </Grid>
    </form>
  );
};

ConfirmActionFormBase.propTypes = {
  formData: PropTypes.object.isRequired,
  formType: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  formData: formDataSelector(state),
  formType: formTypeSelector(state),
});

export default connect(stateToProps)(ConfirmActionFormBase);
