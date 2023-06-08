import React from 'react';
import PropTypes from 'prop-types';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';

import ChallengeLogDetails from './components/ChallengeLogDetails';
import ChallengeLogDetailsEmpty from './components/ChallengeLogDetailsEmpty';
import ChallengeLogListItem from './components/ChallengeLogListItem';

import { COLUMNS } from './constants';

import './presentational.css';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <ChallengeLogListItem
      key={item.logId}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

const ChallengeLogsStateless = ({
  challengeLogs,
  nextPageToken,
  onClickListItem,
  onShowMore,
  onSearch,
  timezone,
  q,
}) => {
  const showMore = nextPageToken !== null;
  const [defaultSearchField, ...advancedSearchFields] = COLUMNS;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={challengeLogs.length} color="default" />

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="LogID"
        items={challengeLogs}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.logId);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
        defaultSearchField={defaultSearchField}
        advancedSearchFields={advancedSearchFields.filter(
          f => f.search !== false
        )}
        timezone={timezone}
      />
    </div>
  );

  const renderDetail = () => <ChallengeLogDetails />;

  const renderEmpty = () => <ChallengeLogDetailsEmpty />;

  return (
    <section className="challenge-logs">
      <div className="main-container challenge-logs">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
};

ChallengeLogsStateless.propTypes = {
  challengeLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPageToken: PropTypes.string,
  q: PropTypes.string,
  onClickListItem: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};

ChallengeLogsStateless.defaultProps = {
  nextPageToken: null,
  q: null,
};

export default ChallengeLogsStateless;
