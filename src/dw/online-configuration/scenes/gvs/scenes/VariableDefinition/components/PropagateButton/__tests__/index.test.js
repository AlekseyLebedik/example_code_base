import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { shallow } from 'enzyme';

import PropagateButton from '..';

jest.mock('dw/core/components/TitleEnvSelect/hooks', () => ({
  useEnvironments: jest.fn(),
}));

const { useEnvironments } = require('dw/core/components/TitleEnvSelect/hooks');

const mockGridApi = {};
const selected = [{ data: { isArchived: false } }];

describe('PropagateButton', () => {
  beforeEach(() => {
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [{ environment: { id: 1 } }],
    }));
  });
  it('enabled', () => {
    const wrapper = shallow(
      <PropagateButton gridApi={mockGridApi} selected={selected} />
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('not rendering if not gridApi', () => {
    const wrapper = shallow(<PropagateButton selected={selected} />);
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('not rendering while loading', () => {
    useEnvironments.mockImplementation(() => ({
      loading: true,
      environments: [{ environment: { id: 1 } }],
    }));
    const wrapper = shallow(
      <PropagateButton gridApi={mockGridApi} selected={selected} />
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('not rendering if no environments', () => {
    useEnvironments.mockImplementation(() => ({
      loading: false,
      environments: [],
    }));
    const wrapper = shallow(<PropagateButton selected={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('disabled if no selection', () => {
    const wrapper = shallow(
      <PropagateButton gridApi={mockGridApi} selected={[]} />
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('renders propagate dialog', () => {
    const wrapper = shallow(
      <PropagateButton gridApi={mockGridApi} selected={selected} />
    ).dive();
    wrapper.find(IconButton).simulate('click');
    wrapper.update();
    expect(wrapper.find('PropagateDialog')).toHaveLength(1);
  });
  it('rendering dialog archived cannot be propagated', () => {
    const wrapper = shallow(
      <PropagateButton
        gridApi={mockGridApi}
        selected={[{ data: { isArchived: true } }]}
      />
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
