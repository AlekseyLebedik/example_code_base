import React from 'react';
import { shallow } from 'enzyme';
import { scheduleFieldWrapperProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import ScheduleFieldWrapper from '../index';

describe('ScheduleFieldWrapper', () => {
  const root = shallow(<ScheduleFieldWrapper {...scheduleFieldWrapperProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
