import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

import AdapterLink from 'dw/core/components/AdapterLink';
import Empty from 'dw/core/components/Empty';
import { joinPath } from 'dw/core/helpers/path';
import { hasData } from 'dw/core/helpers/object';
import styles from '../../presentational.module.css';

const ListItem = withStyles(theme => ({
  root: {
    fontWeight: 400,
  },
  selected: {
    color: 'white !important',
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}))(MuiListItem);

export const SelectionPanelItem = ({ item }) => (
  <>
    {item.name === '' ? (
      'n/a'
    ) : (
      <span className={styles.label}>{item.name}</span>
    )}
  </>
);

SelectionPanelItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export const SelectionPanelItemCounts = ({ item }) => (
  <div className={styles.itemContainer}>
    <div>
      {item.name === '' ? (
        'n/a'
      ) : (
        <span className={styles.label}>{item.name}</span>
      )}
    </div>
    <div className={styles.countColumn}>{item.idleCount || 0}</div>
    <div className={styles.countColumn}>{item.allocatedCount || 0}</div>
  </div>
);

SelectionPanelItemCounts.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    idleCount: PropTypes.number,
    allocatedCount: PropTypes.number,
  }).isRequired,
};

export const SelectionPanelList = ({
  data,
  url,
  emptyText,
  selectedItem,
  listItemClasses,
  ItemComponent,
}) =>
  hasData(data) ? (
    <List>
      {data.map(item => (
        <ListItem
          key={item.name}
          component={AdapterLink}
          classes={listItemClasses}
          selected={selectedItem === item.name}
          to={joinPath(url, item.name)}
        >
          <ItemComponent item={item} emptyText={emptyText} />
        </ListItem>
      ))}
    </List>
  ) : (
    <Empty emptyText={emptyText} />
  );

SelectionPanelList.propTypes = {
  data: PropTypes.array.isRequired,
  emptyText: PropTypes.string,
  listItemClasses: PropTypes.object,
  selectedItem: PropTypes.string,
  url: PropTypes.string.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
};

SelectionPanelList.defaultProps = {
  selectedItem: null,
  emptyText: null,
  listItemClasses: null,
};
