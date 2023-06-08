import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectField } from 'redux-form-antd';

import './index.css';

class CustomSelect extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    className: PropTypes.string,
    meta: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        children: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          })
        ),
        separator: PropTypes.bool,
      })
    ).isRequired,
  };

  static defaultProps = {
    className: undefined,
  };

  state = {
    focus: false,
  };

  onFocus = () => {
    this.setState({ focus: true });
    const {
      input: { onFocus },
    } = this.props;
    if (onFocus !== undefined) onFocus();
  };

  onBlur = () => {
    this.setState({ focus: false });
    const {
      input: { onBlur },
    } = this.props;
    if (onBlur !== undefined) onBlur();
  };

  getContainerRef = () => this.container;

  initContainerRef = r => {
    this.container = r;
  };

  options = () => {
    const { options } = this.props;
    let newOptions = [];
    options.forEach(({ label, value, children, separator }, idx) => {
      if (separator)
        newOptions.push({
          className: 'separator',
          value: `separator-${idx}`,
          disabled: true,
        });
      else {
        newOptions.push({
          label,
          value,
          disabled: children !== undefined,
        });
        if (Array.isArray(children)) {
          newOptions = newOptions.concat(children);
        }
      }
    });
    return newOptions;
  };

  render() {
    const {
      meta: { error, touched },
    } = this.props;
    const { input, className, ...rest } = this.props;
    const newInput = {
      ...input,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
    const classNames = ['common-multi-select-field'];
    if (className) classNames.push(className);
    if (this.state.focus) classNames.push('active');
    if (error && touched) classNames.push('with-error');
    return (
      <div className={`${classNames.join(' ')}`}>
        <SelectField
          placeholder="Please select"
          {...rest}
          input={newInput}
          optionFilterProp="children"
          hasFeedback={false}
          getPopupContainer={this.getContainerRef}
          options={this.options()}
          data-cy="titleEnvironmentSelector"
        />
        <div
          className="dropdown-placeholder ant-form-explain empty"
          ref={this.initContainerRef}
        >
          EMPTY
        </div>
      </div>
    );
  }
}

export default CustomSelect;
