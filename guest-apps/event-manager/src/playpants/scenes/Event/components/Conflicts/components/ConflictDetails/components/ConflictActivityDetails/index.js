import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import IconButton from 'dw/core/components/IconButton';
import PlatformIcons from 'playpants/components/PlatformIcons';
import { selectedTitlesSelector } from 'playpants/scenes/Event/components/Activities/selectors';
import { CONFLICT_TYPES } from 'playpants/constants/conflicts';

import AchievementEngineConflicts from './components/AchievementEngineConflicts';
import PublisherObjectsConflicts from './components/PublisherObjectsConflicts';
import PublisherStorageConflicts from './components/PubStorageConflicts';
import PubVarsConflicts from './components/PubVarsConflicts';
import PyscriptConflicts from './components/PyscriptConflicts';
import ThunderpantsConflicts from './components/ThunderpantsConflicts';

const renderActivityInfo = (
  activity,
  activityConflictSeverity,
  activityInfoProps,
  activitySettings,
  classes,
  event
) => (
  <>
    <TextField
      {...activityInfoProps}
      label="Activity Type"
      value={`${
        activitySettings.find(setting => setting.type === activity.type).name
      }`}
    />
    <TextField {...activityInfoProps} label="Activity ID" value={activity.id} />
    <TextField {...activityInfoProps} label="Event" value={event.title} />
    <TextField
      {...activityInfoProps}
      InputProps={{
        ...activityInfoProps.InputProps,
        startAdornment: (
          <Icon
            className={classNames(
              classes.activitySeverityIcon,
              classes[activityConflictSeverity]
            )}
            fontSize="small"
          >
            fiber_manual_record
          </Icon>
        ),
      }}
      label="Activity Conflict Severity"
      value={CONFLICT_TYPES[activityConflictSeverity]}
    />
  </>
);

const renderActivityTitles = (activityTitles, classes) => (
  <div className={classes.activityConflictTitles}>
    <InputLabel
      className={
        activityTitles.length
          ? classes.activityConflictTitlesLabel
          : classes.activityConflictTitlesLabelHidden
      }
      focused={false}
      shrink
    >
      Titles
    </InputLabel>
    <PlatformIcons titles={activityTitles} />
  </div>
);

const renderEditExpandButtons = (
  activity,
  baseUrl,
  event,
  expanded,
  handleSetSecondaryTab,
  history,
  setExpanded
) => (
  <div>
    <IconButton
      icon="edit"
      onClick={() => {
        handleSetSecondaryTab(null, 'activities', activity.id);
        history.push(`${baseUrl}events/${event.id}/activities/${activity.id}`);
      }}
      tooltip="View/Edit Activity"
    />
    <IconButton
      icon={expanded ? 'expand_less' : 'expand_more'}
      onClick={() => setExpanded(!expanded)}
      tooltip={`${expanded ? 'Hide' : 'View'} Activity Conflicts`}
    />
  </div>
);

const renderActivityConflictDetails = (activity, classes, details) => (
  <>
    {activity.type === 'ae' && (
      <AchievementEngineConflicts
        activity={activity}
        classes={classes}
        details={details}
      />
    )}
    {activity.type === 'publisher_objects' && (
      <PublisherObjectsConflicts
        activity={activity}
        classes={classes}
        details={details}
      />
    )}
    {activity.type === 'pubstorage' && (
      <PublisherStorageConflicts
        activity={activity}
        classes={classes}
        details={details}
      />
    )}
    {activity.type === 'pubvars' && (
      <PubVarsConflicts
        activity={activity}
        classes={classes}
        details={details}
      />
    )}
    {activity.type === 'pyscript' && (
      <PyscriptConflicts
        activity={activity}
        classes={classes}
        details={details}
      />
    )}
    {activity.type === 'tp_deployment' && (
      <ThunderpantsConflicts
        activity={activity}
        classes={classes}
        details={details}
      />
    )}
  </>
);

export const ConflictActivityDetails = ({
  activity,
  activityConflictSeverity,
  activitySettings,
  baseUrl,
  classes,
  details,
  event,
  handleSetSecondaryTab,
  history,
  selectedTitles,
}) => {
  const [expanded, setExpanded] = useState(true);
  const activityInfoProps = {
    disabled: true,
    InputProps: {
      className: classes.activityConflictField,
      disableUnderline: true,
    },
    InputLabelProps: {
      className: classes.activityConflictField,
    },
  };

  return (
    <Card className={classes.activityConflictContainer}>
      <CardContent>
        <div className={classes.activityConflictInfo}>
          {renderActivityInfo(
            activity,
            activityConflictSeverity,
            activityInfoProps,
            activitySettings,
            classes,
            event
          )}
          {renderActivityTitles(selectedTitles, classes)}
          {renderEditExpandButtons(
            activity,
            baseUrl,
            event,
            expanded,
            handleSetSecondaryTab,
            history,
            setExpanded
          )}
        </div>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {renderActivityConflictDetails(activity, classes, details)}
        </CardContent>
      </Collapse>
    </Card>
  );
};

ConflictActivityDetails.propTypes = {
  activity: PropTypes.object,
  activityConflictSeverity: PropTypes.string.isRequired,
  activitySettings: PropTypes.array.isRequired,
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  details: PropTypes.array.isRequired,
  event: PropTypes.object,
  handleSetSecondaryTab: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  selectedTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
};
ConflictActivityDetails.defaultProps = {
  activity: {},
  event: {},
};

const mapStateToProps = (state, props) => ({
  selectedTitles: selectedTitlesSelector(state, {
    title_envs: props.activity.title_envs,
  }),
});

export default connect(mapStateToProps)(ConflictActivityDetails);
