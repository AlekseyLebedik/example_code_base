import { useMemo } from 'react';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

import { timezoneOrDefaultSelector } from 'dw/core/helpers/date-time';

import {
  createLoadingStatuses,
  getLocalTimezoneOffset,
  setCalendarFilters,
} from './helpers';

import { ENV_TYPE_FILTERS } from './constants';

export const useCalendarDefaults = props => {
  const {
    disabledFilters,
    eventGroups,
    gamertagGroups,
    datePickerInfo,
    affiliatedProjects,
    platforms,
  } = props;

  const userTimezone = useSelector(timezoneOrDefaultSelector);
  const selectedDay = moment().startOf('day');
  const numberOfDays = selectedDay.daysInMonth();

  return useMemo(
    () => ({
      datePickerProps: datePickerInfo,
      eventTimeOffset: getLocalTimezoneOffset(userTimezone),
      groupLoadingStatuses: createLoadingStatuses(eventGroups),
      numberOfDays,
      filters: setCalendarFilters(
        {
          environments: Object.keys(ENV_TYPE_FILTERS).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          ),
          customTags: { userTags: {}, unspecified: true },
          stories: { None: true },
        },
        eventGroups,
        affiliatedProjects,
        platforms,
        gamertagGroups,
        disabledFilters
      ),
      selectedDay,
    }),
    [
      datePickerInfo,
      userTimezone,
      eventGroups,
      platforms,
      affiliatedProjects,
      gamertagGroups,
      disabledFilters,
      numberOfDays,
      selectedDay,
    ]
  );
};
