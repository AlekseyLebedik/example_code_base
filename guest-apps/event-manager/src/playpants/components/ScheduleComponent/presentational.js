import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

import EventsCalendar from 'dw/core/components/EventsCalendar';
import EventSummaryDialog from 'playpants/components/EventSummaryDialog';

import CreateEventDialog from './components/CreateEventDialog';
import EventGroupErrorDialog from './components/EventGroupErrorDialog';
import ABTestDetails from './components/ABTestDetails';
import DemonwareEventDetails from './components/DemonwareEventDetails';
import ExternalEventDetails from './components/ExternalEventDetails';
import GamertagSummaryDialog from './components/GamertagSummaryDialog';
import DuplicateFormWrapper from './components/DuplicateFormWrapper';

export const StatelessScheduleBase = props => {
  const {
    _abTestDetailData,
    _affiliatedProjects,
    _baseUrl,
    _currentProject,
    _defaultToInfo,
    _demonwareDetailData,
    _displayInfoEvents,
    _duplicateEventData,
    _eventDetailData,
    _eventFetchDetails,
    _externalDetailData,
    _fetchDroppedEvent,
    _filterPropsDisabled,
    _gamertagGroupsError,
    _handleExportEvents,
    _handleGamertagGroupDrop,
    _handleOpenCreateEventModal,
    _onClearEventFetchDetails,
    _onFetchEventDetails,
    _onOpenGamertagDetailModal,
    _onUpdatePresets,
    _permissions: { eventWritePermission, adminPermission, wipPermission },
    _platformSettings,
    _presetOptions,
    _selectedGamertagGroup,
    _setDuplicateEventData,
    _setSelectedGamertagGroup,
    _updateHiddenGamertagList,
    _userTimezone,
    createEventModalId,
    gamertagDetailModalId,
    gamertagGroups,
    initialValues,
    onFetchEvents,
    onFetchGamertagGroups,
    eventGroups,
    eventLoading,
    eventError,
    eventsCalendarSettings,
  } = props;
  const eventDetailModalId = (
    eventGroups.find(g => g.type === 'eventManager') || {}
  ).modalId;
  const demonwareDetailModalId = (
    eventGroups.find(g => g.type === 'demonwareEvents') || {}
  ).modalId;
  const externalDetailModalId = (
    eventGroups.find(g => g.type === 'externalEvents') || {}
  ).modalId;
  const abTestDetailModalId = (
    eventGroups.find(g => g.type === 'abTesting') || {}
  ).modalId;
  return (
    <>
      <Fade in={eventLoading} timeout={{ enter: 500, exit: 500 }}>
        <LinearProgress />
      </Fade>
      <EventGroupErrorDialog error={eventError || _gamertagGroupsError} />
      {eventWritePermission && createEventModalId && (
        <CreateEventDialog
          baseUrl={_baseUrl}
          defaultToInfo={_defaultToInfo}
          displayInfoEvents={_displayInfoEvents}
          formName={createEventModalId}
          openModal={_handleOpenCreateEventModal}
          title="Create Event"
          userTimezone={_userTimezone}
          initialValues={initialValues}
        />
      )}
      {eventDetailModalId && (
        <EventSummaryDialog
          baseModalId={eventDetailModalId}
          baseUrl={_baseUrl}
          currentProject={_currentProject}
          event={_eventDetailData}
          eventFetchDetails={_eventFetchDetails}
          handleOpenEventDetailModal={
            (eventGroups.find(g => g.type === 'eventManager') || {})
              .onSelectEvent
          }
          onClearEventFetchDetails={_onClearEventFetchDetails}
          onFetchEventDetails={_onFetchEventDetails}
        />
      )}
      {_demonwareDetailData && demonwareDetailModalId && (
        <DemonwareEventDetails
          baseModalId={demonwareDetailModalId}
          event={_demonwareDetailData}
          isStaff={wipPermission}
        />
      )}
      {_externalDetailData && externalDetailModalId && (
        <ExternalEventDetails
          baseModalId={externalDetailModalId}
          event={_externalDetailData}
        />
      )}
      {_abTestDetailData && abTestDetailModalId && (
        <ABTestDetails
          baseModalId={abTestDetailModalId}
          baseUrl={_baseUrl}
          currentProject={_currentProject}
          event={_abTestDetailData}
        />
      )}
      {gamertagGroups &&
        gamertagDetailModalId &&
        isEmpty(_selectedGamertagGroup) && (
          <GamertagSummaryDialog
            baseModalId={gamertagDetailModalId}
            baseUrl={_baseUrl}
            onFetchGamertagGroups={onFetchGamertagGroups}
            selectedGamertagGroup={_selectedGamertagGroup}
          />
        )}
      <DuplicateFormWrapper
        baseUrl={_baseUrl}
        duplicateEventData={_duplicateEventData}
        onCloseForm={() => _setDuplicateEventData({})}
      />
      <EventsCalendar
        affiliatedProjects={_affiliatedProjects}
        eventsCalendarSettings={eventsCalendarSettings}
        createDisabled={!eventWritePermission || !createEventModalId}
        eventGroups={eventGroups}
        eventLoading={eventLoading}
        eventError={eventError}
        exportEvents={_handleExportEvents}
        exportExcludeTypes={['abTesting']}
        gamertagGroups={gamertagGroups}
        onDropHeaderGroup={_handleGamertagGroupDrop}
        onFetchEvents={onFetchEvents}
        onPresetsUpdate={_onUpdatePresets}
        onSelectHeaderGroup={group => {
          _setSelectedGamertagGroup(group);
          _onOpenGamertagDetailModal();
        }}
        onSelectSlot={_handleOpenCreateEventModal}
        platforms={_platformSettings}
        presetOptions={_presetOptions}
        projectId={`${_currentProject.id}`}
        permissions={{
          adminUser: adminPermission,
          emUser: eventWritePermission,
          staffUser: wipPermission,
        }}
        sidebar
        disabledFilters={_filterPropsDisabled}
        updateHiddenGamertagList={_updateHiddenGamertagList}
        fetchDroppedEvent={_fetchDroppedEvent}
      />
    </>
  );
};

