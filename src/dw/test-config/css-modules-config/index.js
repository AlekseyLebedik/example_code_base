import React from 'react';

import styles from './index.module.css';

export default function TestComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
      <p className={styles.content}>Text content.</p>
    </div>
  );
}
