import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import Empty from 'dw/core/components/Empty';

import Details from './components/Details';
import UploadScriptModal from './components/UploadScriptModal';

const ListItem = ({
  id,
  status,
  jobId,
  dockerTag,
  failedTests,
  createdAt,
  selectedItem,
  onClick,
  formatDateTime,
  classes,
}) => {
  const hasFailedTest = failedTests && failedTests.length > 0;
  const isSelected = selectedItem && selectedItem.id === id;
  return (
    <SearchableListItem selected={isSelected} onClick={onClick}>
      <div>
        <div>{jobId}</div>
        <div
          className={classNames({
            [classes.failedTest]: hasFailedTest && !isSelected,
            [classes.selectedFailedTest]: hasFailedTest && isSelected,
          })}
        >
          {status}
        </div>
        {dockerTag ? <div>{dockerTag}</div> : null}
        <div>{formatDateTime(createdAt)}</div>
      </div>
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  jobId: PropTypes.string,
  failedTests: PropTypes.arrayOf(PropTypes.object),
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  dockerTag: PropTypes.string,
  classes: PropTypes.object,
};

ListItem.defaultProps = {
  selectedItem: null,
  jobId: '',
  failedTests: [],
  dockerTag: null,
  classes: {},
};

const muiStyles = theme => ({
  failedTest: {
    color: theme.palette.error.dark,
  },
  selectedFailedTest: {
    color: theme.palette.error.light,
  },
});

const StyledListItem = withStyles(muiStyles)(ListItem);

const getRenderItemFunc =
  (onSelectItem, selectedItem, formatDateTime) => item =>
    (
      <StyledListItem
        key={item.id}
        {...item}
        selectedItem={selectedItem}
        onClick={() => onSelectItem(item)}
        formatDateTime={formatDateTime}
      />
    );

const getRenderMasterFunc = props => {
  const {
    items,
    nextPageToken,
    onShowMore,
    selectedItem,
    formatDateTime,
    uploadModalVisible,
    closeUploadModal,
    openUploadModal,
    uploadOnRemoteSubmit,
    onUploadHandler,
    uploading,
  } = props;
  const showMore = !!nextPageToken;
  // eslint-disable-next-line
  return ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="LootGen"
        shown={items ? items.length : 0}
      >
        <UploadScriptModal
          loading={uploading}
          visible={uploadModalVisible}
          onCancel={closeUploadModal}
          onRemoteSubmit={uploadOnRemoteSubmit}
          onSubmit={onUploadHandler}
        />
        <Tooltip title="Upload script">
          <IconButton onClick={openUploadModal} color="inherit">
            <Icon>file_upload</Icon>
          </IconButton>
        </Tooltip>
      </SectionTitle>

      <SearchableList
        searchEnabled={false}
        placeholder="Job ID"
        items={items}
        toRenderFunc={getRenderItemFunc(
          item => {
            // eslint-disable-next-line react/prop-types
            actions.onSelectItem(item.id);
          },
          selectedItem,
          formatDateTime
        )}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken)}
        loadingTimeout={0}
      />
    </div>
  );
};

getRenderMasterFunc.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  nextPageToken: PropTypes.string,
  onShowMore: PropTypes.func,
  formatDateTime: PropTypes.func,
  openUploadModal: PropTypes.func,
  closeUploadModal: PropTypes.func,
  onUploadHandler: PropTypes.func,
  uploadOnRemoteSubmit: PropTypes.func,
  uploadModalVisible: PropTypes.bool,
  uploading: PropTypes.bool,
};

getRenderMasterFunc.defaultProps = {
  items: undefined,
  nextPageToken: null,
  openUploadModal: () => {},
  uploadOnRemoteSubmit: () => {},
  onUploadHandler: () => {},
  closeUploadModal: () => {},
  uploadModalVisible: false,
  uploading: false,
};

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const LootGen = props => (
  <MasterDetail
    component="section"
    master={getRenderMasterFunc(props)}
    detail={detailProps => (
      <Details {...detailProps} selectedItem={props.selectedItem} />
    )}
    empty={renderEmpty}
    baseUrl={props.baseUrl}
  />
);

LootGen.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
};

LootGen.defaultProps = {
  selectedItem: null,
};

export default LootGen;
