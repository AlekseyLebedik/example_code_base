import React, { useState } from 'react';
import axios from 'dw/core/axios';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import SelectInput from 'expy/components/InputFields/SelectInput';

import { TEST_GRADUATION_NEXT_STEPS } from 'expy/constants';

import { formatErrorMsg } from '../helpers';

const NextSteps = () => {
  const { id: testId } = useSelector(state => state.Expy.activeTest);
  const nextSteps = useSelector(state =>
    get(state.Expy.activeTest, 'testGraduation.nextSteps', '')
  );

  const [error, setError] = useState({ hasError: false, msg: null });

  const onNextStepsSave = async steps => {
    setError({ hasError: false, msg: null });
    try {
      await axios.put(`/expy/v1/graduation/${testId}`, { nextSteps: steps });
    } catch (err) {
      const errMsg = formatErrorMsg(err);
      setError({ hasError: true, msg: errMsg });
    }
  };

  return (
    <SelectInput
      value={nextSteps}
      onSave={onNextStepsSave}
      label="Next Steps"
      options={TEST_GRADUATION_NEXT_STEPS}
      placeholder="None"
      error={error.hasError}
      errorMsg={error.msg}
    />
  );
};

export default NextSteps;
