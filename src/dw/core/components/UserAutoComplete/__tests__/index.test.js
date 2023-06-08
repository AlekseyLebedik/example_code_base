import React from 'react';
import { mount } from 'enzyme';

import { UserAutoCompleteComponent } from '../index';

describe('UserAutoComplete', () => {
  it('renders default values', () => {
    const props = {
      onChange: jest.fn(),
      user: {
        actions: {
          addUserProfileFavoritePlayer: jest.fn(),
          removeUserProfileFavoritePlayer: jest.fn(),
        },
        profile: {
          favoritePlayers: [],
        },
      },
    };
    const wrapper = mount(<UserAutoCompleteComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with favorite players', () => {
    const props = {
      onChange: jest.fn(),
      user: {
        actions: {
          addUserProfileFavoritePlayer: jest.fn(),
          removeUserProfileFavoritePlayer: jest.fn(),
        },
        profile: {
          favoritePlayers: [
            { accountId: '0123456789', username: 'testuser' },
            { accountId: '4444444444', username: 'bestPlayerEver' },
          ],
        },
      },
    };
    const wrapper = mount(<UserAutoCompleteComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
