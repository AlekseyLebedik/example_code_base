import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SectionTitle from 'dw/core/components/SectionTitle';
import TextField from 'dw/core/components/FormFields/ContrastInput';

import SourceSelect from 'dw/core/components/SourceSelect';
import Table from 'dw/core/components/TableHydrated';
import NextPageButton from 'dw/core/components/NextPageButton';

import { COLUMNS } from './constants';
import { renderRoutes } from '../../routes';

import './presentational.css';

const AnticheatStatisticsStateless = ({
  baseUrl,
  anticheatStatistics,
  nextPageToken,
  onShowMore,
  onSearch,
  userID,
  challengeId,
  changeUserId,
  changeChallengeId,
  renderOptionFunc,
  apiCallFunc,
}) => {
  const empty = () => <div className="empty">No data to display</div>;

  const renderTable = () => (
    <Table data={anticheatStatistics} columns={COLUMNS} />
  );

  return (
    <section className="anticheat-statistics main-container flex-rows-container by-date">
      <SectionTitle
        small
        extraContent={
          <span className="filter-options">
            <SourceSelect
              size="large"
              placeholder="search for a UserId or Username"
              defaultValue={userID}
              onSelect={newValue => changeUserId(newValue)}
              renderOption={renderOptionFunc}
              apiCall={apiCallFunc}
            />
            <TextField
              className="challenge-id"
              label="Challenge Id"
              InputLabelProps={{ shrink: true }}
              type="number"
              value={challengeId || ''}
              onChange={event => changeChallengeId(event.target.value)}
              min={0}
            />

            <Tooltip title="Reload" placement="bottom">
              <IconButton color="inherit" onClick={onSearch}>
                <Icon>replay</Icon>
              </IconButton>
            </Tooltip>
          </span>
        }
      />
      {renderRoutes(baseUrl, 'by-date')}
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
  userID: PropTypes.string,
  challengeId: PropTypes.string,
  changeUserId: PropTypes.func.isRequired,
  changeChallengeId: PropTypes.func.isRequired,
  renderOptionFunc: PropTypes.func.isRequired,
  apiCallFunc: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

AnticheatStatisticsStateless.defaultProps = {
  nextPageToken: null,
  userID: null,
  challengeId: null,
};

export default AnticheatStatisticsStateless;
