import React from 'react';
import { withRouter } from 'react-router-dom';
import AuditLogsContainer from 'dw/audit/components/AuditLogsContainer';

const AuditLogs = () => (
  <AuditLogsContainer
    styles={{
      width: '100%',
      height: '100%',
      marginTop: '0px',
      borderTop: '3px solid #EFEFEF',
    }}
    showTitleIDField
    showEnvField
  />
);

export default withRouter(AuditLogs);
