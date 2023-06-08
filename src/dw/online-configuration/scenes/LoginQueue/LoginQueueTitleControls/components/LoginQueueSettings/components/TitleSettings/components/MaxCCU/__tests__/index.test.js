import React from 'react';
import { shallow } from 'enzyme';
import MaxCCU from '../index';

describe('LoginQueueTitleSettings - MaxCCU', () => {
  it("display title setting's MaxCCU", () => {
    const maxccu = shallow(
      <MaxCCU maxCCU={300000} canEditMaxCCU={false} setMaxCCU={() => null} />
    );
    expect(maxccu).toMatchSnapshot();
  });
});
