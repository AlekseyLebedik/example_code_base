import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import MonacoEditor from 'dw/core/components/FormFields/Monaco';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import CloneLoading from 'dw/core/components/BackdropLoading';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import {
  AE_SEND_PLAYER_EVENTS,
  DELETE_USER_ACHIEVEMENTS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { columnDefs as columnDefsBase } from './constants';
import UserState from '../UserState';
import SendEvent from '../SendEvent';
import ClonePlayerAchievementsButton from '../ClonePlayerAchievementsButton';
import RestorePlayerAchievementsButton from '../RestorePlayerAchievementsButton';
import { useIsClanAchievements } from '../../hooks';

import styles from './presentational.module.css';

const DELETE_NAMES_TO_SHOW = 5;
const MIN_NAMES_IN_MORE = 3;

const MultiProgressRenderer = params =>
  params.data?.multiProgress
    ? Object.entries(params.data.multiProgress).map(([name, progress]) => (
        <span field={name} key={name}>
          {name}: {progress.value} / {progress.target} |&nbsp;
          <br />
        </span>
      ))
    : 'N/A';

const SendEventRenderer = params =>
  params.context.hasSendEventsPermission && params.data?.event ? (
    <IconButton onClick={() => params.context.setEvent(params.data.event)}>
      <Icon>send</Icon>
    </IconButton>
  ) : null;

const DetailCellRenderer = params => (
  <MonacoEditor
    language="json"
    className={styles.editor}
    input={{
      value: JSON.stringify(params.data.raw, null, 2),
    }}
    options={{ readOnly: true }}
    containerResizeOnReady
  />
);

const AchievementsNameRenderer = params => <div>{params.value}</div>;

const deleteConfirmMsg = (names, isClan) => {
  const namesText =
    names.length >= DELETE_NAMES_TO_SHOW + MIN_NAMES_IN_MORE
      ? `${names.slice(0, DELETE_NAMES_TO_SHOW).join(', ')}, ... +${
          names.length - DELETE_NAMES_TO_SHOW
        } More`
      : names.join(', ');
  return (
    <>
      Are you sure you want to delete this {isClan ? 'clan' : 'player'}&apos;s
      achievement
      {names.length === 1 ? '' : 's'}?
      <p className={styles.deleteNames}>{namesText}</p>
      Doing so may put {names.length === 1 ? 'this' : 'these'} achievement
      {names.length === 1 ? '' : 's'} in an inconsistent state with the User
      State, other achievements, or states from dependent services.
    </>
  );
};

const PlayerAchievements = ({
  achievements,
  playerId,
  onGridReady,
  onLoadData,
  formatDateTime,
  onDelete,
  onDeleteUserData,
  event,
  setEvent,
  refreshKeys,
  onRefresh,
  setCreatingBackup,
  backupCreated,
}) => {
  const hasSendEventsPermission = useCurrentEnvPermission(
    AE_SEND_PLAYER_EVENTS
  );
  const hasDeletePermission = useCurrentEnvPermission(DELETE_USER_ACHIEVEMENTS);
  const [userStateExpanded, toggleUserState] = useState(false);
  const [sendEventExpanded, toggleSendEvent] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [cloneLoading, setCloneLoading] = useState(false);
  const isClan = useIsClanAchievements();
  const columnDefs = columnDefsBase.map(c =>
    c.field !== 'name'
      ? c
      : {
          ...c,
          headerCheckboxSelection: params => {
            const hasPlayerData = !!params?.api
              ?.getModel()
              ?.rowsToDisplay?.find(r => !r?.data?.noPlayerData);
            return !isClan && hasPlayerData && hasDeletePermission;
          },
        }
  );

  useEffect(() => setSelectedRows([]), [refreshKeys.table]);
  return (
    <>
      <CloneLoading open={cloneLoading} />
      <div className={styles.actions}>
        <div className={styles.userState}>
          <UserState
            playerId={playerId}
            key={refreshKeys.userState}
            onRefresh={onRefresh}
            expanded={userStateExpanded}
            toggleExpanded={toggleUserState}
          />
        </div>
        {hasSendEventsPermission ? (
          <div className={styles.sendEvents}>
            <SendEvent
              playerId={playerId}
              achievements={achievements}
              event={event}
              onRefresh={onRefresh}
              expanded={sendEventExpanded}
              toggleExpanded={toggleSendEvent}
            />
          </div>
        ) : null}
        {!isClan ? (
          <div className={styles.buttons}>
            {hasDeletePermission ? (
              <div className={styles.deleteAllData}>
                <Tooltip
                  title="Delete player's user state and all achievements"
                  placement="bottom"
                >
                  <ConfirmActionComponent
                    component="fab"
                    color="secondary"
                    confirm={{
                      title: 'Confirm Delete',
                      confirmMsg: (
                        <>
                          Are you sure you want to delete the selected
                          player&apos;s user state and achievements data?
                          <br />
                          <br />
                          <b>
                            A temporary backup will be made of this Achievements
                            before changes are applied.
                          </b>
                        </>
                      ),
                      mainButtonLabel: 'Delete',
                      destructive: true,
                    }}
                    onClick={() => onDeleteUserData()}
                  >
                    <Icon>delete</Icon>
                  </ConfirmActionComponent>
                </Tooltip>
              </div>
            ) : null}
            <ClonePlayerAchievementsButton
              playerId={playerId}
              setCloneLoading={setCloneLoading}
            />
            <RestorePlayerAchievementsButton
              playerId={playerId}
              onRefresh={onRefresh}
              setCreatingBackup={setCreatingBackup}
              backupCreated={backupCreated}
            />
          </div>
        ) : null}
      </div>
      {selectedRows && selectedRows.length > 0 && hasDeletePermission ? (
        <div className={styles.deleteButtonContainer}>
          <div className={styles.deleteButton}>
            <Badge
              badgeContent={selectedRows.length}
              classes={{ badge: styles.deleteBadge }}
              color="primary"
            >
              <ConfirmActionComponent
                component="fab"
                color="secondary"
                confirm={{
                  title: 'Confirm Delete',
                  confirmMsg: deleteConfirmMsg(selectedRows, isClan),
                  mainButtonLabel: 'Delete',
                  destructive: true,
                }}
                onClick={() => onDelete(selectedRows)}
              >
                delete
              </ConfirmActionComponent>
            </Badge>
          </div>
        </div>
      ) : null}
      <AsyncAGGrid
        key={refreshKeys.table}
        onGridReady={onGridReady}
        header="Achievements"
        columnDefs={columnDefs}
        onLoadData={onLoadData}
        gridOptions={{
          getRowHeight: params => {
            if (!isEmpty(params.data.raw)) {
              params.node.setMaster(true);
            }
            return params.node.detail ? 200 : 50;
          },
          isRowMaster(dataItem) {
            return !!dataItem.raw;
          },
          isRowSelectable(rowNode) {
            return rowNode.data ? !rowNode.data.noPlayerData : false;
          },
          onSelectionChanged: evt => {
            setSelectedRows(
              evt.api.getSelectedNodes().map(node => node.data.name)
            );
          },
          masterDetail: true,
          detailCellRenderer: 'rawCellRenderer',
          detailRowHeight: 200,
          detailCellRendererParams: {
            refreshStrategy: 'rows',
          },
          components: {
            achievementsNameRenderer: AchievementsNameRenderer,
            multiProgressRenderer: MultiProgressRenderer,
            sendEventRenderer: SendEventRenderer,
            rawCellRenderer: DetailCellRenderer,
          },
          context: {
            formatDateTime,
            setEvent,
            hasSendEventsPermission,
            hasDeletePermission,
            onDelete,
          },
          multiSortKey: 'ctrl',
          differenceByTag: 'name',
          suppressContextMenu: true,
        }}
        saveColumnStateName="player-achievements"
      />
    </>
  );
};

PlayerAchievements.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.object),
  backupCreated: PropTypes.bool,
  event: PropTypes.object,
  formatDateTime: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteUserData: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  playerId: PropTypes.string,
  refreshKeys: PropTypes.object.isRequired,
  setCreatingBackup: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
};

PlayerAchievements.defaultProps = {
  achievements: [],
  backupCreated: false,
  event: undefined,
  playerId: undefined,
};

export default PlayerAchievements;
