import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import styles from './index.module.css';

/**
 * See https://github.com/mui-org/material-ui/issues/7956#issuecomment-326908167
 */
const RenderLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const EventDetailItem = ({
  className,
  CustomIcon,
  dataCy,
  disableTypography,
  icon,
  iconClassName,
  iconColor,
  isHidden,
  linkTo,
  onClick,
  primary,
  secondary,
  willDisplayIcon,
}) => {
  const renderIcon = () =>
    willDisplayIcon && (
      <ListItemIcon>
        {CustomIcon ? (
          <CustomIcon />
        ) : (
          <Icon className={iconClassName} color={iconColor} fontSize="small">
            {icon}
          </Icon>
        )}
      </ListItemIcon>
    );

  const renderText = () => (
    <ListItemText
      classes={{
        root: className,
        primary: styles.primary,
        secondary: styles.secondary,
      }}
      className={className}
      data-cy={dataCy}
      disableTypography={disableTypography}
      primary={primary}
      secondary={secondary}
      secondaryTypographyProps={{ component: 'span' }}
    />
  );

  return !isHidden ? (
    <ListItem
      onClick={onClick}
      to={linkTo}
      component={linkTo && RenderLink}
      className={styles.listContainer}
    >
      <>
        {renderIcon()}
        {renderText()}
      </>
    </ListItem>
  ) : null;
};

EventDetailItem.propTypes = {
  className: PropTypes.string,
  CustomIcon: PropTypes.func,
  dataCy: PropTypes.string,
  disableTypography: PropTypes.bool,
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  iconColor: PropTypes.string,
  isHidden: PropTypes.bool,
  linkTo: PropTypes.string,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.number,
  ]),
  willDisplayIcon: PropTypes.bool,
  onClick: PropTypes.func,
};

EventDetailItem.defaultProps = {
  className: undefined,
  CustomIcon: undefined,
  dataCy: undefined,
  disableTypography: false,
  icon: undefined,
  iconColor: 'inherit',
  iconClassName: undefined,
  isHidden: false,
  linkTo: undefined,
  secondary: undefined,
  willDisplayIcon: true,
  onClick: () => {},
};

export default EventDetailItem;
