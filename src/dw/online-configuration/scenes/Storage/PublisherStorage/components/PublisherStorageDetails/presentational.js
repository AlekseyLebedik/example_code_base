import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import KeyValue from 'dw/core/components/KeyValue';
import { STORAGE_ADD_PUBLISHER_FILES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import PublisherStorageDetailsEmpty from '../PublisherStorageDetailsEmpty';

import './presentational.css';

const PublisherStorageDetails = props => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { selectedFile, deleteFileHandler, downloadFileHandler } = props;
  const elementsOrder = props.elementsOrder.map(column => {
    if (column !== 'fileSize') {
      return column;
    }
    return {
      name: column,
      key: column,
      formatter: fileSize => <div>{fileSize} bytes</div>,
    };
  });

  const Actions = () => (
    <>
      <Tooltip title="Download">
        <IconButton
          color="inherit"
          onClick={() => downloadFileHandler(selectedFile.fileID)}
        >
          <Icon>file_download</Icon>
        </IconButton>
      </Tooltip>
      <ConfirmActionComponent
        component="IconButton"
        container="details"
        tooltip="Delete"
        onClick={() => deleteFileHandler(selectedFile.fileID)}
        confirm={{
          title: 'Confirm Delete',
          confirmMsg: 'Are you sure you want to delete this file?',
          mainButtonLabel: 'Delete',
          destructive: true,
        }}
        color="inherit"
      >
        delete
      </ConfirmActionComponent>
    </>
  );
  const Maincomponent = () => (
    <div className="details__container publisher-storage flex-rows-container">
      <SectionTitle title={`${selectedFile.fileName}`}>
        <CheckPermission
          predicate={STORAGE_ADD_PUBLISHER_FILES}
          object={`titleenv.${currentEnv.id}`}
        >
          {Actions()}
        </CheckPermission>
      </SectionTitle>
      <div className="scrollable-content">
        <KeyValue item={selectedFile} elementsOrder={elementsOrder} size={4} />
      </div>
    </div>
  );

  return !selectedFile ? <PublisherStorageDetailsEmpty /> : Maincomponent();
};
PublisherStorageDetails.propTypes = {
  selectedFile: PropTypes.object,
  deleteFileHandler: PropTypes.func.isRequired,
  downloadFileHandler: PropTypes.func.isRequired,
  elementsOrder: PropTypes.arrayOf(PropTypes.string),
};
PublisherStorageDetails.defaultProps = {
  selectedFile: undefined,
  elementsOrder: [],
};

export default PublisherStorageDetails;
