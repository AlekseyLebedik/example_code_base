import {
  getFilteredRoutes,
  isRouteVisible,
  getPermissionQuestions,
  addPermsToPermsObject,
  getPermissionCheckFromRoute,
  makePermissionObjectName,
} from '../container';

describe('makePermissionObjectName', () => {
  it('ignores company.all', () => {
    expect(makePermissionObjectName('company', 'all')).toBe('company.all');
  });

  it('fills in current project', () => {
    expect(makePermissionObjectName('project', 'current', { id: 'test' })).toBe(
      'project.test'
    );
  });

  it('fills in current titleenv', () => {
    expect(
      makePermissionObjectName('titleenv', 'current', null, { id: 'test' })
    ).toBe('titleenv.test');
  });

  it('throws for anything other than company.all, project or titleenv', () => {
    expect(() => makePermissionObjectName('TEST', 'TEST')).toThrow();
  });
});

describe('getPermissionCheckFromRoute', () => {
  it('concats permissionCheck from both top level and items', () => {
    const TEST_DATA = {
      permissionCheck: {
        ALL: ['TEST'],
        target: 'test.test',
      },
      items: [
        {
          permissionCheck: {
            ALL: ['TEST'],
            target: 'test.test',
          },
        },
      ],
    };
    expect(getPermissionCheckFromRoute(TEST_DATA)).toMatchSnapshot();
  });
});

describe('addPermsToPermsObject', () => {
  it('adds the predicates name by object(target)', () => {
    const TEST_DATA = [
      {
        target: 'titleenv.current',
        ALL: ['titleenv_predicate', 'other_titleenv_predicate'],
      },
      {
        target: 'project.current',
        ANY: ['project_predicate', 'other_project_predicate'],
      },
    ];
    const TEST_PROJECT = { id: 'test' };
    const TEST_TITLE_ENV = { id: 'test' };
    const TEST_ACCUMULATOR = {};
    expect(
      addPermsToPermsObject(
        TEST_DATA[0],
        TEST_ACCUMULATOR,
        TEST_PROJECT,
        TEST_TITLE_ENV
      )
    ).toMatchSnapshot();
    expect(
      addPermsToPermsObject(
        TEST_DATA[1],
        TEST_ACCUMULATOR,
        TEST_PROJECT,
        TEST_TITLE_ENV
      )
    ).toMatchSnapshot();
  });
});

describe('isRouteVisible', () => {
  it('deals with single ANY permission check', () => {
    const TEST_PERMISSIONS = {
      titleenv: ['titleenv_predicate'],
    };
    const TEST_DATA = {
      target: 'titleenv.test',
      ANY: ['titleenv_predicate', 'other_titleenv_predicate'],
    };
    expect(isRouteVisible(TEST_DATA, TEST_PERMISSIONS)).toBe(true);
  });

  it('deals with single ALL permission check', () => {
    const TEST_PERMISSIONS_FAIL = {
      titleenv: ['titleenv_predicate'],
    };
    const TEST_PERMISSIONS_PASS = {
      titleenv: ['titleenv_predicate', 'other_titleenv_predicate'],
    };
    const TEST_DATA = {
      target: 'titleenv.test',
      ALL: ['titleenv_predicate', 'other_titleenv_predicate'],
    };
    expect(isRouteVisible(TEST_DATA, TEST_PERMISSIONS_FAIL)).toBe(false);
    expect(isRouteVisible(TEST_DATA, TEST_PERMISSIONS_PASS)).toBe(true);
  });

  it('deals with ANY on two targets', () => {
    const TEST_PERMISSIONS = {
      titleenv: ['titleenv_predicate'],
      company: ['company_predicate'],
    };
    const TEST_DATA = {
      ANY: [
        {
          target: 'titleenv.test',
          ALL: ['titleenv_predicate'],
        },
        {
          target: 'company.test',
          ALL: ['something_else'],
        },
      ],
    };
    expect(isRouteVisible(TEST_DATA, TEST_PERMISSIONS)).toBe(true);
  });

  it('deals with ALL on two targets', () => {
    const TEST_PERMISSIONS = {
      titleenv: ['titleenv_predicate'],
      company: ['company_predicate'],
    };
    const TEST_DATA_FAIL = {
      ALL: [
        {
          target: 'titleenv.test',
          ALL: ['titleenv_predicate'],
        },
        {
          target: 'company.test',
          ALL: ['something_else'],
        },
      ],
    };
    const TEST_DATA_PASS = {
      ALL: [
        {
          target: 'titleenv.test',
          ALL: ['titleenv_predicate'],
        },
        {
          target: 'company.test',
          ALL: ['company_predicate'],
        },
      ],
    };
    expect(isRouteVisible(TEST_DATA_FAIL, TEST_PERMISSIONS)).toBe(false);
    expect(isRouteVisible(TEST_DATA_PASS, TEST_PERMISSIONS)).toBe(true);
  });

  it('allows routes with no permissionCheck', () => {
    const TEST_DATA = {};
    expect(isRouteVisible(TEST_DATA, {})).toBe(true);
  });
});

describe('getPermissionQuestions', () => {
  it('aggregates predicates per object (target)', () => {
    const TEST_PROJECT = { id: 'test' };
    const TEST_TITLE_ENV = { id: 'test' };
    const TEST_DATA = [
      {
        permissionCheck: {
          ALL: ['TEST'],
          target: 'project.current',
        },
        items: [
          {
            permissionCheck: {
              ALL: ['TEST'],
              target: 'titleenv.current',
            },
          },
        ],
      },
      {
        permissionCheck: {
          ALL: ['TEST_TOO'],
          target: 'titleenv.current',
        },
        items: [
          {
            permissionCheck: {
              ALL: ['TEST_TOO'],
              target: 'titleenv.current',
            },
          },
        ],
      },
    ];
    expect(
      getPermissionQuestions(TEST_DATA, TEST_PROJECT, TEST_TITLE_ENV)
    ).toMatchSnapshot();
  });
});

describe('getFilteredRoutes', () => {
  it('filters routes and sub routes', () => {
    const TEST_PERMISSIONS = {
      titleenv: ['TEST_PASS'],
    };
    const TEST_DATA = [
      {
        name: 'test-stays',
        permissionCheck: {
          ALL: ['TEST_PASS'],
          target: 'titleenv.current',
        },
        items: [
          {
            name: 'test-stays',
            permissionCheck: {
              ALL: ['TEST_PASS'],
              target: 'titleenv.current',
            },
          },
        ],
      },
      {
        name: 'test-stays',
        permissionCheck: {
          ALL: ['TEST_PASS'],
          target: 'titleenv.current',
        },
        items: [
          {
            name: 'test-leaves',
            permissionCheck: {
              ALL: ['TEST_FAIL'],
              target: 'titleenv.current',
            },
          },
          {
            name: 'test-leaves',
            permissionCheck: {
              ALL: ['TEST_FAIL'],
              target: 'titleenv.current',
            },
          },
        ],
      },
    ];
    expect(getFilteredRoutes(TEST_DATA, TEST_PERMISSIONS)).toMatchSnapshot();
  });
});
