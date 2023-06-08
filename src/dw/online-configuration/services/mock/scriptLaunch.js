import wait from 'dw/test-utils/wait';

const mockScriptsFirstPage = {
  data: [
    {
      id: 1,
      userId: 1,
      createdAt: '1532449670',
      updatedAt: '1532449670',
      serviceName: 'loot-generation',
      titleId: 5867,
      baseBranch: 'not-master',
      mergeScriptToBaseBranch: false,
      jobId: '123',
      status: 'PENDING',
      failedTests: null,
      dockerTag: null,
    },
    {
      id: 2,
      userId: 3,
      createdAt: '1532449670',
      updatedAt: '1532449670',
      serviceName: 'loot-generation',
      titleId: 5867,
      baseBranch: 'not-master',
      mergeScriptToBaseBranch: false,
      jobId: '123',
      status: 'PENDING',
      failedTests: null,
      dockerTag: null,
    },
    {
      id: 4,
      userId: 1,
      createdAt: '1532449670',
      updatedAt: '1532449670',
      serviceName: 'loot-generation',
      titleId: 5867,
      baseBranch: 'not-master',
      mergeScriptToBaseBranch: false,
      jobId: '123',
      status: 'COMPLETE',
      failedTests: null,
      dockerTag: 'DOCKER-TS',
    },
    {
      id: 5,
      userId: 1,
      createdAt: '1532449670',
      updatedAt: '1532449670',
      serviceName: 'loot-generation',
      titleId: 5867,
      baseBranch: 'not-master',
      mergeScriptToBaseBranch: false,
      jobId: '123',
      status: 'FAILED',
      failedTests: [{ id: '1', text: 'maybe' }],
      dockerTag: null,
    },
  ],
  nextPageToken: 'CAE',
};

const mockScriptsSecondPage = {
  data: [
    {
      id: 12,
      userId: 2,
      createdAt: '1532449670',
      updatedAt: '1532449670',
      serviceName: '1532449670',
      titleId: 5867,
      baseBranch: 'not-master',
      mergeScriptToBaseBranch: false,
      jobId: '2',
      status: 'PENDING',
      failedTests: null,
      dockerTag: null,
    },
  ],
  nextPageToken: 'CAE',
};

export async function getScripts(_, params) {
  await wait(1000);
  return params && params.nextPageToken !== undefined
    ? { data: mockScriptsSecondPage }
    : { data: mockScriptsFirstPage };
}

export async function uploadScript() {
  await wait(1000);
  return { data: { data: null } };
}
