import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import ConfirmActionStateless from './presentational';

const initialState = ({ confirm }) => ({
  confirm,
  confirmOpen: (confirm && confirm.confirmOpen) || false,
  args: undefined,
  checkedOption:
    (confirm &&
      confirm.checkedOption &&
      confirm.checkedOption.defaultChecked) ||
    false,
});

class ConfirmActionComponent extends Component {
  state = initialState(this.props);

  static getDerivedStateFromProps(props, state) {
    if (
      (props.confirm && !state.confirm) ||
      (!props.confirm && state.confirm)
    ) {
      return { confirm: props.confirm };
    }
    return null;
  }

  actionHandler = (...args) => {
    if (!this.props.confirm) {
      return this.props[this.props.actionTrigger].apply(null, args);
    }
    this.setState({ args });
    return this.openConfirm();
  };

  openConfirm = () => {
    this.setState({ confirmOpen: true });
  };

  closeConfirm = () => {
    this.setState({ confirmOpen: false });
  };

  checkedOptionChange = event => {
    this.setState({ checkedOption: event.target.checked });
    if (this.props.changeCopyPermission) {
      this.props.changeCopyPermission();
    }
  };

  handleConfirm = () => {
    const { confirm } = this.props;
    let args = (this.state.args && [...this.state.args]) || [];
    if (confirm && confirm.checkedOption) {
      args = [this.state.checkedOption, ...args];
    }
    return this.props[this.props.actionTrigger].apply(null, args);
  };

  render() {
    const props = omit(this.props, ['changeCopyPermission']);
    const { disabled, actionTrigger, confirm, ...newProps } = props;
    const isDisabled = typeof disabled === 'function' ? disabled() : disabled;
    newProps[actionTrigger] = this.actionHandler;
    if (confirm && confirm.checkedOption) {
      confirm.checkedOption.onChange = this.checkedOptionChange;
      confirm.checkedOption.checked = this.state.checkedOption;
    }
    return (
      <ConfirmActionStateless
        {...newProps}
        confirm={confirm}
        isOpen={this.state.confirmOpen}
        closeConfirm={this.closeConfirm}
        handleConfirm={this.handleConfirm}
        disabled={isDisabled}
        color={this.props.color}
      />
    );
  }
}

ConfirmActionComponent.propTypes = {
  actionTrigger: PropTypes.string,
  changeCopyPermission: PropTypes.func,
  confirm: PropTypes.shape({
    title: PropTypes.string.isRequired,
    confirmMsg: PropTypes.node.isRequired,
    destructive: PropTypes.bool,
    variant: PropTypes.string,
    mainButtonLabel: PropTypes.string,
    checkedOption: PropTypes.shape({
      label: PropTypes.string.isRequired,
      defaultChecked: PropTypes.bool,
      visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    }),
    confirmOpen: PropTypes.bool,
  }),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  color: PropTypes.string,
};

ConfirmActionComponent.defaultProps = {
  actionTrigger: 'onClick',
  changeCopyPermission: null,
  confirm: null,
  disabled: false,
  color: undefined,
};

export default ConfirmActionComponent;
