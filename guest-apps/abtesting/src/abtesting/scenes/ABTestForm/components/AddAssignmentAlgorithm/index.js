import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

import Input from 'dw/core/components/FormFields/Input';
import Select from 'dw/core/components/FormFields/Select';

import styles from './index.module.css';
import { HASH_FUNCTIONS } from './constants';

const AddAssignmentAlgorithm = ({ visible, disabled }) => {
  const algorithmOptions = HASH_FUNCTIONS.map(hash => (
    <MenuItem key={hash} value={hash}>
      {hash}{' '}
    </MenuItem>
  ));
  return (
    <div hidden={!visible} className={styles.hash}>
      <div>
        <Field
          name="assignmentAlgorithm"
          component={Select}
          label="Algorithm"
          fullWidth
          disabled={disabled}
        >
          {algorithmOptions}
        </Field>
      </div>
      <div>
        <Field
          name="assignmentSeed"
          component={Input}
          label="Seed - Auto-generated if not specified"
          fullWidth
          disabled={disabled}
        />
      </div>
    </div>
  );
};

AddAssignmentAlgorithm.propTypes = {
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
};

AddAssignmentAlgorithm.defaultProps = {
  visible: true,
  disabled: false,
};

export default AddAssignmentAlgorithm;