StatelessScheduleBase.propTypes = {
  _abTestDetailData: PropTypes.object.isRequired,
  _affiliatedProjects: PropTypes.arrayOf(PropTypes.object),
  _baseUrl: PropTypes.string.isRequired,
  _currentProject: PropTypes.object.isRequired,
  _defaultToInfo: PropTypes.bool.isRequired,
  _demonwareDetailData: PropTypes.object.isRequired,
  _displayInfoEvents: PropTypes.bool.isRequired,
  _duplicateEventData: PropTypes.object.isRequired,
  _eventDetailData: PropTypes.object.isRequired,
  _eventFetchDetails: PropTypes.object.isRequired,
  _externalDetailData: PropTypes.object.isRequired,
  _fetchDroppedEvent: PropTypes.func,
  _filterPropsDisabled: PropTypes.object.isRequired,
  _gamertagGroupsError: PropTypes.object,
  _handleExportEvents: PropTypes.func.isRequired,
  _handleGamertagGroupDrop: PropTypes.func.isRequired,
  _handleOpenCreateEventModal: PropTypes.func.isRequired,
  _onClearEventFetchDetails: PropTypes.func.isRequired,
  _onFetchEventDetails: PropTypes.func.isRequired,
  _onOpenGamertagDetailModal: PropTypes.func.isRequired,
  _onUpdatePresets: PropTypes.func.isRequired,
  _permissions: PropTypes.object.isRequired,
  _platformSettings: PropTypes.arrayOf(PropTypes.string).isRequired,
  _presetOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  _selectedGamertagGroup: PropTypes.object.isRequired,
  _setDuplicateEventData: PropTypes.func.isRequired,
  _setSelectedGamertagGroup: PropTypes.func.isRequired,
  _updateHiddenGamertagList: PropTypes.func,
  _userTimezone: PropTypes.string.isRequired,
  createEventModalId: PropTypes.string,
  eventError: PropTypes.object,
  eventGroups: PropTypes.array,
  eventLoading: PropTypes.bool,
  eventsCalendarSettings: PropTypes.object.isRequired,
  gamertagDetailModalId: PropTypes.string,
  gamertagGroups: PropTypes.arrayOf(PropTypes.object),
  initialValues: PropTypes.object,
  onFetchEvents: PropTypes.func.isRequired,
  onFetchGamertagGroups: PropTypes.func,
};

StatelessScheduleBase.defaultProps = {
  _affiliatedProjects: undefined,
  _fetchDroppedEvent: undefined,
  _gamertagGroupsError: null,
  _updateHiddenGamertagList: undefined,
  createEventModalId: undefined,
  gamertagDetailModalId: undefined,
  gamertagGroups: [],
  initialValues: {},
  onFetchGamertagGroups: null,
  eventGroups: [],
  eventLoading: false,
  eventError: null,
};

export default StatelessScheduleBase;
