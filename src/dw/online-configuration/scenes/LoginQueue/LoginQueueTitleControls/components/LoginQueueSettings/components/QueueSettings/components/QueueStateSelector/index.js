import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import styles from '../../../../index.module.css';

const QueueStateSelector = ({
  queueState,
  setQueueState,
  canEditQueueState,
  error,
}) => {
  const QueueStateStyles = withStyles({
    root: {
      '& .MuiInputBase-root': {
        fontSize: '14px',
      },
      '& .MuiSelect-icon': {
        color: 'rgba(255, 255, 255, 60%)',
      },
      '& .MuiInputBase-input': {
        color: queueState ? '#3AB1A6' : '#FF7474',
      },
      '& .MuiInput-underline:before, .MuiInput-underline:hover:before, .MuiInput-underline:after':
        {
          borderBottomColor: 'rgba(255, 255, 255, 60%)',
          borderBottomStyle: 'solid',
        },
      '& .MuiFormHelperText-root, .MuiFormHelperText-root.Mui-disabled': {
        color: '#FF7474',
      },
    },
  })(TextField);

  return (
    <div key="queueState" className={styles.loginQueueFormItem}>
      <InputLabel id="queueStateLabel" className={styles.loginQueueFormLabel}>
        Queue State
      </InputLabel>
      <QueueStateStyles
        select
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          },
        }}
        className={styles.loginQueueFormInput}
        value={queueState.toString()}
        key="queueState"
        name="queueState"
        error={error !== undefined}
        helperText={error}
        onChange={e => {
          setQueueState(e.target.value === 'true');
        }}
        disabled={!canEditQueueState}
      >
        <MenuItem key="closed" value="false">
          Closed
        </MenuItem>
        <MenuItem key="open" value="true">
          Open
        </MenuItem>
      </QueueStateStyles>
    </div>
  );
};

QueueStateSelector.propTypes = {
  queueState: PropTypes.bool.isRequired,
  setQueueState: PropTypes.func.isRequired,
  canEditQueueState: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

QueueStateSelector.defaultProps = {
  error: '',
};

export default QueueStateSelector;
