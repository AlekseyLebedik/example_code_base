import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { changeUser as contextChangeUser } from 'dw/online-configuration/components/ContextSelector/actions';
import { userSelector as contextUserSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import { usePrevious } from 'dw/core/hooks';
import { useIsClanAchievements } from './hooks';
import PlayerAchievementsStateless from './presentational';

const PlayerAchievements = props => {
  const [playerId, setPlayerID] = useState(props?.match?.params?.id);
  const [isPlayerIDCleared, setPlayerIDCleared] = useState(false);
  const handleChange = (key, value) => {
    const params = {
      ...props.match.params,
      [key]: value,
    };
    if (key === 'id') {
      setPlayerID(value);
      if (!value) {
        const { location } = props;
        location.search = '';
        props.history.replace(location);
        setPlayerIDCleared(true);
      } else {
        setPlayerIDCleared(false);
      }
    }
    const pathname = generatePath(props.match.path, params);
    props.history.push({ ...props.location, pathname });
  };
  const contextUser = useSelector(state => contextUserSelector(state));
  const { titleId, env, path } = props.match.params;
  const dispatch = useDispatch();
  const changeUser = useMemo(
    () => value => dispatch(contextChangeUser(value)),
    [dispatch]
  );
  const isClan = useIsClanAchievements();

  useEffect(() => {
    if (!isClan) {
      if (!isPlayerIDCleared && !playerId && contextUser.userId)
        handleChange('id', contextUser.userId);
      if (playerId && !contextUser.userId) changeUser(playerId);
    }
  }, [changeUser, contextUser.userId, handleChange, playerId, isClan]);
  useEffect(() => {
    if (!isClan) changeUser(playerId);
  }, [playerId, changeUser, isClan]);

  const prevPlayerId = usePrevious(playerId);
  if (playerId && prevPlayerId && playerId !== prevPlayerId) return null;

  return (
    <PlayerAchievementsStateless
      titleId={titleId}
      env={env}
      playerId={playerId || (!isClan && contextUser.userId)}
      path={path}
      handleChange={handleChange}
      handleClanIDChange={setPlayerID}
    />
  );
};

PlayerAchievements.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default PlayerAchievements;
