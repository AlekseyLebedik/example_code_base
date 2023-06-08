import React, { useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { findSubsection } from '../../helpers';
import { BookmarksContext } from '../../context';
import styles from './index.module.css';

const useButtonStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(-0.75, 0),
  },
}));

const BookmarkOrLoading = React.forwardRef(
  (
    {
      bookmarkLoadingKeys,
      className,
      deleteOnly,
      favKey,
      iconProps,
      isBookmarked,
      onClick,
    },
    ref
  ) => {
    const classes = useButtonStyles();
    if (bookmarkLoadingKeys.includes(favKey)) {
      return (
        <IconButton
          className={classNames(
            styles.pinningButton,
            className,
            styles.persistentIcon
          )}
          ref={ref}
          classes={classes}
        >
          <CircularProgress className="progress" size={14} thickness={10} />
        </IconButton>
      );
    }
    return (
      <IconButton
        className={classNames(styles.pinningButton, className, {
          [styles.persistentIcon]: isBookmarked && !deleteOnly,
        })}
        onClick={onClick}
        key={favKey}
        style={{ cursor: 'pointer' }}
        color="primary"
        ref={ref}
        classes={classes}
      >
        <Icon className={styles.pinningIcon} fontSize="small" {...iconProps}>
          {isBookmarked ? 'bookmark' : 'bookmark_border'}
        </Icon>
      </IconButton>
    );
  }
);

BookmarkOrLoading.displayName = 'BookmarkOrLoading';

BookmarkOrLoading.propTypes = {
  bookmarkLoadingKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  deleteOnly: PropTypes.bool,
  favKey: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
  isBookmarked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
BookmarkOrLoading.defaultProps = {
  className: undefined,
  deleteOnly: false,
  iconProps: {},
  isBookmarked: false,
};

const BookmarkButton = React.forwardRef((props, ref) => {
  const { favKey, parentKey, section, className, iconProps, deleteOnly } =
    props;
  const {
    bookmarks: {
      routes: bookmarksList,
      addBookmark,
      deleteBookmark,
      addSectionBookmark,
      deleteSectionBookmark,
      loadingKeys: bookmarkLoadingKeys,
    },
  } = useContext(BookmarksContext);
  const bookmarkFind = bookmarksList.find(i => i.key === favKey);
  const isBookmarked = useMemo(
    () =>
      (section && bookmarkFind && bookmarkFind.parentBookmark) ||
      (!section &&
        !!findSubsection({
          parentKey,
          subsectionKey: favKey,
          routes: bookmarksList,
        })),
    [section, favKey, bookmarksList, bookmarkFind, parentKey]
  );

  const onClick = useCallback(() => {
    if (deleteOnly || isBookmarked) {
      if (section) {
        return deleteSectionBookmark(favKey);
      }
      return deleteBookmark(favKey, parentKey);
    }

    if (section) {
      return addSectionBookmark(favKey);
    }
    return addBookmark(favKey, parentKey);
  }, [
    deleteOnly,
    isBookmarked,
    section,
    parentKey,
    favKey,
    addBookmark,
    addSectionBookmark,
    deleteBookmark,
    deleteSectionBookmark,
  ]);
  const classes = useButtonStyles();

  return deleteOnly ? (
    <IconButton
      className={classNames(styles.pinningButton, className)}
      onClick={onClick}
      key={favKey}
      style={{ cursor: 'pointer' }}
      color="secondary"
      ref={ref}
      classes={classes}
    >
      <Icon className={styles.pinningIcon} {...iconProps}>
        remove_circle
      </Icon>
    </IconButton>
  ) : (
    <BookmarkOrLoading
      bookmarkLoadingKeys={bookmarkLoadingKeys}
      className={className}
      deleteOnly={deleteOnly}
      favKey={favKey}
      iconProps={iconProps}
      isBookmarked={isBookmarked}
      onClick={onClick}
      ref={ref}
    />
  );
});

BookmarkButton.displayName = 'BookmarkButton';

BookmarkButton.propTypes = {
  favKey: PropTypes.string.isRequired,
  section: PropTypes.bool,
  parentKey: PropTypes.string,
  className: PropTypes.string,
  iconProps: PropTypes.object,
  deleteOnly: PropTypes.bool,
};
BookmarkButton.defaultProps = {
  section: false,
  parentKey: null,
  className: undefined,
  iconProps: {},
  deleteOnly: false,
};

export default BookmarkButton;
