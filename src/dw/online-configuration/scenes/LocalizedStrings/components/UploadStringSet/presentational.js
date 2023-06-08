import React, { useCallback, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useSnackbar } from 'dw/core/hooks';
import { Field, Form, reduxForm } from 'redux-form';
import * as API from 'dw/online-configuration/services/localizedstrings';
import FormError from 'dw/core/components/FormFields/FormError';
import * as V from 'dw/core/components/FormFields/validation';
import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from 'dw/core/components/Dialog';
import Typography from '@material-ui/core/Typography';
import styles from './presentational.module.css';

const INITIAL_EDITOR_HEIGHT = 400;

const isValidJSON = V.isValidJSON({});

const UploadStringSetForm = ({
  context,
  stringSetName,
  setUpload,
  visible,
  setOpen,
  handleSubmit,
}) => {
  const editorRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [jsonError, setJsonError] = useState('');
  const [errorHelperText, setErrorHelperText] = useState(
    'Something went wrong'
  );
  const snackbar = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const postNewStringSet = useCallback(async postData => {
    try {
      const response = await API.postStringSets(
        context,
        stringSetName,
        JSON.parse(postData)
      );
      const { data } = response;
      snackbar.success(
        `String Set succesfully uploaded. New version is ${data.version}`
      );
      handleClose();
      setUpload(true);
    } catch (e) {
      if (e?.response?.data?.error?.invalid) {
        setJsonError(
          e.response.data.error.invalid
            .map(item => `${item.field || item.path}: ${item.msg}`)
            .join('\n')
        );
        setErrorHelperText(e.response.data.error?.msg);
      } else if (e?.response?.data?.error?.msg)
        setJsonError(e.response.data.error.msg);
      else {
        setJsonError('Unknown Error');
        setErrorHelperText(
          'Please contact Devzone on our Slack channel #dw-devzone'
        );
      }
      setSubmitting(false);
    }
  }, []);

  const onUploadEvent = async values => {
    postNewStringSet(values.values);
    setSubmitting(true);
  };

  const footerButtons = [
    <Button key="cancel" disabled={submitting} onClick={handleClose}>
      Cancel
    </Button>,
    <Button
      key="upload"
      disabled={submitting}
      color="primary"
      focusRipple
      onClick={handleSubmit}
      data-cy="upload-string-set-buttton"
    >
      {submitting ? 'Uploading...' : 'Upload'}
    </Button>,
  ];

  return (
    <div className="add-string-set-form">
      <Dialog
        title="Upload String Set"
        actions={footerButtons}
        modal
        open={visible}
        contentStyle={{ width: '600px' }}
      >
        <Form
          onSubmit={handleSubmit(onUploadEvent)}
          className={styles.form}
          data-cy="add-string-set-form-dialog"
        >
          <Field
            name="error"
            component={FormError}
            prefix="Failed to upload String Set: "
          />
          <Typography variant="subtitle1" align="left">
            Context: {context}
          </Typography>

          <Typography
            variant="subtitle1"
            align="left"
            className={styles.formLabels}
          >
            String Set Name: {stringSetName}
          </Typography>

          <Divider variant="fullWidth" className={styles.divider} />

          <FormLabel focused>New String Set:</FormLabel>

          <Field
            name="values"
            placeholder="Paste your new string set here"
            component={MonacoEditor}
            editorRef={editorRef}
            language="json"
            height={INITIAL_EDITOR_HEIGHT}
            width={Infinity}
            options={{
              folding: false,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              fontSize: '14px',
            }}
            validate={[V.required, isValidJSON]}
            resizable
          />
          {jsonError ? (
            <TextField
              error
              id="standard-error"
              label="Error"
              value={jsonError}
              helperText={errorHelperText}
              multiline
              fullWidth
              rowsMax={6}
              data-cy="json-form-error"
            />
          ) : undefined}
        </Form>
      </Dialog>
    </div>
  );
};

UploadStringSetForm.propTypes = {
  context: PropTypes.string.isRequired,
  stringSetName: PropTypes.string.isRequired,
  setUpload: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'UploadStringSet',
})(UploadStringSetForm);
