import React from 'react';
import { shallow } from 'enzyme';

import { activityTitleProps as props } from 'playpants/testUtils/eventProps';
import * as ActivityContext from '../../../context';
import ActivityTitleBase from '../container';

describe.skip('ActivityTitleBase', () => {
  jest
    .spyOn(ActivityContext, 'useActivityContext')
    .mockImplementation(() => props);
  const wrapper = shallow(<ActivityTitleBase />);

  it("renders correctly when multiple titles aren't allowed", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when multiple titles are allowed', () => {
    wrapper.setProps({
      allowMultiTitles: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when duplication of activity is not allowed', () => {
    wrapper.setProps({
      allowDuplication: false,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
