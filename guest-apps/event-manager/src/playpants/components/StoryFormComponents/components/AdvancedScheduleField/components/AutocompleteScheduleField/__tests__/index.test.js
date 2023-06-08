import React from 'react';
import { shallow } from 'enzyme';
import { scheduleFieldProps } from 'playpants/testUtils/components/storyFormComponentsProps';
import ScheduleField from '../index';

describe('ScheduleField', () => {
  const root = shallow(<ScheduleField {...scheduleFieldProps} />);
  it('renders the ScheduleField correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
