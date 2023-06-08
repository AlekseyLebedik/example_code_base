import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Empty from 'dw/core/components/Empty';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import { COLUMNS } from '../agGridConstants';

function StatsTable({
  statisticsValue,
  categoryValue,
  tableDefinitions,
  formatDateTime,
  onLoadData,
  onSelectionChanged,
  selectedRow,
  currentTitle,
  currentEnv,
}) {
  const { tableRefreshKey } = useSelector(
    state => state.Scenes.ObjectStore.ObjectStats
  );
  if (!categoryValue || !statisticsValue) {
    return <Empty>Please select a category and statistic</Empty>;
  }
  return (
    <AsyncAGGrid
      key={`${statisticsValue}-${tableRefreshKey}`}
      useQuickFilter={false}
      columnDefs={COLUMNS}
      gridOptions={{
        suppressContextMenu: true,
        rowSelection: 'single',
        onSelectionChanged: params => onSelectionChanged(params),
        components: tableDefinitions.components,
        suppressMenuHide: true,
        context: {
          formatDateTime,
          categoryValue,
          statisticsValue,
          selectedRow,
          currentTitle,
          currentEnv,
        },
      }}
      onLoadData={onLoadData}
      saveColumnStateName="user-object-stats"
    />
  );
}

StatsTable.propTypes = {
  statisticsValue: PropTypes.string.isRequired,
  categoryValue: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  currentTitle: PropTypes.object.isRequired,
  currentEnv: PropTypes.object.isRequired,
  tableDefinitions: PropTypes.shape({
    components: PropTypes.object.isRequired,
  }).isRequired,
  onLoadData: PropTypes.func.isRequired,
};

export default StatsTable;
