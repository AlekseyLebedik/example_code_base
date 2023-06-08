import React from 'react';

import { ERROR_MSG } from 'dw/online-configuration/constants';

import { renderWithApolloClient } from '../../../../../test-utils';
import ReleaseDraftButton from '../index';
import { CONFLICT_MSG, SUCCESS_MSG } from '../constants';

const envScopeURI = 'cod:iw:5830';

const refetchDraftDetails = { current: jest.fn() };

const mockError = jest.fn();
const mockSuccess = jest.fn();

describe('GVS ReleaseDraftButton', () => {
  const render = (rawProps = {}) => {
    refetchDraftDetails.current.mockClear();
    mockError.mockClear();
    mockSuccess.mockClear();
    const { permission, draftId, ...props } = rawProps;
    const defaultProps = {
      refetchDraftDetails,
      ...props,
    };
    return renderWithApolloClient(<ReleaseDraftButton {...defaultProps} />, {
      params: {
        env: 'dev',
        titleId: '5830',
        scopeURI: envScopeURI,
        draftId,
      },
      scopeURI: envScopeURI,
      permission,
      snackbar: { error: mockError, success: mockSuccess },
    });
  };
  describe('renders', () => {
    it('nothing if no permissions', () => {
      const wrapper = render({ permission: false });
      expect(wrapper).toMatchSnapshot();
    });
    it('disabled if no OCCToken', () => {
      const wrapper = render();
      expect(wrapper).toMatchSnapshot();
    });
    it('enabled with OCCToken', () => {
      const wrapper = render({ OCCToken: '1234567890' });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('mutation', () => {
    it('conflict', async () => {
      const wrapper = render({ OCCToken: '1234567890', draftId: '409' });
      await wrapper.props().onClick();
      expect(refetchDraftDetails.current).toBeCalled();
      expect(mockError).toBeCalledWith(CONFLICT_MSG);
    });
    it('other error', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const wrapper = render({ OCCToken: '1234567890', draftId: '404' });
      await wrapper.props().onClick();
      expect(refetchDraftDetails.current).not.toBeCalled();
      expect(mockError).toBeCalledWith(ERROR_MSG);
      expect(consoleSpy).toBeCalledWith(String(Error('NOT_FOUND')));
    });
    it('success', async () => {
      const wrapper = render({ OCCToken: '1234567890', draftId: '201' });
      await wrapper.props().onClick();
      expect(refetchDraftDetails.current).not.toBeCalled();
      expect(mockSuccess).toBeCalledWith(SUCCESS_MSG);
    });
  });
});
