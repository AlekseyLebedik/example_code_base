import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecentCommandsStateless from './presentational';
import { recentCommandsSelector, searchRecent } from '../../slice';

const RecentCommands = props => {
  const recentCommands = useSelector(recentCommandsSelector);
  const dispatch = useDispatch();
  const onSearch = q => {
    dispatch(searchRecent(q));
  };
  return (
    <RecentCommandsStateless
      recentCommands={recentCommands}
      onSearch={onSearch}
      {...props}
    />
  );
};

export default RecentCommands;
