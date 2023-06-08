import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import styles from '../../index.module.css';

const InputLabelSkeleton = () => (
  <div className={styles.loginQueueFormItem}>
    <Skeleton
      variant="rect"
      animation="wave"
      className={styles.loginQueueFormLabel}
    />
    <Skeleton
      variant="rect"
      animation="wave"
      className={styles.loginQueueFormInput}
    />
  </div>
);

const ButtonSkeleton = () => (
  <div className={styles.loginQueueButtonGroup}>
    <Skeleton
      width="20%"
      variant="rect"
      animation="wave"
      className={styles.loginQueueSkeletonBtn}
    />
    <Skeleton
      width="20%"
      variant="rect"
      animation="wave"
      className={styles.loginQueueSkeletonBtn}
    />
  </div>
);

const LoginQueueSettingsSkeleton = () => (
  <>
    {/* Queue ID Selector */}
    <div className={styles.loginQueuePadding}>
      <Skeleton variant="text" animation="wave" width="100%" height="70px" />
    </div>
    {/* Queue Settings */}
    <Skeleton width="90%" className={styles.loginQueueLabel} />
    <div className={styles.loginQueueForm}>
      <InputLabelSkeleton />
      <InputLabelSkeleton />
      <InputLabelSkeleton />
      <ButtonSkeleton />
    </div>
    {/* Title Settings */}
    <Skeleton width="90%" className={styles.loginQueueLabel} />
    <div className={styles.loginQueueForm}>
      <InputLabelSkeleton />
      <ButtonSkeleton />
    </div>
  </>
);

export default LoginQueueSettingsSkeleton;
