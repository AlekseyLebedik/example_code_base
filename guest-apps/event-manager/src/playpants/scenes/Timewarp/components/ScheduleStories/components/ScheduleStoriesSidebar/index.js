import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import ScheduleStoryFormDialog from './components/ScheduleStoryFormDialog';
import { showContextFieldSelector } from './components/ScheduleStoryFormDialog/selectors';
import { getRenderItemFunc } from './components/ListItem';
import './index.css';

const ScheduleStoriesSidebar = props => {
  const {
    allowDetachedEvents,
    currentProject,
    handleSetSelectedScheduleStory,
    onSearch,
    onShowMore,
    searchedScheduleStoriesData,
    searchedScheduleStoriesLoading,
    searchedScheduleStoriesNext,
    selectedScheduleStory,
    showContextField,
  } = props;

  const showMore = !!searchedScheduleStoriesNext;
  return (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Schedules"
        shown={searchedScheduleStoriesData.length}
      >
        <ScheduleStoryFormDialog
          allowDetachedEvents={allowDetachedEvents}
          action="create"
          currentProject={currentProject}
          icon="add"
          showContextField={showContextField}
          submitText="Create"
          submittingText="Creating"
          title="Create Schedule Story"
        />
      </SectionTitle>
      <SearchableList
        searchEnabled
        placeholder="Story name"
        items={searchedScheduleStoriesData}
        getItemKey={item => item.id}
        toRenderFunc={getRenderItemFunc(item => {
          handleSetSelectedScheduleStory(item);
        }, selectedScheduleStory)}
        emptyClassName="stories-empty-list"
        onSearch={onSearch}
        showMore={showMore}
        loadingMaster={searchedScheduleStoriesLoading}
        onShowMore={() => onShowMore(searchedScheduleStoriesNext)}
      />
    </div>
  );
};

ScheduleStoriesSidebar.propTypes = {
  allowDetachedEvents: PropTypes.bool.isRequired,
  currentProject: PropTypes.object.isRequired,
  handleSetSelectedScheduleStory: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  searchedScheduleStoriesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedScheduleStoriesLoading: PropTypes.bool.isRequired,
  searchedScheduleStoriesNext: PropTypes.string,
  selectedScheduleStory: PropTypes.object.isRequired,
  showContextField: PropTypes.bool.isRequired,
};

ScheduleStoriesSidebar.defaultProps = {
  searchedScheduleStoriesNext: null,
};

const mapStateToProps = state => ({
  currentProject: currentProjectSelector(state),
  showContextField: showContextFieldSelector(state),
});

export default connect(mapStateToProps)(ScheduleStoriesSidebar);
