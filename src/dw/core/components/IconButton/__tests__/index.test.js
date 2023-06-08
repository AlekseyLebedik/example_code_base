import React from 'react';
import { shallow } from 'enzyme';

import WrappedIcon from '../index';

describe('WrappedIcon', () => {
  const props = {
    onClick: jest.fn(),
    tooltip: 'test',
    icon: 'playlist_add',
  };

  const root = shallow(<WrappedIcon {...props} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });
});
