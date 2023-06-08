import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './index.module.css';

const EventDetailHeader = ({
  avatarClassName,
  className,
  primary,
  secondary,
  gamerTagProps,
}) => {
  const title = useRef();
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    setOverflow(title.current.scrollHeight > title.current.offsetHeight);
  }, []);
  return (
    <ListItem className={className}>
      <ListItemAvatar>
        {gamerTagProps ? (
          <Tooltip
            title={
              gamerTagProps.displayColorPicker ? 'Collapse' : 'Change color'
            }
          >
            <Avatar
              style={{ backgroundColor: gamerTagProps.color }}
              classes={{ root: avatarClassName, fallback: styles.avatarIcon }}
              onClick={gamerTagProps.onClick}
            />
          </Tooltip>
        ) : (
          <Avatar
            classes={{ root: avatarClassName, fallback: styles.avatarIcon }}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Tooltip title={overflow ? primary : ''}>
            <Typography
              variant="h5"
              component="h1"
              className={styles.header}
              ref={title}
            >
              {primary}
            </Typography>
          </Tooltip>
        }
        secondary={secondary}
        secondaryTypographyProps={{ className: styles.secondaryTypography }}
      />
    </ListItem>
  );
};

EventDetailHeader.propTypes = {
  gamerTagProps: PropTypes.object,
  className: PropTypes.string,
  avatarClassName: PropTypes.string,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
};

EventDetailHeader.defaultProps = {
  className: undefined,
  avatarClassName: undefined,
  secondary: undefined,
  gamerTagProps: undefined,
};

export default EventDetailHeader;
