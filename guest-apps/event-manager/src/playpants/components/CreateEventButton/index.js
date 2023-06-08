import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from 'dw/core/components/IconButton';

import ModalHandlers from 'dw/core/components/ModalHandlers';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';
import { useEMPermissionsResult } from 'playpants/hooks';
import { getBaseURL } from 'playpants/components/App/selectors';
import { CREATE_EVENT_FORM } from 'playpants/scenes/Schedule/constants';
import {
  defaultToInfoSelector,
  displayInfoEventsSelector,
} from 'playpants/components/ScheduleComponent/selectors';
import {
  setStartDate,
  setEndDate,
} from 'playpants/components/ScheduleComponent/helpers';
import { updateCreateFormDefaultDate } from 'playpants/components/ScheduleComponent/actions';

import CreateEventDialog from './components/CreateEventDialog';

import styles from './index.module.css';

const CreateEventButton = props => {
  const { fab } = props;
  const dispatch = useDispatch();
  const eventTimeOffset = useSelector(
    state => state.Core.EventsCalendar.eventTimeOffset
  );
  const userTimezone = useSelector(timezoneOrDefaultSelector);
  const { eventWritePermission } = useEMPermissionsResult();

  const dialogProps = {
    baseUrl: useSelector(getBaseURL),
    defaultToInfo: useSelector(defaultToInfoSelector),
    displayInfoEvents: useSelector(displayInfoEventsSelector),
    userTimezone,
  };

  const onOpenCreateEventModal = useCallback(
    () => dispatch(ModalHandlers.open(CREATE_EVENT_FORM)),
    [dispatch]
  );

  const onUpdateCreateFormDefaultDate = useCallback(
    (defaultStartDate, defaultEndDate, isRange) =>
      dispatch(
        updateCreateFormDefaultDate(defaultStartDate, defaultEndDate, isRange)
      ),
    [dispatch]
  );

  const handleOpenCreateEventModal = useCallback(
    (rbcEventHandler, offset, view) => {
      const { action, start: startDate } = rbcEventHandler;

      const currentDate = moment().toDate();
      const defaultStartDate = setStartDate(
        rbcEventHandler,
        offset,
        view,
        userTimezone
      );
      const defaultEndDate = setEndDate(
        rbcEventHandler,
        offset,
        view,
        userTimezone
      );
      const isRange = action === 'select' && view !== 'month';
      if (!startDate || startDate >= currentDate) {
        onUpdateCreateFormDefaultDate(
          defaultStartDate,
          defaultEndDate,
          isRange
        );
        onOpenCreateEventModal();
      }
    },
    [userTimezone, onUpdateCreateFormDefaultDate, onOpenCreateEventModal]
  );
  return eventWritePermission ? (
    <>
      {fab ? (
        <Fab
          color="primary"
          className={styles.container}
          onClick={() =>
            handleOpenCreateEventModal(
              moment().startOf('hour').toDate(),
              eventTimeOffset
            )
          }
        >
          <Icon>add</Icon>
        </Fab>
      ) : (
        <IconButton
          dataCy="createEventButton"
          color="inherit"
          icon="add_circle"
          onClick={() =>
            handleOpenCreateEventModal(
              moment().startOf('hour').toDate(),
              eventTimeOffset
            )
          }
          tooltip="Create Event"
        />
      )}
      <CreateEventDialog
        {...dialogProps}
        formName={CREATE_EVENT_FORM}
        openModal={handleOpenCreateEventModal}
        title="Create Event"
      />
    </>
  ) : null;
};

CreateEventButton.propTypes = {
  fab: PropTypes.bool,
};

CreateEventButton.defaultProps = {
  fab: false,
};

export default CreateEventButton;
