import React from 'react';
import PropTypes from 'prop-types';

import { uniqueTest } from '../../helpers';

import TextboxStateless from './presentational';

class Textbox extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    uniqueItems: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    uniqueItems: false,
    value: '',
  };

  state = {
    value: this.props.value,
    error: false,
    errorMessage: '',
  };

  onChange = e => {
    const [error, errorMessage] = this.validate(e);
    this.setState({
      error,
      errorMessage,
      value: e.target.value,
    });
  };

  onSubmit = e => {
    let { value } = e.target;
    // eslint-disable-next-line no-restricted-globals
    value = isNaN(value) ? value : parseFloat(value);
    if (this.props.value !== value) {
      if (!this.state.error) {
        this.props.handleChange(e);
      } else {
        e.target.focus();
      }
    }
  };

  onKeyDown = e => {
    const { key, target } = e;
    const { type, selectionStart } = target;

    if (key === 'Enter') {
      target.blur();
    } else if (key === 'Tab' && this.state.error) {
      e.preventDefault();
    } else if (type === 'number') {
      if (key === 'ArrowDown') {
        target.stepDown();
      } else if (key === 'ArrowUp') {
        target.stepUp();
      }
      this.onChange(e);
    } else if (key === 'ArrowLeft') {
      const caretPos = selectionStart - 1;
      target.setSelectionRange(caretPos, caretPos);
    } else if (key === 'ArrowRight') {
      const caretPos = selectionStart + 1;
      target.setSelectionRange(caretPos, caretPos);
    }
  };

  validate = e => {
    const { uniqueItems } = this.props;
    if (uniqueItems) {
      if (!uniqueTest(e, this.props)) {
        return [true, `Items must be unique`];
      }
    }

    const { value, type } = e.target;
    if (type === 'text') {
      const { minLength, maxLength } = e.target;
      if (minLength !== -1 && value.length < minLength) {
        return [true, `Minimum length is ${minLength}`];
      }
      if (maxLength !== -1 && value.length > maxLength) {
        return [true, `Maximum length is ${maxLength}`];
      }
    } else {
      const numValue = parseFloat(value);
      const { min, max, step } = e.target;
      if (min && numValue < parseFloat(min)) {
        return [true, `Minimum is ${min}`];
      }
      if (max && numValue > parseFloat(max)) {
        return [true, `Maximum is ${max}`];
      }
      if (step && numValue % parseFloat(step) !== 0) {
        return [true, `Must be multiple of ${step}`];
      }
    }

    return [false, ''];
  };

  render() {
    const newprops = {
      ...this.props,
      ...this.state,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
      onKeyDown: this.onKeyDown,
    };

    return <TextboxStateless {...newprops} />;
  }
}

export default Textbox;
