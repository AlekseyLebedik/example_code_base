import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { ADD_MARKETPLACE_STORES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';
import SkeletonProgress from 'dw/core/components/SearchableList/components/SkeletonProgress';

import StoreDetails from './components/StoreDetails';
import StoreDetailsEmpty from './components/StoreDetailsEmpty';
import StoreListItem from './components/StoreListItem';
import UploadStoreModal from './components/UploadStoreModal';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <StoreListItem
      key={item.label}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function StoresStateless(props) {
  const {
    stores,
    storesLoading,
    nextPageToken,
    q,
    onSearch,
    onShowMore,
    onClickListItem,
    selectedStore,
    selectedStoreLoading,
    storeDetailProps,
    storeDetailEvents,
  } = props;

  const { uploadStoreModalVisible, uploadStoreModalLoading } =
    props.uploadStoreModalProps;
  const {
    openUploadStoreModalHandler,
    closeUploadStoreModalHandler,
    uploadOnRemoteSubmit,
    onUploadStoreHandler,
  } = props.uploadStoreEvents;

  const showMore = nextPageToken !== null;

  const currentEnv = useSelector(currentEnvDetailsSelector);

  const uploadStore = () => (
    <>
      <UploadStoreModal
        visible={uploadStoreModalVisible}
        loading={uploadStoreModalLoading}
        onCancel={closeUploadStoreModalHandler}
        onRemoteSubmit={uploadOnRemoteSubmit}
        onSubmit={(values, params) => onUploadStoreHandler(values, params)}
      />
      <Tooltip title="Upload Store" placement="bottom">
        <IconButton onClick={() => openUploadStoreModalHandler()}>
          <Icon>file_upload</Icon>
        </IconButton>
      </Tooltip>
    </>
  );

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={stores.length} color="default">
        <CheckPermission
          predicate={ADD_MARKETPLACE_STORES}
          object={`titleenv.${currentEnv.id}`}
        >
          {uploadStore()}
        </CheckPermission>
      </SectionTitle>

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="Store label"
        items={stores}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.label);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
        loadingMaster={storesLoading}
      />
    </div>
  );

  const renderDetail = () =>
    storesLoading || selectedStoreLoading ? (
      <SkeletonProgress />
    ) : (
      <StoreDetails
        {...storeDetailProps}
        {...storeDetailEvents}
        selectedStore={selectedStore}
      />
    );

  const renderEmpty = () => <StoreDetailsEmpty />;

  return (
    <section className="stores">
      <div className="stores-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

StoresStateless.propTypes = {
  uploadStoreEvents: PropTypes.shape({
    openUploadStoreModalHandler: PropTypes.func,
    closeUploadStoreModalHandler: PropTypes.func,
    uploadOnRemoteSubmit: PropTypes.func,
    onUploadStoreHandler: PropTypes.func,
  }).isRequired,
  uploadStoreModalProps: PropTypes.shape({
    uploadStoreModalLoading: PropTypes.bool,
    uploadStoreModalVisible: PropTypes.bool,
  }).isRequired,
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      context: PropTypes.string,
      created: PropTypes.string,
      isActive: PropTypes.bool,
      label: PropTypes.string,
    })
  ).isRequired,
  storesLoading: PropTypes.bool,
  nextPageToken: PropTypes.string,
  q: PropTypes.string,
  selectedStore: PropTypes.object,
  selectedStoreLoading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  storeDetailProps: PropTypes.shape({
    propagateStoreModalProps: PropTypes.shape({
      propagateStoreModalVisible: PropTypes.bool,
    }),
  }).isRequired,
  storeDetailEvents: PropTypes.shape({
    propagateStoreEvents: PropTypes.shape({
      openPropagateStoreModalHandler: PropTypes.func,
      closePropagateStoreModalHandler: PropTypes.func,
      propagateOnRemoteSubmit: PropTypes.func,
      onPropagateStoreHandler: PropTypes.func,
    }),
  }).isRequired,
};

StoresStateless.defaultProps = {
  nextPageToken: undefined,
  q: undefined,
  selectedStore: undefined,
  selectedStoreLoading: false,
  storesLoading: false,
};

export default StoresStateless;
