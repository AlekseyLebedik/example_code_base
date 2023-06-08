import React from 'react';
import { shallow } from 'enzyme';

import { eventConflictsProps as props } from 'playpants/testUtils/eventProps';

import ConflictDetailsPresentational from '../presentational';

describe('ConflictDetailsPresentational', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictDetailsPresentational {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when conflictActivityDetails is empty', () => {
    wrapper.setProps({
      conflictActivityDetails: {},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when conflictDetails is empty', () => {
    wrapper.setProps({
      conflictDetails: {},
    });
    expect(wrapper).toMatchSnapshot();
  });
});
