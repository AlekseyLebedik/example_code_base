import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'dw/core/components/Dialog';

import styles from './index.module.css';

const stylesDeleteModal = {
  paper: {
    width: '500px',
    maxWidth: '500px',
  },
};

class DeleteItemsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmQuantity: props.maxQuantity || 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  handleQuantityChange = value => {
    this.setState({ confirmQuantity: value });
  };

  handleSubmit = () => {
    if (this.props.showInput) {
      if (this.state.confirmQuantity < 1) {
        this.props.onSubmit(1);
      } else if (this.state.confirmQuantity > this.props.maxQuantity) {
        this.props.onSubmit(this.props.maxQuantity);
      } else {
        this.props.onSubmit(Number(this.state.confirmQuantity));
      }
    } else {
      this.props.onSubmit('all');
    }
  };

  render() {
    const {
      title,
      message,
      submitButtonText,
      visible,
      onCancel,
      classes,
      showInput,
      maxQuantity,
    } = this.props;
    const { confirmQuantity } = this.state;

    const footerButtons = [
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
      <Button
        key="primary"
        color="primary"
        focusRipple
        onClick={this.handleSubmit}
      >
        {submitButtonText}
      </Button>,
    ];

    const subTitle = showInput
      ? 'Are you sure you want to delete this selected item?'
      : 'Are you sure you want to delete the selected rows?';
    const messageFinal =
      message ||
      (showInput && 'What quantity do you want to delete?') ||
      'Please note that all quantities of these items will be deleted!';
    return (
      <Dialog
        title={title}
        actions={footerButtons}
        modal
        open={visible}
        classes={classes}
        onRequestClose={onCancel}
      >
        <div>
          <p className={styles.subtitle}>{subTitle}</p>
          <p>{messageFinal}</p>
          {showInput && (
            <input
              className={styles.inputNumber}
              type="number"
              max={maxQuantity || 99999}
              min={1}
              value={confirmQuantity}
              onChange={e => this.handleQuantityChange(e.target.value)}
            />
          )}
          <p className={styles.warning}>
            You will not be able to undo this operation.
          </p>
        </div>
      </Dialog>
    );
  }
}

DeleteItemsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  maxQuantity: PropTypes.number,
  showInput: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  submitButtonText: PropTypes.string,
};
DeleteItemsModal.defaultProps = {
  maxQuantity: null,
  title: 'Confirm Delete',
  message: undefined,
  submitButtonText: 'Delete',
  showInput: false,
};

export default withStyles(stylesDeleteModal)(DeleteItemsModal);
