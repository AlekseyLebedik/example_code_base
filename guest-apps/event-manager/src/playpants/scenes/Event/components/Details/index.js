import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { currentProjectSelector } from 'playpants/components/App/selectors';

import Grid from '@material-ui/core/Grid';
import EditStatus from 'playpants/components/EditStatus';
import EventActions from './components/EventActions';
import Fields from './components/Fields';
import ExpansionPanels from './components/ExpansionPanels';

import styles from './index.module.css';

const Details = props => (
  <div className={classNames(props.classes.font, styles.gridContainer)}>
    <Grid container spacing={1} justify="space-between" className={styles.grid}>
      <Grid item xs={6} className={styles.editStatus}>
        <EditStatus {...props} />
      </Grid>
      <Grid item xs={6} className={styles.eventActions}>
        <EventActions {...props} />
      </Grid>
      <Grid item xs={12}>
        <Fields {...props} />
      </Grid>
      <Grid item xs={12}>
        <ExpansionPanels {...props} />
      </Grid>
    </Grid>
  </div>
);

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentProject: currentProjectSelector(state),
});

export default connect(mapStateToProps)(Details);
