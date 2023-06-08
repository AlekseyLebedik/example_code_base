import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DateTimePicker from 'dw/core/components/DateTimePicker';
import ContrastInput from 'dw/core/components/FormFields/ContrastInput';

import SectionTitle from 'dw/core/components/SectionTitle';
import SourceSelect from 'dw/core/components/SourceSelect';
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
  userID,
  date,
  changeUserId,
  changeDate,
  renderOptionFunc,
  apiCallFunc,
}) => {
  const empty = () => <div className="empty">No data to display</div>;

  const renderTable = () => (
    <Table data={anticheatStatistics} columns={COLUMNS} />
  );

  return (
    <section className="anticheat-statistics main-container flex-rows-container by-challenge">
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
            <ContrastInput
              className={styles.date}
              InputProps={{ input: styles.date }}
              wraps={DateTimePicker}
              autoOk
              fullWidth={false}
              label="Date"
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
      {renderRoutes(baseUrl, 'by-challenge')}
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
  userID: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  changeUserId: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  renderOptionFunc: PropTypes.func.isRequired,
  apiCallFunc: PropTypes.func.isRequired,
};

AnticheatStatisticsStateless.defaultProps = {
  nextPageToken: null,
};

export default AnticheatStatisticsStateless;
