import React from 'react';
import { shallow } from 'enzyme';

import TitleEnvSelect from '../index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useParams() {
    return { scopeURI: 'cod:iw8:5830' };
  },
}));

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  };
});

const { useLocation: mockUseLocation } = require('react-router-dom');

mockUseLocation.mockReturnValue({
  search: 'blah',
});

describe('GVSTitleEnvSelect', () => {
  it('renders component', () => {
    const wrapper = shallow(<TitleEnvSelect />);
    expect(wrapper).toMatchSnapshot();
  });
});
