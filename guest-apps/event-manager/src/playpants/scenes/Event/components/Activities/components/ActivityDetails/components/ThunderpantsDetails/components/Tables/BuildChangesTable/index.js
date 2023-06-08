import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import * as helpers from './helpers';
import { GRID_OPTIONS } from './constants';
import * as styles from './index.module.css';

export const BuildChangesTableBase = ({ buildList, scheduledBuilds }) => {
  const gridOptions = {
    ...GRID_OPTIONS,
    rowData: helpers.parseBuildDifferences(buildList, scheduledBuilds),
  };
  return (
    <div className={classNames(styles.buildChangesTable, 'ag-theme-material')}>
      <AgGridReact {...gridOptions} />
    </div>
  );
};

BuildChangesTableBase.propTypes = {
  buildList: PropTypes.arrayOf(PropTypes.object).isRequired,
  scheduledBuilds: PropTypes.object,
};

BuildChangesTableBase.defaultProps = {
  scheduledBuilds: {},
};

export default BuildChangesTableBase;
