import React from 'react';
import { shallow } from 'enzyme';
import LoginQueueSettingsSkeleton from '../index';

describe('LoginQueueSettings', () => {
  it('display skeleton', () => {
    const skeleton = shallow(<LoginQueueSettingsSkeleton />);
    expect(skeleton).toMatchSnapshot();
  });
});
