import React from 'react';
import { shallow } from 'enzyme';
import { ReduxProvider } from 'dw/core/helpers/__tests__';

import { ClanMate, DetailRenderer } from '../index';

const members = [
  {
    player: {
      userID: '5151811586893775373',
      accountType: 'uno',
      username: 'test-owner',
    },
    role: 'OWNER',
    memberSince: '1624480992',
    lastUpdated: '1624480992',
  },
  {
    player: {
      userID: '123412345',
      accountType: 'uno',
      username: 'test-member',
    },
    role: 'NORMAL',
    memberSince: '1624480992',
    lastUpdated: '1624480992',
  },
];

describe('GameData Clans', () => {
  describe('DetailRenderer', () => {
    it('renders the correct number of clan members', () => {
      const props = {
        onSelectAccount: jest.fn(),
        values: members,
      };
      const wrapper = shallow(<DetailRenderer {...props} />);
      expect(wrapper.find(ClanMate).length).toEqual(2);
    });
    it('renders no members with empty values', () => {
      const props = {
        onSelectAccount: jest.fn(),
        values: [],
      };
      const wrapper = shallow(<DetailRenderer {...props} />);
      expect(wrapper.find(ClanMate).length).toEqual(0);
    });
  });

  describe('ClanMate', () => {
    it('renders accordion view', () => {
      const props = {
        clanMate: members[0],
        expandAll: true,
        onSelectAccount: jest.fn(),
      };
      const wrapper = shallow(
        <ReduxProvider>
          <ClanMate {...props} />
        </ReduxProvider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
