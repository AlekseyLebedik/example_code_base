import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import {
  ADD_ACHIEVEMENTS_RULESETS,
  DELETE_ACHIEVEMENTS_RULESETS,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import { currentEnvDetailsSelector } from 'dw/core/helpers/title-env-selectors';

import RulesetDetails from './components/RulesetDetails';
import RulesetDetailsEmpty from './components/RulesetDetailsEmpty';
import RulesetListItem from './components/RulesetListItem';
import UploadRulesetModal from './components/UploadRulesetModal';

function getRenderItemFunc(onSelectItem, withCheckboxes = false) {
  const getBaseProps = item => ({
    key: item.label,
    item,
    onClick: () => onSelectItem(item),
  });

  const withoutChecks = item => <RulesetListItem {...getBaseProps(item)} />;

  const withChecks = (item, renderCheckbox) => (
    <RulesetListItem {...getBaseProps(item)} renderCheckbox={renderCheckbox} />
  );

  return withCheckboxes ? withChecks : withoutChecks;
}

function RulesetsStateless({
  deleteRulesetEvents,
  nextPageToken,
  onClickListItem,
  onSearch,
  onShowMore,
  q,
  rulesets,
  uploadRulesetEvents,
}) {
  const {
    openUploadRulesetModalHandler,
    closeUploadRulesetModalHandler,
    uploadOnRemoteSubmit,
    onUploadRulesetHandler,
  } = uploadRulesetEvents;

  const { onDeleteRulesetHandler } = deleteRulesetEvents;

  const showMore = nextPageToken !== null && nextPageToken !== undefined;

  const currentEnv = useSelector(currentEnvDetailsSelector);

  const uploadRuleset = () => (
    <>
      <UploadRulesetModal
        onCancel={closeUploadRulesetModalHandler}
        onRemoteSubmit={uploadOnRemoteSubmit}
        onSubmit={values => onUploadRulesetHandler(values)}
      />
      <Tooltip title="Upload Ruleset" placement="bottom">
        <IconButton onClick={() => openUploadRulesetModalHandler()}>
          <Icon>file_upload</Icon>
        </IconButton>
      </Tooltip>
    </>
  );

  const commonListProps = {
    initialValue: q,
    onSearch,
    placeholder: 'Ruleset label',
    items: rulesets,
    showMore,
    onShowMore: () => onShowMore(nextPageToken, q),
    infiniteScroll: true,
    applySelectConditionFunc: item => !item.isActive,
  };

  const withoutPermissionsList = actions => (
    <SearchableList
      {...commonListProps}
      toRenderFunc={getRenderItemFunc(item => {
        onClickListItem(item);
        actions.onSelectItem(item.label);
      })}
    />
  );

  const withPermissionsList = actions => (
    <SearchableList
      {...commonListProps}
      toRenderFunc={getRenderItemFunc(item => {
        onClickListItem(item);
        actions.onSelectItem(item.label);
      }, true)}
      getItemKey={item => item.label}
      actions={[
        {
          iconName: 'delete',
          label: 'Delete Selected',
          handler: onDeleteRulesetHandler,
          cleanAfterExecute: true,
          confirm: {
            title: 'Confirm Delete',
            confirmMsg: 'Are you sure you want to delete selected rulesets?',
            mainButtonLabel: 'Delete',
            destructive: true,
          },
        },
      ]}
    />
  );

  const renderMaster = ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle shown={rulesets.length} color="default">
        <CheckPermission
          predicate={ADD_ACHIEVEMENTS_RULESETS}
          object={`titleenv.${currentEnv.id}`}
        >
          {uploadRuleset()}
        </CheckPermission>
      </SectionTitle>
      <CheckPermission
        predicate={DELETE_ACHIEVEMENTS_RULESETS}
        object={`titleenv.${currentEnv.id}`}
        noPermissionsComponent={() => withoutPermissionsList(actions)}
      >
        {withPermissionsList(actions)}
      </CheckPermission>
    </div>
  );

  const renderDetail = () => <RulesetDetails />;

  const renderEmpty = () => <RulesetDetailsEmpty />;

  return (
    <section className="rulesets">
      <div className="rulesets-main-container">
        <MasterDetail
          master={renderMaster}
          detail={renderDetail}
          empty={renderEmpty}
        />
      </div>
    </section>
  );
}

RulesetsStateless.propTypes = {
  rulesets: PropTypes.arrayOf(
    PropTypes.shape({
      context: PropTypes.string,
      isActive: PropTypes.bool,
      label: PropTypes.string,
    })
  ).isRequired,
  nextPageToken: PropTypes.string,
  q: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onClickListItem: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  deleteRulesetEvents: PropTypes.shape({
    onDeleteRulesetHandler: PropTypes.func,
  }).isRequired,
  uploadRulesetEvents: PropTypes.shape({
    openUploadRulesetModalHandler: PropTypes.func,
    closeUploadRulesetModalHandler: PropTypes.func,
    uploadOnRemoteSubmit: PropTypes.func,
    onUploadRulesetHandler: PropTypes.func,
  }).isRequired,
};

RulesetsStateless.defaultProps = {
  nextPageToken: undefined,
  q: undefined,
};

export default RulesetsStateless;
