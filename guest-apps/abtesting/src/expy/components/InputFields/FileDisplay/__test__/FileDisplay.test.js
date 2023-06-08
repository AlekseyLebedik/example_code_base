import React from 'react';
import { shallow } from 'enzyme';

import FileDisplay from '../index';

describe('Expy - Test Graduation - FileDisplay', () => {
  it('renders snapshot', () => {
    const props = {
      id: 123,
      url: 'http://hello.com',
      title: 'Hello',
      onDelete: () => {},
      type: 'pdf',
    };
    expect(shallow(<FileDisplay {...props} />)).toMatchSnapshot();
  });
});
