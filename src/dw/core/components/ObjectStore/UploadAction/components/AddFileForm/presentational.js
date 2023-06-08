import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'redux-form';

import FormGroup from '@material-ui/core/FormGroup';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import AutoComplete from 'dw/core/components/FormFields/AutocompleteGeneral';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import Input from 'dw/core/components/FormFields/Input';
import Dropzone from 'dw/core/components/FormFields/Dropzone';
import Select from 'dw/core/components/FormFields/Select';
import FormError from 'dw/core/components/FormFields/FormError';

import { LocalizedFormFieldDateTimePicker as DateTimePicker } from 'dw/core/components/DateTimePicker';

import * as V from 'dw/core/components/FormFields/validation';

import styles from './presentational.module.css';

const renderUploadField = props => (
  <FormGroup row>
    <Dropzone {...props} />
  </FormGroup>
);

const maxLength32 = V.maxLength(32);

const ConfirmOverwrite = ({ meta: { error, touched }, ...props }) =>
  error && touched ? (
    <Checkbox
      {...props}
      meta={{ error, touched }}
      formControlProps={{ className: styles.confirmOverwrite }}
    />
  ) : null;

ConfirmOverwrite.propTypes = {
  meta: PropTypes.object.isRequired,
};

const AddFileForm = props => {
  const {
    handleSubmit,
    onAddCategory,
    externalSubmit,
    categories,
    groups,
    checksumTypeValue,
    change,
    selectedGroup,
    contentInCloud,
  } = props;

  return (
    <div className="publisher-objects__add-file-form">
      <Form onSubmit={handleSubmit(externalSubmit)} className={styles.form}>
        <Field
          name="error"
          component={FormError}
          prefix="Failed to upload File: "
        />
        <Field
          name="groupID"
          component={Select}
          label="Object Group"
          fullWidth
          disabled={!!selectedGroup || groups === undefined}
        >
          {groups &&
            groups.map(group => (
              <MenuItem key={group.groupID} value={group.groupID}>
                {group.groupName}
              </MenuItem>
            ))}
        </Field>
        <Field
          label="Category"
          placeholder="Select or Create Category"
          name="category"
          component={AutoComplete}
          fullWidth
          options={categories}
          onAdd={onAddCategory}
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
          onChange={fileData => change('fileName', fileData && fileData.name)}
          validate={[V.required, V.isAnyFileLoading, V.fileSize]}
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
          name="confirmed"
          component={ConfirmOverwrite}
          label="Confirm object overwrite"
          fullWidth
        />
        {!contentInCloud && (
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
        )}
        <Field
          autoOk
          name="expiresOn"
          component={DateTimePicker}
          label="Expires On (optional)"
          helperText="Select date or leave empty (don't expire)"
          fullWidth
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
  handleSubmit: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
  externalSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  groups: PropTypes.arrayOf(PropTypes.object),
  checksumTypeValue: PropTypes.string,
  change: PropTypes.func.isRequired,
  selectedGroup: PropTypes.object,
  contentInCloud: PropTypes.bool.isRequired,
};

AddFileForm.defaultProps = {
  categories: [],
  groups: undefined,
  checksumTypeValue: undefined,
  selectedGroup: undefined,
};

export default AddFileForm;
