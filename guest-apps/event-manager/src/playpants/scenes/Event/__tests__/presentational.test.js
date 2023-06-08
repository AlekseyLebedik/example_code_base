import React from 'react';
import { shallow } from 'enzyme';
import { statelessEventProps as props } from 'playpants/testUtils/eventProps';

import { EventStateless } from '../presentational';

describe('EventStateless', () => {
  const root = shallow(<EventStateless {...props} isEventsLoading={false} />);
  it('renders the EventStateless container correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
