import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import IconButton from 'dw/core/components/IconButton';

import { useEMPermissionsResult } from 'playpants/hooks';
import { exportEvents } from 'playpants/components/ScheduleComponent/actions';

const EXPORT_EXCLUDE_TYPES = ['abTesting'];

const ExportEventsButton = props => {
  const { filteredEvents } = props;
  const dispatch = useDispatch();
  const onExportEvents = useCallback(
    params => dispatch(exportEvents(params)),
    [dispatch]
  );
  const { staffUser } = useEMPermissionsResult();

  return !isEmpty(
    filteredEvents.filter(
      e => !EXPORT_EXCLUDE_TYPES.find(type => type === e.event_type)
    )
  ) && staffUser ? (
    <IconButton
      icon="download"
      onClick={onExportEvents}
      tooltip="Export Events"
    />
  ) : null;
};

ExportEventsButton.propTypes = {
  filteredEvents: PropTypes.arrayOf(PropTypes.object),
};
ExportEventsButton.defaultProps = {
  filteredEvents: [],
};

export default ExportEventsButton;
