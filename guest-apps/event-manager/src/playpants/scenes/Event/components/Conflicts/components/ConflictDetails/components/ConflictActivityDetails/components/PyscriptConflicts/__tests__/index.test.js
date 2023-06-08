import React from 'react';
import { shallow } from 'enzyme';

import { pyscriptConflictDetailsProps as props } from 'playpants/testUtils/eventProps';

import PyscriptConflicts from '../index';

describe('PyscriptConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PyscriptConflicts {...props} />);
  });

  it('renders correctly with no conflict details', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with conflict details', () => {
    wrapper.setProps({
      details: ['double-xp'],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
