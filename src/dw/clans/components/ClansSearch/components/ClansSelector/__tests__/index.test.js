import React from 'react';
import { mount } from 'enzyme';
import { ApolloTestProvider } from 'dw/core/helpers/__tests__';

import ClansSelector from '../index';

describe('Clans - ClansSelector', () => {
  it('renders Select with no clan selected', () => {
    const wrapper = mount(
      <ApolloTestProvider>
        <ClansSelector />
      </ApolloTestProvider>
    );
    const Select = wrapper.find(ClansSelector).find('Select');
    expect(Select.find('SelectContainer')).toMatchSnapshot();
    expect(Select.props().placeholder).toEqual(
      'Search Clan Name, Clan ID, Tag, Member Name or ID'
    );
  });
});
