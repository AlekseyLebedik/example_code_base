import { makeStyles } from '@material-ui/core/styles';
import {
  ABTESTING_EVENT_STATES,
  DEMONWARE_EVENT_STATES,
  EVENT_MANAGER_STATES,
  EVENT_TASK_STATES,
  EXTERNAL_EVENT_STATES,
  INFORMATIONAL_EVENTS_STATES,
} from './constants';

const styles = theme => ({
  ...Object.assign(
    {},
    ...[...ABTESTING_EVENT_STATES].map(eventType => {
      const color = `${theme.abTesting.bg[eventType]} !important`;
      return {
        [`abTesting-${eventType}`]: { backgroundColor: color },
        [`abTesting-${eventType}-list`]: {
          borderLeft: `7px solid ${color}`,
        },
        [`abTesting-timeline-group`]: {
          borderLeft: `7px solid ${theme.abTesting.bg.abTesting}`,
        },
        [`abTesting-${eventType}-details`]: { color },
        [`abTesting-${eventType}-checked`]: { color },
      };
    })
  ),
  ...Object.assign(
    {},
    ...[...EVENT_MANAGER_STATES].map(eventType => {
      const color = `${theme.eventManager.bg[eventType]} !important`;
      return {
        [`eventManager-${eventType}`]: { backgroundColor: color },
        [`eventManager-${eventType}-list`]: {
          borderLeft: `7px solid ${color}`,
        },
        [`eventManager-timeline-group`]: {
          borderLeft: `7px solid ${theme.eventManager.bg.eventManager}`,
        },
        [`eventManager-${eventType}-details`]: { color },
        [`eventManager-${eventType}-checked`]: { color },
      };
    })
  ),
  ...Object.assign(
    {},
    ...[...INFORMATIONAL_EVENTS_STATES].map(eventType => {
      const color = `${theme.informationalEvents.bg[eventType]} !important`;
      return {
        [`informationalEvents-${eventType}`]: { backgroundColor: color },
        [`informationalEvents-${eventType}-list`]: {
          borderLeft: `7px solid ${color}`,
        },
        [`informationalEvents-timeline-group`]: {
          borderLeft: `7px solid ${theme.informationalEvents.bg.informationalEvents}`,
        },
        [`informationalEvents-${eventType}-details`]: { color },
        [`informationalEvents-${eventType}-checked`]: { color },
      };
    })
  ),
  ...Object.assign(
    {},
    ...[...EXTERNAL_EVENT_STATES].map(eventType => {
      const color = `${theme.externalEvents.bg[eventType]} !important`;
      return {
        [`externalEvents-${eventType}`]: { backgroundColor: color },
        [`externalEvents-${eventType}-list`]: {
          borderLeft: `7px solid ${color}`,
        },
        [`externalEvents-timeline-group`]: {
          borderLeft: `7px solid ${theme.externalEvents.bg.externalEvents}`,
        },
        [`externalEvents-${eventType}-details`]: { color },
        [`externalEvents-${eventType}-checked`]: { color },
      };
    })
  ),
  ...Object.assign(
    {},
    ...[...DEMONWARE_EVENT_STATES].map(eventType => {
      const color = `${theme.demonwareEvents.bg[eventType]} !important`;
      return {
        [`demonwareEvents-${eventType}`]: { backgroundColor: color },
        [`demonwareEvents-${eventType}-list`]: {
          borderLeft: `7px solid ${color}`,
        },
        [`demonwareEvents-timeline-group`]: {
          borderLeft: `7px solid ${theme.demonwareEvents.bg.demonwareEvents}`,
        },
        [`demonwareEvents-${eventType}-details`]: { color },
        [`demonwareEvents-${eventType}-checked`]: { color },
      };
    })
  ),
  ...Object.assign(
    {},
    ...[...EVENT_TASK_STATES].map(taskType => ({
      [`eventManager-${taskType}-task`]: {
        backgroundColor: `${theme.eventManager.taskBg[taskType]} !important`,
      },
    }))
  ),
  'event-with-noEnd': {
    backgroundColor: `transparent !important`,
  },
  mainContainerSchedule: {
    height: '100%',
    margin: '0',
    padding: '0',
  },
  tagPlatformEntry: {
    marginTop: '16px',
  },
});

export const useStyles = makeStyles(styles);

export default styles;
