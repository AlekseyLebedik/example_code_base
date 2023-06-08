import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'dw/core/components/Loading';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';

const columns = [
  {
    headerName: 'Name',
    field: 'name',
    minWidth: 150,
  },
  {
    headerName: 'Active',
    field: 'active',
  },
  {
    headerName: 'Note',
    field: 'note',
    minWidth: 250,
  },
  {
    headerName: 'Type',
    field: 'type',
  },
];

const PermissionFeatureFlagsStateLess = ({ isLoading, rowData }) => {
  if (isLoading) return <Loading />;
  return (
    <AsyncAGGrid
      columnDefs={columns}
      rowData={rowData}
      onLoadData={(_, params) => params.successCallback(rowData)}
    />
  );
};

PermissionFeatureFlagsStateLess.propTypes = {
  isLoading: PropTypes.bool,
  rowData: PropTypes.array.isRequired,
};

PermissionFeatureFlagsStateLess.defaultProps = {
  isLoading: true,
};

export default PermissionFeatureFlagsStateLess;
