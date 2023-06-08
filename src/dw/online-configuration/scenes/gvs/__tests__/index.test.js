import React from 'react';

import { shallow } from 'enzyme';

import { setupUseParams } from 'dw/online-configuration/scenes/gvs/test-utils';
import Loading from 'dw/core/components/BackdropLoading';
import wait from 'dw/test-utils/wait';
import MainGVS, { GVS, GVSBase } from '..';
import Breadcrumbs from '../components/Breadcrumbs';
import { SCENES } from '../constants';

jest.mock('../graphql/hooks');
const { useEnvScopeUri, useScopes } = require('../graphql/hooks');

const envScopeURI = 'cod:iw8:5830';

describe('GVS', () => {
  beforeEach(() => {
    useEnvScopeUri.mockImplementation(() => ({ envScopeUri: envScopeURI }));
    useScopes.mockImplementation(() => ({
      buildScopes: [`${envScopeURI}:tu1`, `${envScopeURI}:tu2`],
    }));
    setupUseParams({ scopeURI: envScopeURI });
  });
  it('MainGVS renders GVS', () => {
    const wrapper = shallow(<MainGVS />);
    expect(wrapper.find({ component: GVS })).toHaveLength(1);
  });
  it('GVS renders Breadcrumbs and GVSBase', async () => {
    const wrapper = shallow(<GVS />);
    await wait(1);
    expect(wrapper.find(Breadcrumbs)).toHaveLength(1);
    expect(wrapper.find(GVSBase)).toHaveLength(1);
  });
  it('GVS renders not configured', () => {
    useEnvScopeUri.mockImplementation(() => ({}));
    const wrapper = shallow(<GVS />);
    expect(wrapper.shallow().text()).toEqual(
      'Game Variables Service is not properly configured for this title environment'
    );
  });
  it('GVS renders error', () => {
    useScopes.mockImplementation(() => ({
      error: 'ERROR',
    }));
    const mockLog = jest.spyOn(console, 'log').mockImplementation();
    const wrapper = shallow(<GVS />);
    expect(wrapper.shallow().text()).toEqual(
      'Something went wrong. See logs for details.'
    );
    expect(mockLog).toBeCalledWith('ERROR');
  });
  it('GVS renders loading', () => {
    useScopes.mockImplementation(() => ({
      loading: true,
    }));
    const wrapper = shallow(<GVS />);
    expect(wrapper.find(Loading)).toHaveLength(1);
  });
  it('GVS renders nothing to redirect to a new scope URI', () => {
    setupUseParams({ scopeURI: null });
    const wrapper = shallow(<GVS />);
    expect(wrapper).toEqual({});
  });
  it('GVSBase renders all gvs routes', () => {
    const wrapper = shallow(<GVSBase />);
    expect(wrapper.find('Route')).toHaveLength(Object.keys(SCENES).length);
  });
});
