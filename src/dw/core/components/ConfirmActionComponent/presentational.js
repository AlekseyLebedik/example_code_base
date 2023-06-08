import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';

import ConfirmDialog from 'dw/core/components/Confirm';
import { hasData } from 'dw/core/helpers/object';

function ConfirmActionStateless({
  children,
  component: Component,
  confirm,
  isOpen,
  closeConfirm,
  handleConfirm,
  tooltip,
  tooltipPosition,
  tooltipProps,
  color,
  iconClassName,
  cancelOnBackdropClick,
  ...props
}) {
  const newTooltipProps = { ...tooltipProps };
  if (tooltip) {
    newTooltipProps.title = tooltip;
  }
  if (tooltipPosition) {
    newTooltipProps.placement = tooltipPosition;
  }
  const elements = [];
  if (confirm && isOpen) {
    const { checkedOption } = confirm;
    const confirmMsg = [<div key="confirmMsg">{confirm.confirmMsg}</div>];
    if (checkedOption) {
      const { visible } = checkedOption;
      const isVisible = typeof visible === 'function' ? visible() : visible;
      if (isVisible === undefined || isVisible) {
        confirmMsg.push(
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkedOption.onChange}
                checked={checkedOption.checked}
              />
            }
            label={checkedOption.label}
            key="checkedOption"
          />
        );
      }
    }

    elements.push(
      <ConfirmDialog
        key="confirm-dialog"
        title={confirm.title}
        content={confirmMsg}
        disabled={confirm.disabled}
        mainButtonLabel={confirm.mainButtonLabel}
        destructive={confirm.destructive}
        variant={confirm.variant}
        open={isOpen}
        onHide={closeConfirm}
        onConfirm={handleConfirm}
        cancelOnBackdropClick={cancelOnBackdropClick}
      />
    );
  }
  const newProps = {
    ...props,
    key: 'confirm-action-component',
  };
  let confirmElement;
  switch (Component) {
    case 'IconButton':
      confirmElement = (
        <IconButton color={color} {...newProps}>
          <Icon className={iconClassName}>{children}</Icon>
        </IconButton>
      );
      break;
    case 'fab':
      confirmElement = (
        <Fab size="small" color={color} {...newProps}>
          <Icon className={iconClassName}>{children}</Icon>
        </Fab>
      );
      break;
    case 'MenuItem':
      confirmElement = <MenuItem {...newProps}>{children}</MenuItem>;
      break;
    default:
      newProps.children = children;
      // If it's been set we probably need it in confirmElement
      if (color) newProps.color = color;
      confirmElement = <Component {...newProps} />;
  }
  if (hasData(newTooltipProps)) {
    elements.push(
      <Tooltip
        key="tooltip"
        placement="bottom"
        {...newTooltipProps}
        classes={{
          tooltip: 'confirm-action-component__tooltip',
        }}
      >
        <span>{confirmElement}</span>
      </Tooltip>
    );
  } else elements.push(confirmElement);
  return elements;
}

ConfirmActionStateless.propTypes = {
  children: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
  confirm: PropTypes.shape({
    title: PropTypes.string,
    confirmMsg: PropTypes.node,
    destructive: PropTypes.bool,
    mainButtonLabel: PropTypes.string,
    checkedOption: PropTypes.object,
  }),
  isOpen: PropTypes.bool.isRequired,
  closeConfirm: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  tooltipProps: PropTypes.shape({
    title: PropTypes.string,
    placement: PropTypes.string,
  }),
  tooltip: PropTypes.string,
  tooltipPosition: PropTypes.string,
  iconClassName: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.string,
};

ConfirmActionStateless.defaultProps = {
  children: null,
  confirm: null,
  tooltipProps: {},
  tooltip: undefined,
  tooltipPosition: undefined,
  iconClassName: undefined,
  disabled: false,
  color: undefined,
};

export default ConfirmActionStateless;
