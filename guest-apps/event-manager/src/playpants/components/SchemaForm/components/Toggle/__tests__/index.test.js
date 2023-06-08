import React from 'react';
import { shallow } from 'enzyme';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Toggle from '../index';

describe('PyScript Toggle', () => {
  const props = {
    label: 'test',
    value: true,
    handleChange: jest.fn(),
    handleDelete: jest.fn(),
  };

  const root = shallow(<Toggle {...props} />);
  const toggle = root.find(FormControlLabel);

  it('renders the Switch correctly', () => {
    expect(toggle).toMatchSnapshot();
  });

  it('label should be ON when value is true', () => {
    expect(toggle.props().label).toEqual('ON');
  });
});
