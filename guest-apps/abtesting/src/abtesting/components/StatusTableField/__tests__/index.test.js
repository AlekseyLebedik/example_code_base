import React from 'react';
import { shallow } from 'enzyme';

import StatusTableField from '../index';

describe('StatusTableField', () => {
  it('renders stardard user case', () => {
    const props = {
      status: 'whatever',
    };
    expect(shallow(<StatusTableField {...props} />)).toMatchSnapshot();
  });
});
