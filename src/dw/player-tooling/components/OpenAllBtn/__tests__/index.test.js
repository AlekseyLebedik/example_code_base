import React from 'react';
import { shallow } from 'enzyme';

import OpenAll from '../index';

describe('OpenAll', () => {
  it('renders Open All button', () => {
    const wrapper = shallow(<OpenAll expandAll={false} onClick={jest.fn()} />);
    expect(
      wrapper.find('WithStyles(ForwardRef(Button))').props().children
    ).toBe('Open All');
  });

  it('renders Close All button', () => {
    const wrapper = shallow(<OpenAll expandAll onClick={jest.fn()} />);
    expect(
      wrapper.find('WithStyles(ForwardRef(Button))').props().children
    ).toBe('Close All');
  });
});
