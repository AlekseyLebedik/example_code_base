import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import UserLink from 'dw/online-configuration/components/UserLink';
import KeyValue from 'dw/core/components/KeyValue';
import { STORAGE_DELETE_USER_CONTEXT_FILES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import UserContextStorageDetailsEmpty from '../UserContextStorageDetailsEmpty';

const UserContextStorageDetails = props => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const {
    selectedFile,
    deleteFileHandler,
    downloadFileHandler,
    elementsOrder,
  } = props;
  const newElementsOrder = elementsOrder.map(column => {
    switch (column) {
      case 'userID':
        return {
          name: 'userID',
          key: column,
          formatter: userId => <UserLink userId={userId} />,
        };
      default:
        return column;
    }
  });

  const Actions = () => (
    <>
      <Tooltip title="Download">
        <IconButton
          color="inherit"
          onClick={() =>
            downloadFileHandler({
              fileID: selectedFile.fileID,
              fileName: selectedFile.fileName,
              userID: selectedFile.userID,
              context: selectedFile.context,
              accountType: selectedFile.accountType,
            })
          }
        >
          <Icon>file_download</Icon>
        </IconButton>
      </Tooltip>
      <CheckPermission
        predicate={STORAGE_DELETE_USER_CONTEXT_FILES}
        object={`titleenv.${currentEnv.id}`}
      >
        <ConfirmActionComponent
          component="IconButton"
          container="details"
          tooltip="Delete"
          onClick={() =>
            deleteFileHandler({
              fileID: selectedFile.fileID,
              fileName: selectedFile.fileName,
              userID: selectedFile.userID,
              context: selectedFile.context,
              accountType: selectedFile.accountType,
            })
          }
          confirm={{
            confirmMsg: 'Are you sure you want to delete this file?',
            title: 'Confirm Delete',
            mainButtonLabel: 'Delete',
            destructive: true,
          }}
          color="inherit"
        >
          delete
        </ConfirmActionComponent>
      </CheckPermission>
    </>
  );
  const Maincomponent = () => (
    <div className="details__container flex-rows-container">
      <SectionTitle title={`${selectedFile.fileName}`}>
        {Actions()}
      </SectionTitle>
      <div className="scrollable-content">
        <KeyValue
          item={selectedFile}
          elementsOrder={newElementsOrder}
          size={4}
        />
      </div>
    </div>
  );

  return !selectedFile ? <UserContextStorageDetailsEmpty /> : Maincomponent();
};
UserContextStorageDetails.propTypes = {
  selectedFile: PropTypes.object,
  deleteFileHandler: PropTypes.func.isRequired,
  downloadFileHandler: PropTypes.func.isRequired,
  elementsOrder: PropTypes.arrayOf(PropTypes.string),
};
UserContextStorageDetails.defaultProps = {
  selectedFile: undefined,
  elementsOrder: [],
};

export default UserContextStorageDetails;
