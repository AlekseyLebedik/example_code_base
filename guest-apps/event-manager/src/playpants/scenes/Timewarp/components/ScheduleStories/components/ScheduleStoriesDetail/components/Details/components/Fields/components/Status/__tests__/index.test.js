import React from 'react';
import { shallow } from 'enzyme';
import { statusProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import Status from '../index';

describe('Status', () => {
  const root = shallow(<Status {...statusProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
