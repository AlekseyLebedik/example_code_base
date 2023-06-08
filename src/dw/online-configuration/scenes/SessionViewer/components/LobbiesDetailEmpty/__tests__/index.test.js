import React from 'react';
import { shallow } from 'enzyme';

import LobbiesDetailEmpty from '../index';

describe('LobbiesDetailEmpty', () => {
  it('renders without crashing', () => {
    expect(shallow(<LobbiesDetailEmpty />)).toMatchSnapshot();
  });
});
