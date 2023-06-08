import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Table from 'dw/core/components/TableHydrated';
import NextPageButton from 'dw/core/components/NextPageButton';
import Search from 'dw/core/components/Search';
import SectionTitle from 'dw/core/components/SectionTitle';
import ContrastInput from 'dw/core/components/FormFields/ContrastInput';
import SelectField from 'dw/core/components/Select';

import {
  COLUMNS,
  defaultSearchField,
  advancedSearchFields,
  orderChoices,
} from './constants';
import './presentational.css';

const ChallengeGenerationLogsStateless = ({
  challengeGenerationLogs,
  nextPageToken,
  onShowMore,
  timezone,
  onSearchParamsChange,
  onOrderChange,
  filteringEnabled,
  order,
  q,
}) => {
  const empty = <div className="empty">No data to display</div>;
  const renderTable = () => (
    <Table data={challengeGenerationLogs} columns={COLUMNS} />
  );

  return (
    <section className="main-container challenge-generation-logs flex-rows-container">
      <SectionTitle
        small
        extraContent={
          filteringEnabled && (
            <span className="filter-options">
              <Search
                initialValue={q}
                placeholder="Event ID"
                defaultSearchField={defaultSearchField}
                advancedSearchFields={advancedSearchFields}
                timezone={timezone}
                onSearch={onSearchParamsChange}
              />
              <ContrastInput
                wraps={SelectField}
                className="order"
                label="Order"
                InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                value={order}
                onChange={e => onOrderChange(e.target.value)}
                menuItemStyle={{ textTransform: 'capitalize' }}
                style={{ textTransform: 'capitalize' }}
              >
                {orderChoices.map(({ text, value }) => (
                  <MenuItem value={value} key={value}>
                    {text}
                  </MenuItem>
                ))}
              </ContrastInput>
            </span>
          )
        }
      />
      <div className="scrollable-content with-inner-padding">
        {challengeGenerationLogs.length === 0 ? empty : renderTable()}
      </div>
      {nextPageToken && (
        <NextPageButton nextPageToken={nextPageToken} onClick={onShowMore} />
      )}
    </section>
  );
};

ChallengeGenerationLogsStateless.propTypes = {
  challengeGenerationLogs: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  onShowMore: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
  timezone: PropTypes.string.isRequired,
  onSearchParamsChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  q: PropTypes.object,
  filteringEnabled: PropTypes.bool.isRequired,
  order: PropTypes.string.isRequired,
};

ChallengeGenerationLogsStateless.defaultProps = {
  nextPageToken: null,
  q: null,
};

export default ChallengeGenerationLogsStateless;
