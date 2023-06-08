import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { activitySettingsSelector } from 'playpants/components/App/selectors';
import { GRID_OPTIONS } from '../../constants';
import { CHANGED_VARSETS_COLUMN_DEFS } from './constants';
import { getVarSetRowData } from './helpers';

import styles from './index.module.css';

export const ChangedVarSetsBase = ({
  activitySettings,
  clearVariable,
  disabled,
  modifyVariable,
  pubVarsActivity,
}) => {
  const { variable_sets: variableSets } = pubVarsActivity.activity;
  const columnDefs = CHANGED_VARSETS_COLUMN_DEFS(disabled, clearVariable);
  const rowData = getVarSetRowData(variableSets);

  return (
    <div className={styles.varSetsContent}>
      <div className={styles.gridContent}>
        <AgGridReact
          {...GRID_OPTIONS}
          context={{ activitySettings }}
          columnDefs={columnDefs}
          onCellValueChanged={params => modifyVariable(params)}
          rowData={rowData}
        />
      </div>
    </div>
  );
};

ChangedVarSetsBase.propTypes = {
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearVariable: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  pubVarsActivity: PropTypes.object.isRequired,
  modifyVariable: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activitySettings: activitySettingsSelector(state),
});

export default connect(mapStateToProps)(ChangedVarSetsBase);
