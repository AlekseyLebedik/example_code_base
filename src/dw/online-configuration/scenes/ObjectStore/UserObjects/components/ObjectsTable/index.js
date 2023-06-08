import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AGGrid from 'dw/core/components/AGGrid/container';
import { COLUMN_OPTIONS } from '../../../constants';
import { getGridDefinitions } from './helpers';
import styles from './index.module.css';

const ObjectsTable = ({
  formatDateTime,
  objects,
  onSelectionChanged,
  onDownload,
  onRestore,
  onGridReady,
  gridProps,
  classes,
}) => {
  const context = { onDownload, onRestore, formatDateTime };
  const { columnDefs, ...gridDefinitions } = getGridDefinitions(
    formatDateTime,
    context
  );
  return (
    <div className={classNames(styles.agGridContainer, classes.root)}>
      <AGGrid
        {...gridProps}
        gridOptions={{
          ...COLUMN_OPTIONS,
          ...gridDefinitions,
        }}
        autoSizeMaxWidth={3000}
        columnDefs={columnDefs}
        context={context}
        onGridReady={onGridReady}
        onSelectionChanged={params => onSelectionChanged(params)}
        rowData={objects}
      />
    </div>
  );
};

ObjectsTable.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDownload: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  gridProps: PropTypes.object,
  classes: PropTypes.object,
};

ObjectsTable.defaultProps = {
  gridProps: {},
  classes: {},
};

export default ObjectsTable;
