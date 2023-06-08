import React from 'react';
import AuditLogsContainer from 'dw/audit/components/AuditLogsContainer';
import { UserAutoCompleteFormField as UserInputComponent } from 'dw/online-configuration/components/UserAutoComplete';

const AuditLogs = () => (
  <AuditLogsContainer
    styles={{
      width: '100%',
      height: '100%',
    }}
    showTitleIDField={false}
    showEnvField={false}
    UserInputComponent={UserInputComponent}
  />
);

export default AuditLogs;
