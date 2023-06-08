import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Box, Divider, Grid } from '@material-ui/core';
import { Empty } from 'dw/core/components';
import styles from './index.module.css';

export const TableLoadingSkeleton = () => {
  const ColumnsSkeleton = () => {
    return (
      <>
        {Array.from(Array(12)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={1} md={1} key={index}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              className={styles.columnHeader}
            />
          </Grid>
        ))}
      </>
    );
  };
  const RowsSkeleton = () => {
    return (
      <>
        {Array.from(Array(144)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={1} md={1} key={index}>
            <Skeleton
              variant="text"
              animation="wave"
              className={styles.rowData}
            />
          </Grid>
        ))}
      </>
    );
  };
  return (
    <>
      <div className={styles.text}>
        <Empty emptyText="Gathering the account information will take some time." />
      </div>
      <div>
        <Box className={styles.mainContainer}>
          <Grid container spacing={3}>
            <ColumnsSkeleton />
          </Grid>
        </Box>
        <Divider variant="middle" />
        <Box className={styles.mainContainer}>
          <Grid container spacing={3}>
            <RowsSkeleton />
          </Grid>
        </Box>
      </div>
    </>
  );
};
