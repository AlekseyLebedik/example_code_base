import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import set from 'lodash/set';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { IntegerField, StringField } from '../Fields';
import BuildSummary from './components/BuildSummary';
import { doesFormHaveError } from './helpers';
import { THUNDERPANTS_PARAMS_FORM_NAME } from './constants';
import * as styles from './presentational.module.css';

const TargetCheckboxes = ({ formState, setFormState, targets }) => (
  <FormControl required error={formState.target.error}>
    <FormLabel>Target(s)</FormLabel>
    <FormGroup>
      {targets.map(({ name }) => (
        <FormControlLabel
          checked={formState[name]}
          control={
            <Checkbox
              data-cy="targetCheckbox"
              color="default"
              onChange={() =>
                setFormState(
                  set(
                    formState,
                    `target.value.${name}`,
                    !get(formState, `target.${name}`)
                  )
                )
              }
            />
          }
          key={`checkbox-${name}`}
          label={name}
          error={formState.target.error || undefined}
        />
      ))}
    </FormGroup>
  </FormControl>
);

TargetCheckboxes.propTypes = {
  formState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const ThunderpantsDeploymentFormStateless = ({
  activityBuildList,
  formState,
  isFormDeploymentType,
  onSubmit,
  schema,
  setFormState,
  summaryData,
  targets,
}) => {
  const { target } = formState;
  const basePath = 'userParams';
  const renderTargetsField = () => (
    <>
      {isFormDeploymentType ? (
        <TargetCheckboxes
          formState={formState}
          setFormState={setFormState}
          targets={targets}
        />
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6">
            {Object.keys(target.value).map(key => key)}
          </Typography>
        </Grid>
      )}
    </>
  );

  const renderUserParamsFields = () => (
    <>
      {schema.map(schemaEl => {
        const { type } = schemaEl;
        switch (type) {
          case 'integer': {
            return (
              <Grid item key={`grid-${schemaEl.name}`} xs={12}>
                <IntegerField
                  {...schemaEl}
                  basePath={basePath}
                  formState={formState}
                  key={`intField-${schemaEl.name}`}
                  setFormState={setFormState}
                />
              </Grid>
            );
          }
          case 'string': {
            return (
              <Grid item key={`grid-${schemaEl.name}`} xs={12}>
                <StringField
                  {...schemaEl}
                  basePath={basePath}
                  formState={formState}
                  key={`strField-${schemaEl.name}`}
                  setFormState={setFormState}
                />
              </Grid>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </>
  );

  return (
    <form
      id={THUNDERPANTS_PARAMS_FORM_NAME}
      onSubmit={e => {
        e.preventDefault();
        if (!doesFormHaveError(formState, setFormState)) {
          onSubmit({ activityBuildList, data: formState });
        }
      }}
    >
      <Grid container className={styles.gridContainer}>
        <Grid item xs={4}>
          {renderTargetsField()}
          {renderUserParamsFields()}
        </Grid>
        <Grid item xs={8}>
          <BuildSummary summaryData={summaryData} />
        </Grid>
      </Grid>
    </form>
  );
};

ThunderpantsDeploymentFormStateless.propTypes = {
  activityBuildList: PropTypes.arrayOf(PropTypes.object).isRequired,
  formState: PropTypes.object.isRequired,
  isFormDeploymentType: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFormState: PropTypes.func.isRequired,
  summaryData: PropTypes.object.isRequired,
  targets: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
};

export default ThunderpantsDeploymentFormStateless;
