import React from 'react';
import { mount } from 'enzyme';
import { ApolloTestProvider, ReduxProvider } from 'dw/core/helpers/__tests__';

import ClansProvider from '../index';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/clans/members',
    search: '?clanId=535513160695038962&env=DEV',
  }),
}));

describe('Clans - ClansProvider', () => {
  it('renders children with context props', () => {
    const Children = () => <div>Test Child</div>;
    const wrapper = mount(
      <ApolloTestProvider>
        <ReduxProvider>
          <ClansProvider>
            <Children />
          </ClansProvider>
        </ReduxProvider>
      </ApolloTestProvider>
    );
    expect(wrapper.find(ClansProvider)).toMatchSnapshot();
  });
});
