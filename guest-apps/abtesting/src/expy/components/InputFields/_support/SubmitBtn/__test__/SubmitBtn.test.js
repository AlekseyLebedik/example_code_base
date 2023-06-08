import React from 'react';
import { shallow } from 'enzyme';

import SubmitBtn from '../index';

describe('Expy - Test Graduation - SubmitBtn', () => {
  it('renders snapshot', () => {
    const props = {
      onClick: () => {},
      children: 'Cancel',
      disabled: false,
    };
    expect(shallow(<SubmitBtn {...props} />)).toMatchSnapshot();
  });
});
