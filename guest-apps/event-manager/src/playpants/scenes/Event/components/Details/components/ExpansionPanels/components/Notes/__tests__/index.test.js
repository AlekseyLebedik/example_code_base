import React from 'react';
import { mount } from 'enzyme';

import Notes from '../index';

describe('Notes', () => {
  const props = {
    eventData: { note: '' },
    onSave: jest.fn(),
    disabled: false,
  };

  const root = mount(<Notes {...props} />);
  it('loads the Note component correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
