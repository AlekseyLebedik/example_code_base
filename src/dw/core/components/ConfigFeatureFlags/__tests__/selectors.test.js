describe('ConfigFeatureFlags Selectors', () => {
  let _mockedState = {};
  let _projectTitleSource = {};
  let hasConfigFeatureFlagsAccessSelector;
  let _hasFeaturesEnabledFuncSelector;

  beforeEach(() => {
    jest.mock('dw/config', () => ({
      CONFIG_FEATURE_FLAGS: {
        feature1: { type: 'project', value: 2 },
        feature2: { type: 'title', value: [1000, 2000] },
        feature3: { type: 'user', value: 7 },
      },
    }));

    _projectTitleSource = {
      project: {
        id: 1,
      },
      title: {
        id: 3000,
      },
    };

    _mockedState = {
      user: {
        profile: {
          id: 1,
          isStaff: false,
        },
      },
    };

    import('../selectors').then(
      ({ makeHasFeaturesEnabledSelector, hasFeaturesEnabledFuncSelector }) => {
        hasConfigFeatureFlagsAccessSelector = makeHasFeaturesEnabledSelector();
        _hasFeaturesEnabledFuncSelector = hasFeaturesEnabledFuncSelector;
      }
    );
  });

  describe('makeHasFeaturesEnabledSelector', () => {
    it('if the feature flag doesnt exists has no access', () => {
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature4'],
        })
      ).toBe(false);
    });

    it('allows staff to bypass configFeatureFlags', () => {
      _mockedState.user.profile.isStaff = true;
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature1'],
        })
      ).toBe(true);
    });

    it('when is not staff and the feature is project type and the project Id is NOT in the list return false', () => {
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature1'],
          projectTitleSource: _projectTitleSource,
        })
      ).toBe(false);
    });

    it('when is not staff and the feature is title type and the title Id is NOT in the list return false', () => {
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature2'],
          projectTitleSource: _projectTitleSource,
        })
      ).toBe(false);
    });

    it('when is not staff and the feature is user type and the user Id is NOT in the list return false', () => {
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature3'],
          projectTitleSource: _projectTitleSource,
        })
      ).toBe(false);
    });

    it('when is not staff and the feature is project type and the project Id IS in the list return true', () => {
      const newProjectTitleSource = {
        ..._projectTitleSource,
        project: {
          id: 2,
        },
      };
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature1'],
          projectTitleSource: newProjectTitleSource,
        })
      ).toBe(true);
    });

    it('when is not staff and the feature is title type and the title Id IS in the list return true', () => {
      const newProjectTitleSource = {
        ..._projectTitleSource,
        title: {
          id: 1000,
        },
      };
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: ['feature2'],
          projectTitleSource: newProjectTitleSource,
        })
      ).toBe(true);
    });

    it('when is not staff and the feature is user type and the user Id is IS the list return true', () => {
      const mockedState = {
        user: {
          profile: {
            id: 7,
            isStaff: false,
          },
        },
      };
      expect(
        hasConfigFeatureFlagsAccessSelector(mockedState, {
          configFeatureFlags: ['feature3'],
        })
      ).toBe(true);
    });

    it('Check we can send single string as the features to check', () => {
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: 'feature2',
          projectTitleSource: _projectTitleSource,
        })
      ).toBe(false);
    });

    it('if project title source is undefined and we specify a FF with project/title type return true', () => {
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: 'feature1',
        })
      ).toBe(true);
      expect(
        hasConfigFeatureFlagsAccessSelector(_mockedState, {
          configFeatureFlags: 'feature2',
        })
      ).toBe(true);
    });
  });

  describe('hasFeaturesEnabledFuncSelector', () => {
    let hasConfigFeatureFlagsAccessFunc;

    beforeEach(() => {
      hasConfigFeatureFlagsAccessFunc =
        _hasFeaturesEnabledFuncSelector(_mockedState);
    });

    it('if the feature flag doesnt exists has no access', () => {
      expect(hasConfigFeatureFlagsAccessFunc(['feature4'])).toBe(false);
    });

    it('allows staff to bypass configFeatureFlags', () => {
      const mockedState = {
        ..._mockedState,
        user: { profile: { isStaff: true } },
      };
      hasConfigFeatureFlagsAccessFunc =
        _hasFeaturesEnabledFuncSelector(mockedState);

      expect(hasConfigFeatureFlagsAccessFunc(['feature1'])).toBe(true);
    });

    it('when is not staff and the feature is project type and is NOT in list of allowed projects, return false', () => {
      expect(
        hasConfigFeatureFlagsAccessFunc(['feature1'], _projectTitleSource)
      ).toBe(false);
    });

    it('when is not staff and the feature is title type and is NOT in list of allowed titles, return false', () => {
      expect(
        hasConfigFeatureFlagsAccessFunc(['feature2'], _projectTitleSource)
      ).toBe(false);
    });

    it('when is not staff and the feature is user type and is NOT in list of allowed users, return false', () => {
      expect(
        hasConfigFeatureFlagsAccessFunc(['feature3'], _projectTitleSource)
      ).toBe(false);
    });

    it('when is not staff and the feature is project type and IS in list of allowed projects, return true', () => {
      const newProjectTitleSource = {
        ..._projectTitleSource,
        project: {
          id: 2,
        },
      };
      hasConfigFeatureFlagsAccessFunc = _hasFeaturesEnabledFuncSelector(
        _mockedState,
        newProjectTitleSource
      );
      expect(hasConfigFeatureFlagsAccessFunc(['feature1'])).toBe(true);
    });

    it('when is not staff and the feature is title type and IS in list of allowed titles, return true', () => {
      const newProjectTitleSource = {
        ..._projectTitleSource,
        title: {
          id: 1000,
        },
      };
      hasConfigFeatureFlagsAccessFunc = _hasFeaturesEnabledFuncSelector(
        _mockedState,
        newProjectTitleSource
      );
      expect(hasConfigFeatureFlagsAccessFunc(['feature2'])).toBe(true);
    });

    it('when is not staff and the feature is user type and IS in list of allowed users, return true', () => {
      const mockedState = {
        user: {
          profile: {
            id: 7,
            isStaff: false,
          },
        },
      };
      hasConfigFeatureFlagsAccessFunc =
        _hasFeaturesEnabledFuncSelector(mockedState);
      expect(hasConfigFeatureFlagsAccessFunc(['feature3'])).toBe(true);
    });

    it('Check we can send single string as the features to check', () => {
      expect(
        hasConfigFeatureFlagsAccessFunc('feature1', _projectTitleSource)
      ).toBe(false);
    });

    it('if project title source is undefined and we specify a FF with project/title type return true', () => {
      expect(hasConfigFeatureFlagsAccessFunc('feature1')).toBe(true);
      expect(hasConfigFeatureFlagsAccessFunc('feature2')).toBe(true);
    });
  });
});
