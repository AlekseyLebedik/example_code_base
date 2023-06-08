import React from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import './index.css';

const UploadField = ({
  input: { value, onChange, onBlur, ...inputProps },
  label,
  type,
  meta: { touched, error },
  buttonProps,
  iconProps,
  ...props
}) => {
  const newProps = {
    ...props,
    onRemove: () => onChange(''),
    beforeUpload: file => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const fileData = {
          file,
          base64: reader.result.split(',')[1],
          name: file.name,
        };
        onChange(fileData);
      };

      reader.readAsDataURL(file);
      return false;
    },
    multiple: false,
    fileList: value === '' ? [] : [value.file],
  };

  return (
    <FormControl error={!!(touched && error)}>
      <Upload {...inputProps} {...newProps}>
        {label && <div className="upload-file-field-label">{label}</div>}
        <Button variant="contained" label="Select File" {...buttonProps}>
          Select File <Icon {...iconProps}>file_upload</Icon>
        </Button>
      </Upload>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

UploadField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  buttonProps: PropTypes.object,
  iconProps: PropTypes.object,
};
UploadField.defaultProps = {
  label: '',
  type: '',
  buttonProps: {},
  iconProps: {},
  meta: {},
};

export default UploadField;
