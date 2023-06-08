import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import cn from 'classnames';
import queryString from 'query-string';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { useCompare, usePrevious } from 'dw/core/hooks';
import Timeline, {
  SidebarHeader,
  DateHeader,
  TimelineHeaders,
  TimelineMarkers,
  TodayMarker,
} from 'react-calendar-timeline';
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container';

import { fetchEventGroups } from 'dw/core/components/EventsCalendar/helpers';
import { CalendarThemeProvider } from 'dw/core/components/EventsCalendar/themeEventsFilter';
import { makeFilteredEventsSelector } from 'dw/core/components/EventsCalendar/selectors';
import { ENV_TYPE_FILTERS } from 'dw/core/components/EventsCalendar/constants';

import EventSidebar from 'playpants/components/EventSidebar';
import { useDecoratedEventGroups } from 'playpants/components/ScheduleComponent/hooks';
import { affiliatedProjectsSelector } from 'playpants/components/App/selectors';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';

import { useCalendarPresets } from 'playpants/components/EventSidebar/components/CalendarPresets/hooks';

import 'react-calendar-timeline/lib/Timeline.css';

import { formatTimelineItems, getTimelineGroups, labelFormat } from './helpers';
import { fetchEventConflicts } from './conflictsSlice';
import TimelineActions from './components/TimelineActions';
import EventPopover from './components/EventPopover';
import GroupSelector from './components/GroupSelector';
import { ALLOWED_GROUPS, EDITABLE_TYPES } from './constants';

import styles from './index.module.css';

