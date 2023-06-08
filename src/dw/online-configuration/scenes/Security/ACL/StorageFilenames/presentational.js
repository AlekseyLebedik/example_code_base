import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import {
  SECURITY_DELETE_STORAGE_FILENAMES,
  SECURITY_ADD_ACL_STORAGE_FILENAMES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import AddFilenameModal from './components/AddFilenameModal';

import { COLUMNS } from './constants';

const StorageFilenamesStateless = ({
  reduxProps: { storageFilenames, deleteFilename, selectedRowKeys },
  addFilenameModalProps: {
    addFilenameModalVisible,
    openAddFilenameModalHandler,
    closeAddFilenameModalHandler,
    addOnRemoteSubmit,
    onAddFilenameHandler,
  },
}) => {
  const [loadingPermission, , result] = useCurrentEnvPermission(
    [SECURITY_DELETE_STORAGE_FILENAMES, SECURITY_ADD_ACL_STORAGE_FILENAMES],
    false
  );
  const hasDeletePermission = result?.data?.[SECURITY_DELETE_STORAGE_FILENAMES];
  const hasAddPermission = result?.data?.[SECURITY_ADD_ACL_STORAGE_FILENAMES];
  const empty = <div className="empty">No data to display</div>;

  const renderTable = () => {
    const deleteProps = hasDeletePermission
      ? {
          getKey: k => k.id,
          className: 'with-permissions',
          actions: [
            {
              iconName: 'delete',
              label: 'Delete Selected',
            },
          ],
          hideActions: true,
        }
      : {};
    return <Table data={storageFilenames} columns={COLUMNS} {...deleteProps} />;
  };

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="main-container storage-filenames flex-rows-container">
      <SectionTitle>
        {hasAddPermission && (
          <>
            <AddFilenameModal
              visible={addFilenameModalVisible}
              onCancel={closeAddFilenameModalHandler}
              onRemoteSubmit={addOnRemoteSubmit}
              onSubmit={onAddFilenameHandler}
            />
            <Tooltip title="Add Filename" placement="bottom">
              <IconButton
                color="inherit"
                onClick={() => openAddFilenameModalHandler()}
              >
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          </>
        )}
        {hasDeletePermission && storageFilenames.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            tooltipProps={
              selectedRowKeys.length > 0
                ? { title: 'Delete Selected', placement: 'bottom' }
                : null
            }
            onClick={() => deleteFilename(selectedRowKeys)}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg: 'Are you sure you want to delete this filename(s)?',
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            disabled={selectedRowKeys.length === 0}
            color="inherit"
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <div className="scrollable-content with-inner-padding">
        {storageFilenames.length !== 0 ? renderTable() : empty}
      </div>
    </section>
  );
};

StorageFilenamesStateless.propTypes = {
  reduxProps: PropTypes.shape({
    storageFilenames: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    ),
    deleteFilename: PropTypes.func,
    selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  addFilenameModalProps: PropTypes.shape({
    addFilenameModalVisible: PropTypes.bool,
    openAddFilenameModalHandler: PropTypes.func,
    closeAddFilenameModalHandler: PropTypes.func,
    addOnRemoteSubmit: PropTypes.func,
    onAddFilenameHandler: PropTypes.func,
  }).isRequired,
};

export default StorageFilenamesStateless;
