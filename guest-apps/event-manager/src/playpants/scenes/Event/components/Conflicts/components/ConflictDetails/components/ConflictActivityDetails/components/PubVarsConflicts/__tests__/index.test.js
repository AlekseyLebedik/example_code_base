import React from 'react';
import { shallow } from 'enzyme';

import { pubvarsConflictDetailsProps as props } from 'playpants/testUtils/eventProps';

import PubVarsConflicts from '../index';

describe('PubVarsConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PubVarsConflicts {...props} />);
  });

  it('renders correctly with no conflict details', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with conflict details', () => {
    wrapper.setProps({
      details: [
        {
          context: '2',
          group_id: '1',
          namespace: 'test',
          conflicting_variables: ['testvariable'],
        },
      ],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
