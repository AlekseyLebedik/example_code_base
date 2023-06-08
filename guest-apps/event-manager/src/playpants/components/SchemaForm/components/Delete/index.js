import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'dw/core/components/IconButton';

import styles from '../../index.module.css';

const DeleteStateless = ({ handleDelete, name, disabled }) => (
  <IconButton
    tooltip="delete entry"
    icon="delete_forever"
    color="secondary"
    onClick={handleDelete}
    className={styles.delete}
    iconProps={{ name }}
    disabled={disabled}
  />
);

DeleteStateless.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

DeleteStateless.defaultProps = {
  disabled: false,
};

export default DeleteStateless;
