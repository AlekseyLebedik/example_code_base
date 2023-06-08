import {
  makeHasFeaturesEnabledSelector,
  hasFeaturesEnabledFuncSelector,
} from '../selectors';

describe('makeHasFeaturesEnabledSelector', () => {
  let _mockedState = {};
  let hasFeatureSwitchesAccessSelector;

  beforeEach(() => {
    _mockedState = {
      switches: {
        feature1: true,
        feature2: true,
      },
      user: {
        profile: {
          isStaff: false,
        },
      },
    };

    hasFeatureSwitchesAccessSelector = makeHasFeaturesEnabledSelector();
  });

  it('allows staff to bypass featureSwitches', () => {
    _mockedState.user.profile.isStaff = true;
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature3'],
        isStaffAllowed: true,
      })
    ).toBe(true);
  });

  it('does not allow staff to bypass featureSwitches', () => {
    _mockedState.user.profile.isStaff = true;
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature3'],
        isStaffAllowed: false,
      })
    ).toBe(false);
  });

  it('when is not staff and the feature is not in the state of featureSwitches return false', () => {
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature3'],
      })
    ).toBe(false);
  });

  it('Check if is not staff and the feature is in the state of featureSwitches, it has access', () => {
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature2'],
      })
    ).toBe(true);
  });

  it('Check we can send single string as the features to check', () => {
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature2'],
      })
    ).toBe(true);
  });

  it('Check if a feature is not active it will not be counted as a valid feature to check.', () => {
    _mockedState.switches = { feature2: false };
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature2'],
      })
    ).toBe(false);
  });

  it('Check if a all of the features match it has access.', () => {
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature1', 'feature2'],
      })
    ).toBe(true);
  });

  it('Check if a any of the features doesnt match it has NOT access.', () => {
    expect(
      hasFeatureSwitchesAccessSelector(_mockedState, {
        featureSwitches: ['feature1', 'feature3'],
      })
    ).toBe(false);
  });
});

describe('hasFeaturesEnabledFuncSelector', () => {
  let _mockedState = {};
  let hasFeatureSwitchesAccessFunc;

  beforeEach(() => {
    _mockedState = {
      switches: {
        feature1: true,
        feature2: true,
      },
      user: {
        profile: {
          isStaff: false,
        },
      },
    };

    hasFeatureSwitchesAccessFunc = hasFeaturesEnabledFuncSelector(_mockedState);
  });

  it('allows staff to bypass featureSwitches', () => {
    _mockedState = { ..._mockedState, user: { profile: { isStaff: true } } };
    hasFeatureSwitchesAccessFunc = hasFeaturesEnabledFuncSelector(_mockedState);

    expect(hasFeatureSwitchesAccessFunc(['feature3'])).toBe(true);
  });

  it('when is not staff and the feature is not in the state of featureSwitches return false', () => {
    expect(hasFeatureSwitchesAccessFunc(['feature3'])).toBe(false);
  });

  it('Check if is not staff and the feature is in the state of featureSwitches, it has access', () => {
    expect(hasFeatureSwitchesAccessFunc(['feature2'])).toBe(true);
  });

  it('Check we can send single string as the features to check', () => {
    expect(hasFeatureSwitchesAccessFunc(['feature2'])).toBe(true);
  });

  it('Check if a feature is not active it will not be counted as a valid feature to check.', () => {
    _mockedState = {
      ..._mockedState,
      switches: { ..._mockedState.switches, feature2: false },
    };
    hasFeatureSwitchesAccessFunc = hasFeaturesEnabledFuncSelector(_mockedState);

    expect(hasFeatureSwitchesAccessFunc(['feature2'])).toBe(false);
  });

  it('Check if all of the features match it has access.', () => {
    expect(hasFeatureSwitchesAccessFunc(['feature1', 'feature2'])).toBe(true);
  });

  it('Check if any of the features doesnt match it has NOT access.', () => {
    expect(hasFeatureSwitchesAccessFunc(['feature1', 'feature3'])).toBe(false);
  });
});
