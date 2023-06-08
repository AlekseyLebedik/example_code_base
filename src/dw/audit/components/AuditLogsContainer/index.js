import React, { useState, useCallback } from 'react';
import { uuid } from 'dw/core/helpers/uuid';
import PropTypes from 'prop-types';
import ResizablePanels from 'dw/core/components/ResizablePanels';
import SearchAuditLogs from 'dw/audit/scenes/AuditLogs/components/SearchAuditLogs';
import AgGridComponent from 'dw/audit/scenes/AuditLogs/components/AgGridComponent';

const AuditLogs = ({ styles, ...rest }) => {
  const [refreshKey, setRefreshKey] = useState('');
  const onRefresh = useCallback(() => setRefreshKey(uuid()), [setRefreshKey]);
  return (
    <div style={styles}>
      <ResizablePanels
        sizes={[
          {
            size: 300,
            min: 200,
            max: 284,
          },
        ]}
        titles={['Search']}
      >
        <SearchAuditLogs onRefresh={onRefresh} {...rest} />
        <AgGridComponent refreshKey={refreshKey} />
      </ResizablePanels>
    </div>
  );
};

AuditLogs.propTypes = {
  styles: PropTypes.object,
};

AuditLogs.defaultProps = {
  styles: {},
};

export default AuditLogs;
