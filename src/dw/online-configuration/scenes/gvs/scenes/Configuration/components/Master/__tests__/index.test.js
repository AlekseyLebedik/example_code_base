import wait from 'dw/test-utils/wait';
import React from 'react';

import { renderWithApolloClient } from '../../../../../test-utils';

import Master from '../index';

jest.mock('dw/core/hooks', () => ({
  ...jest.requireActual('dw/core/hooks'),
  useCurrentEnvPermission: jest.fn(),
}));

const { useCurrentEnvPermission } = require('dw/core/hooks');

const scopeURI = 'cod:iw8:5830';
const population = 'group:Online Devs';

const props = {
  onChange: jest.fn(),
};

describe('Master', () => {
  it('renders loading', () => {
    const wrapper = renderWithApolloClient(<Master {...props} />, {
      params: { titleId: '5830', env: 'dev', scopeURI, population },
      scopeURI,
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('renders', async () => {
    const wrapper = renderWithApolloClient(<Master {...props} />, {
      params: { titleId: '5830', env: 'dev', scopeURI, population },
      scopeURI,
    });
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders add population button', async () => {
    useCurrentEnvPermission.mockReturnValue(true);
    const wrapper = renderWithApolloClient(<Master {...props} />, {
      params: { titleId: '5830', env: 'dev', scopeURI, population },
      scopeURI,
    });
    await wait(0);
    expect(wrapper.find('AddPopulationButton')).toMatchSnapshot();
  });
});
