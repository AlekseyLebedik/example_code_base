import React from 'react';
import { shallow } from 'enzyme';
import PermissionFeatureFlagsStateLess from '../presentational';

describe('Permission Feature Flags:', () => {
  const props = {
    data: [
      {
        active: true,
        id: 1,
        name: 'foo',
        note: '',
        type: 'switch',
      },
      {
        active: true,
        id: 2,
        name: 'foo',
        note: '',
        type: 'flag',
      },
      {
        active: false,
        id: 3,
        name: 'bar',
        note: '',
        type: 'flag',
      },
      {
        active: false,
        id: 4,
        name: 'bar',
        note: '',
        type: 'switch',
      },
    ],
    loading: false,
  };

  describe('Permission feature flag', () => {
    it('renders PermissionFeatureFlagsStateLess', () => {
      const featureflag = shallow(
        <PermissionFeatureFlagsStateLess
          rowData={props.data}
          isLoading={props.loading}
        />
      );
      expect(featureflag).toMatchSnapshot();
    });
    it('renders PermissionFeatureFlagsStateLess Loading view', () => {
      const featureflagloading = shallow(
        <PermissionFeatureFlagsStateLess rowData={[]} isLoading />
      );
      expect(featureflagloading).toMatchSnapshot();
    });
  });
});
