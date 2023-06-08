import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import debounce from 'lodash/debounce';

import { useSelector } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

import { uuid } from 'dw/core/helpers/uuid';

import {
  formatNavigatorItems,
  getMillisecondsTimestamp,
  isLoadingEventGroup,
} from './helpers';
import { DAY } from './constants';

const Timeline = lazy(() => import('./components/Timeline'));
const Navigator = lazy(() => import('./components/Navigator'));

const EventsTimeline = ({
  eventGroups,
  events,
  onSelectEvent,
  onSelectSlot,
  setCalendarSettings,
  userTimezone,
}) => {
  const [refreshKey, setRefreshKey] = useState(null);
  const navigatorRef = useRef(null);
  const timelineRef = useRef(null);
  const numberOfDays = useSelector(
    state => state.Core.EventsCalendar.numberOfDays
  );
  const selectedDay = useSelector(
    state => state.Core.EventsCalendar.selectedDay
  );
  const groupLoadingStatuses = useSelector(
    state => state.Core.EventsCalendar.groupLoadingStatuses
  );

  const calculateRangeStart = (day, daysNo) => {
    let start = day.startOf('day');
    if (daysNo >= 30) start = day.startOf('month');
    else if (daysNo >= 7) start = day.startOf('week');
    return getMillisecondsTimestamp(start, userTimezone);
  };

  const [selected, setSelected] = useState();
  const [days, setDays] = useState();
  const [range, setRange] = useState([]);

  useEffect(() => {
    if (numberOfDays !== days || !selectedDay.isSame(selected)) {
      setSelected(selectedDay);
      setDays(numberOfDays);
      const start = calculateRangeStart(selectedDay, numberOfDays);
      const newRange = [start, start + numberOfDays * DAY];
      setRange(newRange);
      setRefreshKey(uuid());
    }
  }, [numberOfDays, selectedDay]);

  const [groupKey, setGroupKey] = useState('type');

  // Updates calendarSettings if zoom level is day or longer
  const handleRangeUpdate = debounce(([newMin, newMax]) => {
    if (!(newMin && newMax)) return;
    const min = Math.floor(newMin);
    const max = Math.ceil(newMax);
    const newRange = [min, max];
    const newDays = Math.floor(moment.duration(max - min).asDays()) || 1;
    const newStart = moment(min);
    setSelected(newStart);
    setDays(newDays);
    setRange(newRange);
    setCalendarSettings({
      customRangeInput: newDays,
      customViewOn: true,
      numberOfDays: newDays,
      selectedDay: newStart,
    });
  }, 1000);

  return (
    <Suspense fallback={<CircularProgress size={80} thickness={5} />}>
      <Timeline
        key={refreshKey}
        eventGroups={eventGroups}
        events={events}
        groupKey={groupKey}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        range={range}
        ref={timelineRef}
        setGroupKey={setGroupKey}
        setRange={handleRangeUpdate}
        userTimezone={userTimezone}
      />
      <Navigator
        data={formatNavigatorItems(events, groupKey)}
        groupKey={groupKey}
        numberOfDays={numberOfDays}
        range={range}
        ref={navigatorRef}
        setRange={handleRangeUpdate}
        startDay={range[0]}
        userTimezone={userTimezone}
        loading={isLoadingEventGroup({ groupLoadingStatuses })}
      />
    </Suspense>
  );
};

EventsTimeline.propTypes = {
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onSelectSlot: PropTypes.func.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

export default EventsTimeline;
