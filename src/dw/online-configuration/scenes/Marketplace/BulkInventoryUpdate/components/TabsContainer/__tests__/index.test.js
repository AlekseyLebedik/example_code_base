import React from 'react';

import { shallow } from 'enzyme';

import TabsContainer from '../index';

describe('TabsContainer', () => {
  it('renders', () => {
    const expectedTabs = [
      { name: 'one', label: 'One' },
      { name: 'second', label: 'Second' },
      { name: 'last', label: 'The Last' },
    ];
    const wrapper = shallow(
      <TabsContainer tabs={expectedTabs} value="second" onChange={jest.fn()} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
