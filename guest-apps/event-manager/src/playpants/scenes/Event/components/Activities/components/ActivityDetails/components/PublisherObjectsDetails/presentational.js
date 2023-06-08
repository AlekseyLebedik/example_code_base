import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import LoadingComponent from 'dw/core/components/Loading';
import ObjectsTable from 'dw/core/components/ObjectStore/ObjectsTable';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import {
  NO_TITLE_SELECTED,
  NO_CONTEXT_SELECTED,
} from 'playpants/scenes/Event/components/Activities/constants';

import ActivityTitle from '../ActivityTitle';
import CustomTitleComponents from './components/CustomTitleComponents';

import styles from './index.module.css';

const StatelessPublisherObjects = ({
  categories,
  classes,
  dataFormatter,
  deleteSelected,
  disabled,
  envType,
  formatDateTime,
  groups,
  isServiceConfigured,
  loading,
  noContextSelected,
  noTitleSelected,
  onDownload,
  onGridReady,
  onLoadData,
  onSelect,
  onUpload,
  refreshKey,
  selectedRows,
  selectedTitleId,
  showContext,
}) => (
  <>
    <ActivityTitle
      {...(!disabled && selectedTitleId
        ? {
            customComponent: (
              <CustomTitleComponents
                categories={categories}
                deleteSelected={deleteSelected}
                disabled={disabled}
                groups={groups}
                onUpload={onUpload}
                selectedRows={selectedRows}
                disabledUploadAction={
                  disabled || (showContext && noContextSelected)
                }
              />
            ),
          }
        : {})}
    />
    {noTitleSelected ||
    (showContext && isServiceConfigured && noContextSelected) ? (
      <MainDetailsEmpty
        msg={noTitleSelected ? NO_TITLE_SELECTED : NO_CONTEXT_SELECTED}
      />
    ) : (
      <div className={classes.activityContainer}>
        <div className="scrollable-content with-inner-padding">
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className={styles.objectsTableContainer}>
              <Suspense fallback={<LoadingComponent />}>
                <ObjectsTable
                  dataFormatter={dataFormatter}
                  formatDateTime={formatDateTime}
                  hasDeletePermission
                  key={refreshKey}
                  onDownload={onDownload}
                  onGridReady={onGridReady}
                  onLoadData={onLoadData}
                  onSelectionChanged={onSelect}
                  publisherObjectUrl={`/online-configuration/${selectedTitleId}/${envType}/`}
                  useQuickFilter={false}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    )}
  </>
);

StatelessPublisherObjects.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object.isRequired,
  dataFormatter: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  envType: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  isServiceConfigured: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  noContextSelected: PropTypes.bool.isRequired,
  noTitleSelected: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  refreshKey: PropTypes.number,
  selectedRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTitleId: PropTypes.number,
  showContext: PropTypes.bool.isRequired,
};
StatelessPublisherObjects.defaultProps = {
  refreshKey: null,
  selectedTitleId: null,
};

export default StatelessPublisherObjects;
