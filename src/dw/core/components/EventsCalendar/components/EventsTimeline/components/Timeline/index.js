import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useSelector } from 'react-redux';

import moment from 'moment';

import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container';

import { useCompare } from 'dw/core/hooks';

import {
  formatTimelineItems,
  getEventColorClass,
  getRowClass,
  getTimelineGroups,
} from './helpers';
import { getMomentFromMillisecondTimestamp } from '../../helpers';
import { TIME_STEPS } from './constants';

import TimelineEvent from './components/TimelineEvent';
import TimelineGroupSelect from './components/TimelineGroupSelect';

import styles from './index.module.css';
import './index.css';

const EventsTimeline = forwardRef(
  (
    {
      eventGroups,
      events,
      groupKey,
      onSelectEvent,
      onSelectSlot,
      range,
      setGroupKey,
      setRange,
      userTimezone,
    },
    ref
  ) => {
    const [defaultTimeStart, defaultTimeEnd] = range;

    const cachedEvents = useCompare(events);
    const formattedEvents = useMemo(
      () => formatTimelineItems(cachedEvents, userTimezone, groupKey),
      [cachedEvents, userTimezone, groupKey]
    );
    const [minTime, maxTime] = useMemo(() => {
      const min = moment.min(
        formattedEvents
          .map(e => e.start_time)
          .filter(d => d)
          .concat([moment(defaultTimeStart)])
      );
      const max = moment.max(
        formattedEvents
          .map(e => e.end_time)
          .filter(d => d)
          .concat([moment(defaultTimeEnd)])
      );
      return [min.startOf('year').valueOf(), max.endOf('year').valueOf()];
    }, [formattedEvents, defaultTimeStart, defaultTimeEnd]);

    // update range on chart scroll or header selection
    const handleTimeChange = (start, end, updateScrollCanvas) => {
      if (start < minTime && end > maxTime) {
        setRange([minTime, maxTime]);
        updateScrollCanvas(minTime, maxTime);
      } else if (start < minTime) {
        updateScrollCanvas(minTime, minTime + (end - start));
        setRange([minTime, minTime + (end - start)]);
      } else if (end > maxTime) {
        updateScrollCanvas(maxTime - (end - start), maxTime);
        setRange([maxTime - (end - start), maxTime]);
      } else {
        updateScrollCanvas(start, end);
        setRange([start, end]);
      }
    };

    const onZoom = timelineContext =>
      setRange([
        timelineContext.visibleTimeStart,
        timelineContext.visibleTimeEnd,
      ]);

    // open eventSummary modal and unselect item on chart
    const handleEventSelect = itemId => {
      const event = formattedEvents.find(e => e.id === itemId);
      const origId = event.origId || event.id;
      const origEvent = events.find(e => e.id === origId);
      onSelectEvent(origEvent);
      ref.current.selectItem(null);
    };

    // opens create event dialog with selected date
    const handleCanvasClick = (_, time) => {
      const dateTime = getMomentFromMillisecondTimestamp(
        time,
        userTimezone
      ).toDate();
      onSelectSlot({ action: 'click', start: dateTime });
    };

    const groups = useSelector(state =>
      getTimelineGroups(groupKey, eventGroups, {
        filters: state.Core.EventsCalendar.filters,
      })
    );

    return (
      <Timeline
        onZoom={onZoom}
        canChangeGroup={false}
        canMove={false}
        canResize={false}
        groupRenderer={({ group }) => (
          <div
            className={classnames(
              getRowClass(eventGroups, groupKey, group.id),
              styles.eventGroup
            )}
          >
            {group.title}
          </div>
        )}
        groups={groups}
        itemRenderer={({ item, getItemProps, itemContext }) => (
          <TimelineEvent
            getEventColorClass={(source, status) =>
              getEventColorClass(eventGroups, groupKey, source, status)
            }
            item={item}
            itemProps={getItemProps(item.itemProps)}
            userTimezone={userTimezone}
            width={itemContext.dimensions.width}
          />
        )}
        items={formattedEvents}
        onItemSelect={handleEventSelect}
        onTimeChange={handleTimeChange}
        onCanvasClick={handleCanvasClick}
        ref={ref}
        resizeDetector={containerResizeDetector}
        sidebarWidth={140}
        stackItems
        timeSteps={TIME_STEPS}
        defaultTimeStart={moment(defaultTimeStart).toDate()}
        defaultTimeEnd={moment(defaultTimeEnd).toDate()}
      >
        <TimelineHeaders className={styles.timelineHeader}>
          <SidebarHeader>
            {({ getRootProps }) => (
              <TimelineGroupSelect
                groupKey={groupKey}
                setGroupKey={setGroupKey}
                sidebarProps={getRootProps()}
              />
            )}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" className={styles.primaryHeader} />
          <DateHeader className={styles.secondaryHeader} />
        </TimelineHeaders>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </Timeline>
    );
  }
);

EventsTimeline.displayName = 'EventsTimeline';

EventsTimeline.propTypes = {
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupKey: PropTypes.string.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onSelectSlot: PropTypes.func.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  setGroupKey: PropTypes.func.isRequired,
  setRange: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

export default EventsTimeline;
