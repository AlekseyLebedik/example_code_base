import React from 'react';
import { shallow } from 'enzyme';

import { aeConflictDetailsProps as props } from 'playpants/testUtils/eventProps';

import AchievementEngineConflicts from '../index';

describe('AchievementEngineConflicts', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AchievementEngineConflicts {...props} />);
  });

  it('renders correctly with no conflict details', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with conflict details', () => {
    wrapper.setProps({
      details: ['stronghold-5'],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
