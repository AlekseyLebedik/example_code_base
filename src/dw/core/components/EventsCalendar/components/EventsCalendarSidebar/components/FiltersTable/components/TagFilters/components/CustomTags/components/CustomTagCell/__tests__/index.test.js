import React from 'react';
import { mount } from 'enzyme';

import { tagFiltersProps as props } from 'dw/core/components/EventsCalendar/testData';

import CustomTagRow from '../index';

describe('CustomTagRow', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CustomTagRow {...props} />);
  });

  it('renders CustomTagRow', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
