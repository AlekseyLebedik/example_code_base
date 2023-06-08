import React from 'react';

import wait from 'dw/test-utils/wait';
import { renderWithApolloClient } from '../../../test-utils';

import Drafts from '../index';

const envScopeURI = 'cod:iw8:5830';

describe('GVS Drafts', () => {
  it('renders master and details components', async () => {
    const wrapper = renderWithApolloClient(<Drafts />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: envScopeURI,
      },
      scopeURI: envScopeURI,
    });
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
