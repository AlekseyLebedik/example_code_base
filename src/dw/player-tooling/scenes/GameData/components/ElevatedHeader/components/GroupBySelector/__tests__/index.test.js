import React from 'react';
import { shallow } from 'enzyme';

import Component from '../index';

describe('Select', () => {
  const props = { groupBy: 'services', setGroupBy: jest.fn() };
  it('renders default values', () => {
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('updates to titles when selected', () => {
    expect(
      shallow(<Component {...props} groupBy="titles" />).props().value
    ).toEqual('titles');
  });
});
