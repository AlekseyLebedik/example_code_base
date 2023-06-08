import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../../index.module.css';

const QueueIDSelector = withStyles({
  root: {
    '& .MuiFormLabel-root, .MuiSelect-icon': {
      color: 'rgba(255, 255, 255, 60%)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset, &:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 60%)',
      },
    },
    '& .MuiInputBase-input': {
      color: 'rgb(255, 255, 255)',
    },
  },
})(TextField);

const QueueSelector = ({ queues, selectedQueue, setSelectedQueue }) => (
  <div className={styles.loginQueuePadding}>
    <QueueIDSelector
      key="queueID"
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
      label="Queue ID"
      value={selectedQueue}
      onChange={e => setSelectedQueue(parseInt(e?.target?.value, 10))}
      variant="outlined"
      fullWidth
      size="small"
    >
      {Object.keys(queues).map(k => (
        <MenuItem key={k} value={k}>
          {k}
        </MenuItem>
      ))}
    </QueueIDSelector>
  </div>
);

QueueSelector.propTypes = {
  selectedQueue: PropTypes.number.isRequired,
  setSelectedQueue: PropTypes.func.isRequired,
  queues: PropTypes.array.isRequired,
};

export default QueueSelector;
