import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const StatusTableField = ({ status }) => (
  <div className={`${styles.base} ${styles[status]}`}>{status}</div>
);

StatusTableField.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusTableField;
