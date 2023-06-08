import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import {
  AdvancedScheduleField,
  CategoryField,
  ContextField,
  DescriptionField,
  NameField,
  TitleEnvField,
} from 'playpants/components/StoryFormComponents';

const ScheduleStoryForm = props => {
  const {
    allowDetachedEvents,
    asyncValidating,
    categoryOptions,
    contextOptions,
    disableCategoryField,
    disableContextField,
    formName,
    initialValues,
    onSetSelectedSchedule,
    onSubmit,
    onUploadStorySchedule,
    scheduleOptions,
    schedulesData,
    scheduleValue,
    showContextField,
    titleEnvOptions,
  } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NameField
            asyncValidating={asyncValidating && asyncValidating === 'name'}
          />
        </Grid>
        <Grid item xs={12}>
          <DescriptionField />
        </Grid>
        <Grid item xs={12}>
          <TitleEnvField
            options={titleEnvOptions}
            asyncValidating={asyncValidating && asyncValidating === 'title_env'}
          />
        </Grid>
        {showContextField && (
          <Grid item xs={12}>
            <ContextField
              disabled={disableContextField}
              options={contextOptions}
              asyncValidating={asyncValidating && asyncValidating === 'context'}
            />
          </Grid>
        )}
        {showContextField && (
          <Grid item xs={12}>
            <CategoryField
              disabled={disableCategoryField}
              options={categoryOptions}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <AdvancedScheduleField
            allowDetachedEvents={allowDetachedEvents}
            defaultValue={initialValues.schedule}
            formName={formName}
            handleOnLoadComplete={onUploadStorySchedule}
            onSetSelectedSchedule={onSetSelectedSchedule}
            options={scheduleOptions}
            schedulesData={schedulesData}
            value={scheduleValue}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

ScheduleStoryForm.propTypes = {
  allowDetachedEvents: PropTypes.bool.isRequired,
  asyncValidating: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  categoryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  contextOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  disableCategoryField: PropTypes.bool.isRequired,
  disableContextField: PropTypes.bool.isRequired,
  formName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSetSelectedSchedule: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUploadStorySchedule: PropTypes.func.isRequired,
  scheduleOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  schedulesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  scheduleValue: PropTypes.number,
  showContextField: PropTypes.bool.isRequired,
  titleEnvOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ScheduleStoryForm.defaultProps = {
  asyncValidating: false,
  scheduleValue: undefined,
};

export default ScheduleStoryForm;
