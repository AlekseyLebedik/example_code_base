import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import MasterDetail from 'dw/core/components/MasterDetail';
import { getDrawerStyles } from 'dw/core/components/MasterDetail/helpers';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import Empty from 'dw/core/components/Empty';
import Details from './components/Details';
import ListItem from './components/ListItem';

const getRenderItemFunc = (onSelectItem, selectedItem) => item =>
  (
    <ListItem
      key={item.id}
      {...item}
      selectedItem={selectedItem}
      onClick={() => onSelectItem(item)}
      header={item.header}
    />
  );

const getRenderMasterFunc = props => {
  const { items, showMore, onShowMore, onSearch, selectedItem } = props;
  // eslint-disable-next-line
  return ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Companies"
        shown={items ? items.length : 0}
      />

      <SearchableList
        searchEnabled
        placeholder="Company"
        items={items}
        toRenderFunc={getRenderItemFunc(item => {
          // eslint-disable-next-line
          actions.onSelectItem(item.id);
        }, selectedItem)}
        onSearch={onSearch}
        showMore={showMore}
        onShowMore={onShowMore}
        loadingTimeout={0}
        infiniteScroll
      />
    </div>
  );
};

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const useStyles = theme => ({
  masterDetailContent: {
    boxShadow:
      '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
  },
  ...getDrawerStyles()(theme),
});

const Companies = props => (
  <>
    <MasterDetail
      component="section"
      master={getRenderMasterFunc(props)}
      classes={{
        content: props.classes.masterDetailContent,
        drawerPaper: props.classes.drawerPaper,
        expander: props.classes.expander,
      }}
      detail={detailProps => <Details {...detailProps} />}
      empty={renderEmpty}
      baseUrl={props.baseUrl}
    />
  </>
);

Companies.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  onSearch: PropTypes.func,
  onShowMore: PropTypes.func,
  showMore: PropTypes.bool,
};

Companies.defaultProps = {
  items: null,
  onSearch: null,
  onShowMore: () => {},
  showMore: false,
};

export default withStyles(useStyles)(Companies);
