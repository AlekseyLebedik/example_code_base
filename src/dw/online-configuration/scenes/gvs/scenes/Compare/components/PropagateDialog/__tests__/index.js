import React from 'react';

import { shallow } from 'enzyme';

import { setupUseParams } from 'dw/online-configuration/scenes/gvs/test-utils';
import { GLOBAL_PLAYERS } from '@gvs/constants';
import PropagateDialog from '..';

jest.mock('dw/core/components/TitleEnvSelect/hooks', () => ({
  useEnvironments: jest.fn(),
}));

const { useEnvironments } = require('dw/core/components/TitleEnvSelect/hooks');

const CURRENT_SCOPE_URI = 'cod:iw:5830';

const setParams = ({
  scopeURI = CURRENT_SCOPE_URI,
  targetScopeURI = `${CURRENT_SCOPE_URI}:tu_01`,
  population = GLOBAL_PLAYERS,
} = {}) =>
  setupUseParams(
    { scopeURI },
    `population=${population}&targetScopeURI=${targetScopeURI}`
  );

const onCloseMock = jest.fn();

const mockPropagateConfiguration = jest.fn();
const mockPropagateDefinition = jest.fn();

jest.mock('@gvs/graphql/hooks', () => ({
  ...jest.requireActual('@gvs/graphql/hooks'),
  usePropagateConfiguration: jest.fn(),
  usePropagateDefinitions: jest.fn(),
  useNameMapping() {
    return { 5830: 'BO5 CrossPlay Scratch Dev' };
  },
  useTitleEnvByScopeUri() {
    return { titleId: '5830', env: 'dev' };
  },
}));

const {
  usePropagateConfiguration,
  usePropagateDefinitions,
} = require('@gvs/graphql/hooks');

describe('PropagateDialog', () => {
  beforeEach(() => {
    setParams();
    mockPropagateConfiguration.mockReset();
    mockPropagateDefinition.mockReset();
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [
        { environment: { options: { scopeURI: CURRENT_SCOPE_URI } } },
      ],
    }));
    mockPropagateConfiguration.mockReturnValue({
      gvsPropagateConfiguration: { id: '123456' },
    });
    usePropagateConfiguration.mockReturnValue([
      mockPropagateConfiguration,
      { loading: false },
    ]);
    usePropagateDefinitions.mockReturnValue([
      mockPropagateDefinition,
      { loading: false },
    ]);
  });
  it('renders', () => {
    const wrapper = shallow(<PropagateDialog onClose={onCloseMock} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('action > cancel', () => {
    const wrapper = shallow(<PropagateDialog onClose={onCloseMock} />);
    shallow(wrapper.props().actions[0]).simulate('click');
    expect(onCloseMock).toBeCalled();
  });
  it('action > propagate default draft name', () => {
    const expectedDraftName = 'Applied from (5830) BO5 CrossPlay Scratch Dev';
    const expectedSyncSource = true;
    const expectedForce = false;
    const wrapper = shallow(<PropagateDialog onClose={onCloseMock} />);
    shallow(wrapper.props().actions[1]).simulate('click');
    expect(mockPropagateConfiguration).toBeCalledWith(
      expectedDraftName,
      expectedSyncSource,
      expectedForce
    );
  });
});
