import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import range from 'lodash/range';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { minMaxDateToMoment } from 'dw/core/helpers/date-time';
import styles from './index.module.css';

const renderMenuItem = ({ onClick, selectedItem, suggestion }) => {
  const selected = suggestion === selectedItem;
  return (
    <MenuItem
      className={styles.item}
      disableGutters
      key={suggestion}
      onClick={() => onClick(suggestion)}
      selected={selected}
    >
      <Icon className={styles.itemIcon}>{selected && 'check'}</Icon>
      {suggestion}
    </MenuItem>
  );
};

renderMenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.array.isRequired,
};
renderMenuItem.defaultProps = {
  selectedItem: undefined,
};

const getSuggestions = max => range(max).map(i => String(i).padStart(2, '0'));

const TimeSelect = ({ disabled, error, label, max, onChange, value }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = newValue => {
    onChange(newValue);
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={styles.label}>{label}</div>
      <Button
        className={styles.timeButton}
        disabled={disabled}
        onClick={handleClick}
        size="small"
      >
        {value}
        <Icon fontSize="small" className={styles.dropdownIcon}>
          expand_more
        </Icon>
      </Button>
      {error && <Divider className={styles.errorBar} />}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          className: styles.paper,
        }}
      >
        {getSuggestions(max).map(suggestion =>
          renderMenuItem({
            suggestion,
            onClick: handleClose,
            selectedItem: value,
          })
        )}
      </Menu>
    </div>
  );
};

TimeSelect.propTypes = {
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class Time extends Component {
  state = {
    error: { hour: false, minute: false, second: false },
    helperText: '',
    timeOn: true,
  };

  onSubmitValidate = dateTime => {
    const { maxDate, minDate, onTimeChange, timezone, type } = this.props;
    let valid = true;
    if (
      valid &&
      minDate &&
      dateTime.isBefore(minMaxDateToMoment(minDate, timezone), 'second')
    ) {
      valid = false;
      this.setState({
        helperText: `This time would start before min date (${minDate})`,
      });
    }
    if (
      valid &&
      maxDate &&
      dateTime.isAfter(minMaxDateToMoment(maxDate, timezone), 'second')
    ) {
      valid = false;
      this.setState({
        helperText: `This time would start after max date (${maxDate})`,
      });
    }
    if (valid) {
      this.setState({ helperText: '' });
      onTimeChange(dateTime, type);
    }
    return valid;
  };

  onChange = unit => selectedValue => {
    const newDate = moment(this.props.date).set(unit, selectedValue);
    const valid = this.onSubmitValidate(newDate);
    if (valid)
      this.setState({ error: { hour: false, minute: false, second: false } });
    else this.setState(state => ({ error: { ...state.error, [unit]: true } }));
  };

  setToNow = () => {
    const now = new Date();
    const newDate = moment(this.props.date).set({
      second: moment(now).format('ss'),
      minute: moment(now).format('mm'),
      hour: moment(now).format('HH'),
    });
    this.onSubmitValidate(newDate);
  };

  handleCheck = event => {
    const newDate = moment(this.props.date).startOf('day');
    const valid = this.onSubmitValidate(newDate);
    if (valid) {
      this.setState({ timeOn: event.target.checked });
    }
  };

  render() {
    const { date } = this.props;
    const {
      error: { hour, minute, second },
      helperText,
      timeOn,
    } = this.state;
    return (
      <FormControl
        className={styles.formControl}
        error={hour || minute || second}
      >
        <div className={styles.timeContainer}>
          <FormControlLabel
            classes={{ root: styles.checkboxForm, label: styles.label }}
            control={
              <Checkbox
                classes={{ root: styles.checkboxRoot }}
                checked={timeOn}
                onChange={this.handleCheck}
                color="primary"
              />
            }
            label="Time"
            labelPlacement="top"
          />
          <TimeSelect
            disabled={!timeOn}
            error={hour}
            label="Hour"
            max={24}
            onChange={this.onChange('hour')}
            value={moment(date).format('HH')}
          />
          <TimeSelect
            disabled={!timeOn}
            error={minute}
            label="Min"
            max={60}
            onChange={this.onChange('minute')}
            value={moment(date).format('mm')}
          />
          <TimeSelect
            disabled={!timeOn}
            error={second}
            label="Sec"
            max={60}
            onChange={this.onChange('second')}
            value={moment(date).format('ss')}
          />
          <Button
            classes={{ label: styles.label }}
            color="primary"
            disabled={!timeOn}
            onClick={this.setToNow}
          >
            set to now
          </Button>
        </div>
        {helperText && (
          <FormHelperText className={styles.helperText}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

Time.propTypes = {
  date: PropTypes.object.isRequired,
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
  onTimeChange: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Time.defaultProps = {
  maxDate: null,
  minDate: null,
  type: null,
};

const TimeStyled = withStyles(theme => ({
  time: {
    color: theme.palette.grey['600'],
    fontSize: '13px',
  },
}))(Time);

export default TimeStyled;
