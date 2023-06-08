import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Field, reduxForm, Form } from 'redux-form';
import Input from 'dw/core/components/FormFields/Input';
import Upload from 'dw/core/components/FormFields/Upload';
import * as V from 'dw/core/components/FormFields/validation';
import { FORM_NAME } from './constants';

import './index.css';

const useStyles = makeStyles(theme => ({
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    color: 'rgba(0,0,0,0.65)',
    marginBottom: theme.spacing(1),
  },
}));

export const validateLabel = value => {
  const nameRegex = /^[\w\-~]+$/;
  return nameRegex.test(String(value).trim())
    ? undefined
    : "Enter a valid 'Label' consisting of character from a-z, A-Z, 0-9, including the '_', '-' or '~' characters";
};

const UploadStoreForm = props => {
  const classes = useStyles();
  const { handleSubmit, onSubmit: onExternalSubmit, cancelToken } = props;
  const [uploadProgress, setUploadProgress] = useState();
  const onUploadProgress = useCallback(
    progressEvent => {
      if (cancelToken.reason) {
        return;
      }
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(progress);
    },
    [cancelToken]
  );
  const onSubmit = useCallback(
    values => onExternalSubmit(values, { onUploadProgress }),
    [onUploadProgress, onExternalSubmit]
  );

  return (
    <div className="stores__upload-store-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name="label"
            component={Input}
            label="Label"
            validate={[V.required, validateLabel]}
            fullWidth
          />
        </div>
        <div>
          <Field
            name="store"
            type="text"
            accept=".json"
            component={Upload}
            label="Choose file"
            validate={[V.required]}
          />
        </div>
        {uploadProgress ? (
          <div className={classes.progressContainer}>
            <div className={classes.label}>
              {uploadProgress >= 100
                ? 'Applying the Store'
                : 'Uploading the Store'}
            </div>
            <LinearProgress
              value={uploadProgress >= 100 ? undefined : uploadProgress}
              variant={uploadProgress >= 100 ? undefined : 'determinate'}
            />
          </div>
        ) : null}
      </Form>
    </div>
  );
};
UploadStoreForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelToken: PropTypes.object.isRequired,
};

export default reduxForm({
  form: FORM_NAME,
})(UploadStoreForm);
