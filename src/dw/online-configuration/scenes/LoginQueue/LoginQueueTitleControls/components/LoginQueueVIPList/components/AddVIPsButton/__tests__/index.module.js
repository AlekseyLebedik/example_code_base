import React from 'react';
import { shallow } from 'enzyme';
import AddVIPsButton from '../index';

describe('AddVIPsButton', () => {
  it('display add button with tooltip', () => {
    const addBtn = shallow(<AddVIPsButton onClick={() => {}} />);
    expect(addBtn).toMatchSnapshot();
  });
});
