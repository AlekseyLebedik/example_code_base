import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import { EM_EVENT_TYPES } from './constants';

import { OtherEventDetails } from './otherEventDetails';

import styles from './eventsCalendar.module.css';

const otherTestEvents = [
  {
    id: 1,
    publish_at: moment().add(2, 'day').unix(),
    end_at: moment().add(3, 'day').unix(),
    env: 'Development',
    name: 'Testing Event',
    project: 1,
    status: 'testing',
  },
  {
    id: 2,
    publish_at: moment().subtract(4, 'day').unix(),
    end_at: moment().subtract(2, 'day').unix(),
    env: 'Certification',
    name: 'Failed Event',
    project: 'null',
    status: 'failed',
  },
];

const otherEventStyles = (
  event,
  showAllColors,
  filterData,
  selectedStyle,
  projects,
  customClass
) => {
  let newClass;
  switch (selectedStyle) {
    case 'envType': {
      newClass = `filters-environments-${EM_EVENT_TYPES[event.env]}-event`;
      break;
    }
    case 'platform': {
      newClass = `filters-platforms-Unspecified-event`;
      break;
    }
    case 'project': {
      const colorIdx = sortBy(projects, p => p.name).findIndex(
        p => String(event.project) === String(p.projectId)
      );
      if (colorIdx > -1) newClass = `filters-projects-${colorIdx}-event`;
      else newClass = 'noCustomTags-event';
      break;
    }
    case 'sources': {
      newClass = `${event.type}-${
        showAllColors ? customClass || event.status : event.type
      }`;
      break;
    }
    default:
      newClass = 'noCustomTags-event';
  }
  return newClass;
};

export const otherTestEventGroup = {
  classes: {
    'other-failed': styles.otherFailed,
    'other-failed-checked': styles.otherFailedChecked,
    'other-failed-list': styles.otherFailedTimeline,
    'other-other': styles.otherOther,
    'other-other-checked': styles.otherAllChecked,
    'other-other-list': styles.otherAllTimeline,
    'other-testing': styles.otherTesting,
    'other-testing-checked': styles.otherTestingChecked,
    'other-testing-list': styles.otherTestingTimeline,
  },
  CustomEvent: OtherEventDetails,
  CustomEventProps: { displayTimeWithTitle: true },
  customEventStyles: otherEventStyles,
  events: otherTestEvents,
  eventDragDrop: ({ event, start, end }, modifyEvent) => {
    const updatedEvent = { ...event };
    updatedEvent.begin_date = moment(start).unix();
    updatedEvent.end_date = moment(end).unix();
    modifyEvent(updatedEvent);
  },
  eventTypes: {
    other: {
      name: 'Other',
      children: {
        failed: {
          name: 'Failed',
          children: null,
          selectedByDefault: true,
        },
        testing: {
          name: 'Testing',
          children: null,
          selectedByDefault: true,
        },
      },
      selectedByDefault: true,
    },
  },
  GroupLink: props => <Link to={`${props.data.id}`}>{props.data.title}</Link>,
  type: 'other',
  wrapper: (events, type, _, filterData, projects) => {
    const newEvents = events.filter(
      event =>
        !isEmpty(filterData.filters) &&
        filterData.filters.other &&
        filterData.filters.other[event.status] &&
        filterData.platforms.Unspecified &&
        filterData.custom.unspecified &&
        filterData.envTypeFilters[event.env] &&
        filterData.projects[
          projects.find(p => p.projectId === event.project).name
        ]
    );

    newEvents.forEach(event => {
      event.title = event.name;
      event.start = new Date(moment.unix(event.begin_date));
      event.end = new Date(moment.unix(event.end_date));
      event.allDay = true;
      event.type = type;
    });
    return newEvents;
  },
};
