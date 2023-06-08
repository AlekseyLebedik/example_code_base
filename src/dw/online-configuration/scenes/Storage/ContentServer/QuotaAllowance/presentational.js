import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { STORAGE_ADD_CONTENT_SERVER_QUOTAS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import QuotaAllowanceDetails from './components/QuotaAllowanceDetails';
import QuotaAllowanceDetailsEmpty from './components/QuotaAllowanceDetailsEmpty';
import QuotaAllowanceListItem from './components/QuotaAllowanceListItem';
import AddQuotaAllowanceFormModal from './components/AddQuotaAllowanceFormModal';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <QuotaAllowanceListItem
      key={item.userID}
      {...item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function QuotaAllowanceStateless(props) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const { listItems, nextPageToken, q, onClickListItem, onShowMore } =
    props.reduxProps;
  const { onSearch } = props.reactProps;
  const {
    addModalVisible,
    openAddModal,
    closeAddModal,
    addOnRemoteSubmit,
    onAddQuotaAllowanceFormHandler,
  } = props.addQuotaAllowanceFormModalProps;

  const showMore = nextPageToken !== null;

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        title="Quota Allowance"
        shown={listItems.length}
        color="default"
      >
        <CheckPermission
          predicate={STORAGE_ADD_CONTENT_SERVER_QUOTAS}
          object={`titleenv.${currentEnv.id}`}
        >
          <AddQuotaAllowanceFormModal
            visible={addModalVisible}
            onCancel={closeAddModal}
            onRemoteSubmit={addOnRemoteSubmit}
            onSubmit={onAddQuotaAllowanceFormHandler}
          />
          <Tooltip title="Add Quota Allowance" placement="bottom">
            <IconButton onClick={() => openAddModal()}>
              <Icon>playlist_add</Icon>
            </IconButton>
          </Tooltip>
        </CheckPermission>
      </SectionTitle>

      <SearchableList
        initialValue={q}
        onSearch={onSearch}
        placeholder="UserID"
        items={listItems}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.userID);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
      />
    </div>
  );

  const renderDetail = () => <QuotaAllowanceDetails />;

  const renderEmpty = () => <QuotaAllowanceDetailsEmpty />;

  return (
    <section className="quota-allowance">
      <div className="quota-allowance-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

QuotaAllowanceStateless.propTypes = {
  reduxProps: PropTypes.shape({
    listItems: PropTypes.array.isRequired,
    nextPageToken: PropTypes.string,
    q: PropTypes.string,
    onClickListItem: PropTypes.func.isRequired,
    onShowMore: PropTypes.func.isRequired,
  }).isRequired,
  reactProps: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
  }).isRequired,
  addQuotaAllowanceFormModalProps: PropTypes.shape({
    addModalVisible: PropTypes.bool,
    openAddModal: PropTypes.func.isRequired,
    closeAddModal: PropTypes.func.isRequired,
    addOnRemoteSubmit: PropTypes.func.isRequired,
    onAddQuotaAllowanceFormHandler: PropTypes.func.isRequired,
  }).isRequired,
};

export default QuotaAllowanceStateless;
