import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from './index.module.css';

const LoginQueueVIPListSkeleton = () => (
  <>
    <Skeleton
      variant="rect"
      animation="wave"
      className={styles.agGridHeaderSkeleton}
    />
    <Skeleton
      variant="rect"
      animation="wave"
      className={styles.agGridRowSkeleton}
    />
    <Skeleton
      variant="rect"
      animation="wave"
      className={styles.agGridRowSkeleton}
    />
    <Skeleton
      variant="rect"
      animation="wave"
      className={styles.agGridRowSkeleton}
    />
  </>
);

export default LoginQueueVIPListSkeleton;
