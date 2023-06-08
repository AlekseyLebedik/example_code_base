import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';
import { eventFetchDetailsSelector } from 'playpants/components/ScheduleComponent/selectors';
import {
  useFetchEventDetails,
  useTitleNameSelector,
} from 'playpants/components/ScheduleComponent/hooks';

import { selectedViewSelector } from 'dw/core/components/EventsCalendar/selectors';
import eventSummaryStyles from 'playpants/components/EventSummaryDialog/styles';

import DemonwareDetailsStateless from './presentational';

export const DemonwareDetails = props => {
  const fetchEventDetails = useFetchEventDetails();
  const fetchedData = useSelector(eventFetchDetailsSelector, isEqual);
  const { event: item, baseModalId } = props;
  const titleNameSelector = useTitleNameSelector();
  const event = useMemo(
    () => ({
      ...item,
      ...fetchedData.data,
      titleName: titleNameSelector(item.title_id),
    }),
    [fetchedData, item, titleNameSelector]
  );
  const dispatch = useDispatch();
  const onOpen = useCallback(
    () => dispatch(ModalHandlers.open(baseModalId)),
    [dispatch, baseModalId]
  );
  const onClose = useCallback(
    () => dispatch(ModalHandlers.close(baseModalId)),
    [dispatch, baseModalId]
  );
  const selectedView = useSelector(selectedViewSelector);
  const userTimezone = useSelector(timezoneOrDefaultSelector);
  const visible = useSelector(state =>
    ModalHandlers.isVisibleSelector(state, baseModalId)
  );
  useEffect(() => fetchEventDetails(item), [item, fetchEventDetails]);
  if (isEmpty(event)) {
    return null;
  }
  return (
    <DemonwareDetailsStateless
      {...props}
      event={event}
      onClose={onClose}
      onOpen={onOpen}
      selectedView={selectedView}
      userTimezone={userTimezone}
      visible={visible}
      loading={fetchedData.loading}
    />
  );
};

DemonwareDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  openEventInNewTab: PropTypes.bool,
  userTimezone: PropTypes.string.isRequired,
  selectedView: PropTypes.string.isRequired,
  baseModalId: PropTypes.string.isRequired,
};

DemonwareDetails.defaultProps = {
  openEventInNewTab: false,
};

export default withStyles(eventSummaryStyles)(DemonwareDetails);
