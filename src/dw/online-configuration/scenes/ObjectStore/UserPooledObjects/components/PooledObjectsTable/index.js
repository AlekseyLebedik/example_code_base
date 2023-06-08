import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AGGrid from 'dw/core/components/AGGrid/container';
import { COLUMN_OPTIONS } from '../../../constants';
import { getGridDefinitions } from './helpers';
import styles from './index.module.css';

const ObjectsTable = ({
  classes,
  formatDateTime,
  gridProps,
  objects,
  onGridReady,
  onPooledObjectsScroll,
  onSelect,
  onSelectionChanged,
  validTags,
}) => {
  const { columnDefs, ...gridDefinitions } = getGridDefinitions(
    formatDateTime,
    validTags
  );
  return (
    <div className={classNames(styles.agGridContainer, classes.root)}>
      <AGGrid
        {...gridProps}
        gridOptions={{
          ...COLUMN_OPTIONS,
          ...gridDefinitions,
          rowHeight: 60,
          defaultColDef: {
            autoHeight: false,
          },
        }}
        columnDefs={columnDefs}
        context={{ onSelect }}
        onGridReady={onGridReady}
        onBodyScroll={onPooledObjectsScroll}
        onSelectionChanged={params => onSelectionChanged(params)}
        rowData={objects.map(obj => ({ ...obj.metadata, tags: obj.tags }))}
      />
    </div>
  );
};

ObjectsTable.propTypes = {
  classes: PropTypes.object,
  formatDateTime: PropTypes.func.isRequired,
  gridProps: PropTypes.object,
  objects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGridReady: PropTypes.func.isRequired,
  onPooledObjectsScroll: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  validTags: PropTypes.arrayOf(PropTypes.object),
};

ObjectsTable.defaultProps = {
  classes: {},
  gridProps: {},
  validTags: [],
};

export default ObjectsTable;
