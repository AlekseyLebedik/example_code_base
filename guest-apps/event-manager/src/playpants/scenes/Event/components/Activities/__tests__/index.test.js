import React from 'react';
import { shallow } from 'enzyme';

import { activitiesProps as props } from 'playpants/testUtils/eventProps';

import { ActivityBase } from '../index';

describe('Activity', () => {
  const rootSelectedActivity = shallow(<ActivityBase {...props} />);
  it('renders the Activity container correctly with a selected activity', () => {
    expect(rootSelectedActivity).toMatchSnapshot();
  });

  props.selectedActivity = {};
  const rootNoSelectedActivity = shallow(<ActivityBase {...props} />);
  it('renders the Activity container correctly with no selected activity', () => {
    expect(rootNoSelectedActivity).toMatchSnapshot();
  });
});
