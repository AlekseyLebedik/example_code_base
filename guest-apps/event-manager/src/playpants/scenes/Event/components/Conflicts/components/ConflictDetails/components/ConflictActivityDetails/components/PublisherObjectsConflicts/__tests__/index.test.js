import React from 'react';
import { shallow } from 'enzyme';

import { pubobjectsConflictDetailsProps as props } from 'playpants/testUtils/eventProps';

import PublisherObjectsConflicts from '../index';

describe('PublisherObjectsConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PublisherObjectsConflicts {...props} />);
  });

  it('renders correctly with no conflict details', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with conflict details', () => {
    wrapper.setProps({
      details: ['testname'],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
