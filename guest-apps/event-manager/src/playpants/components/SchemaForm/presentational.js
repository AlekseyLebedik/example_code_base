import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import styles from './index.module.css';

const SchemaFormStateless = ({ gridOptions, needsUpdate, onVersionUpdate }) => (
  <>
    {needsUpdate && (
      <ConfirmActionComponent
        tooltip="Update Schema Version"
        confirm={{
          title: 'Confirm Version Update',
          confirmMsg:
            'This schema has been updated. Please update the input settings for this activity to unlock it. Any dropped input types from the previous version will be archived.',
          mainButtonLabel: 'Update',
          confirmOpen: true,
        }}
        component="IconButton"
        onClick={onVersionUpdate}
        color="secondary"
        className={styles.warningButton}
      >
        warning
      </ConfirmActionComponent>
    )}
    <div className={styles.gridContainer}>
      <div className={classNames(styles.table, 'ag-theme-material')}>
        <AgGridReact {...gridOptions} />
      </div>
    </div>
  </>
);

SchemaFormStateless.propTypes = {
  gridOptions: PropTypes.object.isRequired,
  needsUpdate: PropTypes.bool.isRequired,
  onVersionUpdate: PropTypes.func.isRequired,
};

export default SchemaFormStateless;
