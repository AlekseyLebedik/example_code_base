import React from 'react';
import { shallow } from 'enzyme';
import { GroupsSelectBase } from '../presentational';

jest.mock('react-redux', () => ({
  connect: () => Component => Component,
  useSelector: () => jest.fn(),
}));

describe('GroupsSelectBase', () => {
  it('renders component', () => {
    const props = {
      environment: { key: '1:dev' },
    };
    expect(shallow(<GroupsSelectBase {...props} />)).toMatchSnapshot();
  });
});
