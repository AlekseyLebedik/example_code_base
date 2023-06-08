import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Tags from 'playpants/components/FormFields/Tags';

import { getNowTimestamp } from 'playpants/helpers/dateTime';

import EnvironmentField from './components/EnvironmentField';
import NameField from './components/NameField';
import NotesField from './components/NotesField';
import PlatformsField from './components/PlatformsField';
import ProjectsField from './components/ProjectsField';
import RepeatingEventField from './components/RepeatingEventField';
import StoriesField from './components/StoriesField';
import TemplatesField from './components/TemplatesField';
import TypeField from './components/TypeField';
import DateRange from './components/DateRange';

const StatelessCreateEventForm = props => {
  const {
    addTag,
    currentProject,
    deleteTag,
    displayInfoEvents,
    eventRecurrence,
    eventTypeSettings,
    globalChecked,
    groupStories,
    handleFormSubmit,
    handleStoryChange,
    handleSubmit,
    isConfigured,
    onChangeSelectedTemplate,
    onChangeTag,
    platformSettings,
    repeatEndMinDate,
    repeatEventsEnabled,
    selectedTemplate,
    setToggleAdvancedOn,
    tags,
    tagsError,
    tagText,
    filteredTemplatesData,
    toggleAdvancedOn,
    toggleTypeOn,
    initialValues,
  } = props;

  const displayAdvancedOptions = !toggleTypeOn || toggleAdvancedOn;

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        {displayInfoEvents && toggleTypeOn && (
          <Grid item xs={12}>
            <TypeField eventTypeSettings={eventTypeSettings} />
          </Grid>
        )}
        {!toggleTypeOn && !isEmpty(filteredTemplatesData) && (
          <Grid item xs={12}>
            <TemplatesField
              templatesData={filteredTemplatesData}
              selectedTemplate={selectedTemplate}
              onChangeSelectedTemplate={onChangeSelectedTemplate}
            />
          </Grid>
        )}
        {isConfigured.stories &&
          !isEmpty(groupStories) &&
          !initialValues.story &&
          displayAdvancedOptions && (
            <Grid item xs={12}>
              <StoriesField
                groupStoriesData={groupStories}
                handleStoryChange={handleStoryChange}
                currentProject={currentProject}
              />
            </Grid>
          )}
        <Grid item xs={12}>
          <NameField />
        </Grid>
        {toggleTypeOn && !globalChecked && (
          <Grid item xs={12}>
            <ProjectsField />
          </Grid>
        )}
        {displayAdvancedOptions && (
          <Grid item xs={12}>
            <EnvironmentField
              disabled={initialValues.isSchedule}
              globalChecked={globalChecked}
              toggleTypeOn={toggleTypeOn}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <DateRange
            minDate={getNowTimestamp()}
            endDateRequired={!!initialValues.isSchedule}
          />
        </Grid>
        {repeatEventsEnabled && (
          <RepeatingEventField
            eventRecurrence={eventRecurrence}
            repeatEndMinDate={repeatEndMinDate}
          />
        )}
        {displayAdvancedOptions && (
          <Grid item xs={12}>
            <NotesField />
          </Grid>
        )}
        <Grid item xs={12}>
          <PlatformsField platformSettings={platformSettings} />
        </Grid>
        {displayAdvancedOptions && (
          <Grid item xs={12}>
            <Tags
              manualTags={tags}
              input={tagText}
              onChangeTag={onChangeTag}
              addTag={addTag}
              deleteTag={deleteTag}
              tagsError={tagsError}
            />
          </Grid>
        )}
        {toggleTypeOn && (
          <Button
            endIcon={
              <Icon>
                {displayAdvancedOptions ? 'expand_less' : 'expand_more'}
              </Icon>
            }
            fullWidth
            onClick={setToggleAdvancedOn}
          >
            Advanced
          </Button>
        )}
      </Grid>
    </Form>
  );
};

StatelessCreateEventForm.propTypes = {
  addTag: PropTypes.func.isRequired,
  currentProject: PropTypes.object.isRequired,
  deleteTag: PropTypes.func.isRequired,
  displayInfoEvents: PropTypes.bool.isRequired,
  eventRecurrence: PropTypes.string,
  eventTypeSettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredTemplatesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  globalChecked: PropTypes.bool.isRequired,
  groupStories: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleStoryChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isConfigured: PropTypes.object.isRequired,
  onChangeSelectedTemplate: PropTypes.func.isRequired,
  onChangeTag: PropTypes.func.isRequired,
  platformSettings: PropTypes.arrayOf(PropTypes.string).isRequired,
  repeatEndMinDate: PropTypes.PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  repeatEventsEnabled: PropTypes.bool.isRequired,
  selectedTemplate: PropTypes.object.isRequired,
  setToggleAdvancedOn: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagsError: PropTypes.string,
  tagText: PropTypes.string.isRequired,
  toggleAdvancedOn: PropTypes.bool.isRequired,
  toggleTypeOn: PropTypes.bool.isRequired,
};

StatelessCreateEventForm.defaultProps = {
  eventRecurrence: 'never',
  repeatEndMinDate: null,
  tagsError: null,
};

export default StatelessCreateEventForm;
