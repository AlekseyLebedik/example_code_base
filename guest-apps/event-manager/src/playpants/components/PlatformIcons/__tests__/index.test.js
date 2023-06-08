import React from 'react';
import { shallow } from 'enzyme';

import { PlatformIconsBase } from '../index';

describe('PlatformIcons', () => {
  const props = {
    onClick: jest.fn(),
    titles: [
      { id: 1, name: 'MW-PS3', platform: 'PS3' },
      { id: 2, name: 'XB1-PS3', platform: 'XB1' },
      { id: 3, name: 'XB1-Vanilla (Valor)', platform: 'XB1' },
    ],
    projectColors: [{}],
  };

  const root = shallow(<PlatformIconsBase {...props} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });
});
