import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, formValueSelector, change } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'dw/core/helpers/component';
import { joinPath } from 'dw/core/helpers/path';
import ModalForm from 'dw/core/components/ModalForm';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { OpenModalButton } from 'dw/core/components/ModalForm/components';
import {
  getBaseURL,
  globalSettingsSelector,
  scheduleOptionsSelector,
  schedulesDataSelector,
  titleEnvOptionsSelector,
  titleEnvsSelector,
} from 'playpants/components/App/selectors';
import { fetchSchedules } from 'playpants/components/App/actions';
import ScheduleStoryForm from './components/ScheduleStoryForm';
import asyncValidate from './asyncValidate';
import {
  categoryOptionsSelector,
  contextOptionsSelector,
  disableContextFieldSelector,
  showContextFieldSelector,
} from './selectors';
import { SCHEDULE_STORY_FORM } from './constants';
import * as actions from './actions';

const ScheduleStoryFormDialog = ({
  action,
  context,
  contextOptions,
  currentProject,
  form,
  handleSubmit,
  icon,
  initialValues,
  onCancel,
  onCreateScheduleStory,
  onFetchCategories,
  onFetchContexts,
  onFetchSchedules,
  onPatchScheduleStory,
  onResetContext,
  showContextField,
  title,
  titleEnvs,
  titleEnvValue,
  ...props
}) => {
  useEffect(() => onFetchSchedules(currentProject), []);
  useEffect(() => {
    onResetContext();
    // Only fetch context if is multi context is enabled globally
    if (showContextField && titleEnvValue) {
      const titleEnv = titleEnvs.find(
        currentTitleEnv => currentTitleEnv.id === titleEnvValue
      );
      onFetchContexts(titleEnv.titleId, titleEnv.shortType);
    }
  }, [titleEnvValue]);
  useEffect(() => {
    if (context) {
      const titleEnv = titleEnvs.find(
        currentTitleEnv => currentTitleEnv.id === titleEnvValue
      );
      const contextName =
        contextOptions.find(c => c.value === context)?.label || null;
      onFetchCategories(titleEnv.titleId, titleEnv.shortType, contextName);
    }
  }, [context]);
  const submitTypes = {
    create: onCreateScheduleStory,
    patch: onPatchScheduleStory,
  };
  const onSubmit = submitTypes[action];
  const formProps = {
    ...props,
    contextOptions,
    disableCategoryField: !context,
    showContextField,
    FormComponent: ScheduleStoryForm,
    formName: form,
    initialValues,
    onCancel: () => onCancel(form),
    onRemoteSubmit: handleSubmit(onSubmit),
    onSubmit: handleSubmit(onSubmit),
    OpenModalComponent: componentProps =>
      icon ? (
        <OpenModalButton {...componentProps} title={title} icon={icon} />
      ) : null,
    maxWidth: 'sm',
    title,
  };

  return <ModalForm {...formProps} />;
};

ScheduleStoryFormDialog.propTypes = {
  action: PropTypes.string.isRequired,
  allowDetachedEvents: PropTypes.bool.isRequired,
  context: PropTypes.number,
  contextOptions: PropTypes.arrayOf(PropTypes.object),
  currentProject: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreateScheduleStory: PropTypes.func.isRequired,
  onFetchCategories: PropTypes.func.isRequired,
  onFetchContexts: PropTypes.func.isRequired,
  onFetchSchedules: PropTypes.func.isRequired,
  onPatchScheduleStory: PropTypes.func.isRequired,
  onResetContext: PropTypes.func.isRequired,
  showContextField: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  titleEnvs: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleEnvValue: PropTypes.number,
};

ScheduleStoryFormDialog.defaultProps = {
  contextOptions: [],
  context: null,
  icon: undefined,
  titleEnvValue: undefined,
};

const mapStateToProps = (state, { form }) => ({
  baseUrl: getBaseURL(state),
  categoryOptions: categoryOptionsSelector(state),
  context: formValueSelector(form)(state, 'context'),
  contextOptions: contextOptionsSelector(state),
  disableContextField: disableContextFieldSelector(state),
  globalSettings: globalSettingsSelector(state),
  scheduleOptions: scheduleOptionsSelector(state),
  schedulesData: schedulesDataSelector(state),
  scheduleValue: formValueSelector(form)(state, 'schedule'),
  showContextField: showContextFieldSelector(state),
  titleEnvOptions: titleEnvOptionsSelector(state),
  titleEnvs: titleEnvsSelector(state),
  titleEnvValue: formValueSelector(form)(state, 'title_env'),
});

const mapDispatchToProps = (dispatch, { form, history }) => ({
  onCancel: () => {
    dispatch(reset(form));
    dispatch(ModalHandlers.close(form));
    dispatch(actions.resetContext());
  },
  onCreateScheduleStory: (values, baseUrl) =>
    dispatch(
      actions.createScheduleStory(values, form, id =>
        history.push(joinPath(baseUrl, id))
      )
    ),
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
  onFetchCategories: (selectedTitleId, envShortType, context) =>
    dispatch(actions.fetchCategories(selectedTitleId, envShortType, context)),
  onFetchContexts: (selectedTitleId, envShortType) =>
    dispatch(actions.fetchContexts(selectedTitleId, envShortType)),
  onFetchSchedules: currentProject =>
    dispatch(fetchSchedules({ project: currentProject.id })),
  onResetContext: () => {
    dispatch(change(form, 'context', null));
    dispatch(actions.resetContext());
  },
  onSetSelectedSchedule: schedule =>
    dispatch(actions.setSelectedSchedule(form, schedule)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onCreateScheduleStory: values =>
    dispatchProps.onCreateScheduleStory(
      values,
      joinPath(stateProps.baseUrl, 'timewarp', 'schedules')
    ),
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

const withReduxForm = reduxForm({
  form: SCHEDULE_STORY_FORM,
  initialValues: {
    name: '',
    description: '',
    category: 'All',
  },
  asyncValidate,
  asyncBlurFields: ['name', 'title_env', 'context'],
  enableReinitialize: true,
});

const ScheduleStoryFormDialogConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
  ScheduleStoryFormDialog,
  mergeProps
);

export default compose(withReduxForm)(ScheduleStoryFormDialogConnected);
