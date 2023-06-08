/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import createStore from 'dw/online-configuration/store';

import { mocks as baseMocks } from './graphql/mocks';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

const {
  useSelector: mockUseSelector,
  useDispatch: mockUseDispatch,
} = require('react-redux');

const setupStore = ({ scopeURI }) => {
  const { store: mockStore } = createStore();
  mockUseDispatch.mockImplementation(
    () => action => mockStore.dispatch(action)
  );
  mockStore.dispatch({
    type: 'APP_FETCH_TITLE_ENVIRONMENT_SUCCESS',
    env: {
      options: {
        scopeURI,
      },
    },
  });
  mockStore.dispatch({
    type: 'TITLE_SELECTOR.CHANGE_TITLE',
    title: { name: 'BO5 CrossPlay Scratch Dev' },
    project: { name: 'Call of Duty: Black Ops 5' },
  });
  mockUseSelector.mockImplementation(selector =>
    selector(mockStore.getState())
  );
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useLocation: jest.fn(),
  useRouteMatch: jest.fn(),
  useHistory() {
    return {
      push: jest.fn(),
    };
  },
}));

const {
  useParams: mockUseParams,
  useLocation: mockUseLocation,
  useRouteMatch: mockUseRouteMatch,
} = require('react-router-dom');

export const setupUseParams = (props, search) => {
  mockUseParams.mockReturnValue({
    ...props,
  });
  mockUseLocation.mockReturnValue({
    search,
  });
  mockUseRouteMatch.mockReturnValue({
    params: props,
  });
};

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useApolloClient: jest.fn(),
}));
const { useQuery, useMutation, useApolloClient } = require('@apollo/client');

jest.mock('@demonware/devzone-core/modules/user/hooks', () => ({
  useUserProfileActions() {
    return { user: { profile: { id: 1, name: 'testuser' } } };
  },
}));

jest.mock('dw/core/components/TitleEnvSelect/hooks');

const { useEnvironments } = require('dw/core/components/TitleEnvSelect/hooks');

const mockError = jest.fn();
const mockSuccess = jest.fn();
jest.mock('dw/core/hooks', () => ({
  ...jest.requireActual('dw/core/hooks'),
  useCurrentEnvPermission: jest.fn(),
  useSnackbar: jest.fn(),
}));

const { useCurrentEnvPermission, useSnackbar } = require('dw/core/hooks');

export const renderWithApolloClient = (
  Component,
  { params, scopeURI, search, extraMocks = [], permission = true, snackbar }
) => {
  useEnvironments.mockReturnValue({
    loading: false,
    environments: [
      {
        title: { id: String(params?.titleId || 1) },
        environment: { shortType: params?.env || 'dev', options: { scopeURI } },
      },
    ],
  });
  useCurrentEnvPermission.mockReturnValue(permission);
  useSnackbar.mockReturnValue({
    error: snackbar?.error || mockError,
    success: snackbar?.success || mockSuccess,
  });
  setupStore({ scopeURI });
  setupUseParams(params, search);
  const mocks = [...baseMocks, ...extraMocks];
  const wrapper = shallow(
    <MockedProvider mocks={mocks} addTypename={false}>
      {Component}
    </MockedProvider>
  );

  const { client } = wrapper.props();
  const { useQuery: useOrigQuery, useMutation: useOrigMutation } =
    jest.requireActual('@apollo/client');
  useQuery.mockImplementation((q, options) => {
    const result = useOrigQuery(q, {
      ...options,
      client,
      fetchPolicy: 'cache-first',
    });
    return { ...result, refetch: jest.fn() };
  });
  useMutation.mockImplementation((m, options) =>
    useOrigMutation(m, { ...options, client })
  );
  useApolloClient.mockReturnValue(client);
  return wrapper.shallow().shallow().shallow().shallow();
};
