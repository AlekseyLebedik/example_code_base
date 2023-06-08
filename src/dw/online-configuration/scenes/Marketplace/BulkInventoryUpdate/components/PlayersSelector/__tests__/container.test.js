import React from 'react';

import { shallow } from 'enzyme';

import { getLinkedAccounts } from 'dw/online-configuration/services/linked_accounts';

import PlayersSelector, { getLinkedAccountsApi } from '../container';

const expectedAccounts = [1, 2, 3, 4, 5].map(id => ({
  userID: id,
  userName: `test-user-${id}`,
}));

jest.mock('dw/online-configuration/services/linked_accounts');

const mockState = {};
const mockDispatch = jest.fn();
const mockTitle = 1;
const mockEnv = 'dev';

jest.mock('react-redux', () => ({
  useSelector: selector => selector(mockState),
  connect: () => Component => Component,
  useDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: mockTitle, env: mockEnv }),
  withRouter: Component => Component,
}));

const getDefaultProps = (props = {}) => ({
  ...props,
  setContext: jest.fn(),
  setPlayers: jest.fn(),
  setPlayersError: jest.fn(),
  actionsContainerRef: jest.fn(),
});

describe('PlayersSelector container', () => {
  it('render', () => {
    const props = getDefaultProps();
    const wrapper = shallow(<PlayersSelector {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('getLinkedAccountsApi', () => {
  beforeEach(() => {
    getLinkedAccounts.mockClear();
    getLinkedAccounts
      .mockReturnValueOnce(
        new Promise(resolve =>
          setTimeout(
            () => resolve({ data: { data: [], next: '1234567890' } }),
            10
          )
        )
      )
      .mockReturnValueOnce(
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                data: {
                  data: [
                    ...expectedAccounts.map(account => ({
                      accounts: [
                        { provider: 'psn' },
                        {
                          provider: 'uno',
                          accountID: account.userID,
                          username: account.userName,
                        },
                      ],
                    })),
                    { accounts: [{ provider: 'xbl' }] },
                    { accounts: [{ provider: 'psn' }, { provider: 'bnet' }] },
                  ],
                  next: undefined,
                },
              }),
            10
          )
        )
      );
  });
  it('calling api until accounts found', async () => {
    const result = await getLinkedAccountsApi('psn')({});
    expect(result).toEqual({
      data: {
        data: expectedAccounts,
        nextPageToken: undefined,
      },
    });
  });
  it('accounts lookup skipped with timeout', async () => {
    jest.spyOn(console, 'warn');
    const result = await getLinkedAccountsApi('psn')({ timeout: 0 });
    expect(result).toEqual({
      data: {
        data: [],
        nextPageToken: undefined,
      },
    });
    // eslint-disable-next-line
    expect(console.warn).toBeCalledWith(
      'Accounts lookup terminated due to the timeout: 0s. Your search criterias are to wide or there are no first party accounts matching.'
    );
  });
});
