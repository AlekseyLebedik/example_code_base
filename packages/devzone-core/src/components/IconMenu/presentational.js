import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

const IconMenu = ({
  icon,
  component: ButtonComponent,
  ButtonProps,
  tooltip,
  paperStyles,
  menuAnchorEl,
  toggleMenu,
  ...props
}) => {
  const menuOpen = !!menuAnchorEl;

  return (
    <>
      <Tooltip title={tooltip}>
        <ButtonComponent
          aria-label="More"
          aria-owns={menuOpen ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={({ currentTarget }) => toggleMenu(currentTarget)}
          {...ButtonProps}
        >
          {typeof icon === 'string' || icon instanceof String ? (
            <Icon>{icon}</Icon>
          ) : (
            icon
          )}
        </ButtonComponent>
      </Tooltip>
      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={() => {
          toggleMenu(null);
          if (props.onClick) {
            props.onClick();
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
        PaperProps={{
          style: {
            maxHeight: 256,
            ...paperStyles,
          },
        }}
        disableAutoFocusItem
        {...props}
      >
        {typeof props.children === 'function'
          ? props.children(() => toggleMenu(null))
          : props.children}
      </Menu>
    </>
  );
};

IconMenu.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  tooltip: PropTypes.string,
  paperStyles: PropTypes.object,
  ButtonProps: PropTypes.object,
  component: PropTypes.elementType,
  menuAnchorEl: PropTypes.object,
  toggleMenu: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

IconMenu.defaultProps = {
  icon: undefined,
  tooltip: '',
  ButtonProps: {},
  paperStyles: {},
  component: IconButton,
  menuAnchorEl: null,
  onClick: undefined,
};

export default IconMenu;
