import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Field, FieldArray, Fields, formValues } from 'redux-form';
import Tooltip from '@material-ui/core/Tooltip';

import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Portal from '@material-ui/core/Portal';
import Typography from '@material-ui/core/Typography';
import Input from 'dw/core/components/FormFields/Input';
import Select from 'dw/core/components/FormFields/Select';
import SelectField from 'dw/core/components/Select';
import * as V from 'dw/core/components/FormFields/validation';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import ClipboardTooltip from 'dw/core/components/ClipboardTooltip';

import AddAssignmentAlgorithm from '../AddAssignmentAlgorithm';
import CohortUsersFile from '../CohortUsersFile';
import SelectSegment from '../SelectSegment';
import AddTreatment from '../AddTreatment';
import styles from './index.module.css';
import { FORM_MODE_ENUM } from '../../constants';

const minLength3 = V.minLength(3);

const CohortGroupsBase = props => {
  const {
    cohortOverridesContainer,
    cohortIdx,
    input,
    groupsList,
    cohorts,
    disabled,
  } = props;
  const excludeIds = cohorts.reduce(
    (acc, current) => [...acc, ...get(current, 'groups', [])],
    []
  );
  const cohort = cohorts[cohortIdx];
  if (!cohort) return null;
  const currentGroups = cohort && get(cohort, 'groups', []);
  return (
    <Portal container={cohortOverridesContainer}>
      <div className={styles.groupOverrideRow}>
        <div className={styles.groupOverrideBox}>{cohort.name}</div>
        <div className={styles.groupOverrideBox1}>
          <SelectField
            {...input}
            label="override group"
            multiple
            fullWidth
            disabled={disabled}
          >
            {groupsList
              .filter(
                g =>
                  !excludeIds.includes(g.groupID) ||
                  currentGroups.includes(g.groupID)
              )
              .map(group => (
                <MenuItem value={group.groupID} key={group.groupID}>
                  {group.groupName}
                </MenuItem>
              ))}
          </SelectField>
        </div>
      </div>
    </Portal>
  );
};

CohortGroupsBase.propTypes = {
  cohortOverridesContainer: PropTypes.object,
  cohortIdx: PropTypes.number.isRequired,
  input: PropTypes.object.isRequired,
  groupsList: PropTypes.array.isRequired,
  cohorts: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
};

CohortGroupsBase.defaultProps = {
  cohortOverridesContainer: undefined,
};

const CohortGroups = formValues('cohorts')(CohortGroupsBase);

const renderSourceFields = fields => {
  const { index, formMode, cohortID } = fields;
  const sourceValue = fields.cohorts[index].source.input.value;
  const disabled =
    formMode === FORM_MODE_ENUM.PROPAGATE || formMode === FORM_MODE_ENUM.VIEW;
  return (
    <>
      <Select
        {...fields.cohorts[index].source}
        label="Source"
        className={styles.cohortInput}
        disabled={disabled}
      >
        <MenuItem key="source-manual" value="manual">
          Manual
        </MenuItem>
        <MenuItem key="source-global" value="global">
          Global
        </MenuItem>
        <MenuItem key="source-segment" value="segment">
          Segment
        </MenuItem>
      </Select>

      {sourceValue && sourceValue === 'manual' && (
        <CohortUsersFile
          cohort={fields.cohorts[index]}
          cohortID={cohortID}
          disabled={disabled}
        />
      )}

      {sourceValue && sourceValue === 'segment' && (
        <SelectSegment
          cohort={fields.cohorts[index]}
          validate={V.required}
          disabled={disabled}
        />
      )}

      {sourceValue && sourceValue !== 'manual' && (
        <>
          <Input
            {...fields.cohorts[index].percent}
            label="% percentage"
            disabled={sourceValue === 'manual' || disabled}
            className={styles.cohortInput}
          />
          <Input
            {...fields.cohorts[index].maxMembers}
            label="Max Players"
            disabled={disabled}
            className={styles.cohortInput}
            hidden
          />
        </>
      )}
      {cohortID && (
        <div className={styles.cohortID}>
          <ClipboardTooltip label="Cohort ID" clipboardText={cohortID}>
            Cohort ID: {cohortID.slice(0, 4)}
            <strong>...</strong>
          </ClipboardTooltip>
        </div>
      )}
    </>
  );
};

