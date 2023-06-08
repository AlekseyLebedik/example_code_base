import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import SectionTitle from 'dw/core/components/SectionTitle';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import Search from 'dw/core/components/Search';
import { DELETE_LEADERBOARD_ENTRIES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import LeaderboardDetailsEmpty from '../LeaderboardDetailsEmpty';
import { getColumns, SEARCH_DEFAULT_FIELD } from './constants';
import './presentational.css';

const LeaderboardDetails = ({
  selectedLeaderboard,
  leaderboardDetails,
  resetLeaderboardHandler,
  deleteLeaderboardEntitiesHandler,
  formatDateTime,
  onLoadData,
  refreshId,
}) => {
  const [searchString, setSearchString] = useState('');
  const [selectedRows, setSelectedRow] = useState('');
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { entities = [] } = leaderboardDetails || {};

  const table = () => {
    const agGridTable = checkBoxBool => (
      <AsyncAGGrid
        key={`${selectedLeaderboard.name} - ${selectedLeaderboard.id}-${searchString}-${refreshId}`}
        columnDefs={getColumns(checkBoxBool)}
        useQuickFilter={false}
        gridOptions={{
          alignRowCenter: true,
          suppressContextMenu: true,
          onSelectionChanged: params =>
            setSelectedRow(params.api.getSelectedRows()),
          suppressMenuHide: true,
          context: {
            formatDateTime,
          },
        }}
        onLoadData={(nextPageToken, params) =>
          onLoadData(selectedLeaderboard.id, {
            successCallback: params.successCallback,
            failCallback: params.failCallback,
            entityIds: searchString,
            nextPageToken,
          })
        }
        className="with-permissions"
        extendColumnsFromResult
        saveColumnStateName="leaderboard-details"
      />
    );

    return (
      <CheckPermission
        predicate={DELETE_LEADERBOARD_ENTRIES}
        object={`titleenv.${currentEnv.id}`}
        noPermissionsComponent={() => agGridTable(false)}
      >
        {agGridTable(true)}
      </CheckPermission>
    );
  };

  const search = () => (
    <Search
      placeholder="Entity ID"
      onSearch={payload => setSearchString(payload.q)}
      defaultSearchField={SEARCH_DEFAULT_FIELD}
    />
  );

  const leaderboardEntities = entities.length !== 0;

  const Actions = isNotEmpty => (
    <>
      {isNotEmpty && (
        <ConfirmActionComponent
          component="IconButton"
          container="details"
          onClick={() => resetLeaderboardHandler(selectedLeaderboard.id)}
          confirm={{
            title: 'Confirm Reset',
            confirmMsg: 'Are you sure you want to reset selected leaderboard?',
            mainButtonLabel: 'Reset',
            destructive: true,
          }}
          tooltipProps={{ title: 'Reset', placement: 'bottom' }}
          color="inherit"
        >
          settings_backup_restore
        </ConfirmActionComponent>
      )}
      {isNotEmpty && (
        <ConfirmActionComponent
          component="IconButton"
          container="details"
          tooltipProps={
            selectedRows.length > 0
              ? { title: 'Delete Selected Entities', placement: 'bottom' }
              : null
          }
          onClick={() =>
            deleteLeaderboardEntitiesHandler(
              selectedLeaderboard.id,
              selectedRows.map(row => row.entityID)
            )
          }
          confirm={{
            title: 'Confirm Delete',
            confirmMsg: 'Are you sure you want to delete selected Entities?',
            mainButtonLabel: 'Delete',
            destructive: true,
          }}
          disabled={selectedRows.length === 0}
          color="inherit"
        >
          delete
        </ConfirmActionComponent>
      )}
    </>
  );

  const Maincomponent = () => (
    <div className="details__container leaderboard flex-rows-container">
      <SectionTitle>
        <div className="section-title">
          <CheckPermission
            predicate={DELETE_LEADERBOARD_ENTRIES}
            object={`titleenv.${currentEnv.id}`}
          >
            {Actions(leaderboardEntities)}
          </CheckPermission>
        </div>
      </SectionTitle>
      {search()}
      <div className="scrollable-content entities__container with-inner-padding">
        {table()}
      </div>
    </div>
  );

  return !selectedLeaderboard ? <LeaderboardDetailsEmpty /> : Maincomponent();
};

LeaderboardDetails.propTypes = {
  selectedLeaderboard: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  leaderboardDetails: PropTypes.shape({
    entities: PropTypes.arrayOf(PropTypes.object),
    nextPageToken: PropTypes.string,
  }),
  resetLeaderboardHandler: PropTypes.func.isRequired,
  deleteLeaderboardEntitiesHandler: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  refreshId: PropTypes.string.isRequired,
};

LeaderboardDetails.defaultProps = {
  selectedLeaderboard: null,
  leaderboardDetails: {},
};

export default LeaderboardDetails;
