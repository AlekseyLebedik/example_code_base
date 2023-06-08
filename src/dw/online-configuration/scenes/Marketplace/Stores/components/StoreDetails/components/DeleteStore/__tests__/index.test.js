import React from 'react';

import { shallow } from 'enzyme';
import DeleteStore from '../index';

jest.mock('react-redux', () => ({
  connect: () => Component => Component,
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('DeleteStore', () => {
  it('render component', () => {
    const wrapper = shallow(<DeleteStore label="blah" />);
    expect(wrapper).toMatchSnapshot();
  });
});
