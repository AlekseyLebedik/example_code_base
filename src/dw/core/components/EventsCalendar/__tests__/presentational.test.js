import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import classNames from 'classnames';

import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { EventsCalendarPresentational } from '../presentational';
import * as actions from '../actions';

moment.tz.setDefault('UTC');

describe.skip('EventsCalendarPresentational', () => {
  const setEventsCalendarSettings = jest.spyOn(
    actions,
    'setEventsCalendarSettings'
  );
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventsCalendarPresentational {...props} />);
  });

  it('renders correctly with day view', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no sidebar', () => {
    wrapper.setProps({
      sidebar: false,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with week view', () => {
    wrapper.setProps({
      selectedView: 'week',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with month view', () => {
    wrapper.setProps({
      selectedView: 'month',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with custom week view', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        customViewOn: true,
        numberOfDays: 4,
      },
      selectedView: 'week',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with custom month view', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        customViewOn: true,
        numberOfDays: 50,
      },
      selectedView: 'month',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with list view', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        isCalendarView: false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('calling navigateCalendar calls setCalendarSettings to change selectedDay', () => {
    wrapper.props.navigateCalendar(moment('2019-02-10T00:00:00Z').toDate());
    expect(setEventsCalendarSettings).toHaveBeenCalledTimes(1);
  });

  it('calling setEventStyle sets the event style', () => {
    const setStyle = wrapper.props.setEventStyle(
      { status: 'approved', type: 'eventManager' },
      ['test']
    );

    expect(setStyle).toEqual({
      className: classNames('test', [props.eventGroups[0].classes.approved]),
      parentClasses: classNames('test', [
        props.eventGroups[0].classes.approved,
      ]),
    });
  });

  it('calling getNonCustomDays returns the appropriate number of days for a selected view', () => {
    expect(wrapper.props.getNonCustomDays('day')).toEqual(1);
    expect(wrapper.props.getNonCustomDays('week')).toEqual(7);
    expect(wrapper.props.getNonCustomDays('month')).toEqual(31);
  });

  it('calling onDrillDown sets the calendar view to the day view for the selected day', () => {
    wrapper.props.onDrillDown('2019-01-29T00:00:00.000Z');
    expect(setEventsCalendarSettings).toHaveBeenCalledTimes(1);
    wrapper.props.onDrillDown({
      target: {
        attributes: {
          value: {
            value: '2019-01-29T00:00:00.000Z',
          },
        },
      },
    });
    expect(setEventsCalendarSettings).toHaveBeenCalledTimes(2);
  });
});
