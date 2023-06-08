import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';

import styles from './index.module.css';

const Overview = ({ details }) => (
  <AppBar position="static">
    <Grid container className={styles.gridPadding}>
      {details.map(detail => (
        <Grid key={detail.label} item xs={6} lg={4}>
          {`${detail.label}: ${detail.value}`}
        </Grid>
      ))}
    </Grid>
  </AppBar>
);

Overview.propTypes = {
  details: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default Overview;
