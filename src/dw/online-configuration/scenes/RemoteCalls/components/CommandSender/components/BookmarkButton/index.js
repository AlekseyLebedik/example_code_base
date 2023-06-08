import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const BookmarkButton = ({
  onClick,
  isBookmarked,
  favorite,
  className,
  ...props
}) => {
  const icon =
    (favorite && 'remove_circle') ||
    (isBookmarked && 'bookmark') ||
    'bookmark_border';
  return (
    <IconButton
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      color={favorite ? 'secondary' : 'primary'}
      className={className}
      {...props}
    >
      <Icon>{icon}</Icon>
    </IconButton>
  );
};

BookmarkButton.propTypes = {
  onClick: PropTypes.func,
  isBookmarked: PropTypes.bool,
  favorite: PropTypes.bool,
  className: PropTypes.string,
};

BookmarkButton.defaultProps = {
  onClick: () => {},
  isBookmarked: false,
  favorite: false,
  className: undefined,
};

export default BookmarkButton;
