import React, { useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import NavLink from '../NavLink';

import MegaMenu, { SuiteButton } from '../MegaMenu';

import { Section, CompanyColumn } from '../Sections';
import { BookmarksContext, SuiteContext } from '../../context';
import { filterRoutes } from '../../helpers';

import styles from './index.module.css';

export const LinkSuite = ({ suiteProps, buttonProps, setCurrentSection }) => {
  const { icon, url, title } = suiteProps;
  const onClick = () => setCurrentSection(suiteProps);

  return (
    <div className={styles.suite}>
      <NavLink url={url} key={title} onClick={onClick}>
        <SuiteButton icon={icon} {...buttonProps} />
      </NavLink>
    </div>
  );
};
LinkSuite.propTypes = {
  suiteProps: PropTypes.object.isRequired,
  classes: PropTypes.object,
  buttonProps: PropTypes.object,
  setCurrentSection: PropTypes.func,
};
LinkSuite.defaultProps = {
  classes: {},
  buttonProps: {},
  setCurrentSection: () => {},
};

const favSuiteStyles = theme => ({
  messageContainer: {
    marginTop: 20,
  },
  messageHeader: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
  messageBody: {
    color: 'grey',
  },
});

export const FavoritesSuiteBase = ({ items, classes }) => {
  const {
    bookmarks: {
      enabled: bookmarksEnabled,
      routes: bookmarksList,
      count: bookmarkCount,
      bookmarkCounterReset: counterReset,
    },
  } = useContext(BookmarksContext);
  const icon =
    bookmarksList && bookmarksList.length > 0 ? 'bookmark' : 'bookmark_border';
  const suiteProps = { icon, items, title: 'Favorites' };
  const megaMenuProps = {
    counterReset,
  };
  const buttonProps = {
    title: 'Bookmarks',
    badge: true,
    bookmarkCount,
  };

  return (
    <Suite
      suiteProps={suiteProps}
      megaMenuProps={megaMenuProps}
      buttonProps={buttonProps}
    >
      {bookmarksEnabled && bookmarksList.length > 0 && (
        <div>
          <div className={styles.suiteHeader}>Your bookmarks</div>
          {bookmarksList.map(fs => (
            <Section data={fs} key={fs.key || fs.title} />
          ))}
        </div>
      )}
      {items.length > 0 ? (
        <div className={styles.favoritesMegaMenu}>
          {items.map(route => (
            <Section data={route} key={route.key || route.title} deleteOnly />
          ))}
        </div>
      ) : (
        <div className={classes.messageContainer}>
          <p className={classes.messageHeader}>No Bookmarks added yet</p>
          <p className={classes.messageBody}>
            To Add bookmarks to display here, click the bookmark icon{' '}
            <Icon color="primary">bookmark</Icon> in the main navigation{' '}
            <Icon>apps</Icon>, or click the bookmark icon{' '}
            <Icon color="primary">bookmark</Icon> on the right side of the
            service page.
          </p>
        </div>
      )}
    </Suite>
  );
};

FavoritesSuiteBase.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
};
FavoritesSuiteBase.defaultProps = {
  items: [],
  classes: {},
};

export const FavoritesSuite = withStyles(favSuiteStyles)(FavoritesSuiteBase);

const useSearchSuiteStyles = makeStyles(theme => ({
  searchInput: {
    color: theme.navigationBar.megaMenu.color,
    backgroundColor: theme.navigationBar.searchInput.backgroundColor,
    '&::placeholder': {
      color: theme.navigationBar.megaMenu.color,
    },
  },
}));

export const SearchSuite = ({ items }) => {
  const classes = useSearchSuiteStyles();
  const suiteProps = {
    icon: 'apps',
    title: 'Global search',
  };
  const megaMenuProps = {
    showFavorites: false,
  };
  const buttonProps = {
    title: 'Apps',
  };

  const [searchKey, setSearchKey] = useState('');
  const handleInputChange = e => {
    setSearchKey(e.target.value);
  };
  const clearSearch = () => setSearchKey('');

  const filteredRoutes = useMemo(
    () =>
      items
        .map(companyItems => ({
          ...companyItems,
          items: filterRoutes(companyItems.items, searchKey),
        }))
        .filter(item => item.items.length > 0),
    [searchKey, items]
  );

  return (
    <Suite
      suiteProps={suiteProps}
      megaMenuProps={megaMenuProps}
      buttonProps={buttonProps}
      clearSearch={clearSearch}
    >
      <div className={styles.searchSection}>
        <Input
          onChange={handleInputChange}
          className={classNames(styles.searchInput, classes.searchInput)}
          placeholder="Search..."
          autoFocus
          aria-label="navigation-search-bar"
          data-cy="megamenu-search-input"
        />
      </div>
      <div className={styles.columnsContainer}>
        {filteredRoutes.map(route => (
          <CompanyColumn data={route} key={route.key || route.title} />
        ))}
      </div>
    </Suite>
  );
};
SearchSuite.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
SearchSuite.defaultProps = {
  items: [],
};

export const Suite = ({
  suiteProps,
  buttonProps,
  megaMenuProps,
  clearSearch,
  children,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { icon } = suiteProps;
  const megaMenuOpen = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
    if (megaMenuProps.counterReset) {
      megaMenuProps.counterReset();
    }
  };
  const closeMegaMenu = () => {
    clearSearch();
    setAnchorEl(null);
  };
  const { isMenuOpen: _isMenuOpen } = buttonProps;
  const isMenuOpen =
    _isMenuOpen !== undefined ? _isMenuOpen : Boolean(anchorEl);

  const menuProps = {
    id: 'menu-appbar',
    open: isMenuOpen,
    anchorEl,
    onClose: closeMegaMenu,
  };

  return (
    <div className={styles.suite}>
      <SuiteButton
        onClick={megaMenuOpen}
        isActive={isMenuOpen}
        icon={icon}
        {...buttonProps}
      >
        {isMenuOpen && (
          <SuiteContext.Provider value={{ onNavigate: closeMegaMenu }}>
            <MegaMenu menuProps={menuProps} {...megaMenuProps}>
              {children}
            </MegaMenu>
          </SuiteContext.Provider>
        )}
      </SuiteButton>
    </div>
  );
};
Suite.propTypes = {
  suiteProps: PropTypes.object,
  buttonProps: PropTypes.object,
  megaMenuProps: PropTypes.object,
  clearSearch: PropTypes.func,
  children: PropTypes.node.isRequired,
};
Suite.defaultProps = {
  suiteProps: {},
  buttonProps: {},
  megaMenuProps: {},
  clearSearch: () => {},
};
