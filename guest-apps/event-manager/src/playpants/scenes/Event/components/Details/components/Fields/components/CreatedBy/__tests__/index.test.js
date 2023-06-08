import React from 'react';
import { shallow } from 'enzyme';

import { createdByFieldProps as props } from 'playpants/testUtils/eventProps';
import TextField from '@material-ui/core/TextField';

import CreatedBy from '../index';

describe('CreatedBy', () => {
  const wrapper = shallow(<CreatedBy {...props} />);
  it('renders the CreatedBy component renders default correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('sets the value of TextField correctly', () => {
    expect(wrapper.find(TextField).props().value).toMatch('Test User');
  });
});
