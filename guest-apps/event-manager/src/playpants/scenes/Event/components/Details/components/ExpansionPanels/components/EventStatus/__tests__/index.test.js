import React from 'react';
import { shallow } from 'enzyme';

import EventStatus from '../index';

describe('EventStatus', () => {
  const props = {
    eventData: { status: 'open' },
    status: { name: 'Open' },
    classes: {},
  };

  const root = shallow(<EventStatus {...props} />);
  it('loads the EventStatus component correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
