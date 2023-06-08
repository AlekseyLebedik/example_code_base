import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { useCurrentEnvPermission } from 'dw/core/hooks';
import { DELETE_USER_ACHIEVEMENTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';

import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Table from 'dw/core/components/TableHydrated';
import SourceSelect from 'dw/core/components/SourceSelect';

import { COLUMNS } from './constants';
import './presentational.css';

const UserAchievementsStateless = ({
  userAchievements,
  nextPageToken,
  playerId,
  onShowMore,
  onSelect,
  apiCallFunc,
  renderOptionFunc,
  deleteAchievements,
  selectedRowKeys,
  formatDateTime,
}) => {
  const hasDeletePermission = useCurrentEnvPermission(DELETE_USER_ACHIEVEMENTS);
  const table = () => {
    const deleteProps = hasDeletePermission
      ? {
          getKey: k => k.name,
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
      <Table
        data={userAchievements}
        columns={COLUMNS}
        formatDateTime={formatDateTime}
        {...deleteProps}
      />
    );
  };

  const empty = <div className="empty">No data to display</div>;

  return (
    <section className="main-container flex-rows-container user-achievements">
      <SectionTitle
        title="Player Achievements"
        extraContent={
          <SourceSelect
            placeholder="Enter Player ID"
            defaultValue={playerId}
            onSelect={onSelect}
            renderOption={renderOptionFunc}
            apiCall={apiCallFunc}
          />
        }
      >
        {hasDeletePermission && userAchievements.length > 0 && (
          <ConfirmActionComponent
            component="IconButton"
            tooltipProps={
              selectedRowKeys.length > 0
                ? { title: 'Delete Selected', placement: 'bottom' }
                : null
            }
            onClick={() => deleteAchievements(playerId, selectedRowKeys)}
            confirm={{
              title: 'Confirm Delete',
              confirmMsg:
                'Are you sure you want to delete selected User Achievements?',
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
      <div className="scrollable-content">
        {userAchievements.length !== 0 ? table() : empty}
      </div>
      {!nextPageToken ? null : (
        <Button
          variant="contained"
          fullWidth
          onClick={() => onShowMore(playerId, nextPageToken)}
        >
          Show More
        </Button>
      )}
    </section>
  );
};

UserAchievementsStateless.propTypes = {
  userAchievements: PropTypes.arrayOf(PropTypes.object),
  nextPageToken: PropTypes.string,
  playerId: PropTypes.string,
  onShowMore: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  apiCallFunc: PropTypes.func.isRequired,
  renderOptionFunc: PropTypes.func.isRequired,
  deleteAchievements: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.string),
  formatDateTime: PropTypes.func.isRequired,
};

UserAchievementsStateless.defaultProps = {
  userAchievements: [],
  nextPageToken: null,
  playerId: '',
  selectedRowKeys: [],
};

export default UserAchievementsStateless;
