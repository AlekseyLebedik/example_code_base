import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
  root: {
    transition: '0.3s',
  },
  colorPrimary: {
    color: theme.palette.action.active,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  colorSecondary: {
    color: theme.palette.action.active,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
});

const displayIcon = ({
  classes,
  className,
  color,
  dataCy,
  disabled,
  icon,
  iconProps,
  onClick,
  size,
  text,
  type,
  variant,
}) => {
  switch (type) {
    case 'fab':
      return (
        <Fab
          className={className}
          color={color}
          data-cy={dataCy}
          disabled={disabled}
          onClick={onClick}
          variant={variant}
        >
          <Icon fontSize={size} {...iconProps}>
            {icon}
          </Icon>
          {text}
        </Fab>
      );
    case 'button':
      return (
        <Button
          className={className}
          color={color}
          data-cy={dataCy}
          disabled={disabled}
          onClick={onClick}
          size="small"
          variant={variant}
        >
          <Icon fontSize={size} {...iconProps}>
            {icon}
          </Icon>
        </Button>
      );
    default:
      return (
        <IconButton
          classes={{
            root: `${classes.root} ${className && className}`,
            colorPrimary: classes.colorPrimary,
            colorSecondary: classes.colorSecondary,
          }}
          color={color}
          data-cy={dataCy}
          disabled={disabled}
          onClick={onClick}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.target.querySelector('span.material-icons').click();
            }
          }}
          type="button"
        >
          <Icon fontSize={size} {...iconProps}>
            {icon}
          </Icon>
        </IconButton>
      );
  }
};

displayIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  dataCy: PropTypes.string,
  color: PropTypes.oneOf(['inherit', 'default', 'primary', 'secondary']),
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
  text: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.oneOf(['icon', 'fab', 'button']),
  variant: PropTypes.oneOf(['text', 'outlined', 'contained', 'extended']),
};

displayIcon.defaultProps = {
  className: '',
  color: 'default',
  dataCy: null,
  disabled: false,
  iconProps: {},
  onClick: () => {},
  size: 'default',
  text: '',
  type: 'icon',
  variant: 'text',
};

const WrappedIcon = ({ tooltip, ...props }) => (
  <Tooltip title={tooltip} TransitionComponent={Zoom}>
    {props.disabled ? <span>{displayIcon(props)}</span> : displayIcon(props)}
  </Tooltip>
);

WrappedIcon.propTypes = displayIcon.propTypes;

export default withStyles(styles)(WrappedIcon);
