import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { DELETE_LEADERBOARD_ENTRIES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import SkeletonProgress from 'dw/core/components/SearchableList/components/SkeletonProgress';

import LeaderboardDetails from './components/LeaderboardDetails';
import LeaderboardDetailsEmpty from './components/LeaderboardDetailsEmpty';
import LeaderboardListItem from './components/LeaderboardListItem';

import { selectedLeaderboardDataFetched } from './helpers';

function getRenderItemFunc(onSelectItem, withCheckboxes = false) {
  const getBaseProps = item => ({
    key: `leaderboards-list-item-${item.id}`,
    item,
    onClick: () => onSelectItem(item),
  });

  const withoutChecks = item => <LeaderboardListItem {...getBaseProps(item)} />;

  const withChecks = (item, renderCheckbox) => (
    <LeaderboardListItem
      {...getBaseProps(item)}
      renderCheckbox={renderCheckbox}
    />
  );

  return withCheckboxes ? withChecks : withoutChecks;
}

const LeaderboardsStateless = props => {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const {
    leaderboards,
    leaderboardsLoading,
    nextPageToken,
    searchAvailable,
    q,
    selectedLeaderboard,
    resetLeaderboards,
    onSearch,
    onClickListItem,
    onShowMore,
  } = props.reduxProps;

  const showMore = nextPageToken !== null;

  const commonListProps = () => ({
    initialValue: q,
    onSearch,
    placeholder: 'Leaderboard Name | Leaderboard ID',
    items: leaderboards,
    showMore,
    onShowMore: () => onShowMore(nextPageToken, q),
  });

  const withoutPermissionsList = actions => (
    <SearchableList
      {...commonListProps()}
      toRenderFunc={getRenderItemFunc(item => {
        onClickListItem(item);
        actions.onSelectItem(item.id);
      })}
      searchEnabled={searchAvailable}
      loadingMaster={leaderboardsLoading}
    />
  );

  const withPermissionsList = actions => (
    <SearchableList
      {...commonListProps()}
      toRenderFunc={getRenderItemFunc(item => {
        onClickListItem(item);
        actions.onSelectItem(item.id);
      }, true)}
      getItemKey={item => item.id}
      actions={[
        {
          iconName: 'settings_backup_restore',
          label: 'Reset',
          handler: items => resetLeaderboards(items),
          confirm: {
            title: 'Confirm Reset',
            confirmMsg: 'Are you sure you want to reset selected leaderboards?',
            mainButtonLabel: 'Reset',
            destructive: true,
          },
        },
      ]}
      searchEnabled={searchAvailable}
      loadingMaster={leaderboardsLoading}
    />
  );

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={leaderboards.length} color="default" />
      <CheckPermission
        predicate={DELETE_LEADERBOARD_ENTRIES}
        object={`titleenv.${currentEnv.id}`}
        noPermissionsComponent={() => withoutPermissionsList(actions)}
      >
        {withPermissionsList(actions)}
      </CheckPermission>
    </div>
  );

  const renderDetail = () =>
    leaderboardsLoading &&
    !selectedLeaderboardDataFetched(leaderboards, selectedLeaderboard?.id) ? (
      <SkeletonProgress />
    ) : (
      <LeaderboardDetails selectedLeaderboard={selectedLeaderboard} />
    );

  const renderEmpty = () => <LeaderboardDetailsEmpty />;

  return (
    <section className="leaderboards">
      <div className="leaderboards-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
};

LeaderboardsStateless.propTypes = {
  reduxProps: PropTypes.shape({
    leaderboards: PropTypes.arrayOf(PropTypes.object),
    leaderboardsLoading: PropTypes.bool,
    nextPageToken: PropTypes.string,
    searchAvailable: PropTypes.bool,
    q: PropTypes.string,
    selectedLeaderboard: PropTypes.object,
    resetLeaderboards: PropTypes.func,
    onSearch: PropTypes.func,
    onClickListItem: PropTypes.func,
    onShowMore: PropTypes.func,
  }).isRequired,
};

export default LeaderboardsStateless;
