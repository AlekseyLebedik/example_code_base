import React from 'react';

import { shallow } from 'enzyme';

import MultiScopeDiff from '..';

jest.mock('dw/online-configuration/scenes/gvs/graphql/hooks', () => ({
  usePopulationsDisplayValues() {
    return { populations: [] };
  },
  useNameMapping() {
    return { 5830: 'My cool title' };
  },
  useFormatValue() {
    return jest.fn();
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams() {
    return { scopeURI: 'cod:iw:5830' };
  },
}));

describe('MultiScopeDiff', () => {
  it('renders', () => {
    const wrapper = shallow(<MultiScopeDiff />);
    expect(wrapper).toMatchSnapshot();
  });
});
