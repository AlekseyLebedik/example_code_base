import React from 'react';
import { shallow } from 'enzyme';

import { conflictOverviewProps as props } from 'playpants/testUtils/eventProps';

import ConflictOverview from '../index';

describe('ConflictOverview', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictOverview {...props} />);
  });

  it('renders default correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
