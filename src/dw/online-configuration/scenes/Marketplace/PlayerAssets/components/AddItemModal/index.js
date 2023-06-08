import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'dw/core/components/Dialog';

import styles from './index.module.css';

const stylesAddModal = {
  paper: {
    width: '500px',
    maxWidth: '500px',
  },
};

class AddItemModal extends Component {
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
    if (this.state.confirmQuantity < 1) {
      this.props.onSubmit(1);
    } else if (this.state.confirmQuantity > this.props.maxQuantity) {
      this.props.onSubmit(this.props.maxQuantity);
    } else {
      this.props.onSubmit(Number(this.state.confirmQuantity));
    }
  };

  render() {
    const { visible, onCancel, classes, showInput, maxQuantity, title } =
      this.props;
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
        Ok
      </Button>,
    ];

    return (
      <Dialog
        title={title}
        actions={footerButtons}
        modal
        open={visible}
        classes={classes}
        onRequestClose={onCancel}
      >
        {!showInput ? (
          <>
            Are you sure you want to add the selected items to the player?
            <br />
            You will not be able to undo this operation.
          </>
        ) : (
          <>
            <div>
              <br />
              What quantity do you want to add?
              <br />
              <br />
              <input
                className={styles.inputNumber}
                type="number"
                max={maxQuantity || 1}
                min={1}
                value={confirmQuantity}
                onChange={e => this.handleQuantityChange(e.target.value)}
              />
            </div>
            <br />
            You will not be able to undo this operation.
          </>
        )}
      </Dialog>
    );
  }
}

AddItemModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  maxQuantity: PropTypes.number,
  showInput: PropTypes.bool.isRequired,
};
AddItemModal.defaultProps = {
  maxQuantity: null,
  title: '',
};

export default withStyles(stylesAddModal)(AddItemModal);
