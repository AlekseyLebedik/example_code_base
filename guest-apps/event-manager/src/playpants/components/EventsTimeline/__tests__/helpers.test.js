import { makeGroupKeyCallback, getTimelineGroups } from '../helpers';

const BASE_PROJECT = { projectId: 1, name: 'My Project' };

const BASE_FILTERS = {
  projects: {
    [BASE_PROJECT.name]: true,
  },
  environments: {
    Live: true,
    Development: true,
    Certification: false,
  },
  platforms: {
    CROSSPLAY: true,
    PS5: true,
    PS4: true,
    XB1: true,
    XBSX: true,
  },
  sources: {
    externalEvents: { pmg: { all: true }, holidays: { all: true } },
    demonwareEvents: { criticalEvents: true },
    abTesting: { active: true, config: true },
  },
};

const BASE_PROJECTS = [BASE_PROJECT];

const BASE_EVENT = {
  id: 1234567,
  project: BASE_PROJECT.projectId,
  platform: 'PS5',
  env_type: 'cert',
  type: 'demonwareEvents',
  event_type: 'criticalEvents',
};

describe('makeGroupKeyCallback', () => {
  it('by projects', () => {
    expect(makeGroupKeyCallback(BASE_EVENT, 'projects')).toEqual(
      BASE_PROJECT.projectId
    );
  });
  it('by projects using projectID', () => {
    const e = { ...BASE_EVENT, project: undefined, projectID: 123 };
    expect(makeGroupKeyCallback(e, 'projects')).toEqual(123);
  });
  it('by environments', () => {
    expect(makeGroupKeyCallback(BASE_EVENT, 'environments')).toEqual(
      'Certification'
    );
  });
  it('by platforms', () => {
    expect(makeGroupKeyCallback(BASE_EVENT, 'platforms')).toEqual('PS5');
  });
  it('by multiple platforms', () => {
    const e = { ...BASE_EVENT, platforms: ['XB1', 'XBSX'] };
    expect(makeGroupKeyCallback(e, 'platforms')).toEqual([
      'XB1',
      'XBSX',
      'PS5',
      'Multiple',
    ]);
  });
  it('by demonwareEvents', () => {
    expect(makeGroupKeyCallback(BASE_EVENT, 'demonwareEvents')).toEqual(
      'criticalEvents'
    );
  });
  it('by externalEvents', () => {
    const e = { ...BASE_EVENT, type: 'externalEvents', event_type: 'pmg' };
    expect(makeGroupKeyCallback(e, 'externalEvents')).toEqual('pmg');
  });
  it('by abTesting', () => {
    const e = { ...BASE_EVENT, type: 'abTesting', status: 'config' };
    expect(makeGroupKeyCallback(e, 'abTesting')).toEqual('config');
  });
});

describe('getTimelineGroups', () => {
  it('for projects', () => {
    expect(getTimelineGroups('projects', BASE_FILTERS, BASE_PROJECTS)).toEqual([
      { id: BASE_PROJECT.projectId, title: BASE_PROJECT.name },
      { id: undefined, title: 'Unspecified' },
    ]);
  });
  it('for environments', () => {
    expect(
      getTimelineGroups('environments', BASE_FILTERS, BASE_PROJECTS)
    ).toEqual([
      {
        id: 'Live',
        name: 'Live',
        title: 'Live',
      },
      {
        id: 'Development',
        name: 'Development',
        title: 'Development',
      },
      {
        id: undefined,
        title: 'Unspecified',
      },
    ]);
  });
  it('for platforms', () => {
    expect(getTimelineGroups('platforms', BASE_FILTERS, BASE_PROJECTS)).toEqual(
      [
        {
          id: 'CROSSPLAY',
          title: 'CROSSPLAY',
        },
        {
          id: 'PS5',
          title: 'PS5',
        },
        {
          id: 'PS4',
          title: 'PS4',
        },
        {
          id: 'XB1',
          title: 'XB1',
        },
        {
          id: 'XBSX',
          title: 'XBSX',
        },
      ]
    );
  });
  it('for demonwareEvents', () => {
    expect(
      getTimelineGroups('demonwareEvents', BASE_FILTERS, BASE_PROJECTS)
    ).toEqual([
      {
        id: 'criticalEvents',
        title: 'Critical Events',
      },
      {
        id: undefined,
        title: 'Other',
      },
    ]);
  });
  it('for externalEvents', () => {
    expect(
      getTimelineGroups('externalEvents', BASE_FILTERS, BASE_PROJECTS)
    ).toEqual([
      {
        id: 'holidays',
        title: 'MaxCal Global Events',
      },
      {
        id: 'pmg',
        title: 'PMG Live Ops Schedule',
      },
      {
        id: undefined,
        title: 'Other',
      },
    ]);
  });
  it('for abTesting', () => {
    expect(getTimelineGroups('abTesting', BASE_FILTERS, BASE_PROJECTS)).toEqual(
      [
        {
          id: 'DEMONWARE SERVICES',
          isSubgroupHeading: true,
          name: 'DEMONWARE SERVICES',
          title: 'DEMONWARE SERVICES',
        },
        {
          id: 'active',
          isSubgroupItem: true,
          title: 'active',
        },
        {
          id: 'config',
          isSubgroupItem: true,
          title: 'config',
        },
        {
          id: undefined,
          title: 'Other',
        },
      ]
    );
  });
});
