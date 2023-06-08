import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

import LoadingComponent from 'dw/core/components/Loading';
import { formatTooltipDateTime } from 'dw/core/components/EventsCalendar/helpers';

import { setBaseUrl } from 'playpants/components/EventSummaryDialog/helpers';
import {
  currentProjectSelector,
  getBaseURL,
} from 'playpants/components/App/selectors';
import { eventFetchDetailsSelector } from 'playpants/components/ScheduleComponent/selectors';
import {
  useFetchEventDetails,
  useTitleNameSelector,
} from 'playpants/components/ScheduleComponent/hooks';
import {
  EVENT_MANAGER_STATES,
  EVENT_TASK_STATES,
} from 'playpants/components/ScheduleComponent/constants';

import summaryClassesBase from 'playpants/components/EventSummaryDialog/styles';

import GridItem from './components/GridItem';
import ConflictsItem from './components/ConflictsItem';
import ExpyTestDetails from './components/ExpyTestDetails';
import { getPopoverItems, getStatusItems } from './helpers';
import { eventConflictDataSelector } from '../../selectors';
import { RIGHT_CLICK_BUTTON, RIGHT_CLICK_WHICH } from './constants';

const useSummaryClasses = makeStyles(summaryClassesBase);

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: '600px',
    pointerEvents: 'auto',
  },
  testPaper: {
    padding: theme.spacing(3),
    maxWidth: '800px',
    pointerEvents: 'auto',
  },
  ...Object.assign(
    {},
    ...[...EVENT_MANAGER_STATES].map(eventStatus => ({
      [`status-${eventStatus}`]: {
        color: `${theme.eventManager.bg[eventStatus]} !important`,
      },
    }))
  ),
  ...Object.assign(
    {},
    ...[...EVENT_TASK_STATES].map(taskType => ({
      [`task-${taskType}`]: {
        color: `${theme.eventManager.taskBg[taskType]} !important`,
      },
    }))
  ),
  shortItem: {
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    marginLeft: theme.spacing(2),
  },
}));

