import React from 'react';
import { shallow } from 'enzyme';

import NavMenu from '../index';

describe('NavMenu', () => {
  it('renders properly when is a main route', () => {
    const props = {
      isMainRoute: true,
      history: {
        goBack: jest.fn(),
      },
    };

    expect(shallow(<NavMenu {...props} />)).toMatchSnapshot();
  });

  it('renders properly when is NOT main route', () => {
    const props = {
      isMainRoute: true,
      history: {
        goBack: jest.fn(),
      },
    };

    expect(shallow(<NavMenu {...props} />)).toMatchSnapshot();
  });
});
