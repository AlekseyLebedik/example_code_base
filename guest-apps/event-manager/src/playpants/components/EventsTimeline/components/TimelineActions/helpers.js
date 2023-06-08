import moment from 'moment';

export const decideUnit = range => {
  let delta;
  let unit;
  const zoom = moment(range[1]).add(1, 's').valueOf() - range[0];
  const days = Math.round(moment.duration(zoom).asDays());
  if (days > 360) {
    // Set step to year
    delta = moment.duration(zoom).asYears();
    unit = 'year';
  } else if (days >= 28) {
    // Set step to number of months in a visible range
    delta = moment.duration(zoom).asMonths();
    unit = 'month';
  } else if (days >= 7 && days % 7 === 0 && days < 28) {
    // Set step to number of weeks in visible range
    delta = moment.duration(zoom).asWeeks();
    unit = 'week';
  } else if (days > 0) {
    // Set step to number of days in visible range
    delta = days;
    unit = 'day';
  } else {
    // set step to number of hours in visible range
    delta = moment.duration(zoom).asHours();
    unit = 'hour';
  }
  delta = Math.round(delta);
  return [unit, delta];
};

export const moveTimelineView = ({
  range,
  minTime,
  maxTime,
  direction,
  today = false,
}) => {
  let start;
  let end;
  const d = direction === 'back' ? -1 : 1;
  const [unit, delta] = decideUnit(range);

  const entryPoint = today ? moment().valueOf() : Math.round(range[0]);
  if (direction === 'back' || today) {
    start = moment(entryPoint).startOf(unit);
  }
  if (!start || entryPoint === start.valueOf())
    start = moment(entryPoint)
      .add(d * delta, `${unit}s`)
      .startOf(unit);
  end = moment(start).add(delta, `${unit}s`).subtract(1, 's').endOf(unit);

  // Handle min / max available dates
  if (start.valueOf() < minTime) {
    start = moment(minTime).startOf(unit === 'year' ? 'month' : unit);
    end = moment(start)
      .add(delta, `${unit}s`)
      .subtract(1, 's')
      .endOf(unit === 'year' ? 'month' : unit);
  } else if (end.valueOf() > maxTime) {
    end = moment(maxTime).endOf(unit === 'year' ? 'month' : unit);
    start = moment(end)
      .subtract(delta, `${unit}s`)
      .add(1, 's')
      .startOf(unit === 'year' ? 'month' : unit);
  }
  return [start.valueOf(), end.valueOf()];
};
