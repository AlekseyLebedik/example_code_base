import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';

import SelectField from 'dw/core/components/Select';
import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { STORAGE_ADD_USER_CONTEXT_FILES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import { ACCOUNT_TYPES } from 'dw/online-configuration/scenes/constants';
import ModalForm from 'dw/core/components/ModalForm';

import UserContextStorageDetails from './components/UserContextStorageDetails';
import UserContextStorageDetailsEmpty from './components/UserContextStorageDetailsEmpty';
import UserContextStorageListItem from './components/UserContextStorageListItem';
import AddFileForm from './components/AddFileForm';
import { FORM_NAME as ADD_FILE_FORM_NAME } from './components/AddFileForm/constants';
import { UPLOAD_FILE_MODAL_TITLE } from './constants';

import './presentational.css';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <UserContextStorageListItem
      key={`${item.fileID}-${item.fileChecksum}`}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function UserContextStorageStateless(props) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const {
    entries,
    userId,
    selectedFile,
    elementsOrder,
    onClickListItem,
    context,
    accountType,
    onAccountTypeChange,
    onContextChange,
    getItemBaseUrl,
  } = props.reduxProps;
  const { onSearch } = props.reactProps;
  const {
    uploadFileModalVisible,
    openUploadFileModalHandler,
    closeUploadFileModalHandler,
    onUploadFileHandler,
  } = props.uploadFileModalProps;

  const mainTitle = 'User Context';

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle title={mainTitle} shown={entries.length} color="default">
        <CheckPermission
          predicate={STORAGE_ADD_USER_CONTEXT_FILES}
          object={`titleenv.${currentEnv.id}`}
        >
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
        </CheckPermission>
      </SectionTitle>
      <div>
        <div className="context-account-type__container">
          <SelectField
            id="context"
            className="context"
            placeholder="Context"
            value={context}
            onChange={onContextChange}
          >
            {props.reduxProps.contextsList.map(ctx => (
              <MenuItem key={`context-${ctx}`} value={ctx}>
                {ctx}
              </MenuItem>
            ))}
          </SelectField>
          <SelectField
            id="accountType"
            className="account-type"
            placeholder="Account Type"
            value={accountType}
            onChange={onAccountTypeChange}
          >
            <MenuItem key="account-type" value="" />
            {ACCOUNT_TYPES.map(a => (
              <MenuItem key={`account-type-${a.value}`} value={a.value}>
                {a.label}
              </MenuItem>
            ))}
          </SelectField>
        </div>
      </div>

      <SearchableList
        initialValue={userId}
        onSearch={onSearch}
        placeholder="UserID"
        items={entries}
        toRenderFunc={getRenderItemFunc(item => {
          actions.onSelectItem(item.fileID, getItemBaseUrl(item));
          onClickListItem(item);
        })}
        showMore={false}
      />
    </div>
  );

  const renderDetail = ({ detailExpanded, actions }) => (
    <UserContextStorageDetails
      selectedFile={selectedFile}
      elementsOrder={elementsOrder}
      expanded={detailExpanded}
      onClickExpand={actions.onExpandDetail}
    />
  );

  const renderEmpty = () => <UserContextStorageDetailsEmpty />;

  return (
    <section className="publisher-storage">
      <div className="publisher-storage-main-container">
        <MasterDetail
          baseUrl={selectedFile && getItemBaseUrl(selectedFile)}
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}
UserContextStorageStateless.propTypes = {
  reduxProps: PropTypes.object.isRequired,
  reactProps: PropTypes.object.isRequired,
  uploadFileModalProps: PropTypes.object.isRequired,
};
UserContextStorageStateless.defaultProps = {};

export default UserContextStorageStateless;
