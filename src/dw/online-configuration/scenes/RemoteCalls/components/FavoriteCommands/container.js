import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteCommandsStateless from './presentational';
import { favoriteCommandsSelector, searchFavorites } from '../../slice';

const FavoriteCommands = props => {
  const favoriteCommands = useSelector(favoriteCommandsSelector);
  const dispatch = useDispatch();
  const onSearch = q => {
    dispatch(searchFavorites(q));
  };
  return (
    <FavoriteCommandsStateless
      favoriteCommands={favoriteCommands}
      onSearch={onSearch}
      {...props}
    />
  );
};

export default FavoriteCommands;
