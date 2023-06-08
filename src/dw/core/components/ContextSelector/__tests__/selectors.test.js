import * as selectors from '../selectors';

describe('ContextSelector/selectors', () => {
  const state = {
    user: {
      projects: [
        {
          titles: [
            {
              id: 5577,
              environments: [
                { shortType: 'dev', options: { is_multicontext: true } },
              ],
            },
          ],
        },
      ],
    },
    Components: {
      App: { currentTitleEnv: { usesMulticontext: true } },
      ContextSelector: {
        Registry: {
          ObjectStore: {
            data: [
              { endpoint: 'get_publisher_objects', type: 'Title' },
              { endpoint: 'get_user_objects', type: 'Platform' },
            ],
          },
          AchievementsEngine: {
            data: [{ endpoint: 'get_rulesets', type: 'Title' }],
          },
        },
        Available: {
          ObjectStore: {
            data: [
              { id: 6, name: 'game1', userSelectable: true, type: 'Title' },
              { id: 7, name: 'game2', userSelectable: true, type: 'Any' },
              { id: 2, name: 's2_xbl', userSelectable: true, type: 'Platform' },
            ],
            currentContext: {
              Title: {
                id: 6,
                name: 'game1',
                userSelectable: true,
                type: 'Title',
              },
            },
          },
        },
      },
      TitleSelector: {
        currentTitle: { id: 5577 },
        currentEnv: { shortType: 'dev' },
      },
    },
  };

  it('validates registrySelector', () => {
    const expected = [
      { endpoint: 'get_publisher_objects', type: 'Title' },
      { endpoint: 'get_user_objects', type: 'Platform' },
    ];
    expect(
      selectors.registrySelector(state, { serviceName: 'ObjectStore' })
    ).toEqual(expected);
  });

  it('validates availableContextsSelector', () => {
    const expected = [
      { id: 6, name: 'game1', userSelectable: true, type: 'Title' },
      { id: 7, name: 'game2', userSelectable: true, type: 'Any' },
      { id: 2, name: 's2_xbl', userSelectable: true, type: 'Platform' },
    ];
    expect(
      selectors.availableContextsSelector(state, { serviceName: 'ObjectStore' })
    ).toEqual(expected);
  });

  it('validates availableOptionsSelector returns Title and Any type options', () => {
    const expected = [
      {
        id: 6,
        name: 'game1',
        userSelectable: true,
        type: 'Title',
        platform: undefined,
        value: 'game1',
      },
      {
        id: 7,
        name: 'game2',
        userSelectable: true,
        type: 'Any',
        platform: undefined,
        value: 'game2',
      },
    ];
    expect(
      selectors.availableOptionsSelector(state, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validates availableOptionsSelector returns Platform and Any type options', () => {
    const expected = [
      {
        id: 7,
        name: 'game2',
        userSelectable: true,
        type: 'Any',
        platform: undefined,
        value: 'game2',
      },
      {
        id: 2,
        name: 's2_xbl',
        userSelectable: true,
        type: 'Platform',
        platform: 'xbl',
        value: 's2_xbl',
      },
    ];
    expect(
      selectors.availableOptionsSelector(state, {
        serviceName: 'ObjectStore',
        endpoint: 'get_user_objects',
      })
    ).toEqual(expected);
  });

  it('validates availableOptionsSelector returns Any type options for title-endpoint', () => {
    const newState = {
      ...state,
      Components: {
        ContextSelector: {
          ...state.Components.ContextSelector,
          Available: {
            ObjectStore: {
              data: [
                { id: 7, name: 'game2', userSelectable: true, type: 'Any' },
                {
                  id: 2,
                  name: 's2_xbl',
                  userSelectable: true,
                  type: 'Platform',
                },
              ],
            },
          },
        },
      },
    };
    const expected = [
      {
        id: 7,
        name: 'game2',
        userSelectable: true,
        type: 'Any',
        platform: undefined,
        value: 'game2',
      },
    ];
    expect(
      selectors.availableOptionsSelector(newState, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validates currentContextSelector', () => {
    const expected = {
      id: 6,
      name: 'game1',
      userSelectable: true,
      type: 'Title',
      platform: undefined,
      value: 'game1',
    };
    expect(
      selectors.currentContextSelector(state, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validates currentContextSelector returns Any type context for title-endpoint', () => {
    const newState = {
      ...state,
      Components: {
        ContextSelector: {
          ...state.Components.ContextSelector,
          Available: {
            ObjectStore: {
              data: [
                { id: 7, name: 'game2', userSelectable: true, type: 'Any' },
                {
                  id: 2,
                  name: 's2_xbl',
                  userSelectable: true,
                  type: 'Platform',
                },
              ],
              currentContext: {
                Any: {
                  id: 7,
                  name: 'game2',
                  userSelectable: true,
                  type: 'Any',
                },
              },
            },
          },
        },
      },
    };
    const expected = {
      id: 7,
      name: 'game2',
      userSelectable: true,
      type: 'Any',
      platform: undefined,
      value: 'game2',
    };
    expect(
      selectors.currentContextSelector(newState, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validate makeContextToUseSelector returns title-context for title-endpoint', () => {
    const expected = 'game1';
    expect(
      selectors.makeContextToUseSelector(state, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validate makeContextToUseSelector returns any-context for title-endpoint', () => {
    const newState = {
      ...state,
      Components: {
        ...state.Components,
        ContextSelector: {
          ...state.Components.ContextSelector,
          Available: {
            ObjectStore: {
              ...state.Components.ContextSelector.Available.ObjectStore,
              currentContext: {
                Any: {
                  id: 7,
                  name: 'game2',
                  userSelectable: true,
                  type: 'Any',
                },
              },
            },
          },
        },
      },
    };
    const expected = 'game2';
    expect(
      selectors.makeContextToUseSelector(newState, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validate makeContextToUseSelector returns not user selectable any-context for title-endpoint', () => {
    const newState = {
      ...state,
      Components: {
        ...state.Components,
        ContextSelector: {
          ...state.Components.ContextSelector,
          Available: {
            ObjectStore: {
              data: [
                { id: 7, name: 'game2', userSelectable: false, type: 'Any' },
                {
                  id: 2,
                  name: 's2_xbl',
                  userSelectable: true,
                  type: 'Platform',
                },
              ],
            },
          },
        },
      },
    };
    const expected = 'game2';
    expect(
      selectors.makeContextToUseSelector(newState, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validate makeContextToUseSelector returns single configured not user selectable context with empty type for title-endpoint', () => {
    const newState = {
      ...state,
      Components: {
        ...state.Components,
        ContextSelector: {
          ...state.Components.ContextSelector,
          Available: {
            ObjectStore: {
              data: [{ id: 7, name: 'game2', userSelectable: false, type: '' }],
            },
          },
        },
      },
    };
    const expected = 'game2';
    expect(
      selectors.makeContextToUseSelector(newState, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toEqual(expected);
  });

  it('validate makeContextToUseSelector returns null for misconfigured contexts', () => {
    const newState = {
      ...state,
      Components: {
        ...state.Components,
        ContextSelector: {
          ...state.Components.ContextSelector,
          Available: {
            ObjectStore: {
              data: [
                { id: 7, name: 'game2', userSelectable: false, type: '' },
                {
                  id: 2,
                  name: 's2_xbl',
                  userSelectable: true,
                  type: 'Platform',
                },
              ],
            },
          },
        },
      },
    };
    expect(
      selectors.makeContextToUseSelector(newState, {
        serviceName: 'ObjectStore',
        endpoint: 'get_publisher_objects',
      })
    ).toBeNull();
  });
});
