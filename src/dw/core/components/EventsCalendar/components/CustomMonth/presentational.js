import React from 'react';
import { Overlay } from 'react-overlays';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import cloneDeep from 'lodash/cloneDeep';
import range from 'lodash/range';

import DateContentRow from '@demonware/ct-react-big-calendar/lib/DateContentRow';
import Header from '@demonware/ct-react-big-calendar/lib/Header';
import ReactBigCalendarPopup from '@demonware/ct-react-big-calendar/lib/Popup';

import { formatDateTime } from 'dw/core/helpers/date-time';

const renderOverlay = props => {
  const {
    accessors,
    closePopup,
    components,
    dayViewOverlay,
    dragDropStyles,
    events,
    getOverlayPlacement,
    getters,
    handleSelectEvent,
    localizer,
    overlay,
    popupOffset,
    selected,
  } = props;
  let updatedEvents = cloneDeep(events);
  if (overlay && overlay.event && dayViewOverlay) {
    updatedEvents = updatedEvents.map(ele => {
      if (
        ele.id === overlay.event.id &&
        dragDropStyles &&
        document.getElementsByClassName(dragDropStyles.dragged).length !== 0
      ) {
        return {
          ...overlay.event,
          __isPreview: false,
        };
      }
      return ele;
    });
  } else {
    updatedEvents = overlay ? overlay.events : [];
  }

  return (
    <Overlay
      onHide={closePopup}
      placement={getOverlayPlacement(dayViewOverlay, overlay)}
      rootClose
      rootCloseEvent="mousedown"
      show={!!(overlay && overlay.position)}
      target={() => overlay && overlay.target}
    >
      {({ props: popupProps }) =>
        overlay && (
          <ReactBigCalendarPopup
            {...popupProps}
            {...props}
            accessors={accessors}
            components={components}
            dayViewOverlay={dayViewOverlay}
            events={updatedEvents}
            getters={getters}
            localizer={localizer}
            onSelect={handleSelectEvent}
            overlay={overlay}
            position={overlay.position}
            popupOffset={popupOffset}
            selected={selected}
            slotStart={overlay.date}
            slotEnd={overlay.end}
          />
        )
      }
    </Overlay>
  );
};

const CustomMonthStateless = props => {
  const {
    events,
    filterWeekEvents,
    handleSelectSlot,
    handleSelectEvent,
    handleShowMore,
    localizer,
    maxRows,
    monthRange,
    monthRef,
    needLimitMeasure,
    renderHeader,
    popup,
    setDraggingHeaderGroup,
    setPosition,
    customViewOn,
    numberOfDays,
    selectedDay,
  } = props;
  const month = monthRange(customViewOn, numberOfDays, selectedDay);
  const weeks = chunk(month, 7);

  return (
    <div className="rbc-month-view">
      <div className="rbc-row rbc-month-header">
        {weeks[0] &&
          range(0, weeks[0].length).map(idx => (
            <div className="rbc-header" key={`header_${idx}`}>
              <Header
                date={weeks[0][idx]}
                label={localizer.format(weeks[0][idx], 'weekdayFormat')}
                localizer={localizer}
              />
            </div>
          ))}
      </div>
      {popup && renderOverlay(props)}
      {weeks &&
        weeks.map((week, weekIdx) => {
          const newProps = {
            ...props,
            className: 'rbc-month-row',
            events: filterWeekEvents(events, week) || [],
            key: week.map(w => formatDateTime(w)),
            maxRows,
            renderForMeasure: needLimitMeasure,
            onSelectSlot: handleSelectSlot,
            onSelect: handleSelectEvent,
            onShowMore: handleShowMore,
            range: week,
            ref: weekIdx === 0 ? monthRef : undefined,
            renderHeader,
            setDraggingHeaderGroup,
            setPosition,
          };

          return <DateContentRow {...newProps} />;
        })}
    </div>
  );
};

CustomMonthStateless.propTypes = {
  customViewOn: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventsCalendarSettings: PropTypes.shape({
    customViewOn: PropTypes.bool.isRequired,
    numberOfDays: PropTypes.number.isRequired,
    selectedDay: PropTypes.object.isRequired,
  }).isRequired,
  filterWeekEvents: PropTypes.func.isRequired,
  handleSelectEvent: PropTypes.func.isRequired,
  handleSelectSlot: PropTypes.func.isRequired,
  handleShowMore: PropTypes.func.isRequired,
  localizer: PropTypes.object.isRequired,
  maxRows: PropTypes.number.isRequired,
  monthRange: PropTypes.func.isRequired,
  monthRef: PropTypes.object.isRequired,
  needLimitMeasure: PropTypes.bool.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  popup: PropTypes.bool.isRequired,
  renderHeader: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  setDraggingHeaderGroup: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
};

export default CustomMonthStateless;
