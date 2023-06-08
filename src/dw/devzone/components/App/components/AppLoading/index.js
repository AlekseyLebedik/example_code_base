import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './index.module.css';

function AppLoading() {
  return (
    <div className={styles.container}>
      <CircularProgress size={80} thickness={5} />
    </div>
  );
}

export default AppLoading;
