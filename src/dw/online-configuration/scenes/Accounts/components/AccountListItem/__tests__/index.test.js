import React from 'react';
import { Card } from 'antd';

import { shallowUntilTarget } from 'dw/test-utils';
import createStore from 'dw/online-configuration/store';

import AccountListItem from '../index';
import AccountListStateless from '../presentational';
import { ACCOUNTS_UPDATE_SELECTED_ACCOUNT } from '../../../actionTypes';

const { store } = createStore();

beforeAll(() => {
  const selectedAccount = {
    id: '123-selected-user-id',
    name: 'Selected Username',
  };
  store.dispatch({
    type: ACCOUNTS_UPDATE_SELECTED_ACCOUNT,
    data: selectedAccount,
  });
});

describe('AccountListItem', () => {
  it('renders the given item', () => {
    const account = {
      userName: 'username',
      reputation: '11',
      userID: '123-user-id',
      onClick: jest.fn(),
    };

    expect(
      shallowUntilTarget(
        <AccountListItem store={store} {...account} />,
        AccountListStateless
      )
    ).toMatchSnapshot();
  });

  it('checks if the given item is selected', () => {
    const account = {
      userName: 'Selected Username',
      reputation: '11',
      userID: '123-selected-user-id',
      onClick: jest.fn(),
    };

    expect(
      shallowUntilTarget(
        <AccountListItem store={store} {...account} />,
        AccountListStateless
      )
    ).toMatchSnapshot();
  });

  it('calls the callback on user click', () => {
    const account = {
      userName: 'username',
      reputation: '11',
      userID: '123-user-id',
      onClick: jest.fn(),
    };

    const root = shallowUntilTarget(
      <AccountListItem store={store} {...account} />,
      AccountListStateless
    );
    root.find(Card).simulate('click');

    expect(account.onClick).toHaveBeenCalled();
  });
});
