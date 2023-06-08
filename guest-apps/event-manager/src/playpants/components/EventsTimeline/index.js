import React from 'react';

import ScheduleComponent from 'playpants/components/ScheduleComponent';
import { useNewEventsEnabled } from 'playpants/scenes/Schedule/hooks';
import EventsComponent from './container';

const Events = props => {
  // eslint-disable-next-line
  const useNewEvents = useNewEventsEnabled();
  return useNewEvents ? (
    <EventsComponent {...props} />
  ) : (
    <ScheduleComponent {...props} />
  );
};

export default Events;
