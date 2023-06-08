import React from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';

import { EM_EVENT_TYPES } from './constants';
import {
  addCustomTagsClass,
  filterCalendarSelections,
  getSortedEvents,
} from './helpers';

import { EventManagerEventDetails } from './eventManagerDetails';

import styles from './eventsCalendar.module.css';

const eventManagerTestEvents = [
  {
    id: 1,
    env_type: 'Development',
    publish_at: moment().unix(),
    title: 'Approved Event',
    status: 'approved',
    auto_tags: ['PS'],
    manual_tags: ['PS4', 'call_of_duty'],
    platforms: ['PS4'],
    project: 1,
  },
  {
    id: 2,
    env_type: 'Certification',
    publish_at: moment().unix(),
    title: 'Rejected Event',
    status: 'rejected',
    auto_tags: ['PS', 'XBOX'],
    manual_tags: ['XBOX1', 'call_of_duty'],
    platforms: ['PS4', 'XB1'],
    project: 'null',
  },
];

const eventStyles = (
  event,
  showAllColors,
  filterData,
  selectedStyle,
  projects,
  customClass
) => {
  let newClass;
  switch (selectedStyle) {
    case 'environments': {
      newClass = `filters-environments-${EM_EVENT_TYPES[event.env_type]}-event`;
      break;
    }
    case 'platforms': {
      if (event.platforms && event.platforms.length === 1) {
        newClass = `filters-platforms-${event.platforms[0]}-event`;
      } else if (event.platforms && event.platforms.length > 1) {
        newClass = `filters-platforms-Multiple-event`;
      } else {
        newClass = `filters-platforms-Unspecified-event`;
      }
      break;
    }
    case 'projects': {
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
    case 'tagFilters': {
      newClass = addCustomTagsClass(event, filterData);
      break;
    }
    default:
      newClass = 'noCustomTags-event';
  }
  return newClass;
};

export const eventManagerTestEventGroup = {
  classes: {
    'eventManager-approved': styles.eventManagerApproved,
    'eventManager-approved-checked': styles.eventManagerApprovedChecked,
    'eventManager-approved-list': styles.eventManagerApprovedTimeline,
    'eventManager-eventManager': styles.eventManagerEventManager,
    'eventManager-eventManager-checked': styles.eventManagerAllChecked,
    'eventManager-eventManager-list': styles.eventManagerEventManagerTimeline,
    'eventManager-rejected': styles.eventManagerRejected,
    'eventManager-rejected-checked': styles.eventManagerRejectedChecked,
    'eventManager-rejected-timeline': styles.eventManagerRejectedTimeline,
  },
  CustomEvent: EventManagerEventDetails,
  CustomEventProps: { displayTimeWithTitle: true },
  customEventStyles: eventStyles,
  events: eventManagerTestEvents,
  eventDragDrop: ({ event, start, end }, modifyEvent) => {
    const updatedEvent = { ...event };
    updatedEvent.publish_at = moment(start).unix();
    if (event.end_at) {
      updatedEvent.end_at = moment(end).unix();
    }
    modifyEvent(updatedEvent);
  },
  eventTypes: {
    eventManager: {
      name: 'Event Manager',
      children: {
        approved: {
          name: 'Approved',
          children: null,
          selectedByDefault: true,
        },
        rejected: {
          name: 'Rejected',
          children: null,
          selectedByDefault: true,
        },
      },
      selectedByDefault: true,
    },
  },
  GroupLink: props => <Link to={`${props.data.id}`}>{props.data.title}</Link>,
  type: 'eventManager',
  wrapper: (events, type, timezone, filterData, projects) => {
    const newEvents = filterCalendarSelections(events, filterData, projects);
    return getSortedEvents(newEvents, timezone, type);
  },
};
