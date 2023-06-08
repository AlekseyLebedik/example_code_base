import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import range from 'lodash/range';
import some from 'lodash/some';
import Downshift from 'downshift';

import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import NumericInput from 'dw/core/components/NumericInput';
import { intRangeValidator } from 'dw/core/components/FormFields/validation';

import { minMaxDateToMoment } from 'dw/core/helpers/date-time';
import styles from './index.module.css';

const Header = () => (
  <div className={styles.header}>
    time
    <Divider />
  </div>
);

const renderSuggestion = ({ suggestion, itemProps, selectedItem }) => {
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isSelected}
      component="div"
      disableGutters
      className={styles.item}
    >
      {suggestion}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  suggestion: PropTypes.array.isRequired,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
};

renderSuggestion.defaultProps = {
  itemProps: {},
  selectedItem: undefined,
};

const getSuggestions = (value, max) => {
  const inputValue = value.trim().toLowerCase();
  const suggestions = range(max).map(i => String(i).padStart(2, '0'));

  if (!value) return suggestions;
  return suggestions.filter(suggestion => suggestion.includes(inputValue));
};

const TimeSelect = ({ value, label, error, max, onChange, classes }) => (
  <Downshift
    onChange={selectedValue => onChange(selectedValue)}
    selectedItem={value}
  >
    {({
      getInputProps,
      getItemProps,
      inputValue,
      isOpen,
      selectItem,
      selectedItem,
      toggleMenu,
      setState,
    }) => (
      <div className={styles.time}>
        <div className={styles.label}>{label}</div>
        <NumericInput
          {...getInputProps({
            placeholder: value || '00',
            className: styles.timeInput,
            validate: v => !intRangeValidator(0, max - 1)(v),
            error,
            onBlur: e => {
              const { value: currentValue } = e.target;
              if (currentValue && currentValue !== value) {
                selectItem(currentValue);
              }
            },
            onKeyDown: e => {
              const { value: currentValue } = e.target;
              if (e.key === 'Enter' && currentValue && currentValue !== value) {
                selectItem(currentValue);
              }
            },
            onClick: () => toggleMenu(),
            onFocus: () => setState({ inputValue: '' }),
            InputProps: { className: classes.time },
          })}
        />
        {isOpen ? (
          <Paper square className={styles.paper}>
            {getSuggestions(inputValue, max).map(suggestion =>
              renderSuggestion({
                suggestion,
                itemProps: getItemProps({ item: suggestion }),
                selectedItem,
              })
            )}
          </Paper>
        ) : null}
      </div>
    )}
  </Downshift>
);

TimeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

class Time extends Component {
  state = {
    error: { hour: false, minute: false, second: false },
  };

  static getDerivedStateFromProps(props, state) {
    const { value, minDate, maxDate, timezone } = props;
    const { error } = state;

    if (
      value.isBefore(minMaxDateToMoment(minDate, timezone)) ||
      (maxDate && value.isAfter(minMaxDateToMoment(maxDate, timezone)))
    ) {
      return { error: { hour: true, minute: true, second: true } };
    }
    if (some(error)) {
      return { error: { hour: false, minute: false, second: false } };
    }
    return null;
  }

  onChange = unit => selectedValue => {
    const { value, timezone, onTimeChange, minDate, maxDate } = this.props;
    const newDate = value.set(unit, selectedValue);
    let valid = true;
    if (
      valid &&
      minDate &&
      newDate.isBefore(minMaxDateToMoment(minDate, timezone), 'second')
    ) {
      valid = false;
    }
    if (
      valid &&
      maxDate &&
      newDate.isAfter(minMaxDateToMoment(maxDate, timezone), 'second')
    ) {
      valid = false;
    }
    if (valid) {
      return onTimeChange(unit)(selectedValue);
    }
    this.setState(state => ({ error: { ...state.error, [unit]: !valid } }));
    return null;
  };

  render() {
    const { value, classes } = this.props;
    const {
      error: { hour, minute, second },
    } = this.state;
    return (
      <>
        <Header />
        <div className={styles.timeContainer}>
          <TimeSelect
            value={moment(value).format('HH')}
            label="Hour"
            error={hour}
            max={24}
            onChange={this.onChange('hour')}
            classes={classes}
          />
          <TimeSelect
            value={moment(value).format('mm')}
            label="Min"
            error={minute}
            max={60}
            onChange={this.onChange('minute')}
            classes={classes}
          />
          <TimeSelect
            value={moment(value).format('ss')}
            label="Sec"
            error={second}
            max={60}
            onChange={this.onChange('second')}
            classes={classes}
          />
        </div>
      </>
    );
  }
}

Time.propTypes = {
  value: PropTypes.object.isRequired,
  timezone: PropTypes.string.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  classes: PropTypes.object.isRequired,
};

Time.defaultProps = {
  maxDate: null,
  minDate: null,
};

const TimeStyled = withStyles(theme => ({
  time: {
    color: theme.palette.grey['600'],
    fontSize: '13px',
  },
}))(Time);

export default TimeStyled;
