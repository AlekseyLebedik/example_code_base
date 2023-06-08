import React from 'react';

import ResizablePanels from 'dw/core/components/ResizablePanels';

import SearchForm from './components/SearchForm';
// import ConnectionLogs from './components/ConnectionLogs';
// import TransactionDetails from './components/TransactionDetails';
import AgGridComponent from './components/AgGridComponent';

const ServerLogs = () => (
  <ResizablePanels
    sizes={[
      {
        size: 284,
        min: 200,
        max: 284,
      },
      {
        size: 390,
        min: 50,
        max: 600,
      },
    ]}
    titles={['Filter']}
  >
    <SearchForm />
    <AgGridComponent />
  </ResizablePanels>
);

export default ServerLogs;
