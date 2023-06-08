import React from 'react';

import wait from 'dw/test-utils/wait';
import { renderWithApolloClient } from '../../../test-utils';

import Breadcrumbs from '../index';

const envScopeURI = 'cod:iw8:5830';
const buildScopeURI = 'cod:iw8:5830:tu_1';

jest.mock('dw/core/components/Select', () => 'Select');

describe('GVS Breadcrumbs', () => {
  it('render title as active', async () => {
    const wrapper = renderWithApolloClient(<Breadcrumbs />, {
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
  it('render game build as active', async () => {
    const wrapper = renderWithApolloClient(<Breadcrumbs />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: buildScopeURI,
      },
      scopeURI: envScopeURI,
    });
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
