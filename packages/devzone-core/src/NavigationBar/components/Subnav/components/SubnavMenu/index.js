import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

import SubnavLink from '../SubnavLink';

const useStyles = theme => ({
  menuButton: {
    display: 'flex',
    alignItems: 'center',
  },
  menuListItem: {
    height: 'auto',
    textTransform: 'uppercase',
    paddingTop: 0,
    paddingBottom: 0,
  },
  menuLink: {
    padding: '5px 24px',
    width: '100%',
  },
  menuRoot: {
    opacity: 0.87,
    backgroundColor: theme.subnavBar.backgroundColor,
  },
});

const SubnavMenu = props => {
  const { title, items, activeSubSection, classes, className, linkProps } =
    props;
  const [menuAnchor, setMenuAnchor] = useState(null);

  const menuOpen = Boolean(menuAnchor);
  return (
    <>
      <a
        onClick={e => {
          e.preventDefault();
          setMenuAnchor(e.currentTarget);
        }}
        className={classNames(className, classes.menuButton)}
      >
        {title}
        <Icon>arrow_drop_down</Icon>
      </a>
      <Menu
        id="render-props-menu"
        anchorEl={menuAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        getContentAnchorEl={null}
        open={menuOpen}
        onClose={() => setMenuAnchor(null)}
        MenuListProps={{ classes: { root: classes.menuRoot } }}
      >
        {items.map(item => (
          <MenuItem
            key={item.title}
            onClick={() => setMenuAnchor(null)}
            className={classNames(classes.menuListItem, classes.menuLink)}
            disableGutters
          >
            <SubnavLink
              item={item}
              isActive={activeSubSection === item.title}
              {...linkProps}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

SubnavMenu.propTypes = {
  activeSubSection: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkProps: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

SubnavMenu.defaultProps = {
  activeSubSection: null,
};

export default withStyles(useStyles)(SubnavMenu);
