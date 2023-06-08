import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';

import {
  SECURITY_ADD_ANTICHEAT_CHALLENGE_GENERATOR,
  SECURITY_DELETE_ANTICHEAT_CHALLENGE_GENERATOR,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import Loading from 'dw/core/components/Loading';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import AddChallengeGeneratorModal from './components/AddChallengeGeneratorModal';

import { COLUMNS as DEFAULT_COLUMNS } from './constants';
import './presentational.css';

const getStateToggleColumn = onToggle => ({
  key: 'toggleState',
  title: 'Enable',
  noFiltering: true,
  noSorting: true,
  render: (_, record) => {
    const enabled = record.state !== 'DISABLED';
    return (
      <ConfirmActionComponent
        component={Switch}
        checked={enabled}
        actionTrigger="onChange"
        onChange={(e, isChecked) =>
          onToggle({
            generatorId: record.generatorId,
            state: isChecked ? 'IDLE' : 'DISABLED',
          })
        }
        confirm={{
          title: `Confirm Challenge Generator ${
            enabled ? 'Disabling' : 'Enabling'
          }`,
          confirmMsg: `Are you sure you want to ${
            enabled ? 'DISABLE' : 'ENABLE'
          } this Challenge Generator?`,
          mainButtonLabel: enabled ? 'Disable' : 'Enable',
        }}
      />
    );
  },
});

const getDeleteColumnProps = onDelete => ({
  key: 'delete',
  title: 'Delete',
  noFiltering: true,
  noSorting: true,
  render: (_, record) => {
    const disabled = record.state !== 'DISABLED';
    return (
      <ConfirmActionComponent
        component="IconButton"
        tooltipProps={{
          title: disabled
            ? 'Cannot delete non DISABLED Challenge Generator'
            : 'Delete',
          placement: disabled ? 'top-end' : 'top',
        }}
        onClick={() => onDelete(record.generatorId)}
        confirm={{
          confirmMsg:
            'Are you sure you want to delete this Challenge Generator?',
          title: 'Confirm Delete',
          mainButtonLabel: 'Delete',
          destructive: true,
        }}
        disabled={disabled}
      >
        delete
      </ConfirmActionComponent>
    );
  },
});

const ChallengeGeneratorsStateless = ({
  challengeGenerators,
  deleteChallengeGenerator,
  addModalProps,
  updateChallengeGenerator,
}) => {
  const {
    isModalVisible,
    addOnRemoteSubmit,
    onAddChallengeGeneratorHandler,
    openAddModal,
    closeAddModal,
  } = addModalProps;

  const [loadingPermission, , result] = useCurrentEnvPermission(
    [
      SECURITY_ADD_ANTICHEAT_CHALLENGE_GENERATOR,
      SECURITY_DELETE_ANTICHEAT_CHALLENGE_GENERATOR,
    ],
    false
  );
  const hasDeletePermission =
    result?.data?.[SECURITY_DELETE_ANTICHEAT_CHALLENGE_GENERATOR];
  const hasAddPermission =
    result?.data?.[SECURITY_ADD_ANTICHEAT_CHALLENGE_GENERATOR];

  const empty = <div className="empty">No data to display</div>;

  const renderTable = () => {
    const COLUMNS = [...DEFAULT_COLUMNS];
    if (hasAddPermission)
      COLUMNS.push(getStateToggleColumn(updateChallengeGenerator));
    if (hasDeletePermission)
      COLUMNS.push(getDeleteColumnProps(deleteChallengeGenerator));
    return <Table data={challengeGenerators} columns={COLUMNS} />;
  };

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="main-container challenge-generators flex-rows-container">
      {hasAddPermission && (
        <SectionTitle>
          <span className="add-modal-controls">
            <AddChallengeGeneratorModal
              visible={isModalVisible}
              onCancel={closeAddModal}
              onRemoteSubmit={addOnRemoteSubmit}
              onSubmit={onAddChallengeGeneratorHandler}
            />
            <Tooltip title="Add Challenge Generator" placement="bottom">
              <IconButton color="inherit" onClick={openAddModal}>
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          </span>
        </SectionTitle>
      )}

      <div className="scrollable-content with-inner-padding">
        {challengeGenerators.length === 0 ? empty : renderTable()}
      </div>
    </section>
  );
};

ChallengeGeneratorsStateless.propTypes = {
  challengeGenerators: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  deleteChallengeGenerator: PropTypes.func.isRequired,
  updateChallengeGenerator: PropTypes.func.isRequired,
  addModalProps: PropTypes.shape({
    isModalVisible: PropTypes.bool,
    addOnRemoteSubmit: PropTypes.func,
    onAddChallengeGeneratorHandler: PropTypes.func,
    openAddModal: PropTypes.func,
    closeAddModal: PropTypes.func,
  }).isRequired,
};

export default ChallengeGeneratorsStateless;
