import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';

import ServiceView from '../ServiceView';
import {
  BATTLEPASS_QUERY,
  formatBattlepassData,
  NO_DATA_BATTLEPASS_MSG,
} from './utils';

import styles from './index.module.css';

export const DetailRenderer = ({ values }) => (
  <div className={styles.battlepassContainer} key={values.titleId}>
    <div>
      <div>Battlepass</div>
      <div>Rank</div>
    </div>
    <div>
      <div className="flex flex-col">Season {values.seasonNo}</div>
      <div className="flex flex-col">{values.rank}</div>
    </div>
  </div>
);

DetailRenderer.propTypes = {
  values: PropTypes.object,
};

DetailRenderer.defaultProps = {
  values: null,
};

export const DetailsRenderer = ({ data, titleId }) => {
  const formattedData = useMemo(() => formatBattlepassData(data), [data]);
  const titleData = formattedData.get(parseInt(titleId, 10));
  return !isEmpty(titleData) && <DetailRenderer values={titleData} />;
};

DetailsRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleId: PropTypes.string.isRequired,
};

const Battlepass = props => {
  const { detailsProps, groupBy, linkToSection, titleEnvs, variables } = props;
  const { titleId } = detailsProps;
  const formatData = useCallback(formatBattlepassData, []);
  const customDataCheck = useCallback(
    data =>
      data.length &&
      data.some(
        battlepass =>
          battlepass.latestOwned &&
          (groupBy === 'services'
            ? titleEnvs &&
              titleEnvs.find(te => te.title.id === String(battlepass.titleId))
            : titleId === String(battlepass.titleId))
      ),
    [groupBy, titleEnvs, titleId]
  );
  const graphQLProps = useMemo(
    () => ({
      customDataCheck,
      detailsProps,
      noDataMsg: NO_DATA_BATTLEPASS_MSG,
      path: 'player.battlepass',
      query: BATTLEPASS_QUERY,
      variables,
    }),
    [customDataCheck, detailsProps, variables]
  );

  return groupBy === 'services' ? (
    <ServiceView
      addMostRecent
      DetailRenderer={DetailRenderer}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer DetailsRenderer={DetailsRenderer} {...graphQLProps} />
  );
};

Battlepass.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  titleEnvs: PropTypes.arrayOf(PropTypes.object),
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
Battlepass.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
  titleEnvs: [],
};

export default Battlepass;
