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

import { formatFileSize } from 'dw/core/helpers/formatters';

import PooledFileDetailsEmpty from '../PooledFileDetailsEmpty';

const PooledFileDetails = props => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { selectedPooledFile } = props.reduxProps;
  if (!selectedPooledFile) return <PooledFileDetailsEmpty />;
  const {
    downloadPooledFileHandler,
    deletePooledFileHandler,
    downloadSummaryFileHandler,
    deleteSummaryFileHandler,
  } = props;
  const elementsOrder = props.reduxProps.elementsOrder.map(column => {
    switch (column) {
      case 'uploadedBy':
        return {
          name: 'uploadedBy',
          key: column,
          formatter: userId => <UserLink userId={userId} />,
        };
      case 'summaryFileSize':
        return {
          name: 'summaryFile',
          key: column,
          formatter: fileSize => {
            if (parseInt(fileSize, 10)) {
              return (
                <div className="flex items-center">
                  {formatFileSize(fileSize)}
                  &nbsp;
                  <Tooltip title="Download">
                    <IconButton
                      onClick={() => {
                        downloadSummaryFileHandler(selectedPooledFile.fileID);
                      }}
                    >
                      <Icon>file_download</Icon>
                    </IconButton>
                  </Tooltip>
                  &nbsp;
                  <CheckPermission
                    predicate={STORAGE_DELETE_CONTENT_SERVER_FILES}
                    object={`titleenv.${currentEnv.id}`}
                  >
                    <ConfirmActionComponent
                      container="details"
                      component="IconButton"
                      tooltip="Delete"
                      onClick={() =>
                        deleteSummaryFileHandler(selectedPooledFile.fileID)
                      }
                      confirm={{
                        title: 'Confirm Delete',
                        confirmMsg:
                          'Are you sure you want to delete selected Summary File?',
                        mainButtonLabel: 'Delete',
                        destructive: true,
                      }}
                    >
                      delete
                    </ConfirmActionComponent>
                  </CheckPermission>
                </div>
              );
            }
            return formatFileSize(fileSize);
          },
        };
      default:
        return column;
    }
  });
  return (
    <div className="details__container pooled-files flex-rows-container">
      <SectionTitle
        title={`${selectedPooledFile.fileID} ${selectedPooledFile.fileName}`}
      >
        <Tooltip title="Download">
          <IconButton
            color="inherit"
            onClick={() => downloadPooledFileHandler(selectedPooledFile.fileID)}
          >
            <Icon>file_download</Icon>
          </IconButton>
        </Tooltip>

        <CheckPermission
          predicate={STORAGE_DELETE_CONTENT_SERVER_FILES}
          object={`titleenv.${currentEnv.id}`}
        >
          <ConfirmActionComponent
            component="IconButton"
            container="details"
            tooltip="Delete"
            onClick={() => deletePooledFileHandler(selectedPooledFile.fileID)}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg:
                'Are you sure you want to delete selected Pooled File?',
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
          item={selectedPooledFile}
          elementsOrder={elementsOrder}
          size={4}
        />
      </div>
    </div>
  );
};
PooledFileDetails.propTypes = {
  reduxProps: PropTypes.shape({
    selectedPooledFile: PropTypes.object,
    elementsOrder: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  downloadPooledFileHandler: PropTypes.func.isRequired,
  deletePooledFileHandler: PropTypes.func.isRequired,
  downloadSummaryFileHandler: PropTypes.func.isRequired,
  deleteSummaryFileHandler: PropTypes.func.isRequired,
};

export default PooledFileDetails;
