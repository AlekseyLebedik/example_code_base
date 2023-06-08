import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      ((!Number.isNaN(value) && reg.test(value)) ||
        value === '' ||
        value === '-') &&
      this.props.validate(value)
    ) {
      this.props.onChange({ target: { value } });
    }
  };

  // strips '.' at the end or only '-' in the input box.
  onBlur = e => {
    const { onBlur, onChange } = this.props;
    const value = this.props.value || '';
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange({ target: { value: value.slice(0, -1) } });
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  render() {
    const { value, placeholder, label, validate, ...props } = this.props;
    return (
      <TextField
        {...props}
        value={value || ''}
        onChange={this.onChange}
        onBlur={this.onBlur}
        placeholder={placeholder || 'Type a numeric value'}
        label={label}
      />
    );
  }
}

NumericInput.propTypes = {
  validate: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

NumericInput.defaultProps = {
  validate: () => true,
  onChange: undefined,
  onBlur: undefined,
  value: undefined,
  label: '',
  placeholder: '',
};

export default NumericInput;
