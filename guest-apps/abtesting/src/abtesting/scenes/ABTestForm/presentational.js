import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { ABTESTING_ADD_COHORT_OVERRIDES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useABTestingProjectPermission } from 'dw/core/hooks';
import { capitalizeFirst } from 'dw/core/helpers/string';
import Input from 'dw/core/components/FormFields/Input';
import Collapse from '@material-ui/core/Collapse';
import DateTimePicker from 'dw/core/components/DateTimePicker/LocalizedFormFieldDateTimePicker';
import Select from 'dw/core/components/FormFields/Select';
import NonFieldError from 'dw/core/components/FormFields/NonFieldError';
import * as V from 'dw/core/components/FormFields/validation';
import MainForm from 'dw/core/components/MainForm';
import Loading from 'dw/core/components/Loading';
import { useContextListHook } from 'abtesting/scenes/hooks';
import ActionsPanel from 'abtesting/components/ActionsPanel';
import StatusTableField from 'abtesting/components/StatusTableField';
import AddCohort from './components/AddCohort';
import styles from './presentational.module.css';
import { FORM_MODE_ENUM } from './constants';

const minLength3 = V.minLength(3);

const CohortOverrides = ({
  setCohortOverridesContainer,
  displayCohortOverrides,
}) =>
  displayCohortOverrides ? (
    <Accordion className={styles.expanderContainer} defaultExpanded>
      <AccordionSummary
        expandIcon={<Icon>expand_more</Icon>}
        classes={{
          content: styles.titleContent,
          expandIcon: styles.expandIcon,
        }}
      >
        <div className={styles.primaryHeading}>Cohort Overrides</div>
      </AccordionSummary>
      <AccordionDetails classes={{ root: styles.details }}>
        <div className={styles.groupOverride}>
          <div className={styles.groupOverrideHeader}>
            <div className={styles.groupOverrideBox}>Cohort</div>
            <div className={styles.groupOverrideBox}>Group Override</div>
          </div>
        </div>
        <div
          className={styles.groupOverride}
          ref={setCohortOverridesContainer}
        />
      </AccordionDetails>
    </Accordion>
  ) : null;

CohortOverrides.propTypes = {
  setCohortOverridesContainer: PropTypes.func,
  displayCohortOverrides: PropTypes.bool,
};
CohortOverrides.defaultProps = {
  displayCohortOverrides: false,
  setCohortOverridesContainer: undefined,
};

const renderErrors = (errors, parents = []) =>
  Object.entries(errors).map(([key, value]) => {
    if (!key || !value) {
      return null;
    }
    if (Array.isArray(value)) {
      return (
        <div key={`error_${key}`}>
          {value
            .filter(x => x)
            .map(error => renderErrors(error, [...parents, key]))}
        </div>
      );
    }
    if (value instanceof Object) {
      return (
        <div key={`error_${key}`}>{renderErrors(value, [...parents, key])}</div>
      );
    }
    const keyName = (key.startsWith('_') ? [...parents] : [...parents, key])
      .map(x => capitalizeFirst(x))
      .join(' > ');
    return (
      <div key={`error_${key}`} className={styles.error}>
        {keyName} : {value}
      </div>
    );
  });

const formMode = mode => {
  switch (mode) {
    case FORM_MODE_ENUM.VIEW:
      return 'View';
    case FORM_MODE_ENUM.UPDATE:
      return 'Update';
    case FORM_MODE_ENUM.CLONE:
      return 'Clone';
    case FORM_MODE_ENUM.PROPAGATE:
      return 'Propagate';
    case FORM_MODE_ENUM.NEW:
    default:
      return 'New';
  }
};

