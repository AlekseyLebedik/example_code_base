import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { humanizedElapsedTime } from 'playpants/helpers/dateTime';
import RootRef from '@material-ui/core/RootRef';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';

import keyPressAction from 'playpants/helpers/keyPressAction';

import styles from './index.module.css';

const DiscussionStateless = ({
  discussionData,
  classes,
  domRef,
  input,
  setInput,
  handleSubmit,
  currentUser,
  lastDiscussionView,
  timezone,
}) => {
  const messages = discussionData.map(message => {
    const dateString = humanizedElapsedTime(message.timestamp, timezone);

    return (
      <div key={message.id} className={styles.messageBlock}>
        <Badge
          variant="dot"
          invisible={
            message.timestamp < lastDiscussionView ||
            message.user.id === currentUser.id
          }
        >
          <u className={styles.username} data-cy="discussionUserAndDate">
            {message.user.name}:
          </u>{' '}
          {dateString}
        </Badge>
        <div className={styles.message} data-cy="discussionMessage">
          {message.text}
        </div>
      </div>
    );
  });

  return (
    <div className={classNames(classes.font, styles.discussionContainer)}>
      <RootRef rootRef={domRef}>
        <div className={styles.messagesContainer}>{messages.reverse()}</div>
      </RootRef>
      <TextField
        autoFocus
        className={styles.textField}
        data-cy="discussionInput"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                color="primary"
                data-cy="sendMessageButton"
                onClick={handleSubmit}
                variant="contained"
              >
                <Icon>send</Icon>
              </Button>
            </InputAdornment>
          ),
        }}
        onChange={({ target: { value } }) => setInput(value)}
        onKeyDown={e => keyPressAction(e, handleSubmit)}
        placeholder="Type your message here"
        value={input}
        variant="outlined"
      />
    </div>
  );
};

DiscussionStateless.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  discussionData: PropTypes.arrayOf(PropTypes.object).isRequired,
  domRef: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  lastDiscussionView: PropTypes.number,
  setInput: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
};
DiscussionStateless.defaultProps = {
  lastDiscussionView: 0,
};

export default DiscussionStateless;
