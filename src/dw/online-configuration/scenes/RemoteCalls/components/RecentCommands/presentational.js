import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import CommandSender from '../CommandSender';

const ListItem = ({ item }) => (
  <SearchableListItem selected={false}>
    <CommandSender command={item} readOnly />
  </SearchableListItem>
);
ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
const getRenderItemFunc = item => (
  <ListItem key={`${item.id}-${item.timestamp}`} item={item} />
);

const RecentCommandsStateless = ({ recentCommands, onSearch }) => (
  <>
    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
      {recentCommands.length} shown
    </Typography>
    <SearchableList
      searchEnabled
      placeholder="Recent command"
      items={recentCommands}
      toRenderFunc={getRenderItemFunc}
      loadingTimeout={0}
      onSearch={onSearch}
      showMore={false}
      showTitle={false}
      autoSize={false}
    />
  </>
);

RecentCommandsStateless.propTypes = {
  recentCommands: PropTypes.array,
  onSearch: PropTypes.func,
};

RecentCommandsStateless.defaultProps = {
  recentCommands: [],
  onSearch: () => {},
};

export default RecentCommandsStateless;
