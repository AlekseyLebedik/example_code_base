import React from 'react';

import wait from 'dw/test-utils/wait';
import { renderWithApolloClient } from '../../../test-utils';

import Configuration from '..';

const envScopeURI = 'cod:iw8:5830';

describe('GVS Configuration', () => {
  it('renders master and details components', async () => {
    const wrapper = renderWithApolloClient(<Configuration />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: envScopeURI,
        population: 'user:123',
      },
      scopeURI: envScopeURI,
    });
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
