import React from 'react';
import PropTypes from 'prop-types';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';

import CallDetails from './components/CallDetails';
import CallDetailsEmpty from './components/CallDetailsEmpty';
import CallListItem from './components/CallListItem';

import { defaultSearchField, advancedSearchFields } from './constants';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <CallListItem
      key={item.transactionId}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function CallsStateless(props) {
  const {
    calls,
    nextPageToken,
    q,
    onSearch,
    onShowMore,
    onClickListItem,
    selectedCall,
    onClickViewLogs,
    timezone,
  } = props;

  const showMore = nextPageToken !== null;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={calls.length} color="default" />

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="Transaction ID"
        items={calls}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.transactionId);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
        defaultSearchField={defaultSearchField}
        advancedSearchFields={advancedSearchFields}
        timezone={timezone}
        loadingTimeout={0}
      />
    </div>
  );

  const renderDetail = () => (
    <CallDetails
      selectedCall={selectedCall}
      onClickViewLogs={onClickViewLogs}
    />
  );

  const renderEmpty = () => <CallDetailsEmpty />;

  return (
    <section className="calls">
      <div className="calls-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

CallsStateless.propTypes = {
  calls: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPageToken: PropTypes.string,
  onClickListItem: PropTypes.func.isRequired,
  onClickViewLogs: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  q: PropTypes.object,
  selectedCall: PropTypes.object,
  timezone: PropTypes.string.isRequired,
};
CallsStateless.defaultProps = {
  q: {},
  nextPageToken: null,
  onClickViewLogs: () => {},
  selectedCall: null,
};

export default CallsStateless;
