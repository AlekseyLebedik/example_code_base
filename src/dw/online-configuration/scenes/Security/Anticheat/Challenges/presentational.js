import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { SECURITY_ADD_ANTICHEAT_CHALLENGES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';

import SectionTitle from 'dw/core/components/SectionTitle';
import ModalForm from './components/ModalForm';
import AddChallengeForm from './components/AddChallengeForm';
import EditChallengeForm from './components/EditChallengeForm';

import { COLUMNS as DEAFULT_COLUMNS } from './constants';

const ChallengesStateless = ({
  challenges,
  addModalProps,
  editModalProps,
  closeModal,
}) => {
  const {
    isAddModalVisible,
    addOnRemoteSubmit,
    onAddChallengeHandler,
    openAddModal,
  } = addModalProps;
  const {
    isEditModalVisible,
    editOnRemoteSubmit,
    onEditChallengeHandler,
    openEditModal,
  } = editModalProps;

  const [loadingPermission, , hasAddPermission] = useCurrentEnvPermission(
    SECURITY_ADD_ANTICHEAT_CHALLENGES,
    false
  );

  const COLUMNS = [...DEAFULT_COLUMNS];
  if (hasAddPermission) {
    COLUMNS.push({
      key: 'edit',
      dataIndex: 'edit',
      title: 'Edit',
      width: '7%',
      render: (text, record) => (
        <Tooltip placement="left" title="Edit Challenge">
          <IconButton onClick={() => openEditModal && openEditModal(record)}>
            <Icon>create</Icon>
          </IconButton>
        </Tooltip>
      ),
    });
  }

  const empty = <div className="empty">No data to display</div>;

  const renderTable = () => <Table data={challenges} columns={COLUMNS} />;

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="main-container challenges flex-rows-container">
      {hasAddPermission && (
        <SectionTitle>
          <span className="add-modal-controls">
            <ModalForm
              visible={isAddModalVisible}
              onCancel={closeModal}
              onRemoteSubmit={addOnRemoteSubmit}
              title="Add Challenge"
              submitButtonText="Add"
            >
              <AddChallengeForm externalSubmit={onAddChallengeHandler} />
            </ModalForm>
            <Tooltip title="Add Challenge" placement="bottom">
              <IconButton color="inherit" onClick={openAddModal}>
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          </span>
        </SectionTitle>
      )}
      {challenges.length === 0 && empty}
      <div className="scrollable-content with-inner-padding">
        {challenges.length > 0 && renderTable()}
      </div>
      {challenges.length > 0 && hasAddPermission && (
        <ModalForm
          visible={isEditModalVisible}
          onCancel={closeModal}
          onRemoteSubmit={editOnRemoteSubmit}
          title="Edit Challenge"
          submitButtonText="Edit"
        >
          <EditChallengeForm externalSubmit={onEditChallengeHandler} />
        </ModalForm>
      )}
    </section>
  );
};

ChallengesStateless.propTypes = {
  challenges: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
  addModalProps: PropTypes.shape({
    isAddModalVisible: PropTypes.bool,
    addOnRemoteSubmit: PropTypes.func,
    onAddChallengeHandler: PropTypes.func,
    openAddModal: PropTypes.func,
  }).isRequired,
  editModalProps: PropTypes.shape({
    isEditModalVisible: PropTypes.bool,
    editOnRemoteSubmit: PropTypes.func,
    onEditChallengeHandler: PropTypes.func,
    openEditModal: PropTypes.func,
  }).isRequired,
};

export default ChallengesStateless;
