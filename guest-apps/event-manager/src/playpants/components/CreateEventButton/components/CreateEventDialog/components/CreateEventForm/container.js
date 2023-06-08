import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import isEmpty from 'lodash/isEmpty';
import {
  eventTypeSettingsSelector,
  groupStoriesSelector,
  isConfiguredSelector,
  platformSettingsSelector,
  templatesDataSelector,
} from 'playpants/components/App/selectors';
import { useEMPermissionsResult } from 'playpants/hooks';
import { selectedGroupStorySelector } from 'playpants/scenes/GroupStories/selectors';
import { HOUR } from 'playpants/components/ScheduleComponent/constants';
import {
  defaultStartDateSelector,
  repeatEventsEnabledSelector,
} from 'playpants/components/ScheduleComponent/selectors';
import * as actions from 'playpants/components/ScheduleComponent/actions';

import StatelessCreateEventForm from './presentational';

export const CreateEventForm = props => {
  const permissions = useEMPermissionsResult();
  const {
    change,
    clearTagEntry,
    endDate,
    eventEnvType,
    eventType,
    eventTypeSettings,
    fetchEventBySourceEventId,
    freeGlobalLocked,
    globalChecked,
    initializeTags,
    initialValues,
    onSetSelectedTemplate,
    repeatingEvent,
    requireGlobalCheckbox,
    reset,
    selectedGroupStory,
    selectedTemplate,
    startDate,
    templatesData,
    templateSourceEventData,
    toggleTypeOn,
  } = props;

  useEffect(() => {
    if (!isEmpty(selectedGroupStory)) {
      change('story', selectedGroupStory.id);
    }
  }, [selectedGroupStory]);

  // Changes the form values to make the template data
  const populateFormWithNewTemplate = () => {
    change('eventName', templateSourceEventData.title);
    change('eventNotes', templateSourceEventData.note);
    change('eventEnvType', templateSourceEventData.env_type);
    initializeTags(templateSourceEventData.manual_tags);
  };

  // Resets all fields
  const resetFormField = () => {
    reset();
    if (!endDate) {
      change('eventDates', { startDate, endDate: null });
    }
    clearTagEntry();
  };

  // Clear relevant form fields selection on event type toggle
  useEffect(() => {
    if (toggleTypeOn) {
      onSetSelectedTemplate();
      change('templates', null);
      if (eventEnvType === '') {
        change('eventEnvType', 'Unknown');
      }
    } else {
      change('eventType', '');
      if (eventEnvType === 'Unknown') {
        change('eventEnvType', '');
      }
    }
  }, [toggleTypeOn]);

  // Lock globalCheckbox if a event type with global_only is selected
  useEffect(() => {
    if (eventType) {
      const typeSettings = eventTypeSettings.find(t => t.key === eventType);
      if (typeSettings && typeSettings.global_only) {
        requireGlobalCheckbox();
      } else {
        freeGlobalLocked();
      }
    }
  }, [eventType]);

  // Clear projects selections on global cross project selection
  useEffect(() => {
    if (globalChecked) {
      change('eventProjects', null);
    }
  }, [globalChecked]);

  // Fetches the selected template's event
  useEffect(() => {
    if (!isEmpty(selectedTemplate)) {
      fetchEventBySourceEventId(selectedTemplate.source_event);
    }
  }, [selectedTemplate]);

  // Populates the form with the new template data
  useEffect(() => {
    if (!isEmpty(templateSourceEventData)) {
      populateFormWithNewTemplate();
    }
  }, [templateSourceEventData]);

  // Changes the end date field depending on if there is a valid selected template
  const setFormEndDateWithDuration = newSelectedTemplate => {
    if (!endDate) {
      change('eventDates', {
        startDate,
        endDate: newSelectedTemplate.duration
          ? startDate + newSelectedTemplate.duration
          : null,
      });
    }
  };

  const getSelectedTemplate = sourceEventId =>
    templatesData.find(setting => setting.source_event === sourceEventId);

  const onChangeSelectedTemplate = (_, sourceEventId) => {
    // Find the selected template
    const newSelectedTemplate = getSelectedTemplate(sourceEventId);
    // Set the selectedTemplate
    onSetSelectedTemplate(newSelectedTemplate);
    // If selected template is not found, reset the fields
    if (!newSelectedTemplate) {
      resetFormField();
    } else {
      // Change the form inputs
      setFormEndDateWithDuration(newSelectedTemplate);
    }
  };

  const handleStoryChange = e => {
    change('story', e ? e.value : e);
  };

  return (
    <StatelessCreateEventForm
      {...props}
      permissions={permissions}
      handleStoryChange={handleStoryChange}
      onChangeSelectedTemplate={onChangeSelectedTemplate}
      repeatingEvent={repeatingEvent}
      filteredTemplatesData={templatesData.filter(template =>
        initialValues.isSchedule ? template.is_schedule : !template.is_schedule
      )}
    />
  );
};

CreateEventForm.propTypes = {
  change: PropTypes.func.isRequired,
  clearTagEntry: PropTypes.func.isRequired,
  createEventDefaultStartDate: PropTypes.number.isRequired,
  endDate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  eventEnvType: PropTypes.string,
  eventType: PropTypes.string,
  eventTypeSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchEventBySourceEventId: PropTypes.func.isRequired,
  freeGlobalLocked: PropTypes.func.isRequired,
  globalChecked: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initializeTags: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isConfigured: PropTypes.object.isRequired,
  onSetSelectedTemplate: PropTypes.func.isRequired,
  repeatEndMinDate: PropTypes.number,
  requireGlobalCheckbox: PropTypes.func.isRequired,
  repeatingEvent: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  selectedGroupStory: PropTypes.object.isRequired,
  selectedTemplate: PropTypes.object.isRequired,
  startDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  submitFailed: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  templatesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  templateSourceEventData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  templateSourceEventLoading: PropTypes.bool.isRequired,
  toggleTypeOn: PropTypes.bool.isRequired,
};

CreateEventForm.defaultProps = {
  endDate: null,
  eventEnvType: '',
  eventType: 'event-manager',
  repeatEndMinDate: null,
  startDate: null,
};

const createEventFormSelector = formName => formValueSelector(formName);

const mapStateToProps = (state, ownProps) => {
  const { startDate, endDate } =
    createEventFormSelector(ownProps.formName)(state, 'eventDates') || {};
  return {
    createEventDefaultStartDate: defaultStartDateSelector(state),
    endDate,
    eventRecurrence: createEventFormSelector(ownProps.formName)(
      state,
      'eventRecurrence'
    ),
    eventType: createEventFormSelector(ownProps.formName)(state, 'eventType'),
    eventTypeSettings: eventTypeSettingsSelector(state),
    eventEnvType: createEventFormSelector(ownProps.formName)(
      state,
      'eventEnvType'
    ),
    form: ownProps.formName,
    formSelectedStory: createEventFormSelector(ownProps.formName)(
      state,
      'story'
    ),
    groupStories: groupStoriesSelector(state),
    isConfigured: isConfiguredSelector(state),
    platformSettings: platformSettingsSelector(state),
    repeatEndMinDate: (endDate || startDate) + HOUR,
    repeatEventsEnabled: repeatEventsEnabledSelector(state),
    selectedGroupStory: selectedGroupStorySelector(state),
    startDate,
    templatesData: templatesDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEventBySourceEventId: sourceEventId =>
    dispatch(actions.fetchEventBySourceEventId(sourceEventId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    enableReinitialize: true,
  })(CreateEventForm)
);
