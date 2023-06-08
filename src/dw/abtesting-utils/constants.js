export const TEST_STATUS = {
  /* 'config' is used only by us - the real AB Testing status value is 'configuration' */
  CONFIG: 'config',
  APPROVED: 'approved',
  LIVE: 'live',
  ACTIVE: 'active',
  ANALYSIS: 'analysis',
  KILLED: 'killed',
  ARCHIVED: 'archived',
};

export const SCHEDULED_STATUS = `configuration,${TEST_STATUS.APPROVED},${TEST_STATUS.LIVE},${TEST_STATUS.ANALYSIS}`;
