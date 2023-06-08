import React from 'react';
import { shallow } from 'enzyme';

import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import { statelessPubvarsProps as props } from 'playpants/testUtils/eventProps';

import PubVarsStateless from '../presentational';

describe.skip('PubVarsStateless', () => {
  const wrapper = shallow(<PubVarsStateless {...props} />);

  it('renders stateless pubvars correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no title overlay only if needed', () => {
    expect(wrapper.find(MainDetailsEmpty)).toHaveLength(0);
    wrapper.setProps({ noTitleSelected: true });
    expect(wrapper.find(MainDetailsEmpty)).toHaveLength(1);
    wrapper.setProps({ noTitleSelected: false });
  });

  it('renders stateless pubvars correctly when there is no selected namespace', () => {
    wrapper.setProps({
      selectedActivity: {
        id: 51,
        activity: {
          variable_sets: [],
        },
        title_envs: [],
        type: 'pubvars',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders stateless pubvars correctly with selected namespace with no new variables', () => {
    wrapper.setProps({
      selectedNamespace: {
        context: '2',
        group_id: '1',
        is_major_update: false,
        major_version: 0,
        minor_version: 1,
        namespace: 'test',
        liveVariables: { test: 'test' },
        oldVariables: { test: 'test' },
        variables: {},
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
