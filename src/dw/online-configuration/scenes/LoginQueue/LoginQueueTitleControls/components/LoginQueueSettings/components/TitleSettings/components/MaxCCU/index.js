import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

import NumberFormatCustom from '../../../../helpers/CustomFormatInputBox';
import TextFieldQueues from '../../../../helpers/TextField';
import styles from '../../../../index.module.css';

const MaxCCU = ({ maxCCU, setMaxCCU, canEditMaxCCU, error }) => (
  <div key="maxCCU" className={styles.loginQueueFormItem}>
    <InputLabel
      id="maxCCULabel"
      className={styles.loginQueueFormLabelWithTooltip}
    >
      Max CCU
      <Tooltip
        title="Value for all Queues across the title"
        placement="bottom-end"
      >
        <Icon className={styles.helpIcon}>help_outline</Icon>
      </Tooltip>
    </InputLabel>
    <TextFieldQueues
      className={styles.loginQueueFormInput}
      value={maxCCU}
      disabled={!canEditMaxCCU}
      onChange={setMaxCCU}
      error={error ? true : maxCCU === 0}
      helperText={error || (maxCCU === 0 ? "Max CCU can't be 0" : '')}
      key="maxCCU"
      name="maxCCU"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  </div>
);

MaxCCU.propTypes = {
  maxCCU: PropTypes.number.isRequired,
  setMaxCCU: PropTypes.func.isRequired,
  canEditMaxCCU: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

MaxCCU.defaultProps = {
  error: '',
};

export default MaxCCU;
