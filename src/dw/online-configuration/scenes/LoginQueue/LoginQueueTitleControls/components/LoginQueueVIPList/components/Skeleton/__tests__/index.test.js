import React from 'react';
import { shallow } from 'enzyme';
import LoginQueueVIPListSkeleton from '../index';

describe('LoginQueueVIPListSkeleton', () => {
  it('display skeleton', () => {
    const skeleton = shallow(
      <LoginQueueVIPListSkeleton onDeleteSelectedVIPs={() => {}} />
    );
    expect(skeleton).toMatchSnapshot();
  });
});
