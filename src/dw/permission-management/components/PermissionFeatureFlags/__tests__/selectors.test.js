import { featureFlagSelector, featureFlagItemsSelector } from '../selectors';

describe('Users - selectors', () => {
  const featureFlags = [
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
  ];
  const state = {
    Core: {
      PermissionFeatureFlags: featureFlags,
    },
  };

  it('returns the feature flags', () => {
    expect(featureFlagSelector(state)).toEqual(featureFlags);
    expect(featureFlagItemsSelector(state)).toEqual(featureFlags);
  });
});
