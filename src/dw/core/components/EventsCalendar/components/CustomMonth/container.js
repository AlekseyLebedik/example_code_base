/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import range from 'lodash/range';
import classnames from 'classnames';
import getHeight from 'dom-helpers/height';
import getPosition from 'dom-helpers/position';
import * as animationFrame from 'dom-helpers/animationFrame';
import { connect } from 'react-redux';

import { formatDateTime } from 'dw/core/helpers/date-time';
import { hasData } from 'dw/core/helpers/object';

import { Navigate } from '@demonware/ct-react-big-calendar';
import DateHeaderGroup from '@demonware/ct-react-big-calendar/lib/DateHeaderGroup';
import * as dates from '@demonware/ct-react-big-calendar/lib/utils/dates';

import DateHeaderGroupWrapper from '../DateHeaderGroupWrapper';

import CustomMonthStateless from './presentational';

export class CustomMonth extends Component {
  static navigate = (date, action, props) => {
    const { eventsCalendarSettings, userTimezone } = props;
    const { numberOfDays } = eventsCalendarSettings;

    switch (action) {
      case Navigate.PREVIOUS:
        return moment(date).tz(userTimezone).subtract(numberOfDays, 'day');

      case Navigate.NEXT:
        return moment(date).tz(userTimezone).add(numberOfDays, 'day');

      default:
        return date;
    }
  };

  static title = date => formatDateTime(date, 'MMMM YYYY');

