import React from 'react';
import { shallow } from 'enzyme';

import { eventConflictsProps as props } from 'playpants/testUtils/eventProps';

import ConflictType from '../index';

describe('ConflictType', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictType {...props} />);
  });

  it('renders correctly with "All" filter', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with a different filter ("activity-title-conflict")', () => {
    wrapper.setProps({
      conflictTypeFilter: 'activity-title-conflict',
    });
    expect(wrapper).toMatchSnapshot();
  });
});
