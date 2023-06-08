import React from 'react';
import { shallow } from 'enzyme';

import { editStatusProps as props } from 'playpants/testUtils/eventProps';

import { EditStatusBase } from '../index';

describe('EventStatus', () => {
  const root = shallow(<EditStatusBase {...props} />);
  it('loads the EventStatus component correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
