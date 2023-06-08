import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import CommandSender from '../CommandSender';

const ListItem = ({ item }) => (
  <SearchableListItem selected={false}>
    <CommandSender key={item.id} command={item} readOnly favorite />
  </SearchableListItem>
);
ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};
const getRenderItemFunc = item => <ListItem key={item.id} item={item} />;

const FavoriteCommandsStateless = ({ favoriteCommands, onSearch }) => (
  <>
    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
      {favoriteCommands.length} shown
    </Typography>
    <SearchableList
      searchEnabled
      placeholder="Favorite command"
      items={favoriteCommands}
      toRenderFunc={getRenderItemFunc}
      loadingTimeout={0}
      onSearch={onSearch}
      showMore={false}
      showTitle={false}
      autoSize={false}
    />
  </>
);

FavoriteCommandsStateless.propTypes = {
  favoriteCommands: PropTypes.array,
  onSearch: PropTypes.func,
};

FavoriteCommandsStateless.defaultProps = {
  favoriteCommands: [],
  onSearch: () => {},
};

export default FavoriteCommandsStateless;
