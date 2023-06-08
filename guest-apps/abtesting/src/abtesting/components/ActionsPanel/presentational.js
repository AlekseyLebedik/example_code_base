import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import {
  ABTESTING_ADD_ENTITIES,
  ABTESTING_DELETE_ENTITIES,
  ABTESTING_APPROVE_ENTITIES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Loading from 'dw/core/components/Loading';
import { TEST_STATUS } from 'dw/abtesting-utils';
import { CONFIRMS } from './constants';
import styles from './presentational.module.css';

const ActionIcon = ({
  iconClass,
  tooltip,
  confirm,
  onClick,
  disabled,
  className,
  visible,
}) =>
  visible ? (
    <ConfirmActionComponent
      tooltip={tooltip}
      className={className}
      component="IconButton"
      confirm={confirm}
      onClick={onClick}
      disabled={disabled}
      key={tooltip}
    >
      {iconClass}
    </ConfirmActionComponent>
  ) : null;

ActionIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  confirm: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  className: PropTypes.string,
};

ActionIcon.defaultProps = {
  confirm: undefined,
  disabled: false,
  visible: true,
  className: undefined,
};

const ActionsPanel = ({ record, history, events }) => {
  const projectId = get(record, 'project.id', '');
  const [loadingPermission, , result] = usePermissions(
    [
      ABTESTING_ADD_ENTITIES,
      ABTESTING_DELETE_ENTITIES,
      ABTESTING_APPROVE_ENTITIES,
    ],
    `project.${projectId}`
  );
  const hasAddPermission = result?.data?.[ABTESTING_ADD_ENTITIES];
  const hasApprovePermission = result?.data?.[ABTESTING_APPROVE_ENTITIES];
  const hasDeletePermission = result?.data?.[ABTESTING_DELETE_ENTITIES];

  const { titleID, environment, id, status } = record.data || record;

  const { approveHandler, deleteHandler, killHandler, archiveHandler } = events;

  const isDeleteVisible = TEST_STATUS.CONFIG === status;
  const isDeleteDisabled = TEST_STATUS.CONFIG !== status;

  const isArchiveVisible = [
    TEST_STATUS.ANALYSIS,
    TEST_STATUS.ARCHIVED,
  ].includes(status);

  const isReportDisabled = true; // To be removed when we add reporting links
  const isArchiveDisabled = TEST_STATUS.ARCHIVED === status;
  const isKilledDisabled = ![
    TEST_STATUS.APPROVED,
    TEST_STATUS.LIVE,
    TEST_STATUS.ACTIVE,
  ].includes(status);

  const isPropagateDisabled = TEST_STATUS.KILLED === status;

  const isEditDisabled = ![TEST_STATUS.CONFIG].includes(status);

  const isApproveDisabled = ![TEST_STATUS.CONFIG].includes(status);

  const navigateTo = route => () => history.push(route);

  const ReportIcon = () => (
    <ActionIcon
      iconClass="poll"
      tooltip="Report"
      onClick={navigateTo(`/abtesting/report/${titleID}/${environment}/${id}`)} // Not the final link
      disabled={isReportDisabled}
    />
  );

  const EditIcon = () => (
    <ActionIcon
      iconClass="edit"
      tooltip="Edit"
      onClick={navigateTo(`/abtesting/edit/${titleID}/${environment}/${id}`)}
      disabled={isEditDisabled}
      visible={hasAddPermission}
    />
  );

  const CloneIcon = () => (
    <ActionIcon
      iconClass="file_copy"
      tooltip="Clone"
      onClick={navigateTo(`/abtesting/clone/${titleID}/${environment}/${id}`)}
      visible={hasAddPermission}
    />
  );

  const PropagateIcon = () => (
    <ActionIcon
      iconClass="call_split"
      tooltip="Propagate"
      onClick={navigateTo(
        `/abtesting/propagate/${titleID}/${environment}/${id}`
      )}
      disabled={isPropagateDisabled}
      visible={hasAddPermission}
    />
  );

  const ApproveIcon = () => (
    <ActionIcon
      iconClass="done_all"
      tooltip="Approve"
      confirm={CONFIRMS.APPROVE}
      onClick={() => approveHandler(titleID, environment, id)}
      disabled={isApproveDisabled}
      className={isApproveDisabled ? styles.approved : undefined}
      visible={hasApprovePermission}
    />
  );

  const KillIcon = () => (
    <ActionIcon
      iconClass="cancel"
      tooltip="Kill"
      confirm={CONFIRMS.KILL}
      onClick={() => killHandler(titleID, environment, id)}
      disabled={isKilledDisabled}
      className={styles.kill}
      visible={!isDeleteVisible && !isArchiveVisible && hasDeletePermission}
    />
  );

  const DeleteIcon = () => (
    <ActionIcon
      iconClass="delete"
      tooltip="Delete"
      confirm={CONFIRMS.DELETE}
      onClick={() => deleteHandler(titleID, environment, id)}
      disabled={isDeleteDisabled}
      visible={isDeleteVisible && hasDeletePermission}
    />
  );

  const ArchiveIcon = () => (
    <ActionIcon
      iconClass="archive"
      tooltip="Archive"
      confirm={CONFIRMS.ARCHIVE}
      onClick={() => archiveHandler(titleID, environment, id)}
      disabled={isArchiveDisabled}
      visible={isArchiveVisible && hasDeletePermission}
    />
  );

  return loadingPermission ? (
    <Loading />
  ) : (
    <div className={styles.base} data-cy="actions-panel">
      <ReportIcon />
      <EditIcon />
      <CloneIcon />
      <PropagateIcon />
      <ApproveIcon />
      <KillIcon />
      <DeleteIcon />
      <ArchiveIcon />
    </div>
  );
};

ActionsPanel.propTypes = {
  record: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      titleID: PropTypes.number,
      platform: PropTypes.string,
      environment: PropTypes.string.isRequired,
      source: PropTypes.string,
      target: PropTypes.string,
      testPeriodFrom: PropTypes.string,
      testPeriodTo: PropTypes.string,
      status: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.object.isRequired,
  events: PropTypes.shape({
    approveHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    killHandler: PropTypes.func.isRequired,
    archiveHandler: PropTypes.func.isRequired,
  }).isRequired,
};

ActionsPanel.defaultProps = {
  record: [],
};

export default ActionsPanel;
