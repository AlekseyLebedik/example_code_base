import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import { getRenderItemFunc } from './components/ListItem';
import { GROUP_STORY_FORM } from './components/GroupStoryFormDialog/constants';
import GroupStoryFormDialog from './components/GroupStoryFormDialog';
import * as actions from './actions';
import './index.css';

export const GroupStoriesSidebarBase = props => {
  const {
    baseUrl,
    currentProject,
    handleSetSelectedGroupStory,
    match,
    onDeleteThenRedirect,
    onFetchAllGroupStoryEvents,
    onFetchGroupStoryThenSelect,
    onResetGroupStoriesSidebar,
    onSearch,
    onShowMore,
    searchedGroupStoriesData,
    searchedGroupStoriesLoading,
    searchedGroupStoriesNext,
    selectedGroupStory,
  } = props;
  useEffect(() => {
    if (match.params.storyId) {
      onFetchGroupStoryThenSelect(match.params.storyId);
    }
  }, [match.params.storyId]);
  useEffect(() => {
    if (selectedGroupStory.id) {
      onFetchAllGroupStoryEvents(selectedGroupStory.id);
    }
  }, [selectedGroupStory]);
  useEffect(
    () => () => {
      onResetGroupStoriesSidebar();
    },
    []
  );

  const showMore = !!searchedGroupStoriesNext;
  return (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Stories"
        shown={searchedGroupStoriesData.length}
      >
        <GroupStoryFormDialog
          action="create"
          currentProject={currentProject}
          form={GROUP_STORY_FORM}
          icon="add"
          submitText="Create"
          submittingText="Creating"
          title="Create Group Story"
        />
      </SectionTitle>
      <SearchableList
        searchEnabled
        placeholder="Story name"
        items={searchedGroupStoriesData}
        getItemKey={item => item.id}
        toRenderFunc={getRenderItemFunc(
          item => {
            handleSetSelectedGroupStory(item, `${baseUrl}stories/`);
          },
          selectedGroupStory,
          onDeleteThenRedirect,
          currentProject
        )}
        emptyClassName="stories-empty-list"
        onSearch={onSearch}
        showMore={showMore}
        loadingMaster={searchedGroupStoriesLoading}
        onShowMore={() => onShowMore(searchedGroupStoriesNext)}
      />
    </div>
  );
};

GroupStoriesSidebarBase.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  currentProject: PropTypes.object.isRequired,
  handleSetSelectedGroupStory: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  onDeleteThenRedirect: PropTypes.func.isRequired,
  onFetchAllGroupStoryEvents: PropTypes.func.isRequired,
  onFetchGroupStoryThenSelect: PropTypes.func.isRequired,
  onResetGroupStoriesSidebar: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  searchedGroupStoriesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedGroupStoriesLoading: PropTypes.bool.isRequired,
  searchedGroupStoriesNext: PropTypes.string,
  selectedGroupStory: PropTypes.object.isRequired,
};

GroupStoriesSidebarBase.defaultProps = {
  searchedGroupStoriesNext: null,
};

const mapStateToProps = state => ({
  currentProject: currentProjectSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onFetchAllGroupStoryEvents: bindActionCreators(
    actions.fetchAllGroupStoryEvents,
    dispatch
  ),
  onFetchGroupStoryThenSelect: storyId =>
    dispatch(actions.fetchGroupStoryThenSelect(storyId)),
  onResetGroupStoriesSidebar: () =>
    dispatch(actions.resetGroupStoriesSidebar()),
});
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onFetchAllGroupStoryEvents: storyId =>
    propsFromDispatch.onFetchAllGroupStoryEvents({
      project: propsFromState.currentProject.id,
      story: storyId,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(GroupStoriesSidebarBase);
