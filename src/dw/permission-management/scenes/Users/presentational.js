import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Empty from 'dw/core/components/Empty';
import MasterDetail from 'dw/core/components/MasterDetail';
import { getDrawerStyles } from 'dw/core/components/MasterDetail/helpers';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';

import Details from './components/Details';
import { GROUP_TAB, ADVANCED_TAB } from './constants';

const ListItem = ({ id, name, username, selectedItem, onClick }) => {
  const isSelected = selectedItem && selectedItem.id === id;
  return (
    <SearchableListItem selected={isSelected} onClick={onClick}>
      <div className="flex flex-col">
        <div>{name}</div>
        <div>{username}</div>
      </div>
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  username: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  id: '',
  selectedItem: null,
  name: null,
};

const getRenderItemFunc = (onSelectItem, selectedItem) => item =>
  (
    <ListItem
      key={item.id}
      {...item}
      selectedItem={selectedItem}
      onClick={() => onSelectItem(item)}
    />
  );

const getRenderMasterFunc = props => {
  const {
    items,
    nextPage,
    onShowMore,
    onSearch,
    selectedItem,
    q,
    itemsLoading,
  } = props;
  const showMore = !!nextPage;
  const Master = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Users"
        shown={items ? items.length : 0}
      />

      <SearchableList
        initialValue={q}
        placeholder="UserID | Username"
        items={items}
        toRenderFunc={getRenderItemFunc(item => {
          actions.onSelectItem(item.id);
        }, selectedItem)}
        onSearch={onSearch}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPage)}
        loadingTimeout={0}
        loadingMaster={itemsLoading}
        infiniteScroll
      />
    </div>
  );
  Master.propTypes = {
    actions: PropTypes.object.isRequired,
  };
  return Master;
};

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const useStyles = theme => ({
  content: {
    backgroundColor: theme.palette.inherit.main,
  },
  ...getDrawerStyles()(theme),
});

const Users = props => {
  const { selectedItem, selectedTab, onTabChange, classes } = props;
  return (
    <MasterDetail
      component="section"
      master={getRenderMasterFunc(props)}
      detail={detailProps => (
        <Details
          {...detailProps}
          selectedItem={selectedItem}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
          groupTab={GROUP_TAB}
          advancedTab={ADVANCED_TAB}
        />
      )}
      empty={renderEmpty}
      classes={{
        content: classes.content,
        drawerPaper: classes.drawerPaper,
        expander: props.classes.expander,
      }}
    />
  );
};

Users.propTypes = {
  selectedItem: PropTypes.object,
  selectedTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

Users.defaultProps = {
  selectedItem: null,
};

export default withStyles(useStyles)(Users);
