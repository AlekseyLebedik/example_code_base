import React from 'react';

import Button from '@material-ui/core/Button';

import { renderWithApolloClient } from 'dw/online-configuration/scenes/gvs/test-utils';
import wait from 'dw/test-utils/wait';
import SelectDraftModal from '../index';

const onChange = jest.fn();
const handleClose = jest.fn();

const scopeURI = 'cod:iw:5830';

const props = { onChange, handleClose };

const mockCreateDraft = jest.fn();
mockCreateDraft.mockReturnValue({
  data: { gvsCreateDraft: { id: 1 } },
});

jest.mock('dw/online-configuration/scenes/gvs/graphql/hooks', () => ({
  ...jest.requireActual('dw/online-configuration/scenes/gvs/graphql/hooks'),
  useCreateDraft: () => [mockCreateDraft, { loading: false }],
  useEnvScopeUri: () => ({ envScopeUri: scopeURI }),
  useTitleEnvByScopeUri: () => ({
    env: 'dev',
    titleId: '5830',
    envScopeUri: scopeURI,
  }),
}));

describe('SelectDraftModal', () => {
  it('loading', () => {
    const wrapper = renderWithApolloClient(<SelectDraftModal {...props} />, {
      params: { env: 'dev', titleId: '5830', scopeURI },
      scopeURI,
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('renders dialog', async () => {
    const wrapper = renderWithApolloClient(<SelectDraftModal {...props} />, {
      params: { env: 'dev', titleId: '5830', scopeURI },
      scopeURI,
    });
    await wait(0);
    expect(wrapper).toMatchSnapshot();
  });
  it('draftId is required', async () => {
    const wrapper = renderWithApolloClient(<SelectDraftModal {...props} />, {
      params: { env: 'dev', titleId: '5830', scopeURI },
      scopeURI,
    });
    await wait(0);
    wrapper.find(Button).at(1).props().onClick();
    const select = wrapper.find('AutocompleteGeneral');
    expect(select.props()).toMatchObject({
      error: true,
      helperText: 'Required',
    });
  });
  it('creates a new draft', async () => {
    const wrapper = renderWithApolloClient(<SelectDraftModal {...props} />, {
      params: { env: 'dev', titleId: '5830', scopeURI },
      scopeURI,
    });
    await wait(0);
    wrapper.find('AutocompleteGeneral').props().onChange('Brand new draft');
    wrapper.find(Button).at(1).props().onClick();
    expect(mockCreateDraft).toBeCalledWith({
      draftData: { name: 'Brand new draft' },
    });
  });
});
