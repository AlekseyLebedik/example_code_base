import React from 'react';
import { shallow } from 'enzyme';

import Iframe from '../index';

describe('ABTesting Design - IFrame', () => {
  it('renders design iframe snapshot', () => {
    expect(
      shallow(<Iframe url="http://hello.com" id="123" />)
    ).toMatchSnapshot();
  });
});
