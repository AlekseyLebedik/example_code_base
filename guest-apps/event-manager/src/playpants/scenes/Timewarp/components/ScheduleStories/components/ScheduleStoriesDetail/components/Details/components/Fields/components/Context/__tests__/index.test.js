import React from 'react';
import { shallow } from 'enzyme';
import { contextProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import Context from '../index';

describe('Context', () => {
  const root = shallow(<Context {...contextProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
