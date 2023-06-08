import React from 'react';
import { shallow } from 'enzyme';

import ProgressWhenEmpty from '../index';

describe('ProgressWhenEmpty', () => {
  it('renders default values', () => {
    const props = {
      size: 30,
      thickness: 2,
      propsToEval: [],
    };
    expect(shallow(<ProgressWhenEmpty {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      size: 30,
      thickness: 2,
      propsToEval: [{ teamCount: null }],
    };
    expect(
      shallow(
        <ProgressWhenEmpty {...props}>
          <div>blah</div>
        </ProgressWhenEmpty>
      )
    ).toMatchSnapshot();
  });

  it('renders custom empty values', () => {
    const props = {
      size: 30,
      thickness: 2,
      propsToEval: [[]],
    };
    expect(
      shallow(
        <ProgressWhenEmpty {...props}>
          <div>blah</div>
        </ProgressWhenEmpty>
      )
    ).toMatchSnapshot();
  });
});
