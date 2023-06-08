import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { uid } from 'react-uid';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';

import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { TREATMENT_TYPES } from '../../../constants';
import UploadImage from './UploadImage';
import { getUTCDate } from '../../../helpers';

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.grey[100],
    borderRadius: '4px',
    padding: '1rem',
    width: '100%',
    borderBottom: '3px solid #FFFFFF',
    marginBottom: '1.5rem',
    '& .react-datepicker__close-icon::after': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  heading: {
    color: '#000',
    fontWeight: '600',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    borderTop: 'solid 1px #E6E6E6',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
  },
  input: {
    backgroundColor: '#FFF',
  },
  dateInput: {
    borderRadius: '4px',
    padding: '18.5px 14px',
    width: '100%',
    border: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(1),
    fontSize: '16px',
    boxShadow: 'none',
    '&:focus': {
      border: `2px solid ${theme.palette.primary.main}`,
      outline: 'none',
    },
  },
  add: {
    marginLeft: theme.spacing(1),
  },
  closeContainer: {
    width: '100',
    textAlign: 'right',
    marginBottom: theme.spacing(2),
  },
  wrapper: {
    width: '100%',
  },
  select: {
    '& .abtesting-MuiSelect-select': {
      backgroundColor: '#FFF',
    },
  },
}));

const TreatmentFields = ({ name, formValues }) => {
  const classes = useStyles();

  const { setFieldValue } = useFormikContext();

  const [field] = useField(name);
  const treatmentfields = field.value;

  const handleAddFields = () => {
    const values = [...treatmentfields];
    values.push({
      name: '',
      type: '',
      percentage: '',
      segment: '',
      imageUrl: '',
      dateStart: '',
      dateEnd: '',
      isControl: false,
    });
    setFieldValue(field.name, values);
  };

  const handleInputChange = (index, event) => {
    const values = [...treatmentfields];

    switch (event.target.name) {
      case 'treatmentName':
        values[index].name = event.target.value;
        break;
      case 'treatmentType':
        values[index].type = event.target.value;
        break;
      case 'treatmentPercentage':
        values[index].percentage = parseInt(event.target.value, 10);
        break;
      case 'treatmentSegment':
        values[index].segment = event.target.value;
        break;
      case 'treatmentIsControl':
        values[index].isControl = event.target.checked;
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(`No matching ${event.target.name}`);
    }

    setFieldValue(field.name, values);
  };

  const handleDateChange = (index, date, type) => {
    const values = [...treatmentfields];
    const formatDate = date ? getUTCDate(date) : null;
    values[index][type] = formatDate;
    setFieldValue(field.name, values);
  };

  const handleRemoveFields = index => {
    const values = [...treatmentfields];
    values.splice(index, 1);
    setFieldValue(field.name, values);
  };

  const setImgUrl = (index, url) => {
    const values = [...treatmentfields];
    values[index].imageUrl = url;
    setFieldValue(field.name, values);
  };

  const setImgName = (index, imageName) => {
    const values = [...treatmentfields];
    values[index].imageName = imageName;
    setFieldValue(field.name, values);
  };

  const getSelectedDate = (index, formDate, treatmentDate, type) => {
    if (treatmentDate) {
      return new Date(treatmentDate);
    }
    if (formDate) {
      handleDateChange(index, formDate, type);
      return new Date(formDate);
    }
    return '';
  };
  const isSegmentInput = (index, type) => {
    if (type === 'segment') return true;

    const values = [...treatmentfields];
    if (type === 'global' && values[index].segment) {
      values[index].segment = '';
      setFieldValue(field.name, values);
    }
    return false;
  };

  return (
    <Grid item xs={12}>
      <Typography className={classes.heading} variant="h5" component="h2">
        Treatments
        <Button
          className={classes.add}
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleAddFields()}
        >
          Add
        </Button>
      </Typography>
      <Grid container spacing={2}>
        {treatmentfields &&
          treatmentfields.map((inputField, index) => (
            <Grid item xs={12} md={6} key={uid(inputField)}>
              <div className={classes.container}>
                <div className={classes.closeContainer}>
                  <IconButton
                    size="small"
                    onClick={event => handleRemoveFields(index, event)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <TextField
                  className={classes.input}
                  name="treatmentName"
                  label="Name"
                  value={inputField.name}
                  onChange={event => handleInputChange(index, event)}
                  fullWidth
                  variant="outlined"
                />
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      className={classes.input}
                      name="treatmentPercentage"
                      label="Percentage Number"
                      value={inputField.percentage}
                      onChange={event => handleInputChange(index, event)}
                      fullWidth
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="treatmentType">Type</InputLabel>
                      <Select
                        className={classes.select}
                        labelId="treatmentType"
                        name="treatmentType"
                        value={inputField.type}
                        onChange={event => handleInputChange(index, event)}
                        label="Type"
                      >
                        {TREATMENT_TYPES.map(s => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {isSegmentInput(index, inputField.type) && (
                  <TextField
                    className={classes.input}
                    name="treatmentSegment"
                    label="Segment"
                    value={inputField.segment}
                    onChange={event => handleInputChange(index, event)}
                    fullWidth
                    variant="outlined"
                  />
                )}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      className={classes.dateInput}
                      wrapperClassName={classes.wrapper}
                      showTimeSelect
                      placeholderText="Start Date"
                      name="treatmentDateStart"
                      dateFormat="MM/dd/yyyy h:mma"
                      timeFormat="h:mma"
                      selected={getSelectedDate(
                        index,
                        formValues.dateStart,
                        inputField.dateStart,
                        'dateStart'
                      )}
                      onChange={date =>
                        handleDateChange(index, date, 'dateStart')
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      className={classes.dateInput}
                      wrapperClassName={classes.wrapper}
                      showTimeSelect
                      placeholderText="End Date"
                      name="treatmentDateEnd"
                      dateFormat="MM/dd/yyyy h:mma"
                      timeFormat="h:mma"
                      selected={getSelectedDate(
                        index,
                        formValues.dateEnd,
                        inputField.dateEnd,
                        'dateEnd'
                      )}
                      onChange={date =>
                        handleDateChange(index, date, 'dateEnd')
                      }
                    />
                  </Grid>
                </Grid>
                <UploadImage
                  treatmentfields={treatmentfields}
                  setImgUrl={url => setImgUrl(index, url)}
                  setImgName={imageName => setImgName(index, imageName)}
                  imageName={inputField.imageName}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inputField.isControl}
                      onChange={event => handleInputChange(index, event)}
                      name="treatmentIsControl"
                      color="primary"
                    />
                  }
                  label="This is the control treatment."
                />
              </div>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

TreatmentFields.propTypes = {
  name: PropTypes.string.isRequired,
  formValues: PropTypes.object,
};

TreatmentFields.defaultProps = {
  formValues: {},
};

export default TreatmentFields;
