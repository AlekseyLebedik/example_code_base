import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import times from 'lodash/times';
import toUpper from 'lodash/toUpper';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';

import {
  displayNumberToFixedOrDefault,
  formatTitleSummaryData,
  getTimePlayedHrsMin,
  NO_DATA_TITLE_SUMMARY_MSG,
  TITLE_SUMMARY_QUERY,
} from './utils';

import styles from './index.module.css';

export const DetailRenderer = ({
  formatDateTime,
  kdratio,
  logins,
  prestige,
  rank,
  scorePerGame,
  scorePerMinute,
  timePlayedTotal,
  titleId,
}) => (
  <div
    className={styles.titleSummaryContainer}
    data-cy="playerViewTitleSummaryDetails"
    key={titleId}
  >
    <div>
      <div>Last Played</div>
      {logins.length > 1 &&
        times(logins.length - 1, t => (
          <div
            className={styles.lastPlayedText}
            key={`detailLoginTimes/${t}/${titleId}`}
          >
            {' '}
          </div>
        ))}
      <div>Rank</div>
      <div>Prestige Level</div>
      <div>Time Played Total</div>
      <div>Score per minute</div>
      <div>Score per game</div>
      <div>Kill death ratio</div>
    </div>
    <div>
      {logins.length > 0
        ? logins.map(login => (
            <div
              className={classNames('flex flex-col', styles.lastPlayedText)}
              key={`detailLogin/${login?.gameMode}-${login?.platform}-${login?.lastLogin}`}
            >
              {[
                login?.gameMode,
                toUpper(login?.platform),
                formatDateTime(login?.lastLogin, 'MMM DD hh:mma'),
              ]
                .filter(value => !isNil(value))
                .join('    ')}
            </div>
          ))
        : '-'}
      <div className="flex flex-col">{rank}</div>
      <div className="flex flex-col">{prestige}</div>
      <div className="flex flex-col">
        {getTimePlayedHrsMin(timePlayedTotal)}
      </div>
      <div className="flex flex-col">
        {displayNumberToFixedOrDefault(scorePerMinute, 2)}
      </div>
      <div className="flex flex-col">
        {displayNumberToFixedOrDefault(scorePerGame, 1)}
      </div>
      <div className="flex flex-col">
        {displayNumberToFixedOrDefault(kdratio, 3)}
      </div>
    </div>
  </div>
);

DetailRenderer.propTypes = {
  formatDateTime: PropTypes.func.isRequired,
  kdratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  logins: PropTypes.arrayOf(PropTypes.object),
  prestige: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scorePerGame: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scorePerMinute: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  timePlayedTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  titleId: PropTypes.number.isRequired,
};

DetailRenderer.defaultProps = {
  kdratio: '-',
  logins: [],
  prestige: '-',
  rank: '-',
  scorePerGame: '-',
  scorePerMinute: '-',
  timePlayedTotal: '-',
};

export const DetailsRenderer = ({ data, titleId }) => {
  const formattedData = useMemo(() => formatTitleSummaryData(data), [data]);
  const formatDateTime = useSelector(formatDateTimeSelector);
  return (
    !isEmpty(formattedData) && (
      <DetailRenderer
        formatDateTime={formatDateTime}
        titleId={titleId}
        {...formattedData}
      />
    )
  );
};

DetailsRenderer.propTypes = {
  data: PropTypes.object,
  titleId: PropTypes.string.isRequired,
};
DetailsRenderer.defaultProps = {
  data: {},
};

const TitleSummary = props => {
  const { detailsProps, groupBy, titleEnvs, variables } = props;
  const { titleId } = detailsProps;
  const customDataCheck = useCallback(
    data => !isEmpty(data) && !isEmpty(data.codStats),
    [groupBy, titleEnvs, titleId]
  );
  const graphQLProps = useMemo(
    () => ({
      customDataCheck,
      detailsProps,
      noDataMsg: NO_DATA_TITLE_SUMMARY_MSG,
      path: 'player',
      query: TITLE_SUMMARY_QUERY,
      variables,
    }),
    [customDataCheck, detailsProps, variables]
  );

  return groupBy === 'titles' ? (
    <GraphQLStateRenderer DetailsRenderer={DetailsRenderer} {...graphQLProps} />
  ) : null;
};

TitleSummary.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  titleEnvs: PropTypes.object,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
TitleSummary.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
  titleEnvs: {},
};

export default TitleSummary;