  constructor(props) {
    super(props);
    this.monthRef = React.createRef();
    this.state = {
      dayViewOverlay: false,
      draggingHeaderGroup: null,
      maxRows: 7,
      needLimitMeasure: true,
      popupEvents: [],
      position: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    const updates = {};
    if (props.date !== state.date) {
      updates.date = props.date;
    }
    const needLimitMeasure = !dates.eq(state.date, props.date, 'month');
    if (state.needLimitMeasure !== needLimitMeasure) {
      updates.needLimitMeasure = needLimitMeasure;
    }
    return hasData(updates) ? updates : null;
  }

  componentDidMount() {
    if (this.state.needLimitMeasure) this.setRowLimit();

    window.addEventListener(
      'resize',
      (this._resizeListener = () => {
        animationFrame.request(() => {
          this.setState({ needLimitMeasure: true });
        });
      }),
      false
    );

    if (this.props.datePickerProps) {
      document.addEventListener('mouseover', this.onDayHover);
    }
  }

  componentDidUpdate() {
    if (this.state.needLimitMeasure) this.setRowLimit();

    if (this.props.datePickerProps) {
      document.addEventListener('mouseover', this.onDayHover);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false);

    if (this.props.datePickerProps) {
      document.removeEventListener('mouseover', this.onDayHover);
    }
  }

  onDayHover = event => {
    if (
      event.target.className.includes &&
      event.target.className.includes('rbc-day-bg')
    ) {
      const { onHoverDateChange } = this.props.datePickerProps;
      onHoverDateChange(
        event.target[Object.keys(event.target)[0]].return.memoizedProps.value
      );
    }
  };

  getOverlayPlacement = (dayViewOverlay, overlay) => {
    if (dayViewOverlay) {
      if (overlay?.date?.getDay() < 3) return 'right';
      return 'left';
    }
    return 'bottom';
  };

  setPosition = overlay => {
    // Don't show precise time popup window if for repeating event
    if (!overlay?.overlay?.event?.repeat_event_settings)
      this.setState({
        dayViewOverlay: true,
        overlay: {
          ...overlay.overlay,
        },
      });
  };

  setDraggingHeaderGroup = draggingHeaderGroup =>
    this.setState({ draggingHeaderGroup });

  setRowLimit = () => {
    if (this.monthRef && this.monthRef.current) {
      const { clientHeight: eventHeight, parentElement } =
        this.monthRef.current.headingRow;
      const monthRowHeight = getHeight(parentElement.parentElement);
      const newRowLimit = Math.floor(monthRowHeight / eventHeight) - 1;

      this.setState({
        maxRows: newRowLimit,
        needLimitMeasure: false,
      });
    }
  };

  getContainer = () => {
    let element =
      this.monthRef &&
      this.monthRef.current &&
      this.monthRef.current.parentElement;
    if (element) {
      while (element.className !== 'rbc-month-view')
        element = element.parentElement;
      return element;
    }
    return null;
  };

  handleSelectSlot = (slots, slotInfo) => {
    clearTimeout(this.selectTimer);
    this.selectTimer = setTimeout(() =>
      this.props.onSelectSlot({
        action: slotInfo.action,
        start: slots[0],
        end: slots[0],
        slots,
      })
    );
  };

  closePopup = () => {
    this.setState({
      dayViewOverlay: false,
      overlay: null,
    });
  };

  filterWeekEvents = (events, week) =>
    events.filter(
      event =>
        moment(event.start).isSame(week[0], 'week') ||
        moment(event.end).isSame(week[0], 'week') ||
        (moment(event.start).isBefore(week[0], 'day') &&
          moment(event.end).isAfter(week[6], 'day'))
    );

  handleSelectEvent = (...args) => {
    this.clearSelection();
    if (this.props.onSelectEvent) {
      this.props.onSelectEvent.apply(null, [].concat(args));
    }
  };

  handleDateHeaderGroupClick = (group, e, date) => {
    e.preventDefault();
    this.clearSelection();
    this.props.onSelectHeaderGroup(group, e, date);
  };

  monthRange = (customViewOn, numberOfDays, selectedDay) => {
    const start = customViewOn
      ? moment(selectedDay).endOf('day').day(0).subtract(1, 'day')
      : moment(selectedDay)
          .startOf('month')
          .endOf('day')
          .day(0)
          .subtract(1, 'day');
    const end = customViewOn
      ? moment(selectedDay)
          .endOf('day')
          .add(numberOfDays - 1, 'day')
          .endOf('week')
      : moment(selectedDay).endOf('day').endOf('month').endOf('week');
    const numCalendarDays = end.diff(start, 'days');
    return range(0, numCalendarDays).map(() =>
      start.add(1, 'day').startOf('day').toDate()
    );
  };

  handleShowMore = (events, date, cell, slot, target) => {
    clearTimeout(this.selectTimer);
    const { popup } = this.props;
    if (popup) {
      const position = getPosition(cell, this.getContainer());
      this.setState({
        overlay: { date, events, position, target },
        popupEvents: events.filter(
          event =>
            moment(event.start).isSame(moment(date), 'day') ||
            moment(event.end).isSame(moment(date), 'day') ||
            (moment(event.start).isBefore(moment(date), 'day') &&
              moment(event.end).isAfter(moment(date), 'day'))
        ),
        position: cell.getBoundingClientRect(),
      });
    }
  };

  clearSelection() {
    clearTimeout(this.selectTimer);
  }

  renderHeader = ref => {
    const {
      classes,
      components,
      dateHeaderGroups,
      customViewOn,
      numberOfDays,
      selectedDay,
      onDrillDown,
      userTimezone,
    } = this.props;
    const { draggingHeaderGroup } = this.state;
    const { date, key } = ref;
    const day = formatDateTime(date, 'D', userTimezone);
    const isCurrent = moment(date)
      .tz(userTimezone)
      .isSame(moment().tz(userTimezone), 'date');
    const isInSelectedMonth = moment(date)
      .tz(userTimezone)
      .isSame(selectedDay, 'month');
    const isOutsideCustomRange =
      moment(date)
        .tz(userTimezone)
        .endOf('day')
        .isBefore(moment(selectedDay).startOf('day')) ||
      moment(date)
        .tz(userTimezone)
        .startOf('day')
        .isAfter(
          moment(selectedDay)
            .add(numberOfDays - 1, 'day')
            .endOf('day')
        );
    const isOffRange =
      (customViewOn && isOutsideCustomRange) ||
      (!customViewOn && !isInSelectedMonth);
    const isSelectedDay = moment(date)
      .tz(userTimezone)
      .isSame(moment(selectedDay).tz(userTimezone), 'date');
    const label =
      day === '1' && customViewOn
        ? `${formatDateTime(date, 'MMMM D', userTimezone)}`
        : day;

    const headerClasses = classnames(
      'rbc-date-cell',
      classes.dayHeader,
      isOffRange && 'rbc-off-range',
      isCurrent && classes.dayHeaderCurrent,
      isSelectedDay && !isCurrent && classes.dayHeaderSelected
    );

    const DateHeaderGroupComponent =
      components.dateHeaderGroup || DateHeaderGroup;
    const GroupWrapper =
      components.dateHeaderGroupWrapper || DateHeaderGroupWrapper;

    const headerGroups = [...dateHeaderGroups];
    if (draggingHeaderGroup) headerGroups.push(draggingHeaderGroup);
    const groupsOnDate = headerGroups.filter(g =>
      moment(g.start)
        .tz(userTimezone)
        .isSame(moment(date).tz(userTimezone), 'date')
    );

    const Groups = (
      <div className="rbc-date-header-groups">
        {groupsOnDate.map(group => (
          <GroupWrapper
            group={group}
            key={`${group.id || group.name}${group.__isPreview && '/preview'}`}
          >
            <DateHeaderGroupComponent
              components={components}
              group={group}
              onSelect={(g, e) => this.handleDateHeaderGroupClick(g, e, date)}
            />
          </GroupWrapper>
        ))}
      </div>
    );

    return (
      <div key={key} className={headerClasses}>
        <a
          onClick={e => {
            clearTimeout(this.selectTimer);
            onDrillDown(e);
          }}
          value={date}
        >
          {label}
        </a>
        {Groups}
      </div>
    );
  };

  render() {
    const newProps = {
      ...this.props,
      ...this.state,
      closePopup: this.closePopup,
      filterWeekEvents: this.filterWeekEvents,
      getContainer: this.getContainer,
      getOverlayPlacement: this.getOverlayPlacement,
      handleSelectSlot: this.handleSelectSlot,
      handleSelectEvent: this.handleSelectEvent,
      handleShowMore: this.handleShowMore,
      monthRange: this.monthRange,
      monthRef: this.monthRef,
      navigate: this.navigate,
      renderHeader: this.renderHeader,
      setDraggingHeaderGroup: this.setDraggingHeaderGroup,
      setRef: this.setRef,
      setPosition: this.setPosition,
      title: this.title,
      customViewOn: this.props.customViewOn,
      numberOfDays: this.props.numberOfDays,
      selectedDay: this.props.selectedDay,
    };
    return <CustomMonthStateless {...newProps} />;
  }
}

CustomMonth.propTypes = {
  classes: PropTypes.object,
  components: PropTypes.object.isRequired,
  dateHeaderGroups: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  customViewOn: PropTypes.bool.isRequired,
  datePickerProps: PropTypes.object,
  numberOfDays: PropTypes.number.isRequired,
  selectedDay: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
  onDrillDown: PropTypes.func.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onSelectHeaderGroup: PropTypes.func,
  onSelectSlot: PropTypes.func.isRequired,
  popup: PropTypes.bool.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

CustomMonth.defaultProps = {
  classes: {},
  dateHeaderGroups: [],
  onSelectHeaderGroup: () => {},
  datePickerProps: {},
};
export default connect(state => ({
  customViewOn: state.Core.EventsCalendar.customViewOn,
  numberOfDays: state.Core.EventsCalendar.numberOfDays,
  selectedDay: state.Core.EventsCalendar.selectedDay,
  datePickerProps: state.Core.EventsCalendar.datePickerProps,
}))(CustomMonth);
