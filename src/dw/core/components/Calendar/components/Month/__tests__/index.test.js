import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import range from 'lodash/range';

import Month from '../index';

const NOW = moment('2019-04-03T00:00:00Z');
jest.spyOn(Date, 'now').mockImplementation(() => NOW.valueOf());

describe('Calendar - Month component', () => {
  let wrapper;
  let props;

  const render = () => {
    const props = {
      currentDate: moment('2019-04-01T00:00:00Z'),
      selectedDate: moment('2019-04-04T00:00:00Z'),
      onChange: jest.fn(),
      timezone: 'UTC',
    };
    const wrapper = shallow(<Month {...props} />);
    return {
      props,
      wrapper,
    };
  };

  beforeEach(() => {
    ({ wrapper, props } = render());
  });

  const getWeekWrapper = (rootWrapper, idx = 0) =>
    rootWrapper.find('Days').shallow().at(idx).shallow();

  const getDayWrapper = (rootWrapper, weekIdx = 0, dayIdx = 0) => {
    const weekWrapper = getWeekWrapper(rootWrapper, weekIdx);
    return weekWrapper.childAt(dayIdx).shallow();
  };

  it('Header', () => {
    const header = wrapper.find('Header');

    expect(header).toHaveLength(1);
    expect(
      header
        .shallow()
        .children()
        .map(item => item.text())
    ).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
  });

  describe('Days', () => {
    it('Days component', () => {
      const days = wrapper.find('Days');
      expect(days).toHaveLength(1);
    });

    it('displays 6 weeks', () => {
      const weeks = wrapper.find('Days').shallow();
      expect(weeks).toHaveLength(6);
      expect(
        weeks.map(item => item).every(item => item.hasClass('daysOfWeek'))
      ).toBe(true);
    });

    it('displays days', () => {
      range(6).map(weekIdx => {
        const week = getWeekWrapper(wrapper, weekIdx);
        expect(week.children()).toHaveLength(7);
        expect(
          week
            .children()
            .map(item => item.shallow().shallow())
            .every(item => item.hasClass('dayStyle'))
        ).toBe(true);
        return null;
      });
    });

    it('displays grayed out days of the previous month', () => {
      const week = getWeekWrapper(wrapper);
      expect(week.find({ isInDisplayedMonth: false })).toHaveLength(1);
    });

    it('displays grayed out days of the next month', () => {
      let week = getWeekWrapper(wrapper, 4);
      expect(week.find({ isInDisplayedMonth: false })).toHaveLength(4);
      week = getWeekWrapper(wrapper, 5);
      expect(week.find({ isInDisplayedMonth: false })).toHaveLength(7);
    });

    it('displays selected day', () => {
      const dayWrapper = getDayWrapper(wrapper, 0, 4);
      const day = dayWrapper.shallow();
      expect(day.text()).toBe('4');
      expect(day.hasClass(dayWrapper.props().classes.selectedDate)).toBe(true);
    });

    it('displays current day', () => {
      const dayWrapper = getDayWrapper(wrapper, 0, 3);
      const day = dayWrapper.shallow();
      expect(day.text()).toBe('3');
      expect(day.hasClass(dayWrapper.props().classes.currentDate)).toBe(true);
    });

    it('click on first day', () => {
      const dayWrapper = getDayWrapper(wrapper);
      dayWrapper.shallow().simulate('click');
      expect(
        props.onChange.mock.calls[0][0].isSame(moment('2019-03-31T00:00:00Z'))
      ).toBe(true);
      props.onChange.mockReset();
    });

    it('disabled day cannot be clicked', () => {
      const newProps = {
        ...props,
        minDate: moment('2019-04-01T00:00:00Z'),
      };
      const calendarWrapper = shallow(<Month {...newProps} />);
      const dayWrapper = getDayWrapper(calendarWrapper);
      dayWrapper.shallow().simulate('click');
      expect(props.onChange).not.toHaveBeenCalled();
    });
  });
});