const ABTestForm = props => {
  const {
    categoriesList,
    groupsList,
    disableFormContext,
    firstPartiesList,
    history,
    selectedCatchStart,
    selectedCatchEnd,
    handleSubmit,
    handlerAddTest,
    handleToTreatmentDates,
    handleFromTreatmentDates,
    saveTestSubmit,
    formErrors,
    submitFailed,
    mode,
    changeShowDetails,
    propagateShowDetails,
    test,
    viewOnly,
    cohortOverridesContainer,
    setCohortOverridesContainer,
    displayCohortOverrides,
    loading,
    saving,
    titleID,
  } = props;
  const [loadingPermission, , result] = useABTestingProjectPermission(
    ABTESTING_ADD_COHORT_OVERRIDES,
    titleID,
    false
  );
  const hasCohortOverridesPermission = result?.data?.permission;
  const [loadingList, contextList] = useContextListHook(props);
  const hidePropagateDetails =
    mode === FORM_MODE_ENUM.PROPAGATE && !propagateShowDetails;
  const showDetails =
    mode !== FORM_MODE_ENUM.PROPAGATE ||
    (mode === FORM_MODE_ENUM.PROPAGATE && propagateShowDetails);
  const showStatus =
    (mode === FORM_MODE_ENUM.VIEW || mode === FORM_MODE_ENUM.UPDATE) &&
    test &&
    test.status;
  const showActions = mode === FORM_MODE_ENUM.VIEW && test && test.name;
  const title =
    test && test.testID
      ? `${formMode(mode)} - ${test.testID}`
      : `${formMode(mode)}`;
  const disableFirstParties =
    (viewOnly && mode !== FORM_MODE_ENUM.PROPAGATE) ||
    firstPartiesList.length === 0;
  const disableCategories = viewOnly || categoriesList.length === 0;

  if (loading || loadingPermission || loadingList) {
    return <Loading />;
  }

  return (
    <MainForm
      handleSubmit={handleSubmit}
      onSubmit={saveTestSubmit}
      containerClass={styles.container}
    >
      {showActions && (
        <div className={styles.actions}>
          <ActionsPanel record={test} />
        </div>
      )}
      <div className={styles.formHeader}>
        <Typography variant="h5">{title}</Typography>
        {showStatus && (
          <div className={styles.status}>
            <StatusTableField status={test.status} />
          </div>
        )}
      </div>
      <Typography className={styles.formModeTitle} variant="h4">
        Details
      </Typography>
      <Field
        className={styles.fieldForm}
        name="context"
        component={Select}
        label="Context"
        format={value => (!value && !Array.isArray(value) ? [] : value)}
        validate={
          mode === FORM_MODE_ENUM.PROPAGATE
            ? [V.required, V.isDirty]
            : V.required
        }
        fullWidth
        disabled={disableFormContext}
      >
        {contextList.map(c => (
          <MenuItem key={`context-${c.id}`} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Field>
      <Collapse in={firstPartiesList.length > 0}>
        <Field
          name="first_parties"
          className={styles.fieldForm}
          component={Select}
          label="First parties"
          format={value => (!value && !Array.isArray(value) ? [] : value)}
          fullWidth
          multiple
          disabled={disableFirstParties}
        >
          {firstPartiesList.map(([name, value]) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </Field>
      </Collapse>
      {mode === FORM_MODE_ENUM.PROPAGATE ? (
        <div className={styles.showDetailsButtonContainer}>
          <Button
            className={styles.showDetailsButton}
            onClick={() => changeShowDetails(!propagateShowDetails)}
          >
            {propagateShowDetails ? 'Collapse Details' : 'Show Details'}
          </Button>
        </div>
      ) : null}
      <Collapse
        in={showDetails}
        timeout={mode === FORM_MODE_ENUM.PROPAGATE ? 1000 : 0}
      >
        <Field
          name="name"
          component={Input}
          label="Test Name"
          validate={[V.required, minLength3]}
          fullWidth
          disabled={viewOnly}
        />
        <Field
          name="purpose"
          // name to be update later when all locations can be validated
          component={Input}
          label="Summary"
          multiline
          fullWidth
          disabled={viewOnly}
        />
        <Field
          name="categories"
          component={Select}
          placeholder=" "
          label="Category"
          format={value => (!value && !Array.isArray(value) ? [] : value)}
          fullWidth
          disabled={disableCategories}
          multiple
        >
          {categoriesList.map(c => (
            <MenuItem key={`context-${c}`} value={c}>
              {c}
            </MenuItem>
          ))}
        </Field>
        <Typography variant="h4">Contacts</Typography>
        <Field
          name="creator"
          component={Input}
          label="Creator"
          fullWidth
          validate={[V.email]}
          disabled={viewOnly}
        />
        <Field
          name="organisation"
          component={Input}
          label="Company"
          fullWidth
          disabled={viewOnly}
        />
        <Field
          name="data_scientist"
          component={Input}
          label="Data Scientist"
          fullWidth
          validate={[V.email]}
          disabled={viewOnly}
        />
        <Typography variant="h4">Comments</Typography>
        <Field
          name="comments"
          component={Input}
          label="Comments / Links"
          fullWidth
          multiline
          disabled={viewOnly}
        />
        <Typography variant="h4">Enrollments</Typography>
      </Collapse>
      <div className={styles.enrollments}>
        <div>
          <Field
            name="catchStart"
            component={DateTimePicker}
            fullWidth
            clearable
            label="Enrollment Period From"
            returnTimestamp
            validate={[V.required]}
            minDate={selectedCatchStart || 'now'}
            maxDate={selectedCatchEnd}
            disabled={viewOnly && mode !== FORM_MODE_ENUM.PROPAGATE}
          />
        </div>
        <div>
          <Field
            name="catchEnd"
            component={DateTimePicker}
            fullWidth
            returnTimestamp
            clearable
            label="Enrollment Period To"
            validate={[V.required]}
            minDate={selectedCatchStart || 'now'}
            disabled={viewOnly && mode !== FORM_MODE_ENUM.PROPAGATE}
          />
        </div>
      </div>
      <Collapse
        in={showDetails}
        timeout={mode === FORM_MODE_ENUM.PROPAGATE ? 1000 : 0}
      />
      <div className={styles.separator} />
      <AddCohort
        formMode={mode}
        showDetails={!hidePropagateDetails}
        handleToTreatmentDates={handleToTreatmentDates}
        handleFromTreatmentDates={handleFromTreatmentDates}
        selectedCatchStart={selectedCatchStart}
        selectedCatchEnd={selectedCatchEnd}
        disabled={viewOnly}
        cohortOverridesContainer={cohortOverridesContainer}
        groupsList={groupsList}
        displayCohortOverrides={displayCohortOverrides}
        hasCohortOverridesPermission={hasCohortOverridesPermission}
      />
      <CohortOverrides
        setCohortOverridesContainer={setCohortOverridesContainer}
        displayCohortOverrides={displayCohortOverrides}
      />
      <div className={styles.footer}>
        <div className={styles.formError}>
          {submitFailed ? (
            <div className={styles.errorContainer}>
              {renderErrors(formErrors)}
            </div>
          ) : null}
          <Field
            className={styles.fieldForm}
            name="error"
            component={NonFieldError}
          />
        </div>
        {(!viewOnly || mode === FORM_MODE_ENUM.PROPAGATE) && (
          <>
            <Button
              variant="contained"
              className={styles.footerButton}
              onClick={() => history.push('/abtesting/schedule')}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className={styles.footerButton}
              color="primary"
              onClick={() => handlerAddTest()}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </>
        )}
      </div>
    </MainForm>
  );
};

ABTestForm.propTypes = {
  categoriesList: PropTypes.array,
  groupsList: PropTypes.array,
  firstPartiesList: PropTypes.array,
  disableFormContext: PropTypes.bool,
  mode: PropTypes.string,
  history: PropTypes.object.isRequired,
  handleToTreatmentDates: PropTypes.func,
  handleFromTreatmentDates: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  handlerAddTest: PropTypes.func.isRequired,
  saveTestSubmit: PropTypes.func,
  changeShowDetails: PropTypes.func,
  selectedCatchStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectedCatchEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  formErrors: PropTypes.object,
  submitFailed: PropTypes.bool,
  propagateShowDetails: PropTypes.bool,
  test: PropTypes.object,
  viewOnly: PropTypes.bool,
  cohortOverridesContainer: PropTypes.object,
  setCohortOverridesContainer: PropTypes.func,
  displayCohortOverrides: PropTypes.bool,
  loading: PropTypes.bool,
  saving: PropTypes.bool,
  titleID: PropTypes.string,
};

ABTestForm.defaultProps = {
  categoriesList: [],
  groupsList: [],
  firstPartiesList: [],
  disableFormContext: false,
  mode: FORM_MODE_ENUM.NEW,
  saveTestSubmit: undefined,
  selectedCatchStart: null,
  selectedCatchEnd: null,
  handleToTreatmentDates: null,
  handleFromTreatmentDates: null,
  formErrors: {},
  submitFailed: false,
  propagateShowDetails: false,
  changeShowDetails: () => {},
  test: null,
  viewOnly: false,
  cohortOverridesContainer: undefined,
  setCohortOverridesContainer: undefined,
  displayCohortOverrides: false,
  loading: false,
  saving: false,
  titleID: undefined,
};

export default ABTestForm;