const renderCohorts = ({
  fields,
  formMode,
  disabled,
  handleFromTreatmentDates,
  handleToTreatmentDates,
  selectedCatchStart,
  selectedCatchEnd,
  cohortOverridesContainer,
  groupsList,
  displayCohortOverrides,
  hasCohortOverridesPermission,
}) => (
  <>
    {formMode !== FORM_MODE_ENUM.PROPAGATE &&
    formMode !== FORM_MODE_ENUM.VIEW ? (
      <Tooltip title="Add Cohort">
        <IconButton
          className={styles.addButton}
          onClick={() => fields.push({ treatments: [{}] })}
        >
          <Icon>playlist_add</Icon>
        </IconButton>
      </Tooltip>
    ) : null}
    {fields.map((cohort, index) => (
      <Paper className={styles.cohortForm} key={cohort} data-cy={cohort}>
        <AppBar position="static" color="default">
          <Toolbar className={styles.cohortProps}>
            {formMode !== FORM_MODE_ENUM.PROPAGATE &&
            formMode !== FORM_MODE_ENUM.VIEW ? (
              <Tooltip title="Delete Cohort">
                <IconButton
                  color="secondary"
                  className={styles.deleteButton}
                  onClick={() => fields.remove(index)}
                >
                  <Icon className={styles.deleteIcon}>highlight_off</Icon>
                </IconButton>
              </Tooltip>
            ) : null}
            <Field
              className={styles.cohortInput}
              name={`${cohort}.name`}
              component={Input}
              label="Name"
              validate={[V.required, minLength3]}
              disabled={disabled}
            />
            {displayCohortOverrides && (
              <Field
                name={`${cohort}.groups`}
                component={CohortGroups}
                cohortIdx={index}
                cohortOverridesContainer={cohortOverridesContainer}
                groupsList={groupsList}
                disabled={disabled || !hasCohortOverridesPermission}
              />
            )}
            <Fields
              component={renderSourceFields}
              className={styles.cohortInput}
              names={[
                `${cohort}.source`,
                `${cohort}.percent`,
                `${cohort}.maxMembers`,
                `${cohort}.segmentID`,
                `${cohort}.fileData`,
              ]}
              disabled={disabled}
              index={index}
              formMode={formMode}
              cohortID={fields.get(index).cohortID}
            />
          </Toolbar>
        </AppBar>
        <AddTreatment
          formMode={formMode}
          disabled={disabled && formMode !== FORM_MODE_ENUM.PROPAGATE}
          cohort={cohort}
          cohortIndex={index}
          handleToTreatmentDates={handleToTreatmentDates}
          handleFromTreatmentDates={handleFromTreatmentDates}
          selectedCatchStart={selectedCatchStart}
          selectedCatchEnd={selectedCatchEnd}
          cohortName={fields.get(index).name}
        />
        <Field
          className={styles.controlCheckbox}
          selectedClassName={styles.controlCheckboxChecked}
          name={`${cohort}.isControl`}
          component={Checkbox}
          disabled={disabled}
          label="control"
          labelPosition="right"
          color="primary"
        />
      </Paper>
    ))}
  </>
);

renderCohorts.propTypes = {
  handleFromTreatmentDates: PropTypes.func,
  handleToTreatmentDates: PropTypes.func,
  selectedCatchStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedCatchEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fields: PropTypes.object.isRequired,
  formMode: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  groupsList: PropTypes.array.isRequired,
  displayCohortOverrides: PropTypes.bool.isRequired,
  hasCohortOverridesPermission: PropTypes.bool.isRequired,
  cohortOverridesContainer: PropTypes.object,
};

renderCohorts.defaultProps = {
  cohortOverridesContainer: undefined,
  handleFromTreatmentDates: null,
  handleToTreatmentDates: null,
  selectedCatchStart: null,
  selectedCatchEnd: null,
};

const AddCohort = ({
  formMode,
  showDetails,
  disabled,
  handleToTreatmentDates,
  handleFromTreatmentDates,
  selectedCatchStart,
  selectedCatchEnd,
  cohortOverridesContainer,
  groupsList,
  displayCohortOverrides,
  hasCohortOverridesPermission,
}) => (
  <div className={styles.cohortContainer}>
    <Typography variant="h4" hidden={!showDetails}>
      Cohorts &amp; Treatments
    </Typography>
    <AddAssignmentAlgorithm
      visible={showDetails}
      disabled={disabled || formMode === FORM_MODE_ENUM.UPDATE}
    />
    <FieldArray
      name="cohorts"
      props={{
        formMode,
        disabled,
        handleToTreatmentDates,
        handleFromTreatmentDates,
        selectedCatchStart,
        selectedCatchEnd,
        cohortOverridesContainer,
        groupsList,
        displayCohortOverrides,
        hasCohortOverridesPermission,
      }}
      component={renderCohorts}
    />
  </div>
);

AddCohort.propTypes = {
  formMode: PropTypes.string.isRequired,
  handleFromTreatmentDates: PropTypes.func,
  handleToTreatmentDates: PropTypes.func,
  selectedCatchStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedCatchEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showDetails: PropTypes.bool,
  disabled: PropTypes.bool,
  groupsList: PropTypes.array,
  cohortOverridesContainer: PropTypes.object,
  displayCohortOverrides: PropTypes.bool,
  hasCohortOverridesPermission: PropTypes.bool,
};

AddCohort.defaultProps = {
  showDetails: true,
  disabled: false,
  selectedCatchStart: null,
  selectedCatchEnd: null,
  handleFromTreatmentDates: null,
  handleToTreatmentDates: null,
  groupsList: [],
  cohortOverridesContainer: undefined,
  displayCohortOverrides: false,
  hasCohortOverridesPermission: false,
};

export default AddCohort;
