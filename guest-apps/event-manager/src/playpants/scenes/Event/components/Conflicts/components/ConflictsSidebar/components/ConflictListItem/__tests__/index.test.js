import React from 'react';
import { shallow } from 'enzyme';

import { conflictListItemProps as props } from 'playpants/testUtils/eventProps';

import ConflictListItem from '../index';

describe('ConflictListItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictListItem {...props} />);
  });

  it('renders default correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with no conflicts', () => {
    wrapper.setProps({
      conflict: {
        ...props.conflict,
        conflicts: [],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
