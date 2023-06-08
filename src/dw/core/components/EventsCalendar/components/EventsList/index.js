import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { getEventGroupName, selectGroup } from '../../helpers';
import { colDefs, cellDefs } from './constants';
import { handleEndDate } from './helpers';
import styles from './index.module.css';

class EventsList extends Component {
  componentDidUpdate(prevProps) {
    const { customFiltersSelected, eventsCalendarSettings, showAllColors } =
      this.props;

    const isShowAllColorsChanged = prevProps.showAllColors !== showAllColors;
    const isSelectedStyleChanged =
      prevProps.eventsCalendarSettings.selectedStyle !==
      eventsCalendarSettings.selectedStyle;
    const isCustomFiltersSelectedChanged =
      prevProps.customFiltersSelected !== customFiltersSelected;
    const isFiltersChanged = !isEqual(
      eventsCalendarSettings.filters,
      prevProps.eventsCalendarSettings.filters
    );
    if (this.gridApi) {
      if (isSelectedStyleChanged) {
        this.gridApi.redrawRows();
      }
      if (
        isCustomFiltersSelectedChanged ||
        isShowAllColorsChanged ||
        isFiltersChanged
      ) {
        this.gridApi.refreshCells();
      }
    }
  }

  onGridReady = ({ api }) => {
    this.gridApi = api;
    this.gridApi.sizeColumnsToFit();
  };

  getRowData = () =>
    this.props.events.map(event => ({
      event,
      endDate: handleEndDate(event.start, event.end),
      eventGroup: event.type,
      eventGroupName: getEventGroupName(this.props.eventGroups, event),
      id: event.id,
      startDate: event.start,
      status: event.status,
      title: event.title,
    }));

  getRowClass = ({ data }) => {
    const {
      affiliatedProjects,
      classes,
      eventGroups,
      eventsCalendarSettings,
      showAllColors,
    } = this.props;
    const { filters, selectedStyle } = eventsCalendarSettings;
    const { eventGroup, event } = data;
    const { classes: groupClasses, customEventStyles } = eventGroups.find(
      group => group.type === eventGroup
    );

    const allClasses = { ...classes, ...groupClasses };
    const customStyle = customEventStyles(
      event,
      showAllColors,
      filters,
      selectedStyle,
      affiliatedProjects
    );
    return allClasses[`${customStyle}-list`];
  };

  updateEventDate = (event, newData) => {
    const { type, event_type: eventType } = event;
    const { eventGroups } = this.props;
    const eventGroup = selectGroup(eventGroups, type);
    const reducerGroup =
      eventType === 'event-manager'
        ? 'eventManagerEvents'
        : 'informationalEvents';
    eventGroup.modifyEvent(event, newData, reducerGroup);
  };

  render() {
    const rowData = this.getRowData();
    const { userTimezone, permissions } = this.props;

    return (
      <div className={classNames('ag-theme-material', styles.eventsList)}>
        {rowData && (
          <AgGridReact
            {...colDefs(this.props.eventGroups)}
            {...cellDefs(this.props.eventGroups)}
            context={{
              userTimezone,
              updateEventDate: this.updateEventDate,
              writeAccess: permissions.emUser,
            }}
            onGridReady={this.onGridReady}
            rowData={rowData}
            getRowClass={this.getRowClass}
            rowClass={styles.eventsListRow}
          />
        )}
      </div>
    );
  }
}

EventsList.propTypes = {
  affiliatedProjects: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired,
  customFiltersSelected: PropTypes.bool.isRequired,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventsCalendarSettings: PropTypes.object.isRequired,
  permissions: PropTypes.shape({
    emUser: PropTypes.bool.isRequired,
  }).isRequired,
  showAllColors: PropTypes.bool.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

EventsList.defaultProps = {
  affiliatedProjects: [],
};

export default connect(state => ({
  eventsCalendarSettings: state.Core.EventsCalendar,
}))(EventsList);
