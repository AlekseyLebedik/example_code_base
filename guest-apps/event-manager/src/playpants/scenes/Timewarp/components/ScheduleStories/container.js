import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import {
  allowDetachedEventsSelector,
  currentProjectIdSelector,
  currentProjectSelector,
  getBaseURL,
} from 'playpants/components/App/selectors';
import { getLocalStorageHistory } from 'playpants/helpers/localStorage';
import { TIMEWARP_LS_KEY } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';
import StatelessScheduleStories from './presentational';

export const ScheduleStoriesBase = props => {
  const {
    baseUrl,
    history,
    location,
    match,
    onFetchScheduleStoryThenSelect,
    onResetScheduleStories,
    onSearch,
    onStartPollSchedules,
    onStopPollSchedules,
    currentProjectId,
  } = props;

  useEffect(() => {
    const timewarpHistory = getLocalStorageHistory(
      currentProjectId,
      TIMEWARP_LS_KEY
    );

    if (
      timewarpHistory.selectedScheduleStory &&
      timewarpHistory.selectedScheduleStory.id
    ) {
      const { id } = timewarpHistory.selectedScheduleStory;
      onFetchScheduleStoryThenSelect(id);
    }
    onSearch({ q: '' });
    onStartPollSchedules();
  }, []);

  useEffect(() => {
    if (match.params.timewarpTab !== 'schedules') {
      onResetScheduleStories();
      onStopPollSchedules();
    } else {
      const { storyId } = matchPath(location.pathname, {
        path: joinPath(baseUrl, 'timewarp', 'schedules', ':storyId?'),
      }).params;
      if (storyId) {
        onFetchScheduleStoryThenSelect(storyId);
      }
    }
  }, [location.pathname]);
  useEffect(
    () => () => {
      onResetScheduleStories();
      onStopPollSchedules();
    },
    []
  );
  const handleSetSelectedScheduleStory = story => {
    history.push(joinPath(baseUrl, 'timewarp', 'schedules', story.id, 'tasks'));
  };
  return (
    <StatelessScheduleStories
      {...props}
      handleSetSelectedScheduleStory={handleSetSelectedScheduleStory}
    />
  );
};

ScheduleStoriesBase.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  currentProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onFetchScheduleStoryThenSelect: PropTypes.func.isRequired,
  onResetScheduleStories: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSetSelectedScheduleStory: PropTypes.func.isRequired,
  onStartPollSchedules: PropTypes.func.isRequired,
  onStopPollSchedules: PropTypes.func.isRequired,
  selectedScheduleStory: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  allowDetachedEvents: allowDetachedEventsSelector(state),
  baseUrl: getBaseURL(state),
  currentProject: currentProjectSelector(state),
  currentProjectId: currentProjectIdSelector(state),
  searchedScheduleStoriesData:
    selectors.searchedScheduleStoriesDataSelector(state),
  searchedScheduleStoriesLoading:
    selectors.searchedScheduleStoriesLoadingSelector(state),
  searchedScheduleStoriesNext:
    selectors.searchedScheduleStoriesNextSelector(state),
  selectedScheduleStory: selectors.selectedScheduleStorySelector(state),
});

const mapDispatchToProps = dispatch => ({
  onStartPollSchedules: () => dispatch(actions.startPollSchedules()),
  onStopPollSchedules: () => dispatch(actions.stopPollSchedules()),
  onFetchScheduleStoryThenSelect: storyId =>
    dispatch(actions.fetchScheduleStoryThenSelect(storyId)),
  onResetScheduleStories: () => dispatch(actions.resetScheduleStories()),
  onSearch: bindActionCreators(actions.searchScheduleStories, dispatch),
  onSetSelectedScheduleStory: story =>
    dispatch(actions.setSelectedScheduleStory(story)),
  onShowMore: nextPage => dispatch(actions.searchScheduleStories({ nextPage })),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onSearch: payload =>
    propsFromDispatch.onSearch({
      name__icontains: payload.q,
      project: propsFromState.currentProjectId,
      title_env__gt: 0,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  ScheduleStoriesBase,
  mergeProps
);
