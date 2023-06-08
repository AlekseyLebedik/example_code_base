import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import UserAutoComplete from 'dw/online-configuration/components/UserAutoComplete';
import {
  changeRemoteProps as changeContextProps,
  resetRemoteProps as resetContextProps,
} from 'dw/online-configuration/components/ContextSelector/actions';

import styles from './index.module.css';

const PlayerTabsContainer = ({ playerId, onPlayerChange }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  useEffect(() => {
    dispatch(
      changeContextProps({
        variant: 'contrast',
        fontSize: 'slim',
        classes: {
          root: styles.contextAutoComplete,
          autocompleteRoot: styles.autocompleteRoot,
          selectedLabel: styles.contextLabel,
        },
        externalRef: containerRef.current,
      })
    );
    return function handleResetContextProps() {
      dispatch(resetContextProps());
    };
  }, [dispatch]);
  return (
    <>
      <UserAutoComplete
        classes={{ root: styles.user }}
        onChange={onPlayerChange}
        defaultValue={playerId}
        placeholder="Enter Player ID or Gamertag"
        variant="contrast"
        size="slim"
        fontSize="slim"
      />
      <div className={styles.contextSelectorContainer} ref={containerRef} />
    </>
  );
};

PlayerTabsContainer.propTypes = {
  playerId: PropTypes.string,
  onPlayerChange: PropTypes.func.isRequired,
};

PlayerTabsContainer.defaultProps = {
  playerId: undefined,
};

export default PlayerTabsContainer;
