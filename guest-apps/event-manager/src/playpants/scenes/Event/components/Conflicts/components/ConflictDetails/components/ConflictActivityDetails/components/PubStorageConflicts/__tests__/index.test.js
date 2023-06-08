import React from 'react';
import { shallow } from 'enzyme';

import { pubstorageConflictDetailsProps as props } from 'playpants/testUtils/eventProps';

import { PubStorageConflicts } from '../index';

describe('PubStorageConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PubStorageConflicts {...props} />);
  });

  it('renders correctly with no conflict details', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with conflict details', () => {
    wrapper.setProps({
      details: ['testfile'],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
