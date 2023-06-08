import React from 'react';
import { shallow, mount } from 'enzyme';

import LinkDisplay from '../index';

describe('Expy - Test Graduation - LinkDisplay', () => {
  it('renders snapshot', () => {
    const props = {
      id: 123,
      url: 'http://hello.com',
      title: 'Hello',
      onDelete: () => {},
    };
    expect(shallow(<LinkDisplay {...props} />)).toMatchSnapshot();
  });

  it('calls onDelete', () => {
    const onDelete = jest.fn();
    const props = {
      id: 123,
      url: 'http://hello.com',
      title: 'Hello',
      onDelete,
    };

    const wrapper = mount(<LinkDisplay {...props} />);
    wrapper.find('button').simulate('click');
    expect(onDelete).toHaveBeenCalled();
  });
});
