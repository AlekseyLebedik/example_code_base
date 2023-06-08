import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { shouldUseProfileSettingsSelector } from 'playpants/components/App/selectors';
import { discussionDataSelector } from 'playpants/scenes/Event/selectors';
import {
  getNowTimestamp,
  timezoneOrDefaultSelector,
} from 'playpants/helpers/dateTime';
import { useUpdateUserTimestamp } from 'playpants/hooks';
import { USER_EVENT_SETTINGS } from 'playpants/constants/event';
import * as Actions from '../../actions';

import DiscussionStateless from './presentational';

const useScrollToBottom = (props, domRef) => {
  const scrollToBottom = () => {
    const msgContainer = domRef.current;
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.discussionData]);
};

export const DiscussionBase = props => {
  const domRef = useRef();
  const [input, setInput] = useState('');

  // auto scroll to bottom of discussion container
  useScrollToBottom(props, domRef);
  // update user discussion timestamp on view
  useUpdateUserTimestamp(
    USER_EVENT_SETTINGS.lastVisit.key,
    props.eventData.id,
    'discussion',
    props.userLastVisits,
    props.updateUserProfileSetting,
    props._useProfileSettings
  );

  const handleSubmit = () => {
    const { currentUser, createComment, eventData } = props;
    if (input.length > 0) {
      const data = {
        text: input,
        user: currentUser.id,
        timestamp: getNowTimestamp(),
      };

      createComment(eventData.id, data);
      setInput('');
    }
  };

  const newProps = {
    ...props,
    domRef,
    input,
    setInput,
    handleSubmit,
    lastDiscussionView: props.userLastVisits.discussion,
  };
  return <DiscussionStateless {...newProps} />;
};

const mapStateToProps = state => ({
  discussionData: discussionDataSelector(state),
  _useProfileSettings: shouldUseProfileSettingsSelector(state),
  timezone: timezoneOrDefaultSelector(state),
});

const mapDispatchToProps = dispatch => ({
  createComment: bindActionCreators(Actions.createComment, dispatch),
  loadDiscussion: bindActionCreators(Actions.fetchDiscussion, dispatch),
});

DiscussionBase.propTypes = {
  createComment: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  loadDiscussion: PropTypes.func.isRequired,
  updateUserProfileSetting: PropTypes.func.isRequired,
  userLastVisits: PropTypes.object.isRequired,
  _useProfileSettings: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionBase);
