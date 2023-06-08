import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import styles from './index.module.css';

const LIST_SIDE_MARGIN = 10;

const ListItemStyled = withStyles(theme => ({
  root: {
    padding: '6px 16px !important',
    margin: `0 ${LIST_SIDE_MARGIN}px !important`,
    width: `calc(100% - ${LIST_SIDE_MARGIN * 2}px)`,
    fontSize: 14,
    borderRadius: '2px !important',
    justifyContent: 'start !important',
  },
  selected: {
    color: `${theme.palette.primary.contrastText} !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
    position: 'sticky',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
}))(MuiListItem);

const ListItem = ({ children, active, ...props }) => (
  <ListItemStyled button divider data-cy="list-item" {...props}>
    {children}
    {active !== undefined && (
      <ListItemIcon className={classNames({ [styles.hiddenIcon]: !active })}>
        <Icon>done</Icon>
      </ListItemIcon>
    )}
  </ListItemStyled>
);

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

ListItem.defaultProps = {
  active: undefined,
};

export default ListItem;
