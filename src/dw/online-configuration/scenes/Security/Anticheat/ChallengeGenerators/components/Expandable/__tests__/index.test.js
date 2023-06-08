import React from 'react';
import { shallow } from 'enzyme';
import IconButton from 'dw/__mocks__/@material-ui/IconButton';
import Expandable from '../index';

describe('Expandable', () => {
  it('renders default values', () => {
    expect(shallow(<Expandable />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      expanded: true,
    };
    expect(shallow(<Expandable {...props} />)).toMatchSnapshot();
  });

  it('validates that can be expanded', () => {
    const wrapper = shallow(<Expandable />);
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.state('expanded')).toBe(true);
  });
});
