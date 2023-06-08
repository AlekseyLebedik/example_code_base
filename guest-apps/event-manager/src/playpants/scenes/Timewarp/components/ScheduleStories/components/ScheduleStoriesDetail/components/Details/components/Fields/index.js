import React, { useEffect, useState } from 'react';
import { Form, reduxForm, formValueSelector, submit } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
  globalSettingsSelector,
  scheduleOptionsSelector,
  schedulesDataSelector,
  titleEnvOptionsSelector,
  titleEnvsSelector,
} from 'playpants/components/App/selectors';
import CategoryField from 'playpants/components/StoryFormComponents/components/CategoryField';
import NameField from 'playpants/components/StoryFormComponents/components/NameField';
import DescriptionField from 'playpants/components/StoryFormComponents/components/DescriptionField';
import TitleEnvField from 'playpants/components/StoryFormComponents/components/TitleEnvField';
import ConfirmDialog from 'dw/core/components/Confirm';
import { fetchSchedules } from 'playpants/components/App/actions';
import CreatedBy from './components/CreatedBy';
import Status from './components/Status';
import Context from './components/Context';
import FormattedTimestamp from './components/FormattedTimestamp';
import ScheduleField from './components/ScheduleFieldWrapper';
import {
  categoryOptionsSelector,
  categoriesFetchDataSelector,
  selectedScheduleStoryContextNameSelector,
} from '../../selectors';
import { fetchCategories, fetchContexts } from '../../actions';
import { SCHEDULE_STORY_DETAIL_FORM } from './constants';
import * as actions from './actions';

