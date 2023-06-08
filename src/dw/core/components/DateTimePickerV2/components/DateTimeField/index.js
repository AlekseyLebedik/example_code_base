import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as chrono from 'chrono-node';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import {
  DATE_TIME_FORMATS,
  dateIsAfter,
  dateIsBefore,
  timestampToMoment,
} from 'dw/core/helpers/date-time';

const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: 14,
    },
  },
  focusedTextField: {
    '& fieldset': {
      borderColor: '#009688',
      borderWidth: 3,
    },
  },
  input: {
    textOverflow: 'ellipsis',
  },
  iconButton: {
    padding: 8,
  },
  iconLarge: {
    fontSize: '1.75rem',
  },
  divider: {
    height: 28,
    marginLeft: 5,
  },
  helperText: {
    maxWidth: 300,
    cursor: 'pointer',
    display: 'block',
  },
}));

const ClearAdornment = ({ classes, CustomEndAdornment, disabled, onClick }) =>
  CustomEndAdornment ? (
    <CustomEndAdornment onClearValue={onClick} />
  ) : (
    <InputAdornment position="end">
      <IconButton
        onClick={onClick}
        className={classes.iconButton}
        disabled={disabled}
      >
        <Icon fontSize="small">clear</Icon>
      </IconButton>
    </InputAdornment>
  );

ClearAdornment.propTypes = {
  classes: PropTypes.object.isRequired,
  CustomEndAdornment: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
ClearAdornment.defaultProps = { CustomEndAdornment: null };

const DateTimeField = ({
  classes,
  clearable,
  CustomEndAdornment,
  date,
  dateFormat,
  dateOnly,
  disabled,
  focused,
  fullWidth,
  hideDateIcon,
  InputLabelProps,
  InputProps,
  label,
  margin,
  maxDate,
  minDate,
  onChange,
  onClearValue,
  onOpen,
  placeholder,
  timezone,
  type,
  variant,
  ...props
}) => {
  const [value, setValue] = useState(date);
  const [error, setError] = useState(props.error);
  const [helperText, setHelperText] = useState(props.helperText);
  const muiClasses = useStyles();
  const valueFormat =
    dateFormat ||
    (dateOnly ? DATE_TIME_FORMATS.DEFAULT_DATE : DATE_TIME_FORMATS.DEFAULT);
  const dateFormatted = date
    ? timestampToMoment(date, timezone).format(valueFormat)
    : null;

  useEffect(() => {
    setValue(date ? dateFormatted : '');
  }, [date, dateFormatted]);
  useEffect(() => setError(props.error), [props.error, setError]);
  useEffect(
    () => setHelperText(props.helperText),
    [props.helperText, setHelperText]
  );

  const handleChange = e => {
    setValue(e.target.value);
    const parsedDate = chrono.parseDate(e.target.value);
    const dateString =
      parsedDate &&
      timestampToMoment(parsedDate, timezone).format(valueFormat).toString();
    if (!parsedDate) {
      setError(true);
      setHelperText('Invalid date');
    } else if (dateIsBefore(parsedDate, minDate, timezone)) {
      setError(true);
      const minDateString = timestampToMoment(minDate, timezone)
        .format(valueFormat)
        .toString();
      setHelperText(
        `Selected date (${dateString}) is before min date (${minDateString})`
      );
    } else if (dateIsAfter(parsedDate, maxDate, timezone)) {
      setError(true);
      const maxDateString = timestampToMoment(maxDate, timezone)
        .format(valueFormat)
        .toString();
      setHelperText(
        `Selected date (${dateString}) is after max date (${maxDateString})`
      );
    } else {
      setError(false);
      setHelperText(dateString);
    }
  };

  const handleSubmit = e => {
    if (!error) {
      setHelperText('');
      onChange(chrono.parseDate(value), type);
    } else {
      e.target.focus();
    }
  };

  const handleClearValue = e => {
    setValue('');
    onClearValue(e, type);
  };

  const handleOpenDialog = () => {
    setError(props.error);
    setHelperText(props.helperText);
    onOpen(type);
  };

  const handleBlur = e => {
    if (value !== dateFormatted) handleSubmit(e);
  };

  const isVariantCompact = variant === 'compact';
  const renderDialogButton = () => (
    <IconButton
      disabled={disabled}
      onClick={handleOpenDialog}
      className={muiClasses.iconButton}
    >
      <Icon
        {...(!isVariantCompact && {
          fontSize: 'small',
          className: classes.iconLarge,
        })}
      >
        event
      </Icon>
    </IconButton>
  );

  return isVariantCompact ? (
    renderDialogButton()
  ) : (
    <TextField
      className={classNames(classes.textField, muiClasses.textField, {
        [muiClasses.focusedTextField]: focused,
      })}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      helperText={<span className={muiClasses.helperText}>{helperText}</span>}
      InputLabelProps={InputLabelProps}
      InputProps={{
        ...InputProps,
        classes: { input: muiClasses.input },
        endAdornment: (
          <>
            {clearable && value && !disabled && (
              <ClearAdornment
                classes={muiClasses}
                CustomEndAdornment={CustomEndAdornment}
                disabled={disabled}
                onClick={handleClearValue}
              />
            )}
            {!hideDateIcon && (
              <>
                <Divider
                  className={muiClasses.divider}
                  orientation="vertical"
                />
                <InputAdornment position="end">
                  {renderDialogButton()}
                </InputAdornment>
              </>
            )}
          </>
        ),
      }}
      label={label}
      margin={margin}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={e => e.key === 'Enter' && e.target.blur()}
      placeholder={placeholder}
      value={value}
      variant={variant}
    />
  );
};

DateTimeField.propTypes = {
  classes: PropTypes.object,
  clearable: PropTypes.bool,
  onClearValue: PropTypes.func.isRequired,
  CustomEndAdornment: PropTypes.object,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  dateFormat: PropTypes.string,
  dateOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  focused: PropTypes.bool,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  hideDateIcon: PropTypes.bool,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,
  label: PropTypes.string,
  margin: PropTypes.string,
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  placeholder: PropTypes.string,
  timezone: PropTypes.string.isRequired,
  type: PropTypes.string,
  variant: PropTypes.string,
};

DateTimeField.defaultProps = {
  classes: {},
  clearable: false,
  CustomEndAdornment: undefined,
  date: '',
  dateFormat: null,
  dateOnly: false,
  disabled: false,
  error: false,
  focused: false,
  fullWidth: true,
  helperText: undefined,
  hideDateIcon: false,
  InputLabelProps: {},
  InputProps: {},
  label: '',
  margin: 'none',
  maxDate: null,
  minDate: null,
  onChange: () => {},
  onOpen: () => {},
  placeholder: '',
  type: null,
  variant: 'standard',
};

export default DateTimeField;
