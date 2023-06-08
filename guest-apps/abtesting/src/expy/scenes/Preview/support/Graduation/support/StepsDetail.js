import React, { useState } from 'react';
import axios from 'dw/core/axios';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import TextInput from 'expy/components/InputFields/TextInput';

import { formatErrorMsg } from '../helpers';

import { useStyles } from '../styles';

const StepsDetail = () => {
  const classes = useStyles();

  const [error, setError] = useState({ hasError: false, msg: null });

  const { id: testId } = useSelector(state => state.Expy.activeTest);
  const stepsDetail = useSelector(state =>
    get(state.Expy.activeTest, 'testGraduation.stepsDetail', null)
  );

  const onStepsDetailSave = async detail => {
    setError({ hasError: false, msg: null });
    try {
      await axios.put(`/expy/v1/graduation/${testId}`, { stepsDetail: detail });
    } catch (err) {
      const errMsg = formatErrorMsg(err);
      setError({ hasError: true, msg: errMsg });
    }
  };

  return (
    <div className={classes.container}>
      <p className={classes.heading}>Next Steps Detail</p>
      <TextInput
        value={stepsDetail}
        onSave={onStepsDetailSave}
        placeholder="Enter description of action taken after test result analysis..."
        error={error.hasError}
        errorMsg={error.msg}
      />
    </div>
  );
};

export default StepsDetail;
