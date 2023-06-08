import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { activitySettingsSelector } from 'playpants/components/App/selectors';
import CreateVariable from '../CreateVariable';
import { GRID_OPTIONS } from '../../constants';
import { NAMESPACE_COLUMN_DEFS } from './constants';
import { getRowData } from './helpers';

import styles from './index.module.css';

export const NamespaceStatelessBase = props => {
  const {
    activitySettings,
    clearVariable,
    createVariable,
    disabled,
    filterValues,
    modifyVariable,
    selectedNamespace,
  } = props;
  const columnDefs = NAMESPACE_COLUMN_DEFS(disabled, clearVariable);
  const rowData = getRowData(selectedNamespace);

  if (filterValues.namespace.length && selectedNamespace) {
    return (
      <>
        {selectedNamespace && selectedNamespace.namespace && (
          <div className={styles.namespaceControls}>
            <div className={styles.namespaceTitleEditDelete}>
              <div className={styles.namespaceTitle}>
                {selectedNamespace.namespace}
              </div>
              {!disabled && (
                <CreateVariable
                  createVariable={createVariable}
                  selectedNamespace={selectedNamespace}
                />
              )}
            </div>
            <div className={styles.namespaceVersionControls}>
              <span className={styles.namespaceVersion}>
                {`Version ${selectedNamespace.major_version}.${selectedNamespace.minor_version}`}
              </span>
            </div>
          </div>
        )}
        <div className={styles.namespaceContent}>
          <div className={styles.gridContainer}>
            <AgGridReact
              {...GRID_OPTIONS}
              context={{ activitySettings }}
              clearVariable={clearVariable}
              columnDefs={columnDefs}
              onCellValueChanged={params => modifyVariable(params)}
              rowData={rowData}
            />
          </div>
        </div>
      </>
    );
  }

  return null;
};

NamespaceStatelessBase.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearVariable: PropTypes.func.isRequired,
  createVariable: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  filterValues: PropTypes.object.isRequired,
  modifyVariable: PropTypes.func.isRequired,
  selectedNamespace: PropTypes.object,
};

NamespaceStatelessBase.defaultProps = {
  selectedNamespace: {},
};

const mapStateToProps = state => ({
  activitySettings: activitySettingsSelector(state),
});

export default connect(mapStateToProps)(NamespaceStatelessBase);
