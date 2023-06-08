import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import UserInput from 'dw/core/components/UserAutoComplete';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';
import TitleEnvPlayerContext from 'dw/core/components/TitleEnvPlayerContext';
import { currentEnvSelector } from 'dw/core/helpers/title-env-selectors';
import RemoveMissedCheckbox from './components/RemoveMissedCheckbox';

import styles from './index.module.css';

const LIVE_ENV = 'live';

const PlayerContextSelector = ({
  onChange,
  availabilityServiceName,
  serviceName,
  endpoint,
  titleEnvSelectProps,
  validationErrors,
}) => {
  const currentEnv = useSelector(currentEnvSelector);
  const [targetTitleEnv, setTitleEnv] = useState(
    `${currentEnv.title}:${currentEnv.shortType}`
  );
  const isLiveEnv = targetTitleEnv && targetTitleEnv.split(':')[1] === LIVE_ENV;
  const [{ value: targetPlayerId, label: targetPlayerLabel }, setTargetPlayer] =
    useState({});
  const [targetContext, setTargetContext] = useState(null);
  const [errors, setErrors] = useState(validationErrors);
  const [partialClone, setPartialClone] = useState(false);

  useEffect(() => {
    onChange({
      targetTitleEnv,
      targetPlayerId,
      targetContext,
      targetPlayerLabel,
      partialClone,
    });
  }, [
    onChange,
    targetContext,
    targetPlayerId,
    targetPlayerLabel,
    targetTitleEnv,
    partialClone,
  ]);

  useEffect(() => setErrors(validationErrors), [validationErrors, setErrors]);

  const setEnv = value => {
    setTitleEnv(value);
    setTargetPlayer({});
    setTargetContext(null);
    setErrors({});
  };

  const setPlayer = value => {
    setTargetPlayer(value || {});
    setTargetContext(null);
    setErrors({});
  };

  const handleConfirm = event => setPartialClone(event.target.checked);

  return (
    <>
      <TitleEnvSelect
        input={{ value: isLiveEnv ? null : targetTitleEnv, onChange: setEnv }}
        serviceName={availabilityServiceName}
        meta={{}}
        label="Target environment"
        className={styles.env}
        {...titleEnvSelectProps}
      />
      <UserInput
        key={targetTitleEnv}
        classes={{ root: styles.user }}
        onChange={setPlayer}
        placeholder="Enter Player ID or Gamertag"
        context={targetTitleEnv}
        valuesOnly={false}
        textFieldProps={{ disabled: isLiveEnv }}
      />
      {targetTitleEnv && (
        <TitleEnvPlayerContext
          key={`${targetTitleEnv}-${targetPlayerId}`}
          environment={targetTitleEnv}
          serviceName={serviceName}
          endpoint={endpoint}
          playerId={targetPlayerId}
          onChange={setTargetContext}
        />
      )}
      <RemoveMissedCheckbox
        value={partialClone}
        onChange={handleConfirm}
        errors={errors}
      />
    </>
  );
};
PlayerContextSelector.propTypes = {
  availabilityServiceName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  titleEnvSelectProps: PropTypes.object,
  validationErrors: PropTypes.object,
};

PlayerContextSelector.defaultProps = {
  titleEnvSelectProps: {},
  validationErrors: {},
};

export default PlayerContextSelector;
