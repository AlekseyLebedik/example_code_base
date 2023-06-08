import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

import SelectField from 'dw/core/components/Select';
import MasterDetail from 'dw/core/components/MasterDetail';
import { getDrawerStyles } from 'dw/core/components/MasterDetail/helpers';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import Empty from 'dw/core/components/Empty';
import ModalForm from 'dw/core/components/ModalForm';
import Loading from 'dw/core/components/Loading';

import { useContextListHookWithGroups } from 'abtesting/scenes/hooks';
import CreateGroupForm from './components/CreateGroupForm';
import Details from './components/Details';

import { FORM_NAME } from './constants';

import styles from './presentational.module.css';

const ContextComponent = ({ contextList, selectedContext, changeContext }) => (
  <SelectField
    id="context"
    label="Select a context first"
    onChange={changeContext}
    value={selectedContext}
    className={styles.context}
  >
    {contextList.map(context => (
      <MenuItem value={context.id} key={context.id}>
        {context.name}
      </MenuItem>
    ))}
  </SelectField>
);

ContextComponent.propTypes = {
  contextList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedContext: PropTypes.string,
  changeContext: PropTypes.func.isRequired,
};

ContextComponent.defaultProps = {
  selectedContext: undefined,
};

const ListItem = ({ groupID, groupName, selectedItem, onClick }) => {
  const isSelected = selectedItem && selectedItem.groupID === groupID;
  return (
    <SearchableListItem selected={isSelected} onClick={onClick}>
      <div>
        <div>{groupID}</div>
        <div>{groupName}</div>
      </div>
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  groupID: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  selectedItem: null,
};

const getRenderItemFunc = (onSelectItem, selectedItem) => item =>
  (
    <ListItem
      key={item.groupID}
      {...item}
      selectedItem={selectedItem}
      onClick={() => onSelectItem(item)}
    />
  );

export function OpenModalButton({ onClick }) {
  return (
    <Tooltip title="Create Group" placement="bottom">
      <IconButton onClick={onClick}>
        <Icon>add</Icon>
      </IconButton>
    </Tooltip>
  );
}

OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const getRenderMasterFunc = props => {
  const {
    items,
    onSearch,
    selectedItem,
    contextList,
    changeContext,
    context,
    loading,
  } = props;
  // eslint-disable-next-line
  return ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Groups"
        shown={items ? items.length : 0}
      >
        <ModalForm
          formName={FORM_NAME}
          FormComponent={CreateGroupForm}
          OpenModalComponent={OpenModalButton}
          title="Create Group"
          submittingText="Creating..."
          submitText="Create Group"
          maxWidth="lg"
          fullWidth
          {...props}
        />
      </SectionTitle>

      <ContextComponent
        contextList={contextList}
        selectedContext={context}
        changeContext={changeContext}
      />

      <SearchableList
        searchEnabled
        onSearch={({ q }) => onSearch(q)}
        placeholder="Group"
        items={items}
        toRenderFunc={getRenderItemFunc(item => {
          // eslint-disable-next-line
          actions.onSelectItem(item.groupID);
        }, selectedItem)}
        showMore={false}
        initialLoading={loading}
      />
    </div>
  );
};

getRenderMasterFunc.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  contextList: PropTypes.arrayOf(PropTypes.object),
  changeContext: PropTypes.func.isRequired,
  context: PropTypes.string,
};

getRenderMasterFunc.defaultProps = {
  items: undefined,
  contextList: [],
  context: undefined,
};

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const groupStyles = getDrawerStyles();

const GroupComponent = props => {
  const [loading, contextList] = useContextListHookWithGroups();
  return loading ? (
    <Loading />
  ) : (
    <MasterDetail
      component="section"
      master={getRenderMasterFunc({
        ...props,
        contextList,
      })}
      classes={{
        content: styles.masterDetailContent,
        drawerPaper: props.classes.drawerPaper,
        expander: props.classes.expander,
      }}
      detail={detailProps => (
        <Details
          {...detailProps}
          selectedItem={props.selectedItem}
          context={props.context}
        />
      )}
      empty={renderEmpty}
      baseUrl={props.baseUrl}
    />
  );
};

GroupComponent.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onSearch: PropTypes.func.isRequired,
  context: PropTypes.string,
  classes: PropTypes.object,
};

GroupComponent.defaultProps = {
  selectedItem: null,
  context: undefined,
  classes: {},
};

export default withStyles(groupStyles)(GroupComponent);