const Events = props => {
  const history = useHistory();
  const presets = useCalendarPresets();
  const [groupBy, setGroupBy] = useState(() => {
    const query = queryString.parse(history.location.search);
    const value = query.groupBy || presets.groupBy;
    if (ALLOWED_GROUPS.includes(value)) return value;
    return 'projects';
  });
  useEffect(() => {
    const query = queryString.parse(history.location.search);
    query.groupBy = groupBy;
    history.replace({
      pathname: history.location.pathname,
      search: queryString.stringify(query),
    });
  }, [history, groupBy]);
  const { onFetchEvents, eventGroups: rawEventGroups, classes } = props;
  const eventGroups = useDecoratedEventGroups(rawEventGroups);
  const userTimezone = useSelector(timezoneOrDefaultSelector);
  const prevTimezone = usePrevious(userTimezone);
  moment.tz.setDefault(userTimezone);
  const [filters, filtersRef] = useState({});
  const selectedStyle = useSelector(
    state => state.Core.EventsCalendar.selectedStyle
  );
  const affiliatedProjects = useSelector(affiliatedProjectsSelector, isEqual);

  const timelineGroups = useMemo(
    () => getTimelineGroups(groupBy, filters, affiliatedProjects, eventGroups),
    [groupBy, filters, affiliatedProjects, eventGroups]
  );

  useEffect(() => {
    fetchEventGroups(onFetchEvents, eventGroups, {});
    // eslint-disable-next-line
  }, []);

  const readOnlyCallback = useCallback(
    event => !EDITABLE_TYPES.includes(event.type),
    []
  );

  const filteredEventsSelector = useMemo(
    () => makeFilteredEventsSelector({ addOffset: false, readOnlyCallback }),
    [readOnlyCallback]
  );

  const filteredEventsRaw = useSelector(
    state =>
      filteredEventsSelector(state, {
        ...props,
        eventGroups,
        affiliatedProjects,
      }),
    isEqual
  );

  const filteredEvents = useCompare(filteredEventsRaw);

  const getSelectedStyleColor = useCallback(
    itemColor => {
      if (selectedStyle === 'projects') {
        return sortBy(affiliatedProjects, p => p.name).findIndex(
          p => String(itemColor) === String(p.projectId)
        );
      }
      return itemColor;
    },
    [affiliatedProjects, filters, selectedStyle]
  );

  const formattedEvents = useMemo(
    () =>
      formatTimelineItems(
        filteredEvents,
        userTimezone,
        groupBy,
        selectedStyle
      ).map(item => ({
        ...item,
        itemProps: {
          className: cn(
            classes[
              `filters-${selectedStyle}-${getSelectedStyleColor(
                ENV_TYPE_FILTERS[item.color] || item.color
              )}-event`
            ],
            item.isReadOnly ? styles.readOnly : styles.editable
          ),
        },
      })),
    [filteredEvents, userTimezone, selectedStyle, groupBy, classes]
  );

  const [defaultTimeStart, defaultTimeEnd] = useMemo(() => {
    const query = queryString.parse(history.location.search);
    let start;
    let end;
    if (query.defaultTimeStart && query.defaultTimeEnd)
      return [
        parseInt(query.defaultTimeStart, 10),
        parseInt(query.defaultTimeEnd, 10),
      ];
    const numberOfDays = presets.numberOfDays
      ? parseInt(presets.numberOfDays, 10)
      : 30;
    if (numberOfDays > 360) {
      start = moment().startOf('year');
      end = moment().endOf('year');
    } else if (numberOfDays > 32) {
      start = moment().startOf('month');
      end = moment(start)
        .add(numberOfDays, 'd')
        .subtract(1, 's')
        .endOf('month');
    } else if (numberOfDays > 22 && numberOfDays <= 32) {
      start = moment().startOf('month');
      end = moment(start).endOf('month');
    } else if (numberOfDays >= 6) {
      start = moment().startOf('week');
      end = moment(start).add(numberOfDays, 'd').subtract(1, 's').endOf('week');
    } else {
      start = moment().startOf('day');
      end = moment(start).add(numberOfDays, 'd').subtract(1, 's').endOf('day');
    }
    return [start.valueOf(), end.valueOf()];
  }, [history, presets]);

  const [range, _setRange] = useState([
    defaultTimeStart.valueOf(),
    defaultTimeEnd.valueOf(),
  ]);

  const [blockChange, setBlockChange] = useState(false);

  const setRange = useCallback(
    (newRange, blockHandleTimeChange = false) => {
      if (blockHandleTimeChange) {
        setBlockChange(true);
        setTimeout(() => setBlockChange(false), 500);
      }
      if (!isEqual(range, newRange)) _setRange(newRange);
    },
    [range]
  );

  // eslint-disable-next-line
  const changeQueryRange = useCallback(
    debounce((start, end) => {
      const query = queryString.parse(history.location.search);
      query.defaultTimeStart = Math.floor(start.valueOf());
      query.defaultTimeEnd = Math.ceil(end.valueOf());
      history.replace({
        pathname: history.location.pathname,
        search: queryString.stringify(query),
      });
    }, 500),
    [history]
  );

  useEffect(() => {
    changeQueryRange(...range);
    // eslint-disable-next-line
  }, [range]);

  useEffect(() => {
    if (!prevTimezone) return;
    const prev = moment.tz.zone(prevTimezone).utcOffset(range[0]);
    const next = moment.tz.zone(userTimezone).utcOffset(range[0]);
    const offset = (next - prev) * 1000;
    if (prev !== next) {
      setRange([range[0].valueOf() + offset, range[1].valueOf() + offset]);
    }
    // eslint-disable-next-line
  }, [userTimezone, range, setRange]);

  // update range on chart scroll or header selection

  const handleTimeChange = useCallback(
    (start, end, updateScrollCanvas) => {
      if (blockChange) {
        return;
      }
      setRange([start, end]);
      updateScrollCanvas(start, end);
    },
    [setRange, blockChange]
  );

  const onZoom = useCallback(
    timelineContext =>
      setRange([
        timelineContext.visibleTimeStart,
        timelineContext.visibleTimeEnd,
      ]),
    [setRange]
  );

  const [groupOpen, setGroupOpen] = useState(true);

  const expandableGroup = useMemo(
    () => timelineGroups.find(g => g.id === undefined),
    [timelineGroups]
  );
  const filteredGroups = useMemo(() => {
    const groups = timelineGroups.filter(g => g.id);
    if (expandableGroup) {
      groups.push({
        id: groupOpen ? expandableGroup.id : 'other-group-toggle',
        title: (
          <div className={styles.expandableGroup}>
            {expandableGroup.title}
            <IconButton onClick={() => setGroupOpen(state => !state)}>
              <Icon>{groupOpen ? 'expand_less' : 'expand_more'}</Icon>
            </IconButton>
          </div>
        ),
      });
    }
    return groups;
  }, [groupOpen, timelineGroups, expandableGroup]);

  const timelineRef = useRef();

  const onItemSelect = useCallback(
    (itemId, openInNewTab) => {
      const event = formattedEvents.find(e => e.id === itemId);
      timelineRef.current.selectItem(null);
      const navigate = openInNewTab
        ? link => window.open(link, '_blank')
        : history.push;
      if (event.isReadOnly && event.type !== 'abTesting') return;
      switch (event.type) {
        case 'abTesting':
          navigate(
            `/abtesting/view/${event.titleID}/${event.environment}/${event.testID}`
          );
          break;
        default:
          navigate(`/event-manager/${event.project}/events/${event.origId}`);
          break;
      }
    },
    [formattedEvents, history]
  );

  const sidebarProps = {
    classes,
    filtersRef,
    eventGroups,
    onFetchEvents,
  };

  const rangeSpan = useMemo(
    () =>
      Math.round(
        moment
          .duration(moment(range[1]).valueOf() - range[0].valueOf())
          .asDays()
      ),
    [range]
  );
  const setRangeSpan = useCallback(
    newRangeSpan => {
      const value = parseInt(newRangeSpan, 10);
      if (value === rangeSpan) return;
      if (value) {
        const start = moment(range[0]).startOf('day');
        const end = moment(start).add(value, 'd').subtract(1, 's').endOf('day');
        setRange([start.valueOf(), end.valueOf()]);
      } else setRange([range[0], moment(range[0]).add(1, 'h')]);
    },
    [range, setRange, rangeSpan]
  );

  const dispatch = useDispatch();
  const loadConflicts = useCallback(
    eventId => dispatch(fetchEventConflicts(eventId)),
    [dispatch]
  );

  const getSubgroupClass = group => {
    if (group.isSubgroupHeading) return styles.subgroupHeading;
    if (group.isSubgroupItem) return styles.subgroupItem;
    return '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <EventSidebar {...sidebarProps} />
      </div>
      <div className={styles.rightContainer}>
        <TimelineActions
          setRange={setRange}
          range={range}
          rangeSpan={rangeSpan}
          setRangeSpan={setRangeSpan}
          filteredEvents={filteredEvents}
        />
        <Timeline
          ref={timelineRef}
          onZoom={onZoom}
          canChangeGroup={false}
          canMove={false}
          canResize={false}
          items={formattedEvents}
          onTimeChange={handleTimeChange}
          groupRenderer={({ group: g }) => (
            <div className={getSubgroupClass(g)}>{g?.title}</div>
          )}
          stackItems
          visibleTimeStart={range[0].valueOf()}
          visibleTimeEnd={range[1].valueOf()}
          groups={filteredGroups}
          resizeDetector={containerResizeDetector}
          sidebarWidth={200}
          horizontalLineClassNamesForGroup={group =>
            group.id === 'other-group-toggle' ? [styles.expandableGroupRow] : []
          }
          selected={[]}
          itemRenderer={({ item, getItemProps, itemContext }) => (
            <EventPopover
              item={item}
              itemProps={getItemProps(item.itemProps)}
              width={itemContext.dimensions.width}
              userTimezone={userTimezone}
              projects={affiliatedProjects}
              loadConflicts={loadConflicts}
              onItemSelect={onItemSelect}
            />
          )}
        >
          <TimelineHeaders className={styles.timelineHeader}>
            <SidebarHeader>
              {({ getRootProps }) => (
                <GroupSelector
                  groupBy={groupBy}
                  setGroupBy={setGroupBy}
                  sidebarProps={getRootProps()}
                />
              )}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" className={styles.primaryHeader} />
            <DateHeader
              className={styles.secondaryHeader}
              labelFormat={labelFormat}
            />
          </TimelineHeaders>
          <TimelineMarkers>
            <TodayMarker />
          </TimelineMarkers>
        </Timeline>
      </div>
    </div>
  );
};

Events.propTypes = {
  onFetchEvents: PropTypes.func.isRequired,
  eventGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object,
};

Events.defaultProps = {
  classes: {},
};

const StyledEvents = props => (
  <CalendarThemeProvider>
    <Events {...props} />
  </CalendarThemeProvider>
);

export default StyledEvents;