const EventPopover = ({
  item,
  itemProps: rawItemProps,
  userTimezone,
  width,
  projects,
  loadConflicts,
  onItemSelect,
}) => {
  const fetchEventDetails = useFetchEventDetails();
  const titleNameSelector = useTitleNameSelector();
  const ownClasses = useStyles();
  const summaryClasses = useSummaryClasses();
  const classes = useMemo(
    () => ({ ...summaryClasses, ...ownClasses }),
    [summaryClasses, ownClasses]
  );

  const modifiedMouseDown = useCallback(
    event => {
      const openNewTab =
        event.ctrlKey ||
        event.metaKey ||
        event.button === RIGHT_CLICK_BUTTON ||
        event.which === RIGHT_CLICK_WHICH;
      onItemSelect(item.id, !!openNewTab);
    },
    [item, onItemSelect]
  );

  const navigateChangeEvent = useCallback(() => {
    onItemSelect(item.id);
  }, [item, onItemSelect]);

  const itemProps = useMemo(() => omit(rawItemProps, 'title'), [rawItemProps]);
  const fetchedData = useSelector(eventFetchDetailsSelector, isEqual);
  const event = useMemo(() => {
    let eventItem;
    // event isn't used in Expy details modal, and the events fetch selector
    // isn't used to get expy details, so if the item is of type expyTests,
    // then just set eventItem equal to fetched data, so that it never
    // includes expy data, this way an expy item and fetched data for another
    // event type don't get mixed together.
    if (item.type === 'expyTests') {
      eventItem = fetchedData.data;
    } else {
      eventItem = {
        ...item,
        ...fetchedData.data,
      };
    }
    return {
      ...eventItem,
      eventId: eventItem.origId,
      autoTags: eventItem.auto_tags || [],
      manualTags: eventItem.manual_tags || [],
      startTime: eventItem.start_time,
      endTime: eventItem.end_time,
      eventType: eventItem.event_type,
      tags: eventItem.tags || [],
      titleName: titleNameSelector(eventItem.title_id),
    };
  }, [item, fetchedData, titleNameSelector]);

  const formatDate = useCallback(
    date => formatTooltipDateTime(date, userTimezone, false),
    [userTimezone]
  );

  const { conflicts, fetched, loading } = useSelector(
    state => eventConflictDataSelector(state, { eventId: event.eventId }),
    isEqual
  );
  const fetchConflicts = useCallback(() => {
    if (
      !event.isTemplate &&
      ['eventManager', 'informationalEvents'].includes(event.type) &&
      !fetched
    ) {
      loadConflicts(event.eventId);
    }
  }, [fetched, loadConflicts, event]);

  const [_open, setOpen] = useState(null);
  const [anchorPosition, setAnchorPosition] = useState([0, 0]);
  let eventHovered = false;
  let popoverHovered = false;
  const openPopover = (x, y) => {
    if (eventHovered) {
      setAnchorPosition([x, y]);
      setOpen(true);
      fetchEventDetails({
        ...omit(item, ['start_time', 'end_time']),
        id: event.eventId,
      }); // omiting these values as they are moment objects and non-seralizable
      fetchConflicts();
    }
  };
  const eventEnter = ({ clientX, clientY }) => {
    eventHovered = true;
    setTimeout(() => openPopover(clientX, clientY), 750);
  };
  const closePopover = () => {
    if (!popoverHovered) setOpen(false);
  };
  const eventLeave = () => {
    eventHovered = false;
    setTimeout(() => closePopover(), 500);
  };
  const popoverEnter = () => {
    popoverHovered = true;
  };
  const popoverLeave = () => {
    setOpen(false);
    popoverHovered = false;
  };
  const open = Boolean(_open) || popoverHovered;

  const currentProject = useSelector(currentProjectSelector);
  const baseUrl = useSelector(getBaseURL);
  const projectBaseUrl =
    currentProject.id !== event.project ? setBaseUrl(baseUrl, event) : baseUrl;

  const statusItems = useMemo(
    () => getStatusItems(event, classes),
    [event, classes]
  );

  const popoverItems = useMemo(
    () => getPopoverItems(event, projects, currentProject, formatDate),
    [event, projects, currentProject, formatDate]
  );

  return (
    <>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={eventEnter}
        onMouseLeave={eventLeave}
        {...itemProps}
        onMouseDown={modifiedMouseDown}
        className={cn('rct-item', itemProps.className, {
          [classes.shortItem]: width < 200,
        })}
      >
        <div>{item.title}</div>
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: item.type === 'expyTests' ? classes.testPaper : classes.paper,
        }}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ left: anchorPosition[0], top: anchorPosition[1] }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        {item.type === 'expyTests' ? (
          <ExpyTestDetails event={item} userTimezone={userTimezone} />
        ) : (
          <Grid container spacing={1}>
            <Grid item key="title" xs={9}>
              <Typography
                component="div"
                variant="h6"
                className={classes.titleContainer}
              >
                {event.title}
                <Tooltip title="Change Event">
                  <a
                    onClick={() => navigateChangeEvent()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    <Icon>open_in_new</Icon>
                  </a>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item key="status_panel" xs={3}>
              <Grid container spacing={1}>
                {statusItems.map(siProps => (
                  <GridItem key={siProps.title} {...siProps} titleSize={5} />
                ))}
              </Grid>
            </Grid>
            {popoverItems.map(piProps => (
              <GridItem key={piProps.title} {...piProps} classes={classes} />
            ))}
            {fetchedData.loading ? (
              <Grid item key="details-loading" xs={12}>
                Loading more data ...
              </Grid>
            ) : null}
            {(loading && (
              <Grid item key="conflicts" xs={12}>
                <Grid container spacing={1}>
                  <Grid item key="conflicts_message" xs={6}>
                    <Typography component="span" variant="subtitle1">
                      Loading Conflicts...
                    </Typography>
                  </Grid>
                  <Grid item key="conflicts_loading" xs={6}>
                    <LoadingComponent size={40} />
                  </Grid>
                </Grid>
              </Grid>
            )) ||
              (conflicts?.length > 0 && (
                <ConflictsItem
                  conflicts={conflicts}
                  baseUrl={`${projectBaseUrl}events/${event.eventId}/conflicts`}
                  classes={classes}
                />
              ))}
          </Grid>
        )}
      </Popover>
    </>
  );
};

EventPopover.propTypes = {
  item: PropTypes.object.isRequired,
  userTimezone: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  loadConflicts: PropTypes.func.isRequired,
  itemProps: PropTypes.object,
  projects: PropTypes.array,
  onItemSelect: PropTypes.func.isRequired,
};

EventPopover.defaultProps = {
  itemProps: {},
  projects: [],
};

export default EventPopover;
