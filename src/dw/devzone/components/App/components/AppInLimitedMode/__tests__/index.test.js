import React from 'react';
import { shallow } from 'enzyme';
import Button from 'dw/__mocks__/@material-ui/Button';
import Icon from 'dw/__mocks__/@material-ui/Icon';

import AppInLimitedMode from '../index';

// Mock `getMailto` for predictive test results
jest.mock('dw/core/helpers/email');

describe('AppInLimitedMode', () => {
  it('renders without crashing', () => {
    expect(shallow(<AppInLimitedMode />)).toMatchSnapshot();
  });

  it('expands when the user click on the expand button', () => {
    const icon = wrapper => wrapper.find(Icon);
    const wrapper = shallow(<AppInLimitedMode />);
    let button = wrapper.find(Button);

    expect(wrapper.state('expanded')).toBe(false);
    expect(icon(button).text()).toBe('expand_more');

    button.props().onClick();
    wrapper.update();
    button = wrapper.find(Button);
    expect(wrapper.state('expanded')).toBe(true);
    expect(icon(button).text()).toBe('expand_less');
    expect(wrapper).toMatchSnapshot();

    button.props().onClick();
    expect(wrapper.state('expanded')).toBe(false);
  });
});
