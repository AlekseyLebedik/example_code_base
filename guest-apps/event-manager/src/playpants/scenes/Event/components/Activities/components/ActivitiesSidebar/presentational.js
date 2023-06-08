import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from 'playpants/components/ExpansionPanel';
import ActivityType from './components/ActivityType';
import ActivityFormDialog from './components/ActivityFormDialog';
import ActivityListItem from './components/ActivityListItem';

import { PUBLISH_TYPE } from './constants';

import styles from './index.module.css';

// disable all react-beautiful-dnd development warnings
window['__react-beautiful-dnd-disable-dev-warnings'] = true;

const ActivitiesSidebarStateless = props => {
  const {
    activitySettings,
    activityTypeFilter,
    changeActivityType,
    classes,
    detachedEvent,
    disabled,
    displayActivityCreate,
    dropLists,
    eventData,
    handleActivitySelection,
    handleCreation,
    handleDelete,
    hasEndDate,
    onDragEnd,
    onDragStart,
    permissions,
    selectedItemId,
  } = props;
  const {
    is_restricted: isRestricted,
    is_template: isTemplate,
    repeat_event_settings: repeatEventSettings,
  } = eventData;
  const isRepeatWithoutStaffPermissions =
    repeatEventSettings && !permissions.wipPermission;
  const activitiesRestricted =
    (isRestricted && !isTemplate) || isRepeatWithoutStaffPermissions;

  const startActivities = dropLists[PUBLISH_TYPE.start];
  const endActivities = dropLists[PUBLISH_TYPE.end];

  const EmptyActivities = message => (
    <div className={classNames(classes.lightGrey, styles.emptyActivities)}>
      {message}
    </div>
  );

  const listItemProps = {
    handleActivitySelection,
    handleDelete,
    selectedItemId,
    activitySettings,
    activityTypeFilter,
    permissions,
    disabled,
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={`${styles.sidebarContainer} flex flex-col h-full`}>
        <div className={styles.titleContainer} data-cy="activitiesSidebarTitle">
          <span className={styles.filter}>
            <ActivityType
              changeActivityType={changeActivityType}
              activityTypeFilter={activityTypeFilter}
              activitySettings={activitySettings}
            />
          </span>
          {displayActivityCreate && !listItemProps.disabled && (
            <span className={styles.newActivity}>
              <ActivityFormDialog
                activitySettings={activitySettings}
                detachedEvent={detachedEvent}
                disabled={
                  (eventData.is_restricted && !eventData.is_template) ||
                  detachedEvent
                }
                disabledTooltip="Activity restriction enabled"
                handleCreation={handleCreation}
                hasEndDate={hasEndDate}
                icon="playlist_add"
                title="Create Activity"
              />
            </span>
          )}
        </div>

        <Droppable droppableId={PUBLISH_TYPE.start}>
          {provided => (
            <ExpansionPanel
              title="start"
              details={
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.droppableList}
                  >
                    {!isEmpty(startActivities)
                      ? startActivities.map(item => (
                          <ActivityListItem
                            key={item.id}
                            isRestricted={activitiesRestricted}
                            {...item}
                            {...listItemProps}
                            id={item.id.toString()}
                          />
                        ))
                      : EmptyActivities('No start activities available')}
                  </div>
                  {provided.placeholder}
                </>
              }
              classes={{
                title: classes.grey,
                details: styles.expansionDetails,
              }}
            />
          )}
        </Droppable>
        <Divider light className={styles.divider} />
        <Droppable droppableId={PUBLISH_TYPE.end}>
          {provided => (
            <ExpansionPanel
              title="end"
              details={
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.droppableList}
                  >
                    {hasEndDate && !isEmpty(endActivities)
                      ? endActivities.map(item => (
                          <ActivityListItem
                            key={item.id}
                            isRestricted={activitiesRestricted}
                            {...item}
                            {...listItemProps}
                            id={item.id.toString()}
                          />
                        ))
                      : EmptyActivities(
                          hasEndDate
                            ? 'No end activities available'
                            : 'End date is not configured'
                        )}
                  </div>
                  {provided.placeholder}
                </>
              }
              classes={{
                title: hasEndDate ? classes.grey : classes.lightGrey,
                details: styles.expansionDetails,
              }}
            />
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

ActivitiesSidebarStateless.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  activityTypeFilter: PropTypes.string.isRequired,
  changeActivityType: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  detachedEvent: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  displayActivityCreate: PropTypes.bool.isRequired,
  dropLists: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  handleActivitySelection: PropTypes.func.isRequired,
  handleCreation: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  hasEndDate: PropTypes.bool.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  permissions: PropTypes.object.isRequired,
  selectedItemId: PropTypes.string,
};

ActivitiesSidebarStateless.defaultProps = {
  selectedItemId: '',
};

export default ActivitiesSidebarStateless;
