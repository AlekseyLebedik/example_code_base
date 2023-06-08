import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import Grid from '@material-ui/core/Grid';
import EditStatus from 'playpants/components/EditStatus';
import Actions from './components/Actions';
import Fields from './components/Fields';
import styles from './index.module.css';
import * as actions from './actions';
import * as selectors from './selectors';

export const DetailsBase = props => {
  const {
    classes,
    currentProject,
    eventCount,
    history,
    isSafe,
    onFetchScheduleStoryEventsCount,
    selectedScheduleStory,
  } = props;
  useEffect(() => {
    onFetchScheduleStoryEventsCount({
      event_type: 'event-manager',
      project: currentProject.id,
      story: selectedScheduleStory.id,
    });
  }, [selectedScheduleStory.id]);
  return (
    <div className={classNames(classes.font, styles.gridContainer)}>
      <Grid
        container
        spacing={1}
        justify="space-between"
        className={styles.grid}
      >
        <Grid item xs={6} className={styles.editStatus}>
          <EditStatus classes={classes} />
        </Grid>
        <Grid item xs={6} className={styles.actions}>
          <Actions
            eventCount={eventCount}
            history={history}
            isSafe={isSafe}
            storyId={selectedScheduleStory.id}
          />
        </Grid>
        <Grid item xs={12}>
          <Fields {...props} />
        </Grid>
      </Grid>
    </div>
  );
};

DetailsBase.propTypes = {
  classes: PropTypes.object.isRequired,
  currentProject: PropTypes.object.isRequired,
  detachedSchedule: PropTypes.bool.isRequired,
  eventCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  isSafe: PropTypes.object.isRequired,
  onFetchScheduleStoryEventsCount: PropTypes.func.isRequired,
  selectedScheduleStory: PropTypes.shape({ id: PropTypes.number }).isRequired,
};

const makeMapStateToProps = () => {
  const isSafeSelector = props =>
    selectors.makeIsSafeSelector(props.detachedSchedule);
  const mapStateToProps = (state, props) => ({
    currentProject: currentProjectSelector(state),
    eventCount: selectors.eventCountDataSelector(state),
    isSafe: isSafeSelector(props)(state),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  onFetchScheduleStoryEventsCount: bindActionCreators(
    actions.fetchScheduleStoryEventsCount,
    dispatch
  ),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(DetailsBase);
