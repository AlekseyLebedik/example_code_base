import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { shallow } from 'enzyme';

import { setupUseParams } from '@gvs/test-utils';
import { GLOBAL_PLAYERS } from '@gvs/constants';
import PropagateButton from '..';

jest.mock('dw/core/components/TitleEnvSelect/hooks', () => ({
  useEnvironments: jest.fn(),
}));

const { useEnvironments } = require('dw/core/components/TitleEnvSelect/hooks');

const CURRENT_SCOPE_URI = 'cod:iw:5830';

const setParams = ({
  scopeURI = `${CURRENT_SCOPE_URI}:tu_01`,
  sourcePopulation = GLOBAL_PLAYERS,
  targetPopulation = GLOBAL_PLAYERS,
} = {}) =>
  setupUseParams(
    {},
    `sourcePopulation=${sourcePopulation}&targetPopulation=${targetPopulation}&targetScopeURI=${scopeURI}`
  );

describe('PropagateButton', () => {
  beforeEach(() => {
    setParams();
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [
        { environment: { options: { scopeURI: CURRENT_SCOPE_URI } } },
      ],
    }));
  });
  it('enabled', () => {
    const wrapper = shallow(<PropagateButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('not rendering while loading', () => {
    useEnvironments.mockImplementation(() => ({
      loading: true,
      environments: [
        { environment: { options: { scopeURI: CURRENT_SCOPE_URI } } },
      ],
    }));
    const wrapper = shallow(<PropagateButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('not rendering if no environments', () => {
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [],
    }));
    const wrapper = shallow(<PropagateButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('disabled if population is not global', () => {
    setParams({ targetPopulation: 'user:123' });
    const wrapper = shallow(<PropagateButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('disabled if scope uri not in permitted environments', () => {
    const otherScopeUri = 'cod:iw:5800';
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [{ environment: { options: { scopeURI: otherScopeUri } } }],
    }));
    const wrapper = shallow(<PropagateButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('disabled if source and target are the same', () => {
    setParams({ scopeURI: CURRENT_SCOPE_URI });
    const wrapper = shallow(<PropagateButton />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders propagate dialog', () => {
    const wrapper = shallow(<PropagateButton />);
    wrapper.find(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find('PropagateDialog')).toHaveLength(1);
  });
});
