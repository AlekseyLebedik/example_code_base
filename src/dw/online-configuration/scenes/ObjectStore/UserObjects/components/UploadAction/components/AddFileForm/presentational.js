import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';

import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import Input from 'dw/core/components/FormFields/Input';
import Dropzone from 'dw/core/components/FormFields/Dropzone';
import Select from 'dw/core/components/FormFields/Select';
import { UserAutoCompleteFormField as UserInput } from 'dw/online-configuration/components/UserAutoComplete';
import DateTimePicker from 'dw/core/components/DateTimePicker';

import * as V from 'dw/core/components/FormFields/validation';

import styles from './presentational.module.css';

const renderUploadField = props => <Dropzone {...props} />;

const maxLength32 = V.maxLength(32);

const AddFileForm = props => {
  const { handleSubmit, externalSubmit, checksumTypeValue, change } = props;

  return (
    <div className="user-objects__add-file-form">
      <Form onSubmit={handleSubmit(externalSubmit)}>
        <Field
          name="userId"
          component={UserInput}
          label="User ID"
          validate={[V.required]}
        />
        <Field
          name="fileData"
          type="text"
          classes={{
            container: styles.fileUpload,
            button: styles.browserFileButton,
          }}
          component={renderUploadField}
          label="Choose file"
          validate={[V.required, V.isAnyFileLoading]}
          onChange={fileData => change('fileName', fileData?.name)}
          fullWidth
        />
        <Field
          name="fileName"
          component={Input}
          label="Filename"
          fullWidth
          validate={[V.fileName]}
        />
        <Field
          name="acl"
          component={Select}
          label="ACL"
          fullWidth
          validate={[V.required]}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Field>
        <Field
          name="expiresOn"
          component={DateTimePicker}
          label="Expires On (optional)"
          dateOnly
          fullWidth
          autoOk
          minDate="now"
          returnTimestamp
        />
        <Field
          name="checksumType"
          component={Select}
          label="Checksum Type"
          fullWidth
          validate={[V.required]}
        >
          <MenuItem value="b64_md5sum_digest">
            <Tooltip
              title="Stores base64 encoded md5sum digest (raw byte digest) of the object content"
              placement="right"
            >
              <span>Base64 MD5sum digest</span>
            </Tooltip>
          </MenuItem>
          <Divider />
          <MenuItem value="specified">
            <Tooltip
              title="Stores a specific checksum value provided below"
              placement="right"
            >
              <span>Specify checksum</span>
            </Tooltip>
          </MenuItem>
          <MenuItem value="none">
            <Tooltip title="Does not store a checksum" placement="right">
              <span>No checksum</span>
            </Tooltip>
          </MenuItem>
        </Field>

        {checksumTypeValue === 'specified' && (
          <Field
            name="checksum"
            component={Input}
            label="Checksum Value"
            fullWidth
            validate={[V.required, maxLength32]}
          />
        )}
      </Form>
    </div>
  );
};

AddFileForm.propTypes = {
  checksumTypeValue: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

AddFileForm.defaultProps = {
  checksumTypeValue: undefined,
};

export default AddFileForm;
