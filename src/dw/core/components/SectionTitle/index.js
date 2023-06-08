import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from './index.module.css';

const useStyles = theme => ({
  appBar: {
    color: `${get(theme, 'navigationBar.sectionTitle.color')} !important`,
    backgroundColor: `${get(
      theme,
      'navigationBar.sectionTitle.backgroundColor'
    )} !important`,
  },
});

function SectionTitle({
  title,
  shown,
  total,
  color,
  extraContent,
  small,
  children,
  style,
  classes,
}) {
  const shownProps = {};
  if (shown !== null) {
    shownProps['data-shown'] = `(${shown} shown${
      total && total !== shown ? ` of ${total}` : ''
    })`;
  }
  return (
    <AppBar
      elevation={0}
      position="static"
      color={color}
      className={classNames(styles[color], {
        [styles.small]: small,
        [classes.appBar]: color === 'primary',
      })}
    >
      <Toolbar
        className={classNames(
          styles.container,
          get(style, 'container.classes.root', ''),
          !shown && !children && !extraContent ? styles.emptyContainer : {}
        )}
      >
        {(title || shownProps['data-shown']) && (
          <div
            className={classNames(
              'section-title',
              'title-container',
              styles.sectionTitle,
              get(style, 'container.sectionTitle.classes.root', '')
            )}
            {...(title ? shownProps : {})}
          >
            {title || shownProps['data-shown']}
          </div>
        )}

        <div
          className={classNames(
            styles.extraContent,
            get(style, 'container.extraContent.classes.root', '')
          )}
        >
          {extraContent}
        </div>
        <div
          className={classNames(
            styles.actions,
            get(style, 'container.actions.classes.root', '')
          )}
        >
          <>{children}</>
        </div>
      </Toolbar>
    </AppBar>
  );
}

SectionTitle.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  extraContent: PropTypes.node,
  shown: PropTypes.number,
  small: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  total: PropTypes.number,
};

SectionTitle.defaultProps = {
  children: undefined,
  color: 'primary',
  extraContent: null,
  shown: null,
  small: false,
  style: {},
  total: null,
  title: null,
};

export default withStyles(useStyles)(SectionTitle);
