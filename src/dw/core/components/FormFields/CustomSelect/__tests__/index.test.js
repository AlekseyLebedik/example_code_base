import React from 'react';
import { mount, shallow } from 'enzyme';

import Component from '../index';

describe('CustomSelect', () => {
  it('renders default values', () => {
    const props = {
      input: {},
      meta: {
        touched: undefined,
        error: undefined,
      },
      options: [],
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      input: {},
      meta: {
        touched: true,
        error: 'invalid',
      },
      fullWidth: true,
      label: 'Blah blah',
      name: 'blahBlah',
      options: [
        { value: '1', label: 'label1' },
        { value: '2', label: 'label2' },
      ],
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('test events', () => {
    const props = {
      input: {},
      meta: {
        touched: undefined,
        error: undefined,
      },
      options: [],
    };
    const wrapper = mount(<Component {...props} />);
    const selectProps = wrapper.find('Select').first().props();
    selectProps.onFocus();
    expect(wrapper.state('focus')).toBe(true);

    selectProps.onBlur();
    expect(wrapper.state('focus')).toBe(false);
  });
});
