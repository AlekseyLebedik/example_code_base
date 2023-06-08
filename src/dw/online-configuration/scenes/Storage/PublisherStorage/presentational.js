import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import {
  STORAGE_ADD_PUBLISHER_FILES,
  STORAGE_DELETE_PUBLISHER_FILES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import ModalForm from 'dw/core/components/ModalForm';

import PublisherStorageDetails from './components/PublisherStorageDetails';
import PublisherStorageDetailsEmpty from './components/PublisherStorageDetailsEmpty';
import PublisherStorageListItem from './components/PublisherStorageListItem';
import AddFileForm from './components/AddFileForm';
import { FORM_NAME as ADD_FILE_FORM_NAME } from './components/AddFileForm/constants';
import { UPLOAD_FILE_MODAL_TITLE } from './constants';

function getRenderItemFunc(onSelectItem) {
  return (item, renderCheckbox) => (
    <PublisherStorageListItem
      key={`${item.fileID}-${item.fileChecksum}`}
      {...item}
      onClick={() => onSelectItem(item)}
      renderCheckbox={renderCheckbox}
    />
  );
}

function PublisherStorageStateless(props) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const {
    entries,
    nextPageToken,
    q,
    selectedFile,
    elementsOrder,
    onClickListItem,
    onShowMore,
    onBulkDelete,
    onBulkDownload,
  } = props.reduxProps;
  const { onSearch } = props.reactProps;
  const {
    uploadFileModalVisible,
    openUploadFileModalHandler,
    closeUploadFileModalHandler,
    onUploadFileHandler,
  } = props.uploadFileModalProps;

  const mainTitle = 'Publisher Storage';
  const showMore = nextPageToken !== null;

  const uploadFile = () => (
    <div className="upload-file">
      <ModalForm
        visible={uploadFileModalVisible}
        onCancel={closeUploadFileModalHandler}
        formName={ADD_FILE_FORM_NAME}
        FormComponent={AddFileForm}
        title={UPLOAD_FILE_MODAL_TITLE}
        submittingText="Uploading..."
        submitText="Upload"
        dialogContentStyle={{ width: '500px' }}
        externalSubmit={onUploadFileHandler}
      />
      <Tooltip title="Upload File" placement="bottom">
        <IconButton onClick={() => openUploadFileModalHandler()}>
          <Icon>file_upload</Icon>
        </IconButton>
      </Tooltip>
    </div>
  );

  const commonListProps = () => ({
    initialValue: q,
    onSearch,
    placeholder: 'Filename | Checksum | FileID',
    items: entries,
    showMore,
    onShowMore: () => onShowMore(nextPageToken, q),
  });

  const withoutPermissionsList = actions => (
    <SearchableList
      {...commonListProps()}
      toRenderFunc={getRenderItemFunc(item => {
        onClickListItem(item);
        actions.onSelectItem(item.fileID);
      })}
    />
  );

  const withPermissionsList = actions => (
    <SearchableList
      {...commonListProps()}
      toRenderFunc={getRenderItemFunc(item => {
        onClickListItem(item);
        actions.onSelectItem(item.fileID);
      })}
      getItemKey={item => item.fileID}
      actions={[
        {
          iconName: 'file_download',
          label: 'Download Selected',
          handler: items => {
            onBulkDownload(items);
          },
        },
        {
          iconName: 'delete',
          label: 'Delete Selected',
          handler: items => {
            onBulkDelete(items);
          },
          confirm: {
            title: 'Delete confirmation',
            confirmMsg: 'Are you sure you want to delete selected files?',
            mainButtonLabel: 'Delete',
            destructive: true,
          },
          cleanAfterExecute: true,
        },
      ]}
    />
  );

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle title={mainTitle} shown={entries.length} color="default">
        <CheckPermission
          predicate={STORAGE_ADD_PUBLISHER_FILES}
          object={`titleenv.${currentEnv.id}`}
        >
          {uploadFile()}
        </CheckPermission>
      </SectionTitle>

      <CheckPermission
        predicate={STORAGE_DELETE_PUBLISHER_FILES}
        object={`titleenv.${currentEnv.id}`}
        noPermissionsComponent={() => withoutPermissionsList(actions)}
      >
        {withPermissionsList(actions)}
      </CheckPermission>
    </div>
  );

  const renderDetail = () => (
    <PublisherStorageDetails
      selectedFile={selectedFile}
      elementsOrder={elementsOrder}
    />
  );

  const renderEmpty = () => <PublisherStorageDetailsEmpty />;

  return (
    <section className="publisher-storage">
      <div className="publisher-storage-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}
PublisherStorageStateless.propTypes = {
  reduxProps: PropTypes.shape({
    entries: PropTypes.array.isRequired,
    nextPageToken: PropTypes.string,
    q: PropTypes.string,
    onClickListItem: PropTypes.func.isRequired,
    onBulkDelete: PropTypes.func.isRequired,
    onBulkDownload: PropTypes.func.isRequired,
    onShowMore: PropTypes.func.isRequired,
    selectedFile: PropTypes.object,
    elementsOrder: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  reactProps: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
  }).isRequired,
  uploadFileModalProps: PropTypes.shape({
    uploadFileModalVisible: PropTypes.bool,
    openUploadFileModalHandler: PropTypes.func.isRequired,
    closeUploadFileModalHandler: PropTypes.func.isRequired,
    onUploadFileHandler: PropTypes.func.isRequired,
  }).isRequired,
};

export default PublisherStorageStateless;
