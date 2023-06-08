import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import DateTimePicker from 'dw/core/components/DateTimePickerV2';
import CopyUrlToClipboard from 'dw/core/components/CopyUrlToClipboard';
import CreateEventButton from 'playpants/components/CreateEventButton';
import ExportEventsButton from 'playpants/components/ExportEventsButton';

import { moveTimelineView } from './helpers';

import styles from './index.module.css';

const useStyles = makeStyles(() => ({
  input: {
    padding: '0',
  },
}));

const TimelineActions = ({
  setRange,
  range,
  minTime,
  maxTime,
  rangeSpan,
  setRangeSpan: setRangeSpanRaw,
  filteredEvents,
}) => {
  const classes = useStyles();
  const [rangeInput, setRangeInput] = useState(rangeSpan);
  const rangeRef = useRef(rangeSpan);
  // eslint-disable-next-line
  const setRangeSpan = useCallback(debounce(setRangeSpanRaw, 300), [
    setRangeSpanRaw,
  ]);
  useEffect(() => {
    if (rangeRef.current !== rangeInput) setRangeSpan(rangeInput);
    // eslint-disable-next-line
  }, [rangeInput]);
  useEffect(() => {
    rangeRef.current = rangeSpan;
    setRangeInput(rangeSpan);
  }, [rangeSpan, setRangeInput]);

  const move = useCallback(
    (direction, today) =>
      setRange(
        moveTimelineView({
          range,
          minTime,
          maxTime,
          direction,
          today,
        }),
        true
      ),
    [range, minTime, maxTime, setRange]
  );
  return (
    <div className={styles.actions}>
      <div className={styles.dateTimePicker}>
        <DateTimePicker
          dateOnly
          value={{ startDate: moment(range[0]), endDate: moment(range[1]) }}
          onChange={({ startDate, endDate }) => {
            setRange([startDate.valueOf(), endDate]);
          }}
          clearable
          label="Pick date range"
          months={2}
          ranged
          variant="compact"
        />
      </div>
      <IconButton onClick={() => move('back')} disabled={range[0] <= minTime}>
        <Icon>arrow_left</Icon>
      </IconButton>
      <Button onClick={() => move('forward', true)}>Today</Button>
      <Button
        onClick={() => {
          const today = moment(range[0]);
          setRange([
            today.startOf('day').valueOf(),
            today.endOf('day').valueOf(),
          ]);
        }}
      >
        Day
      </Button>
      <Button
        onClick={() => {
          const today = moment(range[0]);
          setRange([
            today.startOf('week').valueOf(),
            today.endOf('week').valueOf(),
          ]);
        }}
      >
        Week
      </Button>
      <Button
        onClick={() => {
          const today = moment(range[0]);
          setRange([
            today.startOf('month').valueOf(),
            today.endOf('month').valueOf(),
          ]);
        }}
      >
        Month
      </Button>
      <IconButton
        onClick={() => move('forward')}
        disabled={range[1] >= maxTime}
      >
        <Icon>arrow_right</Icon>
      </IconButton>
      <TextField
        className={styles.rangeSpanInput}
        onChange={e => {
          let value = parseInt(e.target.value, 10);
          if (!value) value = 0;
          if (value > 366) value = 366;
          setRangeInput(value);
        }}
        onFocus={e => e.target.select()}
        type="number"
        value={rangeInput}
        InputProps={{
          classes: { input: classes.input },
          inputProps: { max: 366, min: 0 },
        }}
      />
      <Typography variant="button" className={styles.rangeSpanLabel}>
        {rangeSpan === 1 ? 'Day' : 'Days'}
      </Typography>
      <div className={styles.separator} />
      <CopyUrlToClipboard />
      <ExportEventsButton filteredEvents={filteredEvents} />
      <CreateEventButton fab />
    </div>
  );
};

TimelineActions.propTypes = {
  setRange: PropTypes.func.isRequired,
  range: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  ).isRequired,
  minTime: PropTypes.number,
  maxTime: PropTypes.number,
  rangeSpan: PropTypes.number,
  setRangeSpan: PropTypes.func,
  filteredEvents: PropTypes.arrayOf(PropTypes.object),
};

TimelineActions.defaultProps = {
  rangeSpan: 30,
  setRangeSpan: () => {},
  filteredEvents: [],
  minTime: undefined,
  maxTime: undefined,
};

export default TimelineActions;
