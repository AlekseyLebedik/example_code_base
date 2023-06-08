import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import map from 'lodash/map';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import EditorField from './support/EditorField';
import DatePickerField from './support/DatePickerField';
import TreatmentFields from './support/TreatmentFields';
import ChipsField from './support/ChipsField';

import {
  TEST_STATUSES,
  TEST_CATEGORIES,
  TEST_TYPES,
  TEST_TITLES,
} from '../../constants';

import { useStyles } from './styles';

const Form = ({
  handleSubmit,
  submitBtnText,
  handleChange,
  values,
  touched,
  handleBlur,
  errors,
  isSubmitting,
  isValid,
  onCancel,
}) => {
  const classes = useStyles();
  const formEl = useRef(null);

  const isTestDenied = filter(values.approvers, { status: 'denied' });

  useEffect(() => {
    if (isSubmitting && !isValid) {
      formEl.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSubmitting, isValid]);

  return (
    <div className={classes.root} ref={formEl}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.name && !!errors.name}
              helperText={!!touched.name && errors.name}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="owner"
              label="Owner"
              value={values.owner}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.owner && !!errors.owner}
              helperText={!!touched.owner && errors.owner}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                className={classes.select}
                labelId="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                label="Status"
              >
                {TEST_STATUSES.map(s => (
                  <MenuItem
                    key={s}
                    className={classes.selectItem}
                    disabled={s === 'Ready' && isTestDenied.length !== 0}
                    value={s}
                  >
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="status">Title</InputLabel>
              <Select
                className={classes.select}
                labelId="title"
                name="title"
                error={!!touched.title && !!errors.title}
                value={values.title}
                onChange={handleChange}
                label="Title"
              >
                {TEST_TITLES.map(t => (
                  <MenuItem
                    key={t}
                    className={classes.selectItem}
                    value={t.pretty_name}
                  >
                    {t.pretty_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                className={classes.select}
                name="type"
                value={values.type}
                onChange={handleChange}
                label="Type"
                error={!!touched.type && !!errors.type}
              >
                {map(TEST_TYPES, value => (
                  <MenuItem
                    key={value.id}
                    className={classes.selectItem}
                    value={value.id}
                  >
                    {value.pretty_name}
                  </MenuItem>
                ))}
              </Select>
              {!!touched.type && errors.type && (
                <span className={classes.errorText}>{errors.type}</span>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="hypothesis"
              label="Hypothesis"
              multiline
              rows={2}
              value={values.hypothesis}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.hypothesis && !!errors.hypothesis}
              helperText={!!touched.hypothesis && errors.hypothesis}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <EditorField name="summary" label="Summary" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="responsibilities"
              label="Responsibilities"
              multiline
              rows={3}
              value={values.responsibilities}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.responsibilities && !!errors.responsibilities}
              helperText={!!touched.responsibilities && errors.responsibilities}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerField placeholder="Start date" name="dateStart" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerField placeholder="End date" name="dateEnd" />
          </Grid>
          <Grid item xs={12}>
            <ChipsField
              value={values.categories}
              handleChange={handleChange}
              touched={touched.categories}
              error={errors.categories}
              name="categories"
              id="cateogry-chips"
              label="Categories"
              options={TEST_CATEGORIES}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="kpi"
              label="KPI"
              value={values.kpi}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.kpi && !!errors.kpi}
              helperText={!!touched.kpi && errors.kpi}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="moreUrl"
              label="Learn more url"
              value={values.moreUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!touched.moreUrl && !!errors.moreUrl}
              helperText={!!touched.moreUrl && errors.moreUrl}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <TreatmentFields
            formValues={values}
            formTouched={touched}
            name="treatments"
          />
          <div className={classes.btnContainer}>
            <Button
              className={classes.submitBtn}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {submitBtnText}
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};

Form.defaultProps = {
  isSubmitting: false,
  isValid: true,
  submitBtnText: 'Submit',
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  submitBtnText: PropTypes.string,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
};

export default Form;
