import React from 'react';
import { shallow } from 'enzyme';
import { disabledScheduleFieldProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import DisabledScheduleField from '../index';

describe('DisabledScheduleField', () => {
  const root = shallow(
    <DisabledScheduleField {...disabledScheduleFieldProps} />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
