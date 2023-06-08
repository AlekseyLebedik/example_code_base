import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import IconButton from 'dw/core/components/IconButton';
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';

import Date from './components/DateSelector';

import styles from './index.module.css';

const ToolbarStateless = props => {
  const {
    changeNumberOfDays,
    customRangeError,
    customRangeInput,
    onNavigate,
    setCalendarSettings,
    setNonCustomDays,
    userTimezone,
    views,
  } = props;
  const { customViewOn, numberOfDays, selectedDay, selectedView } = useSelector(
    state => state.Core.EventsCalendar
  );
  const arrowText = customViewOn
    ? `${numberOfDays} ${numberOfDays > 1 ? 'Days' : 'Day'}`
    : `a ${startCase(selectedView)}`;

  return (
    <div
      className={styles.calendarToolbarContainer}
      data-cy="calendarToolbarContainer"
    >
      <div className={styles.calendarToolbarNavigation}>
        <IconButton
          color="inherit"
          icon="keyboard_arrow_left"
          onClick={() => onNavigate('PREV')}
          tooltip={`Go Back ${arrowText}`}
        />
        <Button
          className={styles.calendarToolbarViewControlUnselected}
          color="inherit"
          disableFocusRipple
          disableRipple
          onClick={() => onNavigate('TODAY')}
          type="submit"
        >
          TODAY
        </Button>
        <IconButton
          color="inherit"
          icon="keyboard_arrow_right"
          onClick={() => onNavigate('NEXT')}
          tooltip={`Go Foward ${arrowText}`}
        />
      </div>
      <span className={styles.calendarToolbarLabel}>
        <Date
          customViewOn={customViewOn}
          numberOfDays={numberOfDays}
          onNavigate={onNavigate}
          selectedDay={selectedDay.set({
            hour: 12,
            minute: 0,
            second: 0,
          })}
          selectedView={selectedView}
          userTimezone={userTimezone}
        />
      </span>
      <div className={styles.calendarToolbarViewControlsContainer}>
        {!isEmpty(views) && (
          <>
            <div className={styles.calendarToolbarViewControls}>
              {Object.keys(views).map(v => (
                <Button
                  key={v}
                  className={classNames({
                    [styles.calendarToolbarViewControlSelected]:
                      selectedView === v && !customViewOn,
                    [styles.calendarToolbarViewControlUnselected]:
                      selectedView !== v ||
                      (selectedView === v && customViewOn),
                  })}
                  color="inherit"
                  disableFocusRipple
                  disableRipple
                  onClick={() => setNonCustomDays(v)}
                  type="submit"
                >
                  {capitalize(v)}
                </Button>
              ))}
              <Button
                key="customViewButton"
                className={classNames({
                  [styles.calendarToolbarViewControlSelected]: customViewOn,
                  [styles.calendarToolbarViewControlUnselected]: !customViewOn,
                })}
                color="inherit"
                disableFocusRipple
                disableRipple
                onClick={() => setCalendarSettings({ customViewOn: true })}
                type="submit"
              >
                CUSTOM
              </Button>
            </div>
            <FormControl className={styles.calendarToolbarViewSelect}>
              <InputLabel>View</InputLabel>
              <Select
                data-cy="calendarToolbarViewSelect"
                label={selectedView}
                value={selectedView}
                classes={{ select: styles.calendarToolbarViewSelectInput }}
                onChange={({ target: { value } }) => setNonCustomDays(value)}
              >
                {Object.keys(views).map(v => (
                  <MenuItem key={v} value={v}>
                    {capitalize(v)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        <TextField
          className={styles.customDateRangeInput}
          error={customRangeError.length > 0}
          InputProps={{
            'data-cy': 'customDateRangeInput',
            endAdornment: (
              <InputAdornment position="end">
                {customRangeInput === 1 ? 'Day' : 'Days'}
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          label={
            (customRangeError.length && customRangeError) || 'Custom Date Range'
          }
          onChange={e => changeNumberOfDays(e.target.value)}
          type="number"
          value={customRangeInput}
        />
      </div>
    </div>
  );
};

ToolbarStateless.propTypes = {
  changeNumberOfDays: PropTypes.func.isRequired,
  customRangeError: PropTypes.string.isRequired,
  customRangeInput: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onNavigate: PropTypes.func.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  setNonCustomDays: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
  views: PropTypes.object.isRequired,
};

export default ToolbarStateless;
