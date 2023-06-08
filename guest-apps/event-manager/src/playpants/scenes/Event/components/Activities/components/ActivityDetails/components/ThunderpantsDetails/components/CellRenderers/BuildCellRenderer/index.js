import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import startCase from 'lodash/startCase';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import Button from '@material-ui/core/Button';

import { GRID_OPTIONS, COLUMNS } from './constants';
import * as styles from './index.module.css';

export const BuildCellRendererComponent = props => {
  const {
    buildOptionProps,
    classes,
    context: { targetList },
    data,
    disabled,
    handleDeploy,
    userParamsSchema,
  } = props;
  const getRowClass = ({ data: { type } }) =>
    classes[`tpantsRow${startCase(type)}`];
  const cellRendererParams = {
    ...buildOptionProps,
    buildData: data,
    disabled,
  };
  const gridOptions = {
    ...GRID_OPTIONS,
    columnDefs: COLUMNS(cellRendererParams, userParamsSchema),
    getRowClass,
    rowData: data.deployments,
  };

  const renderAddTrigger = () => (
    <Button
      data-cy="addDeploymentBtn"
      className={styles.addDeploymentButton}
      color="primary"
      disabled={disabled}
      onClick={() =>
        handleDeploy({ data, targets: targetList, userParamsSchema })
      }
      size="small"
      variant="contained"
    >
      Add Deployment
    </Button>
  );

  return (
    <>
      <div
        className={classNames(styles.fullWidthPanel, 'ag-theme-material')}
        data-cy="buildCellTable"
      >
        <AgGridReact {...gridOptions} />
      </div>
      <div className={styles.buttonContainer}>{renderAddTrigger()}</div>
    </>
  );
};

BuildCellRendererComponent.propTypes = {
  buildOptionProps: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  context: PropTypes.shape({
    targetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  data: PropTypes.object.isRequired,
  deploymentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  handleDeploy: PropTypes.func.isRequired,
  scheduled: PropTypes.object.isRequired,
  userParamsSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BuildCellRendererComponent;
