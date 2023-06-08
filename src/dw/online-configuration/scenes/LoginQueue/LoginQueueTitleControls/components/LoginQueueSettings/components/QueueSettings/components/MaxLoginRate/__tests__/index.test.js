import React from 'react';
import { shallow } from 'enzyme';
import MaxLoginRate from '../index';

describe('LoginQueueSettings - Queue', () => {
  it('display max login rate', () => {
    const maxLoginRate = shallow(
      <MaxLoginRate
        targetRateLimit={456}
        setTargetRateLimit={() => null}
        canEditLoginRate={false}
      />
    );
    expect(maxLoginRate).toMatchSnapshot();
  });
  it('display max login rate to 0', () => {
    const maxLoginRate = shallow(
      <MaxLoginRate
        targetRateLimit={0}
        setTargetRateLimit={() => null}
        canEditLoginRate={false}
      />
    );
    expect(maxLoginRate).toMatchSnapshot();
  });
});
