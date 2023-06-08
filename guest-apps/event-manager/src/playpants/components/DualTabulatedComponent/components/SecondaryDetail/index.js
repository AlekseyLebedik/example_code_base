import React from 'react';
import TabulatedDetailComponent from '../TabulatedDetailComponent';
import styles from './index.module.css';

const SecondaryDetail = props => (
  <div className={styles.secondaryDetailContainer}>
    <TabulatedDetailComponent
      {...props}
      appBarProps={{
        className: styles.appBarProps,
        color: 'default',
        position: 'static',
      }}
    />
  </div>
);

export default SecondaryDetail;
