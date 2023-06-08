import React from 'react';
import { shallow } from 'enzyme';

import ConfigFeatureFlagsStateless from '../presentational';

describe('ConfigFeatureFlagsStateless', () => {
  it('renders nothing when no props are given', () => {
    expect(shallow(<ConfigFeatureFlagsStateless />)).toMatchSnapshot();
    expect(
      shallow(
        <ConfigFeatureFlagsStateless>
          <p>Children</p>
        </ConfigFeatureFlagsStateless>
      )
    ).toMatchSnapshot();
  });

  it('renders children when confiFeatureFlags=true', () => {
    expect(
      shallow(
        <ConfigFeatureFlagsStateless hasConfigFeatureFlagsAccess>
          <p>Congrat! You have the right access.</p>
        </ConfigFeatureFlagsStateless>
      )
    ).toMatchSnapshot();
  });

  it('renders nothing when confiFeatureFlags=false', () => {
    const props = {
      hasConfigFeatureFlagsAccess: false,
    };

    expect(
      shallow(
        <ConfigFeatureFlagsStateless {...props}>
          <p>Congrat! You have the right access.</p>
        </ConfigFeatureFlagsStateless>
      )
    ).toMatchSnapshot();
  });

  it('renders custom noAccessComponent when confiFeatureFlags=false', () => {
    const props = {
      hasConfigFeatureFlagsAccess: false,
      noAccessComponent: () => <p>No! No! No! Go away.</p>,
    };

    expect(
      shallow(
        <ConfigFeatureFlagsStateless {...props}>
          <p>Congrat! You have the right access.</p>
        </ConfigFeatureFlagsStateless>
      )
    ).toMatchSnapshot();
  });
});
