import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloTestProvider, ReduxProvider } from 'dw/core/helpers/__tests__';
import { clanData, clansPermissions } from 'dw/clans/testUtils/props';

import ClanSummary from '../index';

describe('Clans - Clan Summary', () => {
  it('renders table with default values', () => {
    const wrapper = mount(
      <ApolloTestProvider>
        <ReduxProvider>
          <Router>
            <ClanSummary
              clanData={clanData}
              clansPermissions={clansPermissions}
              refetch={jest.fn()}
            />
          </Router>
        </ReduxProvider>
      </ApolloTestProvider>
    );
    expect(wrapper.find(ClanSummary).find('table')).toMatchSnapshot();
  });
  it('correctly checks bans count', () => {
    const bans = [
      {
        player: {
          userID: '5835414818285979841',
          accountType: 'uno',
          username: 'test-user',
        },
        role: 'NONE',
        memberSincebanTimestamp: '1623436553',
        banEndTimestamp: '',
      },
    ];
    const wrapper = mount(
      <ApolloTestProvider>
        <ReduxProvider>
          <Router>
            <ClanSummary
              clanData={{ ...clanData, bans }}
              clansPermissions={clansPermissions}
              refetch={jest.fn()}
            />
          </Router>
        </ReduxProvider>
      </ApolloTestProvider>
    );
    const BansCell = wrapper
      .find(ClanSummary)
      .find('tbody')
      .find('tr')
      .children()
      .get(7);
    expect(shallow(BansCell).text()).toEqual('1');
  });
  it('renders search tags when available', () => {
    const tags = [
      {
        key: 'test',
        value: 'tag1',
        searchType: 'equals',
      },
      {
        key: 'test',
        value: 'new-tag',
        searchType: 'equals',
      },
    ];
    const wrapper = mount(
      <ApolloTestProvider>
        <ReduxProvider>
          <Router>
            <ClanSummary
              clanData={{ ...clanData, tags }}
              clansPermissions={clansPermissions}
              refetch={jest.fn()}
            />
          </Router>
        </ReduxProvider>
      </ApolloTestProvider>
    );
    const TagsCell = wrapper
      .find(ClanSummary)
      .find('tbody')
      .find('tr')
      .children()
      .get(10);
    expect(shallow(TagsCell).text()).toEqual('tag1, new-tag');
  });
});
