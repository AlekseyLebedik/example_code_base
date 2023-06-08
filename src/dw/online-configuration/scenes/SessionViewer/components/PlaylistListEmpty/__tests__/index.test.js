import React from 'react';
import { shallow } from 'enzyme';

import PlaylistListEmpty from '../index';

describe('PlaylistListEmpty', () => {
  it('renders without crashing', () => {
    expect(shallow(<PlaylistListEmpty />)).toMatchSnapshot();
  });
});
