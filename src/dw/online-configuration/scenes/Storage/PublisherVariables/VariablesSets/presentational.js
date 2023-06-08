import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import { STORAGE_ADD_PUBLISHER_VARIABLES } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import VariablesSetDetails from './components/VariablesSetDetails';
import VariablesSetDetailsEmpty from './components/VariablesSetDetailsEmpty';
import VariablesSetListItem from './components/VariablesSetListItem';
import AddVariablesSetsFormModal from './components/AddVariablesSetsFormModal';

import './presentational.css';

function getRenderItemFunc(onSelectItem) {
  return item => (
    <VariablesSetListItem
      key={item.variableSetId}
      item={item}
      onClick={() => onSelectItem(item)}
    />
  );
}

function VariablesSetsStateless(props) {
  const currentEnv = useSelector(currentEnvDetailsSelector);
  const {
    listItems,
    loading,
    nextPageToken,
    onClickListItem,
    onShowMore,
    q,
    selectedListItem,
  } = props.reduxProps;
  const { onSearch } = props.reactProps;
  const {
    addVariablesSetsFormModalVisible,
    openAddVariablesSetsFormModalHandler,
    closeAddVariablesSetsFormModalHandler,
    addOnRemoteSubmit,
    onAddVariablesSetsFormHandler,
  } = props.addVariablesSetsFormModalProps;

  const showMore = nextPageToken !== null;

  const { id } = useParams();

  useEffect(() => {
    if (selectedListItem || !id) return;
    const item = listItems.find(({ variableSetId }) => variableSetId === id);
    if (item) onClickListItem(item);
  }, [id, listItems, onClickListItem, selectedListItem]);

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        title="Variables Sets"
        shown={listItems.length}
        color="default"
      >
        <CheckPermission
          predicate={STORAGE_ADD_PUBLISHER_VARIABLES}
          object={`titleenv.${currentEnv.id}`}
        >
          <AddVariablesSetsFormModal
            visible={addVariablesSetsFormModalVisible}
            onCancel={closeAddVariablesSetsFormModalHandler}
            onRemoteSubmit={addOnRemoteSubmit}
            onSubmit={onAddVariablesSetsFormHandler}
          />
          <Tooltip title="Add Variables Set" placement="bottom">
            <IconButton onClick={() => openAddVariablesSetsFormModalHandler()}>
              <Icon>playlist_add</Icon>
            </IconButton>
          </Tooltip>
        </CheckPermission>
      </SectionTitle>

      <SearchableList
        initialValue={q}
        initialLoading={loading}
        onSearch={onSearch}
        placeholder="n:namespace | c:context | g:group id"
        items={listItems}
        toRenderFunc={getRenderItemFunc(item => {
          onClickListItem(item);
          actions.onSelectItem(item.variableSetId);
        })}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPageToken, q)}
      />
    </div>
  );

  renderMaster.propTypes = {
    actions: PropTypes.shape({
      onSelectItem: PropTypes.func.isRequired,
    }).isRequired,
  };

  const renderDetail = () => <VariablesSetDetails />;
  const renderEmpty = () => <VariablesSetDetailsEmpty />;

  return (
    <section className="variables-sets">
      <div className="variables-sets-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

VariablesSetsStateless.propTypes = {
  reduxProps: PropTypes.shape({
    listItems: PropTypes.array.isRequired,
    nextPageToken: PropTypes.string,
    q: PropTypes.string,
    onClickListItem: PropTypes.func.isRequired,
    onShowMore: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    selectedListItem: PropTypes.object,
  }),
  reactProps: PropTypes.shape({
    onSearch: PropTypes.func.isRequired,
  }).isRequired,
  addVariablesSetsFormModalProps: PropTypes.shape({
    addVariablesSetsFormModalVisible: PropTypes.bool,
    openAddVariablesSetsFormModalHandler: PropTypes.func.isRequired,
    closeAddVariablesSetsFormModalHandler: PropTypes.func.isRequired,
    addOnRemoteSubmit: PropTypes.func.isRequired,
    onAddVariablesSetsFormHandler: PropTypes.func.isRequired,
  }).isRequired,
};

VariablesSetsStateless.defaultProps = {
  reduxProps: {
    selectedListItem: null,
    nextPageToken: undefined,
    q: undefined,
    loading: undefined,
  },
};

export default VariablesSetsStateless;
