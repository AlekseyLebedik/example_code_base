import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import createStore from 'dw/online-configuration/store';
import { setTitle } from 'dw/core/components/TitleSelector/actions';

import UserLink from '../index';

describe('UserLink', () => {
  const { store } = createStore();

  beforeAll(() => {
    store.dispatch(setTitle({}, { id: 1 }, { shortType: 'dev' }));
  });

  it('renders default values', () => {
    const props = {
      userId: 1234567890,
      store,
    };
    expect(
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <UserLink {...props} />
          </MemoryRouter>
        </Provider>
      ).find('Link')
    ).toMatchSnapshot();
  });

  it('renders username', () => {
    const props = {
      userId: 1234567890,
      userName: 'Initial User',
      store,
    };
    expect(
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <UserLink {...props} />
          </MemoryRouter>
        </Provider>
      ).find('Link')
    ).toMatchSnapshot();
  });
});
