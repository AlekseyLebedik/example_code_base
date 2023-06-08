import React from 'react';
import PropTypes from 'prop-types';
import Table from 'dw/core/components/TableHydrated';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { useSelector } from 'react-redux';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Loading from 'dw/core/components/Loading';
import {
  SECURITY_ADD_LEADERBOARD_RANGES,
  SECURITY_DELETE_LEADERBOARD_RANGES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import AddLeaderboardRangeModal from './components/AddLeaderboardRangeModal';

import { COLUMNS } from './constants';

const LeaderboardRangesStateless = ({
  leaderboardRanges,
  selectedRowKeys,
  deleteLeaderboardRange,
  addModalProps,
}) => {
  const {
    isModalVisible,
    addOnRemoteSubmit,
    onAddLeaderboardRangeHandler,
    openAddModal,
    closeAddModal,
  } = addModalProps;
  const currentEnv = useSelector(currentEnvDetailsSelector);

  const [loadingPermission, , hasDeletePermission] = useCurrentEnvPermission(
    SECURITY_DELETE_LEADERBOARD_RANGES,
    false
  );

  const empty = <div className="empty">No data to display</div>;

  const renderTable = () => {
    const deleteProps = hasDeletePermission
      ? {
          getKey: k => k.id,
          className: 'with-permissions',
          actions: [
            {
              iconName: 'delete',
              label: 'Delete Selected',
            },
          ],
          hideActions: true,
        }
      : {};
    return (
      <Table data={leaderboardRanges} columns={COLUMNS} {...deleteProps} />
    );
  };

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="main-container flex-rows-container leaderboard-ranges">
      <SectionTitle>
        <CheckPermission
          predicate={SECURITY_ADD_LEADERBOARD_RANGES}
          object={`titleenv.${currentEnv.id}`}
        >
          <AddLeaderboardRangeModal
            visible={isModalVisible}
            onCancel={closeAddModal}
            onRemoteSubmit={addOnRemoteSubmit}
            onSubmit={onAddLeaderboardRangeHandler}
          />
          <Tooltip title="Add Leaderboard Range" placement="bottom">
            <IconButton onClick={openAddModal} color="inherit">
              <Icon>playlist_add</Icon>
            </IconButton>
          </Tooltip>
        </CheckPermission>
        {hasDeletePermission && leaderboardRanges.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            className="action-button"
            tooltipProps={
              selectedRowKeys.length > 0
                ? {
                    title: 'Delete Selected Ranges',
                    placement: 'bottom',
                  }
                : null
            }
            onClick={() => deleteLeaderboardRange(selectedRowKeys)}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg:
                'Are you sure you want to delete selected Leaderboard Ranges?',
              mainButtonLabel: 'Delete',
              destructive: true,
            }}
            disabled={selectedRowKeys.length === 0}
            color="inherit"
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <div className="scrollable-content with-inner-padding">
        {leaderboardRanges.length !== 0 ? renderTable() : empty}
      </div>
    </section>
  );
};

LeaderboardRangesStateless.propTypes = {
  leaderboardRanges: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  deleteLeaderboardRange: PropTypes.func.isRequired,
  addModalProps: PropTypes.shape({
    isModalVisible: PropTypes.bool,
    addOnRemoteSubmit: PropTypes.func,
    onAddLeaderboardRangeHandler: PropTypes.func,
    openAddModal: PropTypes.func,
    closeAddModal: PropTypes.func,
  }).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
};

LeaderboardRangesStateless.defaultProps = {
  selectedRowKeys: [],
};

export default LeaderboardRangesStateless;
