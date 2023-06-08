import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reset } from 'redux-form';

import { connect } from 'dw/core/helpers/component';
import { getNowTimestamp } from 'playpants/helpers/dateTime';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { tagFiltersHelpers } from 'dw/core/components/EventsCalendar/helpers';

import {
  currentProjectSelector,
  hasCurrentProjectSettingsSelector,
  storiesDataSelector,
  templatesDataSelector,
} from 'playpants/components/App/selectors';
import { prettyPrint } from 'playpants/helpers/json';

import {
  createEvent,
  setSelectedTemplate,
  resetCreateDialog,
} from 'playpants/components/ScheduleComponent/actions';
import { validateTag } from 'playpants/components/ScheduleComponent/helpers';
import {
  makeInitialValuesSelector,
  selectedTemplateSelector,
  templateSourceEventDataSelector,
  templateSourceEventLoadingSelector,
} from 'playpants/components/ScheduleComponent/selectors';

import CreateEventDialogStateless from './presentational';

export class CreateEventDialog extends Component {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    currentProject: PropTypes.object.isRequired,
    defaultToInfo: PropTypes.bool.isRequired,
    formName: PropTypes.string.isRequired,
    hasCurrentProjectSettings: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    onResetCreateDialog: PropTypes.func.isRequired,
    onSetSelectedTemplate: PropTypes.func.isRequired,
    selectedTemplate: PropTypes.object.isRequired,
    templatesData: PropTypes.arrayOf(PropTypes.object).isRequired,
    templateSourceEventData: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]).isRequired,
    templateSourceEventLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      globalChecked: !props.hasCurrentProjectSettings,
      globalLocked: !props.hasCurrentProjectSettings,
      repeatingEvent: false,
      scheduleWarningOpen: false,
      tags: [],
      tagsError: null,
      tagText: '',
      toggleAdvancedOn: false,
      toggleTypeOn: props.defaultToInfo,
    };
  }

  onResetAll = () => {
    this.props.onResetCreateDialog();
    reset(this.props.formName);
    this.clearTagEntry();
  };

  onCancel = () => {
    this.props.closeModal();
    this.onResetAll();
  };

  onChangeTag = tagText => {
    this.setState(state => ({
      tagText,
      tagsError: validateTag(state.tags, tagText),
    }));
  };

  setToggleAdvancedOn = () => {
    this.setState(state => ({
      toggleAdvancedOn: !state.toggleAdvancedOn,
    }));
  };

  setToggleTypeOn = () => {
    this.setState(state => ({
      toggleTypeOn: !state.toggleTypeOn,
      globalChecked: false,
    }));
  };

  setGlobalCheckbox = () => {
    this.setState(state => ({ globalChecked: !state.globalChecked }));
  };

  freeGlobalLocked = () => {
    if (this.props.hasCurrentProjectSettings) {
      this.setState({ globalLocked: false });
    }
  };

  requireGlobalCheckbox = () => {
    this.setState({ globalChecked: true, globalLocked: true });
  };

  initializeTags = tags => {
    this.setState({
      tags,
      tagText: '',
    });
  };

  clearTagEntry = () => {
    this.setState({
      tags: [],
      tagText: '',
    });
  };

  addTag = tagText => {
    this.setState(state => {
      const tagsError = validateTag(state.tags, tagText);
      if (tagsError) {
        return {
          tagsError,
        };
      }

      return {
        tags: [...state.tags, ...tagFiltersHelpers.extractTags(tagText)],
        tagText: '',
        tagsError: null,
      };
    });
  };

  deleteTag = tag => {
    this.setState(state => ({
      tags: state.tags.filter(t => t !== tag),
      tagText: '',
    }));
  };

  toggleScheduleWarningOpen = () => {
    this.setState(state => ({
      scheduleWarningOpen: !state.scheduleWarningOpen,
    }));
  };

  submitCreateEvent = (data = this.state.formData) => {
    this.props.createEvent(
      this.props.baseUrl,
      data,
      this.props.history,
      this.props.formName,
      this.onCancel
    );
  };

  handleFormSubmit = values => {
    // form might not have a selected template, so check first and continue
    const { currentProject, selectedTemplate, templateSourceEventData } =
      this.props;
    const storyValue = values.story ? { id: values.story } : values.story;
    const { tags, tagText, toggleTypeOn } = this.state;
    const templateActivities =
      templateSourceEventData && templateSourceEventData.activities;
    const isRestricted =
      selectedTemplate && selectedTemplate.restrict_activities;
    const activities = templateActivities
      ? templateActivities.map(item => ({
          type: item.type,
          name: item.name,
          activity: prettyPrint(item.activity),
          titles: item.titles,
          publish_on: item.publish_on,
          exec_order: item.exec_order,
        }))
      : [];
    const endDate = values.eventDates?.endDate || null;
    const tagsList = [...tags];
    if (tagText && !validateTag(tags, tagText)) {
      tagsList.push(tagText);
    }
    let project = currentProject.id;
    const projects = values.eventProjects;
    if (toggleTypeOn) {
      project = projects && projects.length === 1 ? projects[0] : null;
    }
    const repeatEventSettings =
      values.eventRecurrence === 'repeat' &&
      values.eventRepeatFrequency &&
      values.eventRepeatInterval &&
      values.eventRepeatEndDate
        ? {
            end_repeat_at: values.eventRepeatEndDate,
            frequency: Number(values.eventRepeatFrequency),
            interval: values.eventRepeatInterval,
            iteration: 0,
          }
        : null;

    const formData = {
      activities,
      authorizations: [],
      components: [],
      created_at: getNowTimestamp(),
      end_at: endDate,
      env_type: values.eventEnvType,
      note: values.eventNotes,
      project,
      publish_at: values.eventDates?.startDate,
      title: values.eventName,
      manual_tags: prettyPrint(tagsList),
      auto_tags: prettyPrint([]),
      platforms: prettyPrint(values.eventPlatforms || []),
      event_type: values.eventType || 'event-manager',
      is_restricted: !!isRestricted,
      repeat_event_settings: repeatEventSettings,
      story: storyValue,
      ...(values.isSchedule && { is_schedule: values.isSchedule }),
      ...(projects && { projects }),
    };
    if (formData.is_schedule && values.schedule) {
      this.setState({ formData });
      this.toggleScheduleWarningOpen();
    } else {
      this.submitCreateEvent(formData);
    }
  };

  render() {
    const newProps = {
      ...this.props,
      ...this.state,
      addTag: this.addTag,
      clearTagEntry: this.clearTagEntry,
      deleteTag: this.deleteTag,
      freeGlobalLocked: this.freeGlobalLocked,
      handleFormSubmit: this.handleFormSubmit,
      initializeTags: this.initializeTags,
      onCancel: this.onCancel,
      onChangeTag: this.onChangeTag,
      requireGlobalCheckbox: this.requireGlobalCheckbox,
      setGlobalCheckbox: this.setGlobalCheckbox,
      setToggleAdvancedOn: this.setToggleAdvancedOn,
      setToggleTypeOn: this.setToggleTypeOn,
      submitCreateEvent: this.submitCreateEvent,
      toggleScheduleWarningOpen: this.toggleScheduleWarningOpen,
    };
    return <CreateEventDialogStateless {...newProps} />;
  }
}

const makeMapStateToProps = () => {
  const initialValuesSelector = makeInitialValuesSelector();
  const mapStateToProps = (state, props) => ({
    currentProject: currentProjectSelector(state),
    hasCurrentProjectSettings: hasCurrentProjectSettingsSelector(state),
    initialValues: initialValuesSelector(state, props),
    isModalVisible: ModalHandlers.isVisibleSelector(state, props.formName),
    selectedTemplate: selectedTemplateSelector(state),
    templatesData: templatesDataSelector(state),
    templateSourceEventData: templateSourceEventDataSelector(state),
    templateSourceEventLoading: templateSourceEventLoadingSelector(state),
    storiesData: storiesDataSelector(state),
  });
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeModal: () => dispatch(ModalHandlers.close(ownProps.formName)),
  createEvent: (baseUrl, data, callback, formName, onCancel) =>
    dispatch(createEvent(baseUrl, { data }, callback, formName, onCancel)),
  onResetCreateDialog: () => dispatch(resetCreateDialog()),
  onSetSelectedTemplate: selectedTemplate =>
    dispatch(setSelectedTemplate(selectedTemplate)),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
  CreateEventDialog
);
