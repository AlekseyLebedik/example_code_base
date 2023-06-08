import React from 'react';

import { shallow } from 'enzyme';

import { setupUseParams } from 'dw/online-configuration/scenes/gvs/test-utils';
import { GVSTitleEnvSelect as TitleEnvSelect } from '@gvs/scenes/Compare/components/TitleEnvSelect';
import PropagateDialog from '..';

jest.mock('dw/core/components/TitleEnvSelect/hooks', () => ({
  useEnvironments: jest.fn(),
}));

const { useEnvironments } = require('dw/core/components/TitleEnvSelect/hooks');

const CURRENT_SCOPE_URI = 'cod:iw:5830';

const setParams = ({ scopeURI = CURRENT_SCOPE_URI } = {}) =>
  setupUseParams({ scopeURI });

const onCloseMock = jest.fn();

const mockPropagate = jest.fn();

jest.mock('@gvs/graphql/hooks', () => ({
  ...jest.requireActual('@gvs/graphql/hooks'),
  usePropagateDefinitions: jest.fn(),
  useTitleEnvByScopeUri() {
    return { titleId: '5830', env: 'dev' };
  },
}));

const { usePropagateDefinitions } = require('@gvs/graphql/hooks');

const mockGridApi = {
  getSelectedRows() {
    return [{ key: 'variable1' }, { key: 'variable2' }];
  },
};

describe('PropagateDialog', () => {
  beforeEach(() => {
    setParams();
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [
        { environment: { options: { scopeURI: CURRENT_SCOPE_URI } } },
      ],
    }));
    mockPropagate.mockReturnValue({
      gvsPropagateDefinition: { ok: true },
    });
    usePropagateDefinitions.mockReturnValue([
      mockPropagate,
      { loading: false },
    ]);
  });
  it('renders', () => {
    const wrapper = shallow(
      <PropagateDialog gridApi={mockGridApi} onClose={onCloseMock} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('action > cancel', () => {
    const wrapper = shallow(
      <PropagateDialog gridApi={mockGridApi} onClose={onCloseMock} />
    );
    shallow(wrapper.props().actions[0]).simulate('click');
    expect(onCloseMock).toBeCalled();
  });
  it('action > propagate disabled if target is not selected', () => {
    const wrapper = shallow(
      <PropagateDialog gridApi={mockGridApi} onClose={onCloseMock} />
    );
    const propagateBtn = shallow(wrapper.props().actions[1]);
    expect(propagateBtn.props().disabled).toEqual(true);
  });
  it('action > propagate enabled if target is selected', () => {
    const wrapper = shallow(
      <PropagateDialog gridApi={mockGridApi} onClose={onCloseMock} />
    );
    wrapper.find(TitleEnvSelect).props().setTargetScopeURI(CURRENT_SCOPE_URI);
    const propagateBtn = shallow(wrapper.props().actions[1]);
    expect(propagateBtn.props().disabled).toEqual(false);
  });
  it('action > test mutation', () => {
    const expectedKeys = ['variable1', 'variable2'];
    const expectedForce = false;
    const wrapper = shallow(
      <PropagateDialog gridApi={mockGridApi} onClose={onCloseMock} />
    );
    wrapper.find(TitleEnvSelect).props().setTargetScopeURI(CURRENT_SCOPE_URI);
    shallow(wrapper.props().actions[1]).simulate('click');
    expect(mockPropagate).toBeCalledWith(expectedKeys, expectedForce);
  });
});
