export const filterTestUsersLogs = (logs, include) =>
  include
    ? logs
    : logs.filter(
        log =>
          !log.username.toLowerCase().includes('dw_thcnagios') &&
          !log.username.toLowerCase().includes('bdtestclientuser') &&
          !log.username.toLowerCase().includes('bdsystemtestuser')
      );
