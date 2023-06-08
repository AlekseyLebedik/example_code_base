import React from 'react';
import { shallow } from 'enzyme';

import SectionTitle from '../index';

const state = {};
const store = {
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: () => state,
};

describe('SectionTitle', () => {
  it('renders without crashing', () => {
    expect(
      shallow(<SectionTitle title="Test Title" store={store} />)
    ).toMatchSnapshot();
  });

  it('renders the number of shown items', () => {
    const props = {
      title: 'Test Title',
      shown: 123,
      store,
    };
    expect(shallow(<SectionTitle {...props} />)).toMatchSnapshot();
  });
});
