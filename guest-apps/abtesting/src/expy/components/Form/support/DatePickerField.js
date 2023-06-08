import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles } from '@material-ui/core/styles';

import DatePicker from 'react-datepicker';

import { getUTCDate } from '../../../helpers';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    '& .react-datepicker__close-icon::after': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  popper: {
    zIndex: '2 !important',
  },
  input: {
    borderRadius: '4px',
    padding: '18.5px 14px',
    width: '100%',
    border: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(1),
    fontSize: '16px',
    boxShadow: 'none',
    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
      outline: 'none',
    },
  },
}));

const DatePickerField = ({ name, placeholder }) => {
  const classes = useStyles();

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div>
      <DatePicker
        className={classes.input}
        wrapperClassName={classes.wrapper}
        popperClassName={classes.popper}
        showTimeSelect
        name={field.name}
        placeholderText={placeholder}
        dateFormat="MM/dd/yyyy h:mma"
        timeFormat="h:mma"
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          const formatVal = val ? getUTCDate(val) : null;
          setFieldValue(field.name, formatVal);
        }}
        isClearable
      />
    </div>
  );
};

DatePickerField.defaultProps = {
  placeholder: '',
};

DatePickerField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default DatePickerField;
