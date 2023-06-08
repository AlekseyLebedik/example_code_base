import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import UserAutoComplete from 'dw/online-configuration/components/UserAutoComplete';
import NextPageButton from 'dw/core/components/NextPageButton';
import CloneLoading from 'dw/core/components/BackdropLoading';
import {
  OBJECT_STORE_ADD_OBJECTS,
  OBJECT_STORE_DELETE_OBJECTS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import UploadAction from './components/UploadAction';
import CloneAction from './components/CloneAction';
import ObjectsTable from './components/ObjectsTable';

import withUserObjectsContext from '../UserObjectsHOC';

import './index.css';

const UserObjectsStateless = ({
  formatDateTime,
  nextPageToken,
  onDeleteObjects,
  onDownload,
  onGridReady,
  onRestore,
  onSelect,
  onSelectionChanged,
  onShowMore,
  onUploadFile,
  selectedRowKeys,
  userId,
  userObjects,
}) => {
  const [cloneLoading, setCloneLoading] = useState(false);
  const hasAddPermission = useCurrentEnvPermission(OBJECT_STORE_ADD_OBJECTS);
  const hasDeletePermission = useCurrentEnvPermission(
    OBJECT_STORE_DELETE_OBJECTS
  );

  return (
    <section className="object-store-user main-container flex-rows-container">
      <CloneLoading open={cloneLoading} />
      <SectionTitle
        extraContent={
          <div className="extra-content-wrapper">
            <UserAutoComplete
              defaultValue={userId}
              onChange={onSelect}
              isClearable={false}
              variant="box"
              size="normal"
              placeholder="Enter User ID | Username"
            />
          </div>
        }
      >
        {hasAddPermission && userId && (
          <CloneAction setCloneLoading={setCloneLoading} playerId={userId} />
        )}
        {hasAddPermission && <UploadAction onUploadFile={onUploadFile} />}
        {hasDeletePermission && userObjects.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            tooltipProps={
              selectedRowKeys.length > 0
                ? { title: 'Delete Selected', placement: 'bottom' }
                : null
            }
            onClick={onDeleteObjects}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg: `Are you sure you want to delete the selected objects for user ${userId}?`,
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            color="inherit"
            disabled={selectedRowKeys.length === 0}
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <div className="scrollable-content with-inner-padding">
        {userObjects.length === 0 ? (
          <div className="empty">No data to display</div>
        ) : (
          <>
            <ObjectsTable
              objects={userObjects}
              onDownload={onDownload}
              hasDeletePermission={hasDeletePermission}
              formatDateTime={formatDateTime}
              onGridReady={onGridReady}
              onSelectionChanged={onSelectionChanged}
              onRestore={onRestore}
            />
            {nextPageToken !== null && (
              <NextPageButton onClick={onShowMore} nextPageToken />
            )}
          </>
        )}
      </div>
    </section>
  );
};

UserObjectsStateless.propTypes = {
  formatDateTime: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
  onDeleteObjects: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  userObjects: PropTypes.arrayOf(PropTypes.object),
};

UserObjectsStateless.defaultProps = {
  nextPageToken: undefined,
  selectedRowKeys: [],
  userId: '',
  userObjects: [],
};

export default withUserObjectsContext('UserObjects')(UserObjectsStateless);
