import React from 'react';
import styles from './index.module.css';

const NonFieldError = ({ meta: { error } }) =>
  (error && <div className={styles.error}>{error}</div>) || null;

export default NonFieldError;
