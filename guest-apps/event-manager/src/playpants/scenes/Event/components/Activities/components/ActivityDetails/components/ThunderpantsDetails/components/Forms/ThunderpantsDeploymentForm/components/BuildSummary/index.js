import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import { buildSchemaSelector } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';
import { formatBuild } from './helpers';
import { GRID_OPTIONS } from './constants';
import styles from './index.module.css';

export const BuildSummaryComponent = ({ schema, summaryData }) => {
  const data = formatBuild(summaryData, schema);
  return (
    <div className={classNames(styles.table, 'ag-theme-material')}>
      <AgGridReact {...GRID_OPTIONS} rowData={data} />
    </div>
  );
};

const stateToProps = state => ({
  schema: buildSchemaSelector(state),
});

export default connect(stateToProps)(BuildSummaryComponent);

BuildSummaryComponent.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  summaryData: PropTypes.object.isRequired,
};
