import React from 'react';
import { shallow } from 'enzyme';

import { namespaceProps as props } from 'playpants/testUtils/eventProps';

import { NamespaceStatelessBase } from '../index';

describe('NamespaceStatelessBase', () => {
  const wrapper = shallow(<NamespaceStatelessBase {...props} />);

  it('renders stateless namespace correctly with no selected namespace', () => {
    wrapper.setProps({
      filterValues: {
        context: [],
        group_id: [],
        namespace: [],
      },
      selectedNamespace: {},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders stateless namespace correctly with a selected namespace', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
