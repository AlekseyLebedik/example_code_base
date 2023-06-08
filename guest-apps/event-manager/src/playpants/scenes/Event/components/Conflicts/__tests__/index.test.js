import React from 'react';
import { shallow } from 'enzyme';
import { eventConflictsProps as props } from 'playpants/testUtils/eventProps';
import { ConflictsBase } from '../index';

describe('ConflictsBase', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictsBase {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
