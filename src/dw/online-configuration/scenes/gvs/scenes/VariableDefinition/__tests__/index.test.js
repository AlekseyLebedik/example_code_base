import React from 'react';

import wait from 'dw/test-utils/wait';
import { renderWithApolloClient } from '../../../test-utils';
import VariableDefinitions from '../index';

const envScopeURI = 'cod:iw8:5830';

describe('VariableDefinitions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = renderWithApolloClient(<VariableDefinitions />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: envScopeURI,
      },
      scopeURI: envScopeURI,
    });
  });
  it('loading', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders', async () => {
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
});
