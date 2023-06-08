import React from 'react';
import wait from 'dw/test-utils/wait';

import IconButton from '@material-ui/core/IconButton';

import { GET_DRAFT_DETAILS_QUERY } from 'dw/online-configuration/scenes/gvs/graphql/queries';
import { CREATE_DRAFT_MUTATION } from 'dw/online-configuration/scenes/gvs/graphql/mutations';
import { renderWithApolloClient } from '../../../../../test-utils';
import RevertDraftButton from '../index';

const envScopeURI = 'cod:iw:5830';
const draftId = '201';
const revertName = 'revert_test_draft';
const queryMocks = [
  {
    request: {
      query: GET_DRAFT_DETAILS_QUERY,
      variables: {
        titleId: '5830',
        env: 'dev',
        scopeURI: envScopeURI,
        draftId,
      },
    },
    result: {
      data: {
        gvsDraftDetails: {
          name: 'test_draft',
          OCCToken: '',
          diffs: [
            {
              scopeType: 'title',
              scopeName: '5830',
              scopeURI: envScopeURI,
              populationType: 'user',
              populationValue: 'user-123',
              variables: [
                {
                  key: 'com_xp_per_season_rank',
                  valuesPerPlatform: [
                    { platform: 'ps4', source: '__UNSET__', target: '12' },
                    { platform: 'ps5', source: '__UNSET__', target: '15' },
                    { platform: 'xb1', source: '45', target: '30' },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: CREATE_DRAFT_MUTATION,
      variables: {
        titleId: '5830',
        env: 'dev',
        scopeURI: envScopeURI,
        draftData: { name: revertName },
        editData: null,
        restoreData: null,
        edits: [
          {
            scopeURI: envScopeURI,
            populationType: 'user',
            populationValue: 'user-123',
            variablesPerPlatform: [
              {
                platform: 'ps4',
                values: [{ key: 'com_xp_per_season_rank', unset: true }],
              },
              {
                platform: 'ps5',
                values: [{ key: 'com_xp_per_season_rank', unset: true }],
              },
              {
                platform: 'xb1',
                values: [{ key: 'com_xp_per_season_rank', value: '45' }],
              },
            ],
          },
        ],
      },
    },
    result: {
      data: {
        gvsCreateDraft: { id: 42 },
      },
    },
  },
];

const mockSuccess = jest.fn();

describe('GVS RevertDraftButton', () => {
  const render = (rawProps = {}) => {
    mockSuccess.mockClear();
    const { draftId: draft, ...props } = rawProps;
    const defaultProps = {
      ...props,
    };
    return renderWithApolloClient(<RevertDraftButton {...defaultProps} />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: envScopeURI,
        draftId: draft,
      },
      scopeURI: envScopeURI,
      snackbar: { success: mockSuccess },
      extraMocks: queryMocks,
    });
  };
  describe('renders', () => {
    it('render revert button', () => {
      const wrapper = render();
      expect(wrapper).toMatchSnapshot();
    });
    it('render dialog', async () => {
      const wrapper = render({ draftId });
      await wait(0);
      await wrapper.find(IconButton).simulate('click');
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
