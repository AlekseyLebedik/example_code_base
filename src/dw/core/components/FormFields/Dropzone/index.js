import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';

import Tooltip from '@material-ui/core/Tooltip';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { formatFileSize } from 'dw/core/helpers/formatters';

import styles from './index.module.css';

class DropzoneField extends Component {
  onDrop = files =>
    this.onChange(
      files.map(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.onLoadComplete(file, reader);
        };
        reader.readAsDataURL(file);
        return { file, fileName: file.name, contentType: file.type };
      })
    );

  onLoadComplete = (file, reader) => {
    const files = this.getFiles().map(uploadedFile => {
      if (uploadedFile.fileName === file.name) {
        // eslint-disable-next-line
        const [_, base64] = reader.result.split(',');
        return {
          ...uploadedFile,
          file,
          base64,
          name: uploadedFile.fileName,
        };
      }
      return uploadedFile;
    });
    this.onChange(files);
  };

  onChange = files => {
    const value = this.props.multiple
      ? files
      : (files.length > 0 && files[0]) || null;
    if (this.props.input.onChange) this.props.input.onChange(value);
    if (this.props.onChange) this.props.onChange(value);
  };

  onDelete = fileName => {
    const files = this.getFiles().filter(f => f.file.name !== fileName);
    this.onChange(files);
  };

  onCancel = () => {};

  getFiles = () => {
    const value = this.props.input.value || this.props.value || null;
    if (Array.isArray(value)) return value;
    return get(value, 'file') ? [value] : [];
  };

  render() {
    const files = this.getFiles();
    const {
      label,
      meta: { touched, error },
      fullWidth,
      classes,
    } = this.props;
    return (
      <FormControl
        error={Boolean(touched && error)}
        className={classes.container}
        fullWidth={fullWidth}
      >
        {label && (
          <InputLabel
            className={classNames(styles.label, {
              [styles.labelDisabled]: this.props.disabled,
            })}
          >
            {label}
          </InputLabel>
        )}
        <Dropzone
          onDrop={this.onDrop}
          accept={this.props.accept}
          onFileDialogCancel={this.onCancel}
          multiple={this.props.multiple}
          disableClick
          disabled={this.props.disabled}
          className={classNames(styles.container, classes.root, {
            [styles.borderDisabled]: this.props.disabled,
          })}
          data-cy="fileUploadDropzone"
        >
          {({ open }) => (
            <>
              <Icon>cloud_upload</Icon>
              <p>Drag and drop {this.props.multiple ? 'files' : 'file'} here</p>
              <p>or</p>
              <Button
                color="primary"
                className={classNames(classes.button, styles.browseButton)}
                variant="contained"
                disabled={this.props.disabled}
                onClick={() => open()}
              >
                Browse {this.props.multiple ? 'files' : 'file'}
              </Button>
            </>
          )}
        </Dropzone>
        <ul className={styles.files}>
          {files.map(f => {
            const errorString = get(error, f.file.name);
            return (
              <li
                key={f.file.name}
                className={classNames({ [classes.error]: errorString })}
              >
                {f.base64 ? (
                  <Tooltip title={errorString || ''}>
                    <Icon color={errorString ? 'secondary' : 'primary'}>
                      {errorString ? 'cancel' : 'done'}
                    </Icon>
                  </Tooltip>
                ) : (
                  <CircularProgress size={24} />
                )}
                {f.file.name} - {formatFileSize(f.file.size)}{' '}
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => this.onDelete(f.file.name)}
                    className={styles.deleteButton}
                    color="inherit"
                  >
                    <Icon fontSize="small">highlight_off</Icon>
                  </IconButton>
                </Tooltip>
              </li>
            );
          })}
        </ul>
        {touched && error && typeof error === 'string' && (
          <FormHelperText>{error}</FormHelperText>
        )}
      </FormControl>
    );
  }
}

DropzoneField.propTypes = {
  input: PropTypes.object,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

DropzoneField.defaultProps = {
  value: null,
  accept: '',
  input: {},
  multiple: false,
  meta: {},
  label: null,
  fullWidth: false,
  onChange: null,
  disabled: false,
};

export default withStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  error: {
    color: theme.palette.secondary.main,
  },
  container: {},
  button: {},
}))(DropzoneField);
