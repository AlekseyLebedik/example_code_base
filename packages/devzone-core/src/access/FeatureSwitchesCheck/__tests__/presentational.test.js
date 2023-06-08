import React from 'react';
import { shallow } from 'enzyme';

import FeatureSwitchesCheckStateless from '../presentational';

describe('FeatureSwitchesCheckStateless', () => {
  it('renders nothing when no props are given', () => {
    expect(shallow(<FeatureSwitchesCheckStateless />)).toMatchSnapshot();
    expect(
      shallow(
        <FeatureSwitchesCheckStateless>
          <p>Children</p>
        </FeatureSwitchesCheckStateless>
      )
    ).toMatchSnapshot();
  });

  it('renders children when featureSwitches=true', () => {
    expect(
      shallow(
        <FeatureSwitchesCheckStateless hasFeatureSwitchesAccess>
          <p>Congrat! You have the right access.</p>
        </FeatureSwitchesCheckStateless>
      )
    ).toMatchSnapshot();
  });

  it('renders nothing when featureSwitches=false', () => {
    const props = {
      hasFeatureSwitchesAccess: false,
    };

    expect(
      shallow(
        <FeatureSwitchesCheckStateless {...props}>
          <p>Congrat! You have the right access.</p>
        </FeatureSwitchesCheckStateless>
      )
    ).toMatchSnapshot();
  });

  it('renders custom noAccessComponent when featureSwitches=false', () => {
    const props = {
      hasFeatureSwitchesAccess: false,
      noAccessComponent: () => <p>No! No! No! Go away.</p>,
    };

    expect(
      shallow(
        <FeatureSwitchesCheckStateless {...props}>
          <p>Congrat! You have the right access.</p>
        </FeatureSwitchesCheckStateless>
      )
    ).toMatchSnapshot();
  });
});
