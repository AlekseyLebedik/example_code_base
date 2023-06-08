import React from 'react';
import PropTypes from 'prop-types';

import Upload from 'dw/core/components/FormFields/Upload';
import { formatFileSize } from 'dw/core/helpers/formatters';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Delete from '../Delete';

import styles from '../../index.module.css';

const FileUploadStateless = props => {
  const { label, value, uploadProps, deletable, handleDelete, disabled } =
    props;

  return Object.keys(value).length !== 0 ? (
    <>
      <Tooltip title={value.file.name}>
        <span className={styles.fileName}>
          <Button disabled>{value.file.name}</Button>
        </span>
      </Tooltip>
      <span className={styles.fileSize}>{formatFileSize(value.file.size)}</span>
      {deletable && (
        <Delete handleDelete={handleDelete} name={label} disabled={disabled} />
      )}
    </>
  ) : (
    Upload(uploadProps)
  );
};

FileUploadStateless.propTypes = {
  label: PropTypes.string.isRequired,
  uploadProps: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  deletable: PropTypes.bool,
  handleDelete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

FileUploadStateless.defaultProps = {
  deletable: false,
  disabled: false,
};

export default FileUploadStateless;
