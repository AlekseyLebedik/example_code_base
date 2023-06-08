import React, { useState } from 'react';
import axios from 'dw/core/axios';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import RichTextInput from 'expy/components/InputFields/RichTextInput';

import { formatErrorMsg } from '../helpers';
import { useStyles } from '../styles';

const Summary = () => {
  const classes = useStyles();
  const { id: testId } = useSelector(state => state.Expy.activeTest);
  const summary = useSelector(state =>
    get(state.Expy.activeTest, 'testGraduation.summary', null)
  );

  const [error, setError] = useState({ hasError: false, msg: null });

  const onSummarySave = async value => {
    const formatValue = JSON.stringify(value);
    setError({ hasError: false, msg: null });
    try {
      await axios.put(`/expy/v1/graduation/${testId}`, {
        summary: formatValue,
      });
    } catch (err) {
      const errMsg = formatErrorMsg(err);
      setError({ hasError: true, msg: errMsg });
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.heading} variant="subtitle2">
        Summary and Recommendations
      </Typography>
      <RichTextInput
        onSave={onSummarySave}
        placeholder="Add a test summary..."
        value={JSON.parse(summary)}
        error={error.hasError}
        errorMsg={error.msg}
      />
    </div>
  );
};

export default Summary;
