import React from 'react';
import { shallow } from 'enzyme';

import {
  tagFiltersProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import TagFilter from '../index';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: selector => selector(mockState),
  connect: stateToProps => Component => componentProps =>
    (
      <Component
        {...componentProps}
        {...stateToProps(mockState, componentProps)}
      />
    ),
}));

describe('TagFilter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TagFilter {...props} />);
  });

  describe('TagFilter with addCustomTagSet', () => {
    it('renders TagFilter', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
