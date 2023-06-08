import React from 'react';
import PropTypes from 'prop-types';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import Empty from 'dw/core/components/Empty';
import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import Details from './components/Details';
import UploadButton from './components/Upload';

import styles from './presentational.module.css';

const ListItem = ({
  id,
  name,
  status,
  appliedAt,
  createdAt,
  selectedItem,
  onClick,
}) => (
  <SearchableListItem
    selected={selectedItem && selectedItem.id === id}
    onClick={onClick}
  >
    <div className="flex-grow">{name}</div>
    <div className={styles.right}>
      {status === 'active' ? <div className={styles.active}>Active</div> : null}
      <div>{appliedAt !== 'N/A' ? appliedAt : createdAt}</div>
    </div>
  </SearchableListItem>
);

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  appliedAt: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  selectedItem: null,
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
    nextPageToken,
    q,
    listItemClick,
    onShowMore,
    onSearch,
    selectedItem,
    baseUrl,
  } = props;
  const showMore = nextPageToken !== null;
  // eslint-disable-next-line
  return ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Matchmaking"
        shown={items ? items.length : 0}
      >
        <FeatureSwitchesCheck
          featureSwitches={[fs.MATCHMAKING_RSDOCS_UPLOAD_ENABLED]}
          isStaffAllowed={false}
        >
          <UploadButton baseUrl={baseUrl} />
        </FeatureSwitchesCheck>
      </SectionTitle>

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="Ruleset ID"
        items={items}
        toRenderFunc={getRenderItemFunc(item => {
          listItemClick(item);
          // eslint-disable-next-line
          actions.onSelectItem(item.id);
        }, selectedItem)}
        showMore={showMore}
        onShowMore={onShowMore}
        loadingTimeout={0}
      />
    </div>
  );
};

getRenderMasterFunc.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  nextPageToken: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
  q: PropTypes.string,
  listItemClick: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
};

getRenderMasterFunc.defaultProps = {
  items: undefined,
  nextPageToken: null,
  q: null,
  selectedItem: null,
};

const renderDetails = props => <Details {...props} />;

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const Matchmaking = props => (
  <MasterDetail
    component="section"
    master={getRenderMasterFunc(props)}
    detail={renderDetails}
    empty={renderEmpty}
    baseUrl={props.baseUrl}
  />
);

Matchmaking.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default Matchmaking;
