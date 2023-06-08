import React from 'react';
import PropTypes from 'prop-types';
import floor from 'lodash/floor';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './index.module.css';

const ProgressBar = ({ value }) => {
  if (value === 0) return null;
  if (value === -1) return <>FAILED</>;
  return (
    <>
      <div className={styles.progressWrapper}>
        <div className={styles.progress}>{floor(value)}%</div>
        <CircularProgress color="primary" variant="determinate" value={value} />
      </div>
    </>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
};

ProgressBar.defaultProps = {
  value: 0,
};

export default ProgressBar;
