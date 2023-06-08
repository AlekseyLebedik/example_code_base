/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { createStore, combineReducers } from 'redux';

import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';

import reduxDecorator from 'stories/helpers/reduxDecorator';

import EventsCalendar from 'dw/core/components/EventsCalendar';
import eventsCalendarReducer from 'dw/core/components/EventsCalendar/reducer';

import * as CoreReplicas from 'dw/core/replicas';

import { CreateEventManagerEventModal } from './EventsCalendar/createEventManagerEvent';
import { eventsCalendarIntro } from './EventsCalendar/intro';
import { otherTestEventGroup } from './EventsCalendar/otherGroupData';
import { eventManagerTestEventGroup } from './EventsCalendar/eventManagerGroupData';

import styles from './EventsCalendar/eventsCalendar.module.css';

const { UserReplica } = CoreReplicas;

const calendarPlatforms = ['CROSSPLAY', 'PC', 'PS4', 'XB1'];

const rootReducer = combineReducers({
  Core: combineReducers({
    EventsCalendar: eventsCalendarReducer,
  }),
  user: UserReplica.reducer,
});

const store = createStore(rootReducer);

class WrappedCalendar extends Component {
  static propTypes = {
    eventGroups: PropTypes.arrayOf(PropTypes.object),
    SelectSlotComponent: PropTypes.elementType,
  };

  static defaultProps = {
    eventGroups: [],
    SelectSlotComponent: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      eventGroups: props.eventGroups.map(group => ({
        ...group,
        modifyEvent: this.editEvent,
      })),
      isCreateEventVisible: false,
      projects: [
        { projectId: 1, name: 'GTR Project' },
        { projectId: 'null', name: 'Cross Project' },
      ],
    };
  }

  closeModal = () => {
    this.setState({
      isCreateEventVisible: false,
    });
  };

  openModal = () => {
    this.setState({
      isCreateEventVisible: true,
    });
  };

  editEvent = event => {
    this.setState(state => {
      let updatedEventGroups = cloneDeep(state.eventGroups);
      updatedEventGroups = updatedEventGroups.map(group => {
        if (group.type === event.type) {
          const eventIdx = group.events.findIndex(e => e.id === event.id);
          const updatedEvents = cloneDeep(group.events);
          updatedEvents[eventIdx] = event;
          return {
            ...group,
            events: updatedEvents,
          };
        }
        return group;
      });

      return { eventGroups: updatedEventGroups };
    });
  };

  render() {
    const { eventGroups, isCreateEventVisible, projects } = this.state;
    const { SelectSlotComponent } = this.props;

    return (
      <div className={styles.calendarStoryWrapper}>
        {isCreateEventVisible && SelectSlotComponent && (
          <SelectSlotComponent
            closeModal={this.closeModal}
            isCreateEventVisible={isCreateEventVisible}
          />
        )}
        <EventsCalendar
          {...this.props}
          affiliatedProjects={projects}
          eventGroups={eventGroups}
          onFetchEvents={() => {}}
          onSelectSlot={SelectSlotComponent && this.openModal}
          platforms={calendarPlatforms}
        />
      </div>
    );
  }
}

storiesOf('core/EventsCalendar', module)
  .addDecorator(reduxDecorator(store))
  .addDecorator(withInfo())
  .add('intro', eventsCalendarIntro)
  .add('no sidebar', () => <WrappedCalendar eventGroups={[]} sidebar={false} />)
  .add('no event groups', () => <WrappedCalendar eventGroups={[]} sidebar />)
  .add('one event group (with create event)', () => (
    <WrappedCalendar
      eventGroups={[eventManagerTestEventGroup]}
      SelectSlotComponent={CreateEventManagerEventModal}
      sidebar
    />
  ))
  .add('two event groups', () => (
    <WrappedCalendar
      eventGroups={[eventManagerTestEventGroup, otherTestEventGroup]}
      sidebar
    />
  ));
