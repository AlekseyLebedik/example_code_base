import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import SectionTitle from 'dw/core/components/SectionTitle';
import Table from 'dw/core/components/TableHydrated';
import { ADD_TO_IMP_HISTORY } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import ModalForm from 'dw/core/components/ModalForm';
import IMPHistoryForm from 'dw/online-configuration/scenes/IMP/components/IMPHistoryForm';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import ExpandedRow from './components/ExpandedRow';

import { COLUMNS, UPLOAD_IMP_FILE_MODAL_TITLE } from './constants';
import './presentational.css';

function IMPStateless(props) {
  const {
    data,
    nextPageToken,
    onShowMore,
    openUploadFileModalHandler,
    closeUploadFileModalHandler,
    uploadFileModalVisible,
    onUploadFileHandler,
    initialLoading,
    formatDateTime,
    uploadFileFormName,
  } = props;
  const table = () => (
    <div className="imp-history__table-container">
      <Table
        data={data.map(record => ({ ...record, key: record.id }))}
        expandedRowRender={record => <ExpandedRow record={record} />}
        columns={COLUMNS}
        formatDateTime={formatDateTime}
      />
    </div>
  );

  const empty = initialLoading ? (
    <div className="loading__container">
      <CircularProgress />
    </div>
  ) : (
    <div className="empty">No data to display</div>
  );

  const openModalButton = ({ onClick }) => (
    <IconButton onClick={onClick} tooltip="Upload File" color="inherit">
      <Icon>file_upload</Icon>
    </IconButton>
  );

  const currentEnv = useSelector(currentEnvDetailsSelector);

  return (
    <section className="main-container imp-history">
      <SectionTitle>
        <CheckPermission
          predicate={ADD_TO_IMP_HISTORY}
          object={`titleenv.${currentEnv.id}`}
        >
          <ModalForm
            formName={uploadFileFormName}
            FormComponent={IMPHistoryForm}
            visible={uploadFileModalVisible}
            onCancel={closeUploadFileModalHandler}
            OpenModalComponent={openModalButton}
            openModal={openUploadFileModalHandler}
            title={UPLOAD_IMP_FILE_MODAL_TITLE}
            submittingText="Uploading..."
            submitText="Upload"
            wrapperClassName="upload-file-modal"
            dialogContentStyle={{ width: '500px' }}
            externalSubmit={onUploadFileHandler}
          />
        </CheckPermission>
      </SectionTitle>
      {!(data.length === 0 || initialLoading) ? table() : empty}
      {nextPageToken && (
        <Button
          variant="contained"
          className="NextPageButton"
          label="Show More"
          fullWidth
          onClick={() => onShowMore(nextPageToken)}
        />
      )}
    </section>
  );
}

IMPStateless.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPageToken: PropTypes.string,
  onShowMore: PropTypes.func.isRequired,
  openUploadFileModalHandler: PropTypes.func.isRequired,
  closeUploadFileModalHandler: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  uploadFileModalVisible: PropTypes.bool.isRequired,
  onUploadFileHandler: PropTypes.func.isRequired,
  initialLoading: PropTypes.bool.isRequired,
  uploadFileFormName: PropTypes.string.isRequired,
};

IMPStateless.defaultProps = {
  nextPageToken: null,
};

export default IMPStateless;
