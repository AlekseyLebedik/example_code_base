import React, { useState } from 'react';
import axios from 'dw/core/axios';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import SelectInput from 'expy/components/InputFields/SelectInput';

import { TEST_GRADUATION_RESULTS } from 'expy/constants';

import { formatErrorMsg } from '../helpers';

const Results = () => {
  const { id: testId } = useSelector(state => state.Expy.activeTest);
  const result = useSelector(state =>
    get(state.Expy.activeTest, 'testGraduation.result', '')
  );

  const [error, setError] = useState({ hasError: false, msg: null });

  const onResultSave = async value => {
    setError({ hasError: false, msg: null });
    try {
      await axios.put(`/expy/v1/graduation/${testId}`, { result: value });
    } catch (err) {
      const errMsg = formatErrorMsg(err);
      setError({ hasError: true, msg: errMsg });
    }
  };

  return (
    <SelectInput
      value={result}
      onSave={onResultSave}
      label="Results"
      placeholder="None"
      options={TEST_GRADUATION_RESULTS}
      error={error.hasError}
      errorMsg={error.msg}
    />
  );
};

export default Results;
