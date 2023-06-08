import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { DefinedRange, createStaticRanges } from 'react-date-range';

const defineds = {
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  endOfMonth: endOfMonth(new Date()),
  endOfNextMonth: endOfMonth(addMonths(new Date(), 1)),
  endOfNextWeek: endOfWeek(addDays(new Date(), 7)),
  endOfToday: endOfDay(new Date()),
  endOfTomorrow: endOfDay(addDays(new Date(), 1)),
  endOfWeek: endOfWeek(new Date()),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  startOfMonth: startOfMonth(new Date()),
  startOfNextMonth: startOfMonth(addMonths(new Date(), 1)),
  startOfNextWeek: startOfWeek(addDays(new Date(), 7)),
  startOfToday: startOfDay(new Date()),
  startOfTomorrow: startOfDay(addDays(new Date(), 1)),
  startOfWeek: startOfWeek(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
};

const defaultStaticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Tomorrow',
    range: () => ({
      startDate: defineds.startOfTomorrow,
      endDate: defineds.endOfTomorrow,
    }),
  },
  {
    label: 'Start of Next Week',
    range: () => ({
      startDate: defineds.startOfNextWeek,
      endDate: defineds.startOfNextWeek,
    }),
  },
  {
    label: 'Start of Next Month',
    range: () => ({
      startDate: defineds.startOfNextMonth,
      endDate: defineds.startOfNextMonth,
    }),
  },
]);

const rangedStaticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
  },
  {
    label: 'Tomorrow',
    range: () => ({
      startDate: defineds.startOfTomorrow,
      endDate: defineds.endOfTomorrow,
    }),
  },
  {
    label: 'This Week',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
  },
  {
    label: 'This Weekend',
    range: () => ({
      startDate: startOfDay(defineds.endOfWeek),
      endDate: addDays(defineds.endOfWeek, 1),
    }),
  },
  {
    label: 'Next Week',
    range: () => ({
      startDate: defineds.startOfNextWeek,
      endDate: defineds.endOfNextWeek,
    }),
  },
  {
    label: 'Next Weekend',
    range: () => ({
      startDate: startOfDay(defineds.endOfNextWeek),
      endDate: addDays(defineds.endOfNextWeek, 1),
    }),
  },
  {
    label: 'This Month',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: 'Next Month',
    range: () => ({
      startDate: defineds.startOfNextMonth,
      endDate: defineds.endOfNextMonth,
    }),
  },
]);

const defaultInputRanges = [
  {
    label: 'days from today',
    range(value) {
      const today = new Date();
      const newDate = addDays(today, Number(value));
      return { startDate: newDate, endDate: newDate };
    },
    getCurrentValue(range) {
      return differenceInCalendarDays(range.endDate, defineds.startOfToday);
    },
  },
];

const rangedInputRanges = [
  {
    label: 'days from today',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: endOfDay(addDays(today, Number(value))),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday);
    },
  },
  {
    label: 'days starting next week',
    range(value) {
      return {
        startDate: defineds.startOfNextWeek,
        endDate: addDays(defineds.startOfNextWeek, Number(value)),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfNextWeek)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfNextWeek);
    },
  },
];

const CustomDefinedRange = ({
  date,
  extraInputRanges,
  extraStaticRanges,
  onChange,
  ranged,
  ranges,
}) => (
  <DefinedRange
    onChange={range => onChange(ranged ? range : range.range1.startDate)}
    ranges={
      ranged ? ranges : [{ startDate: date, endDate: date, color: '#009688' }]
    }
    staticRanges={[
      ...(ranged ? rangedStaticRanges : defaultStaticRanges),
      ...extraStaticRanges,
    ]}
    inputRanges={[
      ...(ranged ? rangedInputRanges : defaultInputRanges),
      ...extraInputRanges,
    ]}
  />
);

CustomDefinedRange.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  extraInputRanges: PropTypes.arrayOf(PropTypes.object),
  extraStaticRanges: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  ranges: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  ranged: PropTypes.bool.isRequired,
};
CustomDefinedRange.defaultProps = {
  date: '',
  extraInputRanges: [],
  extraStaticRanges: [],
  ranges: [],
};

export default CustomDefinedRange;
