import React from 'react';
import PropTypes from 'prop-types';

import { formatFileSize } from 'dw/core/helpers/formatters';
import { uniqueTest } from '../../helpers';
import { MAX_FILE_SIZE } from '../../constants';

import FileUploadStateless from './presentational';

class FileUpload extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  state = {
    error: false,
    errorMessage: '',
  };

  handleSubmit = ({ file, base64 }) => {
    const { label, handleChange } = this.props;
    const { name, size } = file;
    const event = {
      target: {
        name: label,
        value: {
          file: {
            name,
            size,
          },
          value: base64,
        },
      },
    };
    this.validate(event);
    if (!this.state.error) {
      handleChange(event);
    }
  };

  validate = e => {
    this.setState({
      error: false,
    });

    const { size } = e.target.value.file;
    if (size > MAX_FILE_SIZE) {
      this.setState({
        error: true,
        errorMessage: `Max file size is ${formatFileSize(MAX_FILE_SIZE)}`,
      });
    }

    const { uniqueItems } = this.props;
    const [, hasIndex] = e.target.name.split(' ');
    if (uniqueItems && hasIndex) {
      if (!uniqueTest(e, this.props)) {
        this.setState({
          error: true,
          errorMessage: `Files must be unique`,
        });
      }
    }
  };

  render() {
    const { disabled } = this.props;
    const newProps = {
      ...this.props,
      ...this.state,
      uploadProps: {
        input: { value: '', onChange: this.handleSubmit },
        meta: { touched: true, error: this.state.errorMessage },
        buttonProps: { color: 'primary', disabled },
        disabled,
      },
    };

    return <FileUploadStateless {...newProps} />;
  }
}

FileUpload.propTypes = {
  uniqueItems: PropTypes.bool,
};

FileUpload.defaultProps = {
  uniqueItems: true,
};

export default FileUpload;
