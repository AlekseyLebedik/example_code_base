import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from 'dw/core/components/SectionTitle';
import UserLink from 'dw/online-configuration/components/UserLink';
import KeyValue from 'dw/core/components/KeyValue';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { STORAGE_DELETE_CONTENT_SERVER_FILES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import UserFileDetailsEmpty from '../UserFileDetailsEmpty';

import './presentational.css';

const UserFileDetails = props => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { selectedUserFile, elementsOrder } = props.reduxProps;
  if (!selectedUserFile) return <UserFileDetailsEmpty />;
  const newElementsOrder = elementsOrder.map(column => {
    switch (column) {
      case 'ownerID':
        return {
          name: 'ownerID',
          key: column,
          formatter: userId => <UserLink userId={userId} />,
        };
      default:
        return column;
    }
  });
  return (
    <div className="details__container user-files flex-rows-container">
      <SectionTitle
        title={`${selectedUserFile.fileID} ${selectedUserFile.fileName}`}
      >
        <Tooltip title="Download">
          <IconButton
            color="inherit"
            onClick={() =>
              props.downloadUserFileHandler(selectedUserFile.fileID)
            }
          >
            <Icon>file_download</Icon>
          </IconButton>
        </Tooltip>
        <CheckPermission
          predicate={STORAGE_DELETE_CONTENT_SERVER_FILES}
          object={`titleenv.${currentEnv.id}`}
        >
          <ConfirmActionComponent
            container="details"
            component="IconButton"
            tooltip="Delete"
            onClick={() => props.deleteUserFileHandler(selectedUserFile.fileID)}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg: 'Are you sure you want to delete selected User File?',
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            color="inherit"
          >
            delete
          </ConfirmActionComponent>
        </CheckPermission>
      </SectionTitle>
      <div className="scrollable-content">
        <KeyValue
          item={selectedUserFile}
          elementsOrder={newElementsOrder}
          size={4}
        />
      </div>
    </div>
  );
};
UserFileDetails.propTypes = {
  reduxProps: PropTypes.shape({
    selectedUserFile: PropTypes.object,
    elementsOrder: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  downloadUserFileHandler: PropTypes.func.isRequired,
  deleteUserFileHandler: PropTypes.func.isRequired,
};

export default UserFileDetails;
