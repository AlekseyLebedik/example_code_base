import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'dw/core/helpers/component';

import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import * as P from '@demonware/devzone-core/access/CheckPermissions/permissions';

import { hasEndDateSelector } from 'playpants/scenes/Event/selectors';
import {
  activitySelectedTypeSelector,
  dropListActivitiesSelector,
  filteredActivitySettingsSelector,
} from './selectors';
import * as actions from '../../actions';
import { PUBLISH_TYPE } from './constants';

import ActivitiesSidebarStateless from './presentational';

export const ActivitiesSidebar = props => {
  const {
    history,
    eventUrl,
    hasEndDate,
    dropLists,
    onSave,
    onDeleteActivity,
    onCreateActivity,
    onSelectItem,
  } = props;

  const handleDelete = id => {
    history.push(`${eventUrl}/activities`);
    onDeleteActivity(id);
  };

  const handleActivitySelection = id =>
    onSelectItem(`activities/${id}`, eventUrl);

  const handleCreation = (activityType, dateType) => {
    if (activityType === 'client_commands') {
      onCreateActivity(activityType, 'on_start', id =>
        handleActivitySelection(id)
      );
      onCreateActivity(activityType, 'on_end');
    } else {
      onCreateActivity(activityType, dateType, id =>
        handleActivitySelection(id)
      );
    }
  };

  const reorder = (source, destination) => {
    // get list data based on item drop location
    const droppedList = dropLists[destination.droppableId];
    const otherList =
      dropLists[
        source.droppableId === PUBLISH_TYPE.start
          ? PUBLISH_TYPE.end
          : PUBLISH_TYPE.start
      ];

    // shift moved item to it's new index
    const movedItem = droppedList[source.index];
    droppedList.splice(source.index, 1);
    droppedList.splice(destination.index, 0, movedItem);

    return { droppedList, otherList };
  };

  const move = (source, destination) => {
    let sourceList = dropLists[source.droppableId];
    const droppedList = dropLists[destination.droppableId];
    // remove activity from it's source list and decrement remaining activities exec_order
    const [removed] = sourceList.splice(source.index, 1);
    sourceList = sourceList.map((activity, index) =>
      index >= source.index
        ? { ...activity, exec_order: activity.exec_order - 1 }
        : activity
    );
    // move the activity to it's new index in the list it was dropped in
    droppedList.splice(destination.index, 0, removed);

    return { droppedList, otherList: sourceList };
  };

  const saveNewExecOrder = ({ droppableId }, droppedList, otherList) => {
    // set current list item exec orders to their new index
    onSave(
      'activities',
      droppedList
        .map((activity, idx) => ({
          id: activity.id,
          exec_order: idx,
          publish_on: droppableId,
        }))
        .concat(
          otherList.map(activity => ({
            id: activity.id,
            exec_order: activity.exec_order,
            publish_on:
              droppableId === PUBLISH_TYPE.start
                ? PUBLISH_TYPE.end
                : PUBLISH_TYPE.start,
          }))
        )
    );
  };

  const onDragStart = result => handleActivitySelection(result.draggableId);

  const onDragEnd = ({ destination, source }) => {
    let droppedList;
    let otherList;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      (destination.droppableId === PUBLISH_TYPE.end && !hasEndDate)
    ) {
      // user drops activity into non-droppable area OR
      // user drops activity into its same, original location OR
      // user drops into end activities and there is no end date
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // user drops in the same list - reorder the list
      ({ droppedList, otherList } = reorder(source, destination));
    } else {
      // user drops in the other list - move item to new list
      ({ droppedList, otherList } = move(source, destination));
    }

    saveNewExecOrder(destination, droppedList, otherList);
  };

  const [, , result] = usePermissions(
    [
      P.PLAYPANTS_PROJECT_ADMIN,
      P.PLAYPANTS_WRITE_EVENT,
      P.PLAYPANTS_WRITE_ACTIVITY_PUBVARS,
      P.PLAYPANTS_WRITE_ACTIVITY_PYSCRIPT,
      P.PLAYPANTS_WRITE_ACTIVITY_PUBSTORAGE,
      P.PLAYPANTS_WRITE_ACTIVITY_ACHIEVEMENT,
      P.PLAYPANTS_WRITE_ACTIVITY_PUBLISHER_OBJECTS,
      P.PLAYPANTS_WRITE_ACTIVITY_TP_DEPLOYMENT,
    ],
    'titleenv.*'
  );

  const displayActivityCreate = result?.data?.permission || false;

  const newProps = {
    ...props,
    onDragStart,
    onDragEnd,
    handleDelete,
    handleCreation,
    handleActivitySelection,
    displayActivityCreate,
  };
  return <ActivitiesSidebarStateless {...newProps} />;
};

ActivitiesSidebar.propTypes = {
  dropLists: PropTypes.object.isRequired,
  eventUrl: PropTypes.string.isRequired,
  hasEndDate: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  onCreateActivity: PropTypes.func.isRequired,
  onDeleteActivity: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activitySettings: filteredActivitySettingsSelector(state),
  activityTypeFilter: activitySelectedTypeSelector(state),
  dropLists: dropListActivitiesSelector(state),
  hasEndDate: hasEndDateSelector(state),
});

const mapDispatchToProps = dispatch => ({
  changeActivityType: bindActionCreators(actions.changeActivities, dispatch),
  onCreateActivity: bindActionCreators(actions.createActivity, dispatch),
  onDeleteActivity: bindActionCreators(actions.deleteActivity, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, ActivitiesSidebar);
