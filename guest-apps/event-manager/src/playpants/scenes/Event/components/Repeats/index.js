import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import RepeatFields from './components/RepeatFields';

import styles from './index.module.css';

const RepeatDetails = props => (
  <div className={classNames(props.classes.font, styles.gridContainer)}>
    <Grid className={styles.grid} container justify="space-between" spacing={8}>
      <Grid item xs={12}>
        <RepeatFields {...props} />
      </Grid>
    </Grid>
  </div>
);

RepeatDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default RepeatDetails;
