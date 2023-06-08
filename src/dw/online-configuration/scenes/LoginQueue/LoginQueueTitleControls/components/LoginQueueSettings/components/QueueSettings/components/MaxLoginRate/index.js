import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React from 'react';
import NumberFormatCustom from '../../../../helpers/CustomFormatInputBox';
import TextFieldQueues from '../../../../helpers/TextField';
import styles from '../../../../index.module.css';

const MaxLoginRate = ({
  targetRateLimit,
  setTargetRateLimit,
  canEditLoginRate,
  error,
}) => (
  <div key="maxLoginRate" className={styles.loginQueueFormItem}>
    <InputLabel id="maxLoginRateLabel" className={styles.loginQueueFormLabel}>
      Max Login Rate
    </InputLabel>
    <TextFieldQueues
      className={styles.loginQueueFormInput}
      value={targetRateLimit}
      disabled={!canEditLoginRate}
      onChange={setTargetRateLimit}
      error={error ? true : targetRateLimit === 0}
      helperText={
        error || (targetRateLimit === 0 ? "Login rate can't be 0" : '')
      }
      key="targetRateLimit"
      name="targetRateLimit"
      InputProps={{
        inputComponent: NumberFormatCustom,
        inputProps: {
          suffix: ' / second',
        },
      }}
    />
  </div>
);

MaxLoginRate.propTypes = {
  targetRateLimit: PropTypes.number.isRequired,
  setTargetRateLimit: PropTypes.func.isRequired,
  canEditLoginRate: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

MaxLoginRate.defaultProps = {
  error: '',
};

export default MaxLoginRate;
