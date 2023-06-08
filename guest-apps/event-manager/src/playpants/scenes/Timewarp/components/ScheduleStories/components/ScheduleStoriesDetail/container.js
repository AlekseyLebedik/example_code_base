import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { joinPath } from 'dw/core/helpers/path';
import { useEMPermissionsResult } from 'playpants/hooks';
import { resetFeedback } from 'playpants/components/FeedbackWrapper/actions';
import ScheduleStoriesDetailStateless from './presentational';

export const ScheduleStoriesDetail = props => {
  const {
    allowDetachedEvents,
    baseUrl,
    history,
    onResetFeedback,
    selectedScheduleStory,
  } = props;

  const permissions = useEMPermissionsResult();
  const [primaryTab, setPrimaryTab] = useState('details');
  const [secondaryTab, setSecondaryTab] = useState('tasks');
  const detachedSchedule =
    allowDetachedEvents && !selectedScheduleStory.schedule;

  useEffect(() => {
    if (detachedSchedule && !selectedScheduleStory.task) {
      setSecondaryTab('calendar');
    } else {
      setSecondaryTab('tasks');
    }
  }, [setSecondaryTab, detachedSchedule, selectedScheduleStory.task]);

  useEffect(() => {
    onResetFeedback();
  }, [selectedScheduleStory]);

  const handleSetPrimaryTab = useCallback(
    (_, value) => {
      setPrimaryTab(value);
    },
    [setPrimaryTab]
  );

  const handleSetSecondaryTab = useCallback(
    (_, value) => {
      setSecondaryTab(value);
      history.push(
        joinPath(
          baseUrl,
          'timewarp',
          'schedules',
          selectedScheduleStory.id,
          value
        )
      );
    },
    [baseUrl, history, selectedScheduleStory, setSecondaryTab]
  );

  return (
    <ScheduleStoriesDetailStateless
      {...props}
      detachedSchedule={detachedSchedule}
      handleSetPrimaryTab={handleSetPrimaryTab}
      handleSetSecondaryTab={handleSetSecondaryTab}
      primaryTab={primaryTab}
      secondaryTab={secondaryTab}
      permissions={permissions}
    />
  );
};
ScheduleStoriesDetail.propTypes = {
  allowDetachedEvents: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  onResetFeedback: PropTypes.func.isRequired,
  selectedScheduleStory: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onResetFeedback: () => dispatch(resetFeedback()),
});

export default connect(null, mapDispatchToProps)(ScheduleStoriesDetail);
