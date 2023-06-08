import React from 'react';
import { shallow } from 'enzyme';

import { statelessScheduleProps as props } from 'playpants/testUtils/scheduleProps';

import CreateEventDialog from '../components/CreateEventDialog';
import { StatelessScheduleBase } from '../presentational';

describe('StatelessSchedule', () => {
  const root = shallow(<StatelessScheduleBase {...props} />);

  it('renders correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('always renders a section title', () => {
    expect(root.find('SectionTitle')).toMatchSnapshot();
  });

  it('always renders a create event button', () => {
    expect(root.find(CreateEventDialog)).toMatchSnapshot();
  });

  it('renders the calendar view', () => {
    props.isCalendarView = true;
    expect(root).toMatchSnapshot();
  });
});
