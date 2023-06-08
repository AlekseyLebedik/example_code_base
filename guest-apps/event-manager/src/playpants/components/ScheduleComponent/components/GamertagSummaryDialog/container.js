import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
  calculateGamertagStartTime,
  checkFormatDateTime,
  getDurationFromSeconds,
  getDurationSecondsFromNow,
  getSecondsFromDuration,
  timezoneOrDefaultSelector,
} from 'playpants/helpers/dateTime';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import {
  fetchGroupTimewarpSettings,
  updateGroupTimewarpSettings,
} from './actions';

import StatelessGamertagSummaryDialog from './presentational';

const GamertagSummaryDialog = ({
  fetchTimewarpSettings,
  onClose,
  onFetchGamertagGroups,
  project,
  updateTimewarpSettings,
  userTimezone,
  timewarpSettings,
  ...props
}) => {
  const {
    color,
    date_time: dateTime,
    time_delta: timeDelta,
    type,
  } = timewarpSettings || {};
  const { selectedGamertagGroup } = props;
  const { id: groupId } = selectedGamertagGroup;
  const [editMode, setEditMode] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [timewarpState, setTimewarpState] = useState({
    color: '#000000',
    duration: {},
    startTime: null,
    timeDelta: null,
    type: '',
  });
  const isOffset = timewarpState.type === 'offset';

  const setCurrentSettings = () => {
    setTimewarpState({
      ...timewarpState,
      color,
      duration: getDurationFromSeconds(timeDelta),
      startTime:
        dateTime || timeDelta
          ? calculateGamertagStartTime(userTimezone, dateTime, timeDelta)
          : null,
      timeDelta,
      type,
    });
  };

  useEffect(() => {
    if (groupId) fetchTimewarpSettings(groupId);
  }, [groupId]);
  useEffect(() => {
    setCurrentSettings();
  }, [color, dateTime, timeDelta, type]);

  const refetchGamertagGroups = () => {
    onFetchGamertagGroups({ type: 'gamertag-management', project });
  };

  const handleClose = (...args) => {
    onClose(...args);
  };
  const handleCancel = () => {
    setEditMode(false);
    setChangesMade(false);
    setCurrentSettings();
  };
  const handleSave = () => {
    setEditMode(false);
    if (changesMade) {
      updateTimewarpSettings(groupId, {
        ...timewarpSettings,
        color: timewarpState.color,
        type: timewarpState.type,
        ...(isOffset
          ? { date_time: null, time_delta: timewarpState.timeDelta }
          : {
              date_time: checkFormatDateTime(timewarpState.startTime),
              time_delta: null,
            }),
      });
      refetchGamertagGroups();
    }
  };
  const handleSetStartTime = timestamp => {
    if (isOffset) {
      const delta = timestamp ? getDurationSecondsFromNow(timestamp) : 0;
      setTimewarpState({
        ...timewarpState,
        startTime: calculateGamertagStartTime(userTimezone, timestamp, delta),
        duration: getDurationFromSeconds(delta),
        timeDelta: delta,
      });
    } else {
      setTimewarpState({
        ...timewarpState,
        startTime: calculateGamertagStartTime(userTimezone, timestamp),
      });
    }
    setChangesMade(true);
  };
  const handleSetGroupColor = col => {
    setTimewarpState({ ...timewarpState, color: col });
    setChangesMade(true);
  };
  const handleSetType = ({ target: { value } }) => {
    setTimewarpState({
      ...timewarpState,
      ...(isOffset ? { startTime: null } : { timeDelta: null }),
      type: value,
    });
    setChangesMade(true);
  };
  const handleSetDuration = e => {
    const { name, value } = e.target;
    const [, field] = name.split('.');
    const duration = Object.assign(timewarpState.duration);
    duration[field] = parseInt(value, 10);
    const delta = getSecondsFromDuration(timewarpState.duration);
    setTimewarpState({
      ...timewarpState,
      duration,
      timeDelta: delta,
      startTime: calculateGamertagStartTime(userTimezone, null, delta),
    });
    setChangesMade(true);
  };

  return (
    <StatelessGamertagSummaryDialog
      {...props}
      displayColorPicker={displayColorPicker}
      editMode={editMode}
      handleCancel={handleCancel}
      handleClose={handleClose}
      handleSave={handleSave}
      handleSetDuration={handleSetDuration}
      handleSetGroupColor={handleSetGroupColor}
      handleSetStartTime={handleSetStartTime}
      handleSetType={handleSetType}
      isOffset={isOffset}
      setDisplayColorPicker={setDisplayColorPicker}
      setEditMode={setEditMode}
      timewarpState={timewarpState}
      userTimezone={userTimezone}
    />
  );
};

GamertagSummaryDialog.propTypes = {
  baseModalId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetchTimewarpSettings: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onFetchGamertagGroups: PropTypes.func.isRequired,
  project: PropTypes.number.isRequired,
  selectedGamertagGroup: PropTypes.object.isRequired,
  timewarpSettings: PropTypes.object.isRequired,
  updateTimewarpSettings: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

const timewarpSettingsSelector = state => {
  const { timewarpSettings } = state.Components.ScheduleComponent;
  return timewarpSettings.data && !isEmpty(timewarpSettings.data)
    ? timewarpSettings.data
    : {};
};

const mapStateToProps = (state, props) => ({
  userTimezone: timezoneOrDefaultSelector(state),
  visible: ModalHandlers.isVisibleSelector(state, props.baseModalId),
  timewarpSettings: timewarpSettingsSelector(state),
  project: currentProjectIdSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  onOpen: () => dispatch(ModalHandlers.open(props.baseModalId)),
  onClose: () => dispatch(ModalHandlers.close(props.baseModalId)),
  fetchTimewarpSettings: id => dispatch(fetchGroupTimewarpSettings(id)),
  updateTimewarpSettings: (id, params) =>
    dispatch(updateGroupTimewarpSettings(id, params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamertagSummaryDialog);
