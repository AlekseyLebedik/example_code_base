import React from 'react';
import { shallow } from 'enzyme';

import Select from '@material-ui/core/Select';

import Dropdown from '../index';

describe('PyScript Dropdown', () => {
  const props = {
    label: 'test',
    value: 'MOTD',
    handleChange: jest.fn(),
    properties: { enum: ['MOTD', 'PubVars'] },
    handleDelete: jest.fn(),
  };

  const root = shallow(<Dropdown {...props} />);

  it('renders the component correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('always renders a selector', () => {
    expect(root.find(Select)).toMatchSnapshot();
  });

  it('should trigger handleChange on selection', () => {
    root.find(Select).simulate('change');
    expect(props.handleChange).toHaveBeenCalledTimes(1);
  });
});
