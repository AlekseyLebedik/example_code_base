import React from 'react';
import { shallow } from 'enzyme';

import SkeletonProgress from '../index';

describe('SkeletonProgress', () => {
  it('renders default values', () => {
    expect(shallow(<SkeletonProgress />)).toMatchSnapshot();
  });
});
