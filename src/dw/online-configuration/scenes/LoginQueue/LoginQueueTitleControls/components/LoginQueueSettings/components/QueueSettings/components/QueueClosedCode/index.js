import PropTypes from 'prop-types';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

import NumberFormatCustom from '../../../../helpers/CustomFormatInputBox';
import TextFieldQueues from '../../../../helpers/TextField';
import styles from '../../../../index.module.css';

const QueueClosedCode = ({
  queueClosedCode,
  setQueueClosedCode,
  canEditErrorCode,
  error,
}) => (
  <div key="ClosedCode" className={styles.loginQueueFormItem}>
    <InputLabel
      id="queueClosedCodeLabel"
      className={styles.loginQueueFormLabelWithTooltip}
    >
      Queue Closed Code
      <Tooltip
        title="When the queue is closed, this code will be returned to the client"
        placement="bottom-end"
      >
        <Icon className={styles.helpIcon}>help_outline</Icon>
      </Tooltip>
    </InputLabel>
    <TextFieldQueues
      className={styles.loginQueueFormInput}
      value={queueClosedCode}
      disabled={!canEditErrorCode}
      onChange={setQueueClosedCode}
      error={error !== undefined}
      helperText={error}
      key="queueClosedCode"
      name="queueClosedCode"
      InputProps={{
        inputComponent: NumberFormatCustom,
        inputProps: {
          thousandSeparator: false,
        },
      }}
    />
  </div>
);

QueueClosedCode.propTypes = {
  queueClosedCode: PropTypes.number.isRequired,
  setQueueClosedCode: PropTypes.func.isRequired,
  canEditErrorCode: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

QueueClosedCode.defaultProps = {
  error: '',
};

export default QueueClosedCode;
