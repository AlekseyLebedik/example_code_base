import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from 'dw/core/components/SectionTitle';
import ContrastInput from 'dw/core/components/FormFields/ContrastInput';
import DateTimePicker from 'dw/core/components/DateTimePicker';

import Table from 'dw/core/components/TableHydrated';
import NextPageButton from 'dw/core/components/NextPageButton';

import { COLUMNS } from './constants';
import { renderRoutes } from '../../routes';

import styles from './presentational.module.css';

const AnticheatStatisticsStateless = ({
  baseUrl,
  anticheatStatistics,
  nextPageToken,
  onShowMore,
  onSearch,
  challengeId,
  date,
  changeChallengeId,
  changeDate,
}) => {
  const empty = () => <div className="empty">No data to display</div>;

  const renderTable = () => (
    <Table data={anticheatStatistics} columns={COLUMNS} />
  );

  return (
    <section className="anticheat-statistics main-container flex-rows-container by-user">
      <SectionTitle
        small
        extraContent={
          <span className="filter-options">
            <ContrastInput
              className="challenge-id"
              label="Challenge Id"
              InputLabelProps={{ shrink: true }}
              type="number"
              value={challengeId || ''}
              onChange={event => changeChallengeId(event.target.value)}
              min={0}
            />
            <ContrastInput
              wraps={DateTimePicker}
              autoOk
              label="Date"
              InputProps={{ input: styles.date }}
              fullWidth={false}
              dateOnly
              value={date}
              onChange={changeDate}
              returnTimestamp
            />

            <Tooltip title="Reload" placement="bottom">
              <IconButton color="inherit" onClick={onSearch}>
                <Icon>replay</Icon>
              </IconButton>
            </Tooltip>
          </span>
        }
      />
      {renderRoutes(baseUrl, 'by-user')}
      <div className="scrollable-content">
        {anticheatStatistics.length === 0 ? empty() : renderTable()}
      </div>
      {nextPageToken && (
        <NextPageButton nextPageToken={nextPageToken} onClick={onShowMore} />
      )}
    </section>
  );
};

AnticheatStatisticsStateless.propTypes = {
  anticheatStatistics: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  baseUrl: PropTypes.string.isRequired,
  nextPageToken: PropTypes.string,
  onShowMore: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  challengeId: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  changeChallengeId: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
};

AnticheatStatisticsStateless.defaultProps = {
  nextPageToken: null,
};

export default AnticheatStatisticsStateless;
