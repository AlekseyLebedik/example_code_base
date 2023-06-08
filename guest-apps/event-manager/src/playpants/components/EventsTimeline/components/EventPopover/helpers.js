import capitalize from 'lodash/capitalize';
import partition from 'lodash/partition';
import sortBy from 'lodash/sortBy';
import { DEMONWARE_EVENTS_TYPE_NAME_MAP as TYPE_NAME_MAP } from 'playpants/components/ScheduleComponent/constants';
import { envSelector } from 'dw/core/components/EventsCalendar/helpers';
import {
  getEventActivityTitles,
  getEventSummaryTitles,
} from 'playpants/components/EventSummaryDialog/helpers';
import { STATUS_GROUPS } from 'dw/core/components/EventsCalendar/constants';

export const formatActivities = activities =>
  activities.reduce((acc, activity) => {
    if (acc.find(a => a.value === activity.type)) return acc;
    return [
      ...acc,
      {
        value: activity.type,
        avatar: activities.filter(a => activity.type === a.type).length,
      },
    ];
  }, []);

const arrayToString = items => items && items?.join(', ');

export const formatTitles = titles => arrayToString(titles.map(t => t.name));
export const formatPlatforms = platforms => arrayToString(platforms);

export const formatTags = tags =>
  tags.map(t => ({
    value: t,
  }));

const getEMPopoverItems = (event, projects, currentProject, formatDate) => {
  const eventActivityTitles =
    event.activities && getEventActivityTitles(event.activities);
  const eventTitles = getEventSummaryTitles(
    currentProject.titles,
    eventActivityTitles
  );
  const [activitiesOnStart, activitiesOnEnd] = partition(event.activities, {
    publish_on: 'on_start',
  });
  const allTags = sortBy([
    ...event.tags.map(t => t.value),
    ...event.autoTags,
    ...event.manualTags,
  ]);
  return [
    {
      title: 'Project:',
      value: projects.find(p => p.id === event.project)?.name,
    },
    {
      title: 'Environment:',
      value: envSelector(event),
    },
    {
      title: 'Starts at:',
      value: formatDate(event.startTime),
    },
    {
      title: 'activitiesOnStart:',
      value: formatActivities(activitiesOnStart),
      isChips: true,
      showTitle: false,
    },
    {
      title: 'Ends at:',
      value: formatDate(event.endTime),
    },
    {
      title: 'activitiesOnEnd:',
      value: formatActivities(activitiesOnEnd),
      isChips: true,
      showTitle: false,
    },
    {
      title: 'Titles:',
      value: formatTitles(eventTitles),
    },
    ...(event.platforms && Array.isArray(event.platforms)
      ? [
          {
            title: 'Platforms:',
            value: formatPlatforms(event.platforms),
          },
        ]
      : []),
    {
      title: 'Tags:',
      value: formatTags(allTags),
      isChips: true,
    },
  ];
};
const getDWPopoverItems = (event, projects, currentProject, formatDate) => {
  switch (event.eventType) {
    case 'maintenance':
      return [
        {
          title: 'Event Type:',
          value: TYPE_NAME_MAP[event.eventType],
        },
        {
          title: 'Description:',
          value: event.description,
        },
        {
          title: 'Purpose:',
          value: event.purpose,
        },
        {
          title: 'Impact:',
          value: event.impact,
        },
        {
          title: 'Start Date:',
          value: formatDate(event.startTime),
        },
        {
          title: 'End Date:',
          value: formatDate(event.endTime),
        },
        {
          title: 'Scope:',
          value: event.scope,
        },
      ];
    case 'incidents':
    case 'generalComments':
      return [
        {
          title: 'Event Type:',
          value: TYPE_NAME_MAP[event.eventType],
        },
        {
          title: 'Description:',
          value: event.description,
        },
        {
          title: 'Environment:',
          value: envSelector(event),
        },
        {
          title: 'Title:',
          value: event.titleName,
        },
        {
          title: 'Start Date:',
          value: formatDate(event.startTime),
        },
        {
          title: 'End Date:',
          value: formatDate(event.endTime),
        },
      ];
    default:
      return [
        {
          title: 'Event Type:',
          value: TYPE_NAME_MAP[event.eventType],
        },
        {
          title: 'Description:',
          value: event.description,
        },
        {
          title: 'Start Date:',
          value: formatDate(event.startTime),
        },
        {
          title: 'End Date:',
          value: formatDate(event.endTime),
        },
      ];
  }
};

export const getPopoverItems = (
  event,
  projects,
  currentProject,
  formatDate
) => {
  let displayItems;
  switch (event.type) {
    case 'demonwareEvents':
      displayItems = getDWPopoverItems(
        event,
        projects,
        currentProject,
        formatDate
      );
      break;
    case 'expyTests':
      displayItems = [];
      break;
    default:
      displayItems = getEMPopoverItems(
        event,
        projects,
        currentProject,
        formatDate
      );
  }
  return displayItems.filter(si => Boolean(si.value));
};

export const getStatusItems = (event, classes) =>
  [
    {
      title: 'Status:',
      value: STATUS_GROUPS[event.status] || capitalize(event.status),
      classes,
      colorKey: ckey => `status-${ckey}`,
    },
    {
      title: 'Task:',
      value: capitalize(event.task && event.task.state),
      classes,
      colorKey: ckey => `task-${ckey}`,
    },
  ].filter(si => Boolean(si.value));
