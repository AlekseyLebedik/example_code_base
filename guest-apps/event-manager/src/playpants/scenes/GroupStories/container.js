import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import {
  currentProjectIdSelector,
  currentProjectSelector,
  getBaseURL,
} from 'playpants/components/App/selectors';
import StatelessGroupStories from './presentational';
import * as actions from './actions';
import * as selectors from './selectors';
import { selectedEventSelector } from './components/GroupStoriesSidebar/selectors';

const GroupStories = props => {
  const { history, onResetGroupStories, onSearch, onSetSelectedGroupStory } =
    props;
  useEffect(() => {
    onSearch({ q: '' });
  }, []);
  useEffect(
    () => () => {
      onResetGroupStories();
    },
    []
  );
  const handleSetSelectedGroupStory = (story, baseUrl) => {
    history.push(joinPath(baseUrl, story.id));
    onSetSelectedGroupStory(story);
  };
  return (
    <StatelessGroupStories
      {...props}
      handleSetSelectedGroupStory={handleSetSelectedGroupStory}
    />
  );
};

GroupStories.propTypes = {
  history: PropTypes.object.isRequired,
  onResetGroupStories: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSetSelectedGroupStory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  baseUrl: getBaseURL(state),
  currentProject: currentProjectSelector(state),
  currentProjectId: currentProjectIdSelector(state),
  eventDetailData: selectedEventSelector(state),
  searchedGroupStoriesData: selectors.searchedGroupStoriesDataSelector(state),
  searchedGroupStoriesLoading:
    selectors.searchedGroupStoriesLoadingSelector(state),
  searchedGroupStoriesNext: selectors.searchedGroupStoriesNextSelector(state),
  selectedGroupStory: selectors.selectedGroupStorySelector(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteThenRedirect: bindActionCreators(
    actions.deleteThenRedirect,
    dispatch
  ),
  onResetGroupStories: () => dispatch(actions.resetGroupStories()),
  onSearch: bindActionCreators(actions.searchGroupStories, dispatch),
  onSetSelectedGroupStory: story =>
    dispatch(actions.setSelectedGroupStory(story)),
  onShowMore: nextPage => dispatch(actions.searchGroupStories({ nextPage })),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onDeleteThenRedirect: storyId =>
    propsFromDispatch.onDeleteThenRedirect(storyId, () =>
      ownProps.history.push(`${propsFromState.baseUrl}stories/`)
    ),
  onSearch: payload =>
    propsFromDispatch.onSearch({
      name__icontains: payload.q,
      project: propsFromState.currentProjectId,
      schedule: 'null',
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  GroupStories,
  mergeProps
);
