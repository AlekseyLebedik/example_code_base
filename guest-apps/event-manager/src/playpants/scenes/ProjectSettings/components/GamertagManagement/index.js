import React from 'react';

import PropTypes from 'prop-types';
import { joinPath } from 'dw/core/helpers/path';
import GamertagManagement from 'playpants/components/GamertagManagement';
import RedirectHandler from 'playpants/components/RedirectHandler';
import {
  getLocalStorageHistory,
  setLocalStorageHistory,
} from 'playpants/helpers/localStorage';
import {
  GAMERTAGS_REDIRECT_URL,
  PROJECT_SETTINGS_LS_KEY,
} from '../../constants';

const GamertagGroups = props => {
  const { selectedTab, baseUrl, match } = props;
  const { projectId } = match.params;
  const gamertagBaseUrl = joinPath(baseUrl, GAMERTAGS_REDIRECT_URL);
  const selectedGroup = getLocalStorageHistory(
    projectId,
    PROJECT_SETTINGS_LS_KEY
  ).selectedGroup
    ? getLocalStorageHistory(
        projectId,
        PROJECT_SETTINGS_LS_KEY
      ).selectedGroup.toString()
    : null;
  const onSelectGroup = id =>
    setLocalStorageHistory(
      projectId,
      PROJECT_SETTINGS_LS_KEY,
      'selectedGroup',
      id
    );
  return (
    <RedirectHandler
      matchParam={selectedTab}
      list={['groups']}
      url={gamertagBaseUrl}
    >
      <GamertagManagement
        {...props}
        baseUrl={gamertagBaseUrl}
        onSelectGroup={onSelectGroup}
        selectedGroup={selectedGroup}
      />
    </RedirectHandler>
  );
};
GamertagGroups.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  selectedTab: PropTypes.string,
  match: PropTypes.object.isRequired,
};
GamertagGroups.defaultProps = { selectedTab: '' };

export default GamertagGroups;
