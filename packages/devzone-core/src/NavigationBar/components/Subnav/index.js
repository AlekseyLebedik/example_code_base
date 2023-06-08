import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, withTheme } from '@material-ui/core/styles';

import { SectionTitleContext } from '../SectionTitleWrapper';
import SubnavElement from './components/SubnavElement';
import SubnavMenu from './components/SubnavMenu';
import BookmarkButton from '../BookmarkButton';
import TaskViewButton from '../TaskViewButton';

const getSectionKey = section => section.key || section.title;

export const useStyles = theme => ({
  root: {
    height: `${theme.subnavBar.height}px !important`,
    display: 'flex',
    paddingLeft: '24px',
    paddingRight: '24px',
    flexDirection: 'row',
    backgroundColor: theme.subnavBar.backgroundColor,
    zIndex: 1300,
    position: 'relative',
  },
  subNavLink: {
    transition: 'all 0.5s ease-in-out',
    color: theme.navigationBar.color,
    opacity: 0.6,
    fontSize: '12px',
    fontWeight: '500',
    textDecoration: 'none',
    '&:hover': {
      opacity: 1,
    },
    '& > span > span': {
      padding: 0,
      color: theme.navigationBar.color,
      marginRight: '12.5px',
    },
    lineHeight: `${theme.subnavBar.height}px`,
    minHeight: `${theme.subnavBar.height}px`,
    maxHeight: `${theme.subnavBar.height}px`,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-start !important',
    padding: '0 !important',
  },
  subnavActions: {
    display: 'flex',
    '& a': {
      marginLeft: '12.5px',
    },
  },
  subnavFeatures: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    textTransform: 'uppercase',
    '& a': {
      marginRight: '12.5px',
    },
  },
  subnavTaskBookmark: {
    display: 'flex',
  },
  tabsIndicator: {
    display: 'none',
  },
  'task-cancelled': {
    color: theme.taskStates.palette.cancelled,
  },
  'task-failed': {
    color: theme.taskStates.palette.failed,
  },
  'task-in-progress': {
    color: theme.taskStates.palette['in-progress'],
  },
  'task-succeeded': {
    color: theme.taskStates.palette.succeeded,
  },
  'task-timed-out': {
    color: theme.taskStates.palette['timed-out'],
  },
});

const SubnavBase = props => {
  const container = useRef(null);
  const { classes } = props;
  const { section, subSection } = useContext(SectionTitleContext);
  const showTaskButton = section.key === 'em';

  const { items } = section;

  const subNavItems = useMemo(
    () =>
      items.filter(item => (!item.hidden || item.displaySubnav) && item.url),
    [items]
  );

  const showSelf = subNavItems.length > 0;

  const [prevSubNavItems, setPrevSubNavItems] = useState(subNavItems);
  const [visible, setVisible] = useState(subNavItems.map(f => f.title));
  const [width, setWidth] = useState(window.innerWidth);
  const offsetHeight = useMemo(
    () => container?.current?.offsetHeight || 0,
    [container]
  );

  useEffect(() => {
    if (subNavItems !== prevSubNavItems) {
      setVisible(subNavItems.map(f => f.title));
      setPrevSubNavItems(subNavItems);
    }
    if (offsetHeight > props.theme.subnavBar.height) {
      const actions = subNavItems.filter(item => item.styleType === 'action');
      let newVisible = visible.filter(item => !actions.includes(item.title));
      if (newVisible.length === visible.length)
        newVisible = visible.slice(0, visible.length - 1);
      setVisible(newVisible);
    }
  }, [offsetHeight, visible, subNavItems, prevSubNavItems, width]);
  useEffect(() => {
    function handleResize() {
      setWidth(prevWidth => {
        if (Math.abs(window.innerWidth - prevWidth) > 5) {
          if (window.innerWidth > prevWidth) {
            setPrevSubNavItems(features => {
              setVisible(features.map(f => f.title));
              return features;
            });
          }
          return window.innerWidth;
        }
        return prevWidth;
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return showSelf ? (
    <AppBar position="static" color="secondary" className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.subnavFeatures} ref={container}>
          {subNavItems
            .filter(f => visible.includes(f.title) && f.styleType !== 'action')
            .map(feature => (
              <SubnavElement
                key={feature.title}
                item={feature}
                menuProps={{ className: classes.subNavLink }}
                linkProps={{ className: classes.subNavLink }}
              />
            ))}
          {visible.length !== subNavItems.length && (
            <SubnavMenu
              title="MORE"
              items={subNavItems.reduce((acc, f) => {
                if (!visible.includes(f.title)) {
                  return acc.concat(
                    f.isMenu && Array.isArray(f.items) ? f.items : f
                  );
                }
                return acc;
              }, [])}
              className={classes.subNavLink}
              linkProps={{
                className: classes.subNavLink,
              }}
            />
          )}
        </div>
      </div>
      <div className={classes.subnavActions}>
        {subNavItems
          .filter(f => visible.includes(f.title) && f.styleType === 'action')
          .map(action => (
            <SubnavElement
              key={action.title}
              item={action}
              className={classes.subNavLink}
              menuProps={{ className: classes.subNavLink }}
              linkProps={{ className: classes.subNavLink }}
            />
          ))}
      </div>
      <div className={classes.subnavTaskBookmark}>
        {showTaskButton && (
          <Tooltip title="View Current Tasks">
            <TaskViewButton classes={classes} />
          </Tooltip>
        )}
        <Tooltip title="Add to Bookmarks">
          <BookmarkButton
            favKey={subSection}
            parentKey={
              (section.parent && getSectionKey(section.parent)) ||
              getSectionKey(section)
            }
            iconProps={{ fontSize: 'default' }}
          />
        </Tooltip>
      </div>
    </AppBar>
  ) : (
    <></>
  );
};

SubnavBase.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

SubnavBase.defaultProps = {
  classes: {},
  theme: {},
};

export default withTheme(withStyles(useStyles)(SubnavBase));
