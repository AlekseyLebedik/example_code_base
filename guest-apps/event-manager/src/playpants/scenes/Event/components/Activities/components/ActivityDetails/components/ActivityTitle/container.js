import React from 'react';
import PropTypes from 'prop-types';

import { useActivityContext } from '../../context';
import ActivityTitlePresentational from './presentational';

const ActivityTitleBase = ({ customComponent, RevertDialog }) => {
  const activityContext = useActivityContext();
  const { activitySettings, eventId, hasEndDate, onUpdate, selectedActivity } =
    activityContext;
  const {
    allow_duplication: allowDuplication = true,
    allow_multi_titles: allowMultiTitles = false,
    allow_revert: allowRevert = true,
    disable_title_selector: disableTitleSelector = false,
    context: { type: contextType = '' } = {},
  } = activitySettings.find(a => a.type === selectedActivity.type) || {};

  // If the event does not have an end date, change the revert allowance
  const allowRevertOverride = !!(allowRevert && hasEndDate);

  const onTitlesChange = value => {
    const updatedActivity = {
      ...selectedActivity,
      title_envs: allowMultiTitles ? value : [value],
    };
    onUpdate(updatedActivity, eventId);
  };

  const onNameChange = value => {
    onUpdate({ ...selectedActivity, name: value }, eventId);
  };
  const newProps = {
    activityContext,
    allowDuplication,
    allowMultiTitles,
    allowRevert: allowRevertOverride,
    contextType,
    customComponent,
    disableTitleSelector,
    onNameChange,
    onTitlesChange,
    RevertDialog,
  };

  return <ActivityTitlePresentational {...newProps} />;
};

ActivityTitleBase.propTypes = {
  customComponent: PropTypes.object,
  RevertDialog: PropTypes.elementType,
};

ActivityTitleBase.defaultProps = {
  customComponent: null,
  RevertDialog: null,
};

export default ActivityTitleBase;
