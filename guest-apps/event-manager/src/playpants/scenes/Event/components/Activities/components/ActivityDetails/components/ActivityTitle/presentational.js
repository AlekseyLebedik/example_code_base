import React from 'react';
import PropTypes from 'prop-types';
import head from 'lodash/head';

import IconButton from 'dw/core/components/IconButton';

import ContextSelector from './components/ContextSelector';
import Duplicate from './components/Duplicate';
import MultiSelectButton from './components/MultiSelectButton';
import Revert from './components/Revert';
import TitleSelector from './components/TitleSelector';
import ActivityName from './components/ActivityName';

import styles from './index.module.css';
import { linkedServices } from './constants';

const ActivityTitlePresentational = ({
  activityContext,
  allowDuplication,
  allowMultiTitles,
  allowRevert,
  contextType,
  customComponent,
  disableTitleSelector,
  onNameChange,
  onTitlesChange,
  RevertDialog,
}) => {
  const {
    contextList,
    currentProject,
    disabled,
    eventUrl,
    isServiceConfigured,
    selectedActivity,
    selectedTitle,
    showContext,
    titles,
  } = activityContext;

  const context =
    contextList && contextList.find(ctx => ctx.id === selectedActivity.context);
  const linkedService = linkedServices[selectedActivity.type];
  const iconButtonUrl =
    selectedTitle &&
    linkedService &&
    linkedService.url &&
    linkedService.url({
      titleId: selectedTitle.id,
      env: selectedTitle.env.shortType,
      pathAdd:
        selectedActivity.type === 'ae' &&
        selectedActivity.activity.ruleset_to_activate.label,
      context: context && context.name,
    });

  return (
    <div className={styles.activityTitleContainer}>
      <ActivityName
        disabled={disabled}
        onNameChange={onNameChange}
        selectedActivity={selectedActivity}
      />
      {currentProject &&
        head(currentProject.titles) &&
        selectedTitle &&
        iconButtonUrl && (
          <IconButton
            icon="link"
            onClick={() => window.open(iconButtonUrl, '_blank')}
            tooltip={linkedService.name}
          />
        )}
      <div className={styles.titleOptionsRow}>
        {!disableTitleSelector && (
          <TitleSelector
            allowMultiTitles={allowMultiTitles}
            disabled={disabled}
            onTitlesChange={onTitlesChange}
            selectedActivity={selectedActivity}
            titles={titles}
          />
        )}
        {showContext && !disableTitleSelector && isServiceConfigured && (
          <div className={styles.contextSelector}>
            <ContextSelector {...activityContext} contextType={contextType} />
          </div>
        )}

        {!disabled && (
          <>
            {allowMultiTitles && !disableTitleSelector && (
              <MultiSelectButton
                onTitlesChange={onTitlesChange}
                selectedActivity={selectedActivity}
                titles={titles}
              />
            )}

            {allowDuplication && (
              <Duplicate selectedActivity={selectedActivity} titles={titles} />
            )}
            {allowRevert && (
              <Revert
                eventUrl={eventUrl}
                RevertDialog={RevertDialog}
                selectedActivity={selectedActivity}
              />
            )}
          </>
        )}
      </div>
      {customComponent && (
        <div className={styles.customComponent}>{customComponent}</div>
      )}
    </div>
  );
};

ActivityTitlePresentational.propTypes = {
  contextType: PropTypes.string.isRequired,
  activityContext: PropTypes.object.isRequired,
  allowDuplication: PropTypes.bool.isRequired,
  allowMultiTitles: PropTypes.bool,
  allowRevert: PropTypes.bool.isRequired,
  customComponent: PropTypes.object,
  disableTitleSelector: PropTypes.bool.isRequired,
  onTitlesChange: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  RevertDialog: PropTypes.elementType,
};

ActivityTitlePresentational.defaultProps = {
  allowMultiTitles: false,
  customComponent: null,
  RevertDialog: null,
};

export default ActivityTitlePresentational;
