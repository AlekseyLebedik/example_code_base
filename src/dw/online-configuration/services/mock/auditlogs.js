import range from 'lodash/range';

const createNewAuditLog = () => ({
  username: 'jheslin',
  userType: 'dwsproxy',
  timestamp: 1557420373,
  category: 'Devzone.Admin.TestAction.SubAction',
  auditContext: 'context_test',
  auditTitleId: 1111,
  auditEnv: 'dev',
  entityID: '1009',
  entityName: 'user_b',
  sourceName: 'auditlog',
  context: 'important_context',
  titleID: '1111',
  env: 'dev',
  timestampMillis: 1557420373808,
  extra: {
    example_specific_property: 46,
  },
});
const auditLogList = range(200).map(() => createNewAuditLog());
const mockConnections = {
  data: {
    data: auditLogList,
    nextPageToken: 'CAE',
  },
};

export const getAuditLogs = () =>
  new Promise(resolve => setTimeout(() => resolve(mockConnections), 2000));
