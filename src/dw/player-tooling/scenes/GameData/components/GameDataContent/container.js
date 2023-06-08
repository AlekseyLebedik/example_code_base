import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import StatelessGameDataContent from './presentational';

export const PLAYER_TITLE_ENVS_QUERY = gql`
  query PlayerTitleEnvs($accountsServiceConfigId: ID!, $unoID: ID!) {
    player(accountsServiceConfigId: $accountsServiceConfigId, unoId: $unoID) {
      envs {
        title {
          id
          name
        }
        shortType
      }
    }
  }
`;

const GameDataContent = ({
  accountsServiceConfigId,
  setGroupBy,
  setHighlightedOption,
  unoID,
  ...props
}) => {
  const { data: titleEnvData } = useQuery(PLAYER_TITLE_ENVS_QUERY, {
    skip: !unoID,
    variables: { accountsServiceConfigId, unoID },
  });
  const [scrollPosition, setScrollPosition] = useState(0);

  const onScroll = useCallback(
    e => setScrollPosition(Math.ceil(e.target.scrollTop / 100) * 100),
    []
  );

  const linkToSection = useCallback(
    (type, id) => {
      setGroupBy(type);
      setHighlightedOption(id);
      setTimeout(() => {
        const anchor = document.getElementById(id);
        if (anchor)
          anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    },
    [setGroupBy, setHighlightedOption]
  );

  return (
    <StatelessGameDataContent
      {...props}
      accountsServiceConfigId={accountsServiceConfigId}
      linkToSection={linkToSection}
      onScroll={onScroll}
      scrollPosition={scrollPosition}
      setHighlightedOption={setHighlightedOption}
      titleEnvs={titleEnvData ? titleEnvData.player.envs : []}
      unoID={unoID}
    />
  );
};

GameDataContent.propTypes = {
  accountsServiceConfigId: PropTypes.string.isRequired,
  setGroupBy: PropTypes.func.isRequired,
  setHighlightedOption: PropTypes.func.isRequired,
  unoID: PropTypes.string,
};
GameDataContent.defaultProps = {
  unoID: null,
};

export default GameDataContent;
