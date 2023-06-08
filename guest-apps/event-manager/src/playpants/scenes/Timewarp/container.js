import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { joinPath } from 'dw/core/helpers/path';
import {
  getBaseURL,
  currentProjectIdSelector,
} from 'playpants/components/App/selectors';
import {
  getLocalStorageHistory,
  setLocalStorageHistory,
} from 'playpants/helpers/localStorage';
import {
  INDEX_URL_MAPPING,
  GAMERTAG_MANAGEMENT,
  TIMEWARP_LS_KEY,
} from './constants';
import StatelessTimewarp from './presentational';

export const Timewarp = ({ baseUrl, history, match, currentProjectId }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(
    INDEX_URL_MAPPING.indexOf(match.params.timewarpTab)
  );
  /**
   * Changes url to the given tab index's mapped value
   * 0 - schedules
   * 1 - gamertags
   * 2 - rules
   * @param {number} tabIndex - The tab index to change to
   */
  const handleChangeSelectedTab = tabIndex => {
    history.push(joinPath(baseUrl, 'timewarp', INDEX_URL_MAPPING[tabIndex]));
  };
  /**
   * Sets the selectedTabIndex to the matched timewarp tab
   * - If the timewarp tab is not found, default to Schedules tab
   * - Otherwise, set to the matched timewarp tab
   * @param {string} timewarpTab - The current sub tab of timewarp
   */
  const handleSetSelectedTabIndex = timewarpTab => {
    const initialSelectedTabIndex = INDEX_URL_MAPPING.indexOf(timewarpTab);
    if (initialSelectedTabIndex === -1) {
      setSelectedTabIndex(0);
      handleChangeSelectedTab(0);
    } else {
      setSelectedTabIndex(initialSelectedTabIndex);
    }
  };
  /**
   * Set the selected tab index if the matched timewarp tab changes
   */
  useEffect(() => {
    handleSetSelectedTabIndex(match.params.timewarpTab);
  }, [match.params.timewarpTab]);

  return (
    <StatelessTimewarp
      selectedTabIndex={selectedTabIndex}
      handleChangeSelectedTab={handleChangeSelectedTab}
      gamertagBaseUrl={joinPath(baseUrl, 'timewarp', GAMERTAG_MANAGEMENT)}
      selectedGroup={
        getLocalStorageHistory(currentProjectId, TIMEWARP_LS_KEY).selectedGroup
          ? getLocalStorageHistory(
              currentProjectId,
              TIMEWARP_LS_KEY
            ).selectedGroup.toString()
          : null
      }
      onSelectGroup={id =>
        setLocalStorageHistory(
          currentProjectId,
          TIMEWARP_LS_KEY,
          'selectedGroup',
          id
        )
      }
    />
  );
};

Timewarp.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  currentProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  baseUrl: getBaseURL(state),
  currentProjectId: currentProjectIdSelector(state),
});

export default connect(mapStateToProps)(Timewarp);
