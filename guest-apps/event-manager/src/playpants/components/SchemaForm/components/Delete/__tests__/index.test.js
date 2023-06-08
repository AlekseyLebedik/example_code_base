import React from 'react';
import { shallow } from 'enzyme';

import IconButton from 'dw/core/components/IconButton';

import Delete from '../index';

describe('PyScript Delete Btn', () => {
  const props = {
    handleDelete: jest.fn(),
    name: 'test',
  };

  const root = shallow(<Delete {...props} />);

  it('renders the component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('always renders an IconButton', () => {
    expect(root.find(IconButton)).toMatchSnapshot();
  });

  it('should trigger handleDelete onClick', () => {
    root.find(IconButton).simulate('click');
    expect(props.handleDelete).toHaveBeenCalledTimes(1);
  });
});
