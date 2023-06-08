import React from 'react';

import { renderWithApolloClient } from '../../../../../test-utils';

import DeleteDraftButton from '../index';

const envScopeURI = 'cod:iw8:5830';

jest.mock('dw/core/hooks', () => ({
  ...jest.requireActual('dw/core/hooks'),
  useSnackbar() {
    return {};
  },
  useCurrentEnvPermission: jest.fn(),
}));

const { useCurrentEnvPermission } = require('dw/core/hooks');

describe('GVS DeleteDraftButton', () => {
  const render = (rawProps = {}) => {
    const { permission = true, ...props } = rawProps;
    const defaultProps = {
      ...props,
    };
    useCurrentEnvPermission.mockReturnValue(permission);
    return renderWithApolloClient(<DeleteDraftButton {...defaultProps} />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: envScopeURI,
      },
      scopeURI: envScopeURI,
    });
  };
  describe('renders', () => {
    it('nothing if no permissions', () => {
      const wrapper = render({ permission: false });
      expect(wrapper).toMatchSnapshot();
    });
    it('confirm action component', () => {
      const wrapper = render();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
