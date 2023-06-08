import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { userIDSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import BookmarkButton from './components/BookmarkButton';
import styles from './index.module.css';
import {
  sendRemoteCommand,
  addFavoriteCommand,
  deleteFavoriteCommand,
  favoriteCommandsSelector,
  sendCommandLoadingSelector,
  favoriteCommandsLoadingSelector,
} from '../../slice';

const CommandSender = ({
  userId,
  command,
  label,
  readOnly,
  favorite,
  favoriteCommands,
  isSending,
  isFavoritesUpdating,
  sendRemoteCommand: sendCommand,
  addFavoriteCommand: addFavorite,
  deleteFavoriteCommand: deleteFavorite,
  formatDateTime,
}) => {
  const { message: initialMessage, timestamp } = command;
  const [message, setMessage] = useState(initialMessage);
  const isBookmarked = useMemo(() => {
    if (
      favoriteCommands &&
      favoriteCommands.length > 0 &&
      favoriteCommands.find(fav => fav.message === message)
    ) {
      return true;
    }
    return false;
  }, [message]);
  const isPristine = useMemo(() => message === '', [message]);

  const onChange = e => setMessage(e.target.value);
  const onSubmit = e => {
    sendCommand(userId, message);
    e.preventDefault();
  };
  const onBookmarkClick = useMemo(
    () => () => {
      if (favorite) {
        deleteFavorite(message);
      } else if (!isBookmarked) {
        addFavorite(message);
      }
    },
    [message, favoriteCommands]
  );

  return (
    <div className={styles.flexContainer}>
      <form
        className={styles.formRoot}
        onSubmit={onSubmit}
        autoComplete="off"
        noValidate
      >
        <div className={styles.commandContainer}>
          {isFavoritesUpdating ? (
            <CircularProgress size={14} thickness={10} />
          ) : (
            <BookmarkButton
              onClick={onBookmarkClick}
              isBookmarked={isBookmarked}
              favorite={favorite}
              disabled={isPristine}
            />
          )}
          <TextField
            label={label}
            variant="outlined"
            defaultValue={initialMessage}
            InputProps={{
              readOnly,
            }}
            disabled={readOnly}
            onChange={onChange}
            className={styles.input}
          />
          <Button
            className={styles.sendButton}
            type="submit"
            color="primary"
            label="send"
            disabled={isPristine || isSending}
          >
            SEND
          </Button>
        </div>

        {timestamp && !favorite && (
          <div className={styles.timestampContainer}>
            {formatDateTime(timestamp)}
          </div>
        )}
      </form>
    </div>
  );
};

CommandSender.propTypes = {
  sendRemoteCommand: PropTypes.func.isRequired,
  addFavoriteCommand: PropTypes.func.isRequired,
  deleteFavoriteCommand: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  command: PropTypes.object,
  readOnly: PropTypes.bool,
  favorite: PropTypes.bool,
  isSending: PropTypes.bool,
  favoriteCommands: PropTypes.array,
  isFavoritesUpdating: PropTypes.bool,
};

CommandSender.defaultProps = {
  userId: null,
  command: { message: '' },
  label: undefined,
  readOnly: false,
  favorite: false,
  isSending: false,
  favoriteCommands: [],
  isFavoritesUpdating: false,
};

const stateToProps = state => ({
  favoriteCommands: favoriteCommandsSelector(state),
  formatDateTime: formatDateTimeSelector(state),
  userId: userIDSelector(state),
  isSending: sendCommandLoadingSelector(state),
  isFavoritesUpdating: favoriteCommandsLoadingSelector(state),
});

const dispatchToProps = {
  sendRemoteCommand,
  addFavoriteCommand,
  deleteFavoriteCommand,
};

export default connect(stateToProps, dispatchToProps)(CommandSender);
