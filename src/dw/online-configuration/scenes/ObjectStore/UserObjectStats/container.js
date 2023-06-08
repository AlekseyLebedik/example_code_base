import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import {
  currentTitle,
  currentEnvironment,
} from 'dw/core/helpers/title-env-selectors';
import { deleteUserObjects } from '../UserObjectsHOC/actions';
import { fetchObjectStat, refreshTable } from './actions';
import { extractNumFromString } from './helpers';
import UserObjectStatsPresentational from './presentational';

const setStatRanks = nextPageToken => {
  // TODO. Remove as soon as 'statistic-range' endpoint will support pagination.
  const MAX_RANK = 50;
  if (!nextPageToken) return { minRank: 0, maxRank: MAX_RANK - 1 };
  const pastMaxRank = parseInt(nextPageToken, 10);
  return { minRank: pastMaxRank + 1, maxRank: pastMaxRank + MAX_RANK };
};

function UserObjectStatsContainer() {
  const dispatch = useDispatch();
  const currentlySelectedTitle = useSelector(currentTitle);
  const currentlySelectedEnv = useSelector(currentEnvironment);
  const formatDateTime = useSelector(formatDateTimeSelector);
  const [categoryValue, setCategoryValue] = useState('');
  const [statisticsValue, setStatisticsValue] = useState('');
  const [selectedRow, setSelectedRow] = useState({});
  const onSelectionChanged = params => {
    setSelectedRow(params.api.getSelectedRows()[0]);
  };
  const deleteSelectedObject = () => {
    const userId = extractNumFromString(selectedRow.metadata.owner);
    const names = [selectedRow.metadata.name];
    dispatch(deleteUserObjects(userId, names));
    setTimeout(() => {
      // refresh table after 300 ms.
      dispatch(refreshTable());
    }, 300);
  };
  return (
    <UserObjectStatsPresentational
      onLoadData={(nextPageToken, params) =>
        dispatch(
          fetchObjectStat({
            ...params,
            category: categoryValue,
            statistic: statisticsValue.toLowerCase(),
            ranks: setStatRanks(nextPageToken),
          })
        )
      }
      deleteSelectedObject={deleteSelectedObject}
      currentTitle={currentlySelectedTitle}
      currentEnv={currentlySelectedEnv}
      formatDateTime={formatDateTime}
      categoryValue={categoryValue}
      setCategoryValue={setCategoryValue}
      onSelectionChanged={onSelectionChanged}
      selectedRow={selectedRow}
      statisticsValue={statisticsValue}
      setStatisticsValue={setStatisticsValue}
    />
  );
}

export default UserObjectStatsContainer;
