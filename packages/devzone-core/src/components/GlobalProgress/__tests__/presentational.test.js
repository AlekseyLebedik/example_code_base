import React from 'react';
import { shallow } from 'enzyme';

import GlobalProgressStateless from '../presentational';

describe('GlobalProgressStateless', () => {
  it('shows the progress bar', () => {
    const props = {
      animationDuration: 100,
      percent: 10,
      isShown: true,
    };

    expect(shallow(<GlobalProgressStateless {...props} />)).toMatchSnapshot();
  });

  it('hides the progress bar', () => {
    const props = {
      animationDuration: 100,
      percent: 0,
      isShown: false,
    };

    expect(shallow(<GlobalProgressStateless {...props} />)).toMatchSnapshot();
  });

  it('renders the progression', () => {
    const props = {
      animationDuration: 100,
      isShown: true,
    };

    expect(
      shallow(<GlobalProgressStateless {...props} percent={0} />)
    ).toMatchSnapshot();
    expect(
      shallow(<GlobalProgressStateless {...props} percent={21.7} />)
    ).toMatchSnapshot();
    expect(
      shallow(<GlobalProgressStateless {...props} percent={80} />)
    ).toMatchSnapshot();
    expect(
      shallow(<GlobalProgressStateless {...props} percent={90} />)
    ).toMatchSnapshot();
  });

  it('allows to change the animation duration', () => {
    const props = {
      percent: 10,
      isShown: true,
    };

    expect(
      shallow(<GlobalProgressStateless {...props} animationDuration={100} />)
    ).toMatchSnapshot();
    expect(
      shallow(<GlobalProgressStateless {...props} animationDuration={200} />)
    ).toMatchSnapshot();
  });
});
