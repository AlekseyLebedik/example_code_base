import React from 'react';
import { renderWithApolloClient } from 'dw/online-configuration/scenes/gvs/test-utils';

import DraftDiff from '../index';

const scopeURI = 'cod:iw8:5830';
const draftId = '1234567890';

describe('DraftDiff', () => {
  const props = { setOCCToken: jest.fn(), setRefetchDraftDetails: jest.fn() };

  it('renders empty component', () => {
    const wrapper = renderWithApolloClient(<DraftDiff {...props} />, {
      params: { titleId: '5830', env: 'dev', scopeURI },
      scopeURI,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders DraftDiff component', () => {
    const wrapper = renderWithApolloClient(<DraftDiff {...props} />, {
      params: { titleId: '5830', env: 'dev', scopeURI, draftId },
      scopeURI,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
