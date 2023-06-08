import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import IconButton from 'dw/core/components/IconButton';
import ContrastInput from 'dw/core/components/FormFields/ContrastInput';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import {
  OBJECT_STORE_ADD_OBJECTS,
  OBJECT_STORE_DELETE_OBJECTS,
  OBJECT_STORE_PROPAGATE_OBJECTS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import ObjectsTable from 'dw/core/components/ObjectStore/ObjectsTable';
import UploadAction from 'dw/core/components/ObjectStore/UploadAction';
import PropagateAction from 'dw/core/components/ObjectStore/PropagateAction';
import AddCategory from './components/AddCategory';
import UploadProgress from './components/UploadProgress';
import styles from './presentational.module.css';

const PublisherObjectsStatelessIW = ({
  categories,
  dataFormatter,
  formatDateTime,
  groups,
  loading,
  mergedData,
  onDeleteSelectedObjects,
  onDownload,
  onFilterChanged,
  onFilterTextBoxChange,
  onGridReady,
  onLoadData,
  onMultiObjectDownload,
  onPropagateObjects,
  onPropagateSubmitSuccess,
  onSelect,
  onUploadFile,
  promotePubGroups,
  publisherObjectUrl,
  refreshKey,
  refreshTable,
  selectedRows,
}) => {
  const hasSelectedRows = selectedRows.length > 0;
  const hasAddPermission = useCurrentEnvPermission(OBJECT_STORE_ADD_OBJECTS);
  const hasDeletePermission = useCurrentEnvPermission(
    OBJECT_STORE_DELETE_OBJECTS
  );
  const hasPropagatePermission = useCurrentEnvPermission(
    OBJECT_STORE_PROPAGATE_OBJECTS
  );
  return (
    <div className={styles.publisherObjectsPresentational}>
      {loading && (
        <div className={styles.publisherObjectsLinearProgress}>
          <LinearProgress className="progress" mode="indeterminate" />
        </div>
      )}
      <SectionTitle
        extraContent={
          <>
            <ContrastInput
              disabled={loading}
              label="Search Objects..."
              name="filename-lookup"
              onChange={ev => onFilterTextBoxChange(ev.target.value)}
              className={styles.input}
              InputProps={{
                inputProps: {
                  'data-cy': 'filename-lookup',
                },
              }}
            />

            {hasAddPermission && <AddCategory />}
          </>
        }
      >
        {hasPropagatePermission && (
          <FeatureSwitchesCheck
            featureSwitches={[fs.OBJECT_STORE_PROPAGATE_OBJECTS]}
            isStaffAllowed={false}
          >
            <PropagateAction
              onPropagateAction={onPropagateObjects}
              selectedRows={selectedRows}
              onPropagateSubmitSuccess={onPropagateSubmitSuccess}
            />
          </FeatureSwitchesCheck>
        )}
        {hasAddPermission && (
          <UploadAction
            onUploadFile={values => {
              const allObjects = true;
              const displayProgress = true;
              onUploadFile(values, allObjects, displayProgress);
            }}
            groups={groups}
            categories={categories}
          />
        )}
        <FeatureSwitchesCheck
          featureSwitches={[fs.PUBLISHER_OBJECTS_MULTI_DOWNLOAD]}
          isStaffAllowed={false}
        >
          <IconButton
            color="inherit"
            disabled={!hasSelectedRows}
            icon="file_download"
            onClick={onMultiObjectDownload}
            tooltip="Download Selected"
          />
        </FeatureSwitchesCheck>
        {hasDeletePermission && (
          <ConfirmActionComponent
            component="IconButton"
            color="inherit"
            tooltipProps={
              hasSelectedRows
                ? {
                    title: 'Delete Selected',
                    placement: 'bottom',
                  }
                : null
            }
            onClick={onDeleteSelectedObjects}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg:
                'Are you sure you want to delete the selected objects?',
              mainButtonLabel: 'Delete',
              destructive: true,
              'data-cy': 'confirmDeleteButon',
            }}
            disabled={!hasSelectedRows}
            data-cy="deleteButton"
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <ObjectsTable
        objects={mergedData}
        allObjectsCheck
        publisherObjectUrl={publisherObjectUrl}
        promotePubGroups={promotePubGroups}
        onDownload={onDownload}
        onGridReady={onGridReady}
        onFilterChanged={onFilterChanged}
        hasDeletePermission={hasDeletePermission}
        formatDateTime={formatDateTime}
        onSelectionChanged={onSelect}
        onLoadData={onLoadData}
        dataFormatter={dataFormatter}
        useQuickFilter={false}
        dataCy="publisherObjectsTable"
        key={refreshKey}
      />
      <UploadProgress successCallback={refreshTable} />
    </div>
  );
};

PublisherObjectsStatelessIW.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataFormatter: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  mergedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteSelectedObjects: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onFilterChanged: PropTypes.func,
  onFilterTextBoxChange: PropTypes.func,
  onGridReady: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  onMultiObjectDownload: PropTypes.func.isRequired,
  onPropagateObjects: PropTypes.func.isRequired,
  onPropagateSubmitSuccess: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  promotePubGroups: PropTypes.func.isRequired,
  refreshTable: PropTypes.func.isRequired,
  selectedRows: PropTypes.array,
  refreshKey: PropTypes.string,
  publisherObjectUrl: PropTypes.string,
};

PublisherObjectsStatelessIW.defaultProps = {
  onGridReady: null,
  onFilterChanged: null,
  onFilterTextBoxChange: null,
  selectedRows: [],
  groups: undefined,
  refreshKey: undefined,
  publisherObjectUrl: undefined,
};

export default PublisherObjectsStatelessIW;
