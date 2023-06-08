import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import ElevatedHeader from './components/ElevatedHeader';
import GameDataContent from './components/GameDataContent';

const StatelessGameData = ({
  accountsServiceConfigId,
  expandAllSections,
  groupBy,
  highlightedOption,
  onSelectAccount,
  onSetServiceConfig,
  onToggleSections,
  playerAccounts,
  playerDataLoading,
  playerBans,
  selectedOptions,
  serviceConfigs,
  setGroupBy,
  setHighlightedOption,
  setSelectedOptions,
  unoID,
  unoUserData,
}) => {
  const [contentRef, setContentRef] = useState(undefined);
  const callbackRef = useCallback(node => {
    if (node !== null) setContentRef(node);
  }, []);
  return (
    <>
      <ElevatedHeader
        accountsServiceConfigId={accountsServiceConfigId}
        expandAllSections={expandAllSections}
        groupBy={groupBy}
        highlightedOption={highlightedOption}
        onSelectAccount={onSelectAccount}
        onSetServiceConfig={onSetServiceConfig}
        onToggleSections={onToggleSections}
        selectedOptions={selectedOptions}
        serviceConfigs={serviceConfigs}
        setGroupBy={setGroupBy}
        setHighlightedOption={setHighlightedOption}
        setSelectedOptions={setSelectedOptions}
        target={contentRef}
        unoUserData={unoUserData}
      />
      <GameDataContent
        accountsServiceConfigId={accountsServiceConfigId}
        callbackRef={callbackRef}
        expandAllSections={expandAllSections}
        groupBy={groupBy}
        onSelectAccount={onSelectAccount}
        playerAccounts={playerAccounts}
        playerDataLoading={playerDataLoading}
        playerBans={playerBans}
        selectedOptions={selectedOptions}
        setGroupBy={setGroupBy}
        setHighlightedOption={setHighlightedOption}
        target={contentRef}
        unoID={unoID}
        unoUserData={unoUserData}
      />
    </>
  );
};

StatelessGameData.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  expandAllSections: PropTypes.bool.isRequired,
  groupBy: PropTypes.string.isRequired,
  highlightedOption: PropTypes.string.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
  onSetServiceConfig: PropTypes.func.isRequired,
  onToggleSections: PropTypes.func.isRequired,
  playerAccounts: PropTypes.arrayOf(PropTypes.object),
  playerDataLoading: PropTypes.bool.isRequired,
  playerBans: PropTypes.array,
  selectedOptions: PropTypes.object.isRequired,
  serviceConfigs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setGroupBy: PropTypes.func.isRequired,
  setHighlightedOption: PropTypes.func.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  unoID: PropTypes.string,
  unoUserData: PropTypes.object.isRequired,
};
StatelessGameData.defaultProps = {
  playerAccounts: [],
  unoID: null,
  playerBans: [],
};

export default StatelessGameData;
