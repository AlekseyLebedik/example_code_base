import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import AsyncAGGrid from './components/AsyncAGGrid';

import styles from './presentational.module.css';

const AGGridPresentational = ({
  async,
  asyncGridProps,
  className,
  dataCy,
  gridOptions,
  hardRefresh,
  nonAsyncGridProps,
  ...props
}) =>
  !hardRefresh ? (
    <div
      className={classNames(
        styles.agGridLayout,
        styles.agGridContainer,
        className
      )}
      data-cy={dataCy}
    >
      {async ? (
        <AsyncAGGrid
          {...asyncGridProps}
          {...props}
          className={className}
          dataCy={dataCy}
          gridOptions={gridOptions}
        />
      ) : (
        <AgGridReact {...gridOptions} {...nonAsyncGridProps} {...props} />
      )}
    </div>
  ) : null;

AGGridPresentational.propTypes = {
  async: PropTypes.bool.isRequired,
  asyncGridProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  dataCy: PropTypes.string,
  gridOptions: PropTypes.object.isRequired,
  hardRefresh: PropTypes.bool.isRequired,
  nonAsyncGridProps: PropTypes.object.isRequired,
};
AGGridPresentational.defaultProps = {
  className: null,
  dataCy: null,
};

export default AGGridPresentational;