export const FieldsBase = props => {
  const {
    categoryFetchOptions,
    categoryOptions,
    change,
    currentProject,
    eventCount,
    form,
    handleSubmit,
    initialValues,
    isSafe,
    onFetchCategories,
    onFetchContexts,
    onFetchSchedules,
    onPatchScheduleStory,
    onSetSelectedSchedule,
    onUploadStorySchedule,
    scheduleOptions,
    schedulesData,
    selectedScheduleStory,
    selectedScheduleStoryContextName,
    titleEnvOptions,
    titleEnvs,
    values,
  } = props;
  const [isConfirmScheduleChangeOpen, setConfirmScheduleChangeOpen] =
    useState(false);

  const [metaScheduleValues, setMetaScheduleValues] = useState({});
  useEffect(() => {
    onFetchSchedules(currentProject);
  }, []);
  useEffect(() => {
    if (selectedScheduleStory.title_env) {
      const titleEnv = titleEnvs.find(
        currentTitleEnv =>
          currentTitleEnv.id === selectedScheduleStory.title_env
      );
      onFetchContexts(titleEnv.titleId, titleEnv.shortType);
    }
  }, [selectedScheduleStory.title_env]);
  useEffect(() => {
    if (categoryFetchOptions.context) {
      const { titleId, env, context } = categoryFetchOptions;
      onFetchCategories(titleId, env, context);
    }
  }, [categoryFetchOptions.context]);

  const handleChange = (_event, newValue, previousValue, name) => {
    if (newValue !== previousValue || newValue !== initialValues[name]) {
      onPatchScheduleStory({ ...initialValues, [name]: newValue });
    }
  };

  const customHandleChange = (newValue, previousValue, name) => {
    setConfirmScheduleChangeOpen(true);
    setMetaScheduleValues({ newValue, previousValue, name });
  };

  const revertSchedulePrevious = () => {
    change(metaScheduleValues.name, metaScheduleValues.previousValue);
    setConfirmScheduleChangeOpen(false);
  };

  return (
    <div key={selectedScheduleStory.id}>
      <ConfirmDialog
        open={isConfirmScheduleChangeOpen}
        title="Confirm Story Schedule Change"
        content={`You are about to destroy and replace all the existing events (${eventCount}) on this story. Do you want to continue?`}
        destructive
        onConfirm={e =>
          handleChange(
            e,
            metaScheduleValues.newValue,
            metaScheduleValues.previousValue,
            metaScheduleValues.name
          )
        }
        onHide={revertSchedulePrevious}
      />
      <Form onSubmit={handleSubmit(onPatchScheduleStory)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NameField onBlur={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <DescriptionField onBlur={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Status status={selectedScheduleStory.state} />
          </Grid>
          <Grid item xs={12}>
            <Context context={selectedScheduleStoryContextName} />
          </Grid>
          <Grid item xs={12}>
            <CategoryField
              allowNull={false}
              options={categoryOptions}
              onChange={handleChange}
              disabled={
                !isSafe.toEditSchedule || initialValues.category === 'All'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <ScheduleField
              defaultValue={initialValues.schedule}
              formName={form}
              handleOnLoadComplete={onUploadStorySchedule}
              options={scheduleOptions}
              value={values.schedule}
              isClearable={false}
              customHandleScheduleChange={customHandleChange}
              isDisabled={!isSafe.toEditSchedule}
              disabledTooltip={isSafe.unsafeReason}
              schedulesData={schedulesData}
              onSetSelectedSchedule={onSetSelectedSchedule}
            />
          </Grid>
          <Grid item xs={12}>
            <TitleEnvField
              options={titleEnvOptions}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormattedTimestamp
              timestamp={selectedScheduleStory.start_at}
              label="Start At"
            />
          </Grid>
          <Grid item xs={12}>
            <FormattedTimestamp
              timestamp={selectedScheduleStory.end_at}
              label="End At"
            />
          </Grid>
          <Grid item xs={12}>
            <CreatedBy createdBy={selectedScheduleStory.created_by} />
          </Grid>
          <Grid item xs={12}>
            <FormattedTimestamp
              timestamp={selectedScheduleStory.created_at}
              label="Created At"
            />
          </Grid>
          <Grid item xs={12}>
            <FormattedTimestamp
              timestamp={selectedScheduleStory.updated_at}
              label="Updated At"
            />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

FieldsBase.propTypes = {
  isSafe: PropTypes.shape({
    toEditSchedule: PropTypes.bool,
    unsafeReason: PropTypes.string,
  }).isRequired,
  categoryFetchOptions: PropTypes.object.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  change: PropTypes.func.isRequired,
  currentProject: PropTypes.object.isRequired,
  eventCount: PropTypes.number.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  onFetchCategories: PropTypes.func.isRequired,
  onFetchContexts: PropTypes.func.isRequired,
  onFetchSchedules: PropTypes.func.isRequired,
  onPatchScheduleStory: PropTypes.func.isRequired,
  onSetSelectedSchedule: PropTypes.func.isRequired,
  onUploadStorySchedule: PropTypes.func.isRequired,
  scheduleOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  schedulesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedScheduleStory: PropTypes.object.isRequired,
  selectedScheduleStoryContextName: PropTypes.string.isRequired,
  titleEnvOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleEnvs: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.object.isRequired,
};
const mapStateToProps = (state, { form }) => ({
  categoryOptions: categoryOptionsSelector(state),
  categoryFetchOptions: categoriesFetchDataSelector(state),
  globalSettings: globalSettingsSelector(state),
  values: formValueSelector(form)(
    state,
    'name',
    'description',
    'title_env',
    'schedule',
    'storyId'
  ),
  schedulesData: schedulesDataSelector(state),
  scheduleOptions: scheduleOptionsSelector(state),
  selectedScheduleStoryContextName:
    selectedScheduleStoryContextNameSelector(state),
  titleEnvOptions: titleEnvOptionsSelector(state),
  titleEnvs: titleEnvsSelector(state),
});

const mapDispatchToProps = (dispatch, { form }) => ({
  onSubmit: () => dispatch(submit(form)),
  onPatchScheduleStory: values =>
    dispatch(actions.patchScheduleStory(values, form)),
  onUploadStorySchedule: (
    scheduleFile,
    clearFileCb,
    closeDrawerCb,
    setAsDefaultCb,
    scheduleType
  ) =>
    dispatch(
      actions.uploadStorySchedule({
        scheduleType,
        scheduleFormData: scheduleFile,
        clearFileCb,
        closeDrawerCb,
        setAsDefaultCb,
      })
    ),
  onFetchSchedules: currentProject =>
    dispatch(fetchSchedules({ project: currentProject.id })),
  onFetchCategories: (titleEnvId, envShortType, context) =>
    dispatch(fetchCategories(titleEnvId, envShortType, context)),
  onFetchContexts: (titleEnvId, envShortType) =>
    dispatch(fetchContexts(titleEnvId, envShortType)),
  onSetSelectedSchedule: schedule =>
    dispatch(actions.setSelectedSchedule(form, schedule)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onUploadStorySchedule: (
    scheduleFile,
    clearFileCb,
    closeDrawerCb,
    setAsDefaultCb
  ) =>
    dispatchProps.onUploadStorySchedule(
      scheduleFile,
      clearFileCb,
      closeDrawerCb,
      setAsDefaultCb,
      stateProps.globalSettings.schedule_type
    ),
});

export default reduxForm({
  form: SCHEDULE_STORY_DETAIL_FORM,
  enableReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps, mergeProps)(FieldsBase));
