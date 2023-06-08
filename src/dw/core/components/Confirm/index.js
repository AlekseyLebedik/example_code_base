import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import { withStyles } from '@material-ui/core/styles';
import './index.css';
import { capitalize } from 'lodash';

const contentStyle = {
  width: '450px',
};

const styles = theme => ({
  paperDestructive: {
    borderTop: `${theme.palette.secondary.main} solid 6px`,
  },
  paperWarning: {
    borderTop: `${theme.palette.warning.main} solid 6px`,
  },
  buttonWarning: {
    color: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: '#fff7ec',
    },
  },
});

class ConfirmDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.node,
    mainButtonLabel: PropTypes.string,
    destructive: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'destructive', 'warning']),
    open: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    cancelOnBackdropClick: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Confirm Action',
    content: 'Are you sure you want to procceed with the Action?',
    mainButtonLabel: 'Ok',
    destructive: false,
    disabled: false,
    cancelOnBackdropClick: false,
    variant: 'default',
  };

  onConfirm = () => {
    this.props.onConfirm();
    this.props.onHide();
  };

  render() {
    const {
      title,
      content,
      open,
      onHide,
      mainButtonLabel,
      destructive,
      variant: propsVariant,
      disabled,
      cancelOnBackdropClick,
    } = this.props;
    const variant = destructive ? 'destructive' : propsVariant || 'default';

    const footerButtons = [
      <Button key="cancel" onClick={onHide}>
        Cancel
      </Button>,
      <Button
        key="confirm"
        className={this.props.classes[`button${capitalize(variant)}`]}
        color={variant === 'destructive' ? 'secondary' : 'primary'}
        onClick={this.onConfirm}
        disabled={disabled}
        data-cy="confirmButton"
      >
        {mainButtonLabel}
      </Button>,
    ];

    const classes = {
      paper: this.props.classes[`paper${capitalize(variant)}`],
    };

    return (
      <Dialog
        title={title}
        actions={footerButtons}
        open={open}
        contentStyle={contentStyle}
        onRequestClose={onHide}
        classes={classes}
        cancelOnBackdropClick={cancelOnBackdropClick}
      >
        {content}
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmDialog);
