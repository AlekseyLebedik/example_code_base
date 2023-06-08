import React from 'react';
import PropTypes from 'prop-types';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import styles from './presentational.module.css';

const TabWithAsyncTableStateless = props => {
  const { columns, onLoadData, gridOptions, components } = props;
  return (
    <div className={styles.container}>
      <AsyncAGGrid
        columnDefs={columns}
        gridOptions={{
          suppressContextMenu: true,
          components,
          ...gridOptions,
        }}
        onLoadData={onLoadData}
        fetchWithSearch
        {...props}
      />
    </div>
  );
};

TabWithAsyncTableStateless.propTypes = {
  columns: PropTypes.array.isRequired,
  onLoadData: PropTypes.func,
  gridOptions: PropTypes.object,
  components: PropTypes.object,
};

TabWithAsyncTableStateless.defaultProps = {
  onLoadData: () => {},
  gridOptions: undefined,
  components: undefined,
};

export default TabWithAsyncTableStateless;
