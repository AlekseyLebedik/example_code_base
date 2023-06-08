import React from 'react';
import { shallow } from 'enzyme';

import FileAttachBtn from '../index';

describe('Expy - Test Graduation - FileAttachBtn', () => {
  it('renders snapshot', () => {
    const props = {
      btnText: 'text',
      btnIcon: 'icon',
      onSetFiles: () => {},
      accept: 'pdf',
    };
    expect(shallow(<FileAttachBtn {...props} />)).toMatchSnapshot();
  });
});
