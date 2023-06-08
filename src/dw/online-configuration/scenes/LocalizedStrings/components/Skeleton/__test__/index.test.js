import React from 'react';
import { shallow } from 'enzyme';
import {
  DetailsRendererSkeleton,
  StringSetNameSelectorSkeleton,
  ContextSelectorSkeleton,
} from '../index';

describe('Localized String Skeletons', () => {
  it('display json code skeleton', () => {
    const skeleton = shallow(<DetailsRendererSkeleton />);
    expect(skeleton).toMatchSnapshot();
  });
  it('display context selector skeleton', () => {
    const skeleton = shallow(<ContextSelectorSkeleton />);
    expect(skeleton).toMatchSnapshot();
  });
  it('display string set name selector skeleton', () => {
    const skeleton = shallow(<StringSetNameSelectorSkeleton />);
    expect(skeleton).toMatchSnapshot();
  });
});
