import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { STORAGE_ADD_CONTENT_SERVER_FILES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import ModalForm from 'dw/core/components/ModalForm';

import PooledFileDetails from './components/PooledFileDetails';
import PooledFileDetailsEmpty from './components/PooledFileDetailsEmpty';
import PooledFileListItem from './components/PooledFileListItem';
import AddFileForm from './components/AddFileForm';
import { FORM_NAME as ADD_FILE_FORM_NAME } from './components/AddFileForm/constants';
import { UPLOAD_USER_FILE_MODAL_TITLE } from './constants';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <PooledFileListItem
      key={item.fileID}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

const renderDetail = () => <PooledFileDetails />;

const renderEmpty = () => <PooledFileDetailsEmpty />;

const OpenModalComponent = ({ onClick }) => (
  <Tooltip title="Upload File" placement="bottom">
    <IconButton onClick={() => onClick()}>
      <Icon>file_upload</Icon>
    </IconButton>
  </Tooltip>
);
OpenModalComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function PooledFilesStateless(props) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { pooledFiles, nextPageToken, q, onClickListItem, onShowMore } =
    props.reduxProps;
  const { onSearch } = props.reactProps;
  const {
    uploadFileModalVisible,
    openUploadFileModalHandler,
    closeUploadFileModalHandler,
    onUploadFileHandler,
  } = props.uploadFileModalProps;

  const showMore = nextPageToken !== null;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        title="Pooled Files"
        shown={pooledFiles.length}
        color="default"
      >
        <CheckPermission
          predicate={STORAGE_ADD_CONTENT_SERVER_FILES}
          object={`titleenv.${currentEnv.id}`}
        >
          <ModalForm
            visible={uploadFileModalVisible}
            onCancel={closeUploadFileModalHandler}
            formName={ADD_FILE_FORM_NAME}
            FormComponent={AddFileForm}
            OpenModalComponent={OpenModalComponent}
            openModal={openUploadFileModalHandler}
            title={UPLOAD_USER_FILE_MODAL_TITLE}
            submittingText="Uploading..."
            submitText="Upload"
            dialogContentStyle={{ width: '500px' }}
            externalSubmit={onUploadFileHandler}
          />
        </CheckPermission>
      </SectionTitle>

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="FileID"
        items={pooledFiles}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.fileID);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
      />
    </div>
  );

  return (
    <section className="pooled-files">
      <div className="pooled-files-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

PooledFilesStateless.propTypes = {
  reduxProps: PropTypes.shape({
    pooledFiles: PropTypes.array.isRequired,
    nextPageToken: PropTypes.string,
    q: PropTypes.string,
    onClickListItem: PropTypes.func.isRequired,
    onShowMore: PropTypes.func.isRequired,
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

export default PooledFilesStateless;
