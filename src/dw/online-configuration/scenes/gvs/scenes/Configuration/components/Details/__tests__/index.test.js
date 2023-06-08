import React from 'react';

import wait from 'dw/test-utils/wait';

import { renderWithApolloClient } from 'dw/online-configuration/scenes/gvs/test-utils';
import Details from '../index';

const envScopeURI = 'cod:iw8:5830';

jest.mock('dw/core/hooks', () => ({
  ...jest.requireActual('dw/core/hooks'),
  useCurrentEnvPermission: () => true,
}));

jest.mock('dw/core/components/Select', () => 'Select');

describe('GVS Configuration Details', () => {
  it('renders configuration grid component', async () => {
    const wrapper = renderWithApolloClient(
      <Details currentEdits={[]} setEdits={jest.fn()} />,
      {
        params: {
          env: 'dev',
          titleId: '5830',
          scopeURI: envScopeURI,
          population: 'user:123',
        },
        scopeURI: envScopeURI,
      }
    );
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
