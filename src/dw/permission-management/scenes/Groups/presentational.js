import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import MasterDetail from 'dw/core/components/MasterDetail';
import { getDrawerStyles } from 'dw/core/components/MasterDetail/helpers';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import Empty from 'dw/core/components/Empty';
import ModalForm from 'dw/core/components/ModalForm';
import CreateGroupForm from './components/CreateGroupForm';
import CloneGroup from './components/CloneGroup';
import RenameGroup from './components/RenameGroup';

import Details from './components/Details';

import styles from './presentational.module.css';

const ListItem = ({
  deleteGroup,
  id,
  isGroupOption,
  name,
  onClick,
  selectedItemId,
}) => {
  const isSelected = selectedItemId === id.toString();
  return (
    <SearchableListItem
      className={classNames({
        [styles.listItem]: !isGroupOption,
      })}
      selected={isSelected}
      onClick={onClick}
      disabled={isGroupOption}
    >
      <div>
        <div>{name}</div>
      </div>
      {!isGroupOption && (
        <ConfirmActionComponent
          className={styles.deleteBtn}
          onClick={deleteGroup}
          tooltip="Delete Group"
          confirm={{
            title: 'Confirm Permission Group Deletion',
            confirmMsg:
              'This will remove any permissions assigned to users via this group. Are you sure you want to delete?',
            mainButtonLabel: 'Delete',
            destructive: true,
          }}
          component="IconButton"
        >
          delete_forever
        </ConfirmActionComponent>
      )}
      {!isGroupOption && <CloneGroup itemId={id} />}
      {!isGroupOption && <RenameGroup itemId={id} name={name} />}
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isGroupOption: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedItemId: PropTypes.string,
};

ListItem.defaultProps = {
  isGroupOption: false,
  selectedItemId: null,
};

const getRenderItemFunc = (onSelectItem, selectedItemId, deleteGroup) => item =>
  (
    <ListItem
      key={item.id}
      {...item}
      selectedItemId={selectedItemId}
      onClick={() => onSelectItem(item)}
      deleteGroup={() => deleteGroup(item)}
      header={item.header}
    />
  );

const OpenModalComponent = ({ onClick }) => (
  <Tooltip title="Create Group" placement="bottom">
    <IconButton onClick={onClick}>
      <Icon>add</Icon>
    </IconButton>
  </Tooltip>
);
OpenModalComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CreateGroupButton = ({ createGroupFormName, onSubmit }) => (
  <>
    <ModalForm
      formName={createGroupFormName}
      FormComponent={CreateGroupForm}
      OpenModalComponent={OpenModalComponent}
      title="Create Group"
      submittingText="Creating..."
      submitText="Create Group"
      onFormSubmit={onSubmit}
      fullWidth
      maxWidth="md"
    />
  </>
);

CreateGroupButton.propTypes = {
  createGroupFormName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const getRenderMasterFunc = props => {
  const { deleteGroup, items, nextPage, onSearch, onShowMore } = props;

  const showMore = !!nextPage;
  // eslint-disable-next-line
  return ({ actions, selectedItemId }) => (
    <div className="flex flex-col h-full">
      <SectionTitle
        color="default"
        title="Groups"
        shown={items ? items.filter(x => !x.isGroupOption).length : 0}
      >
        <CreateGroupButton {...props} />
      </SectionTitle>

      <SearchableList
        searchEnabled
        placeholder="Group"
        items={items}
        toRenderFunc={getRenderItemFunc(
          // eslint-disable-next-line
          item => actions.onSelectItem(item.id),
          selectedItemId,
          deleteGroup
        )}
        onSearch={onSearch}
        showMore={showMore}
        onShowMore={() => onShowMore(nextPage)}
        loadingTimeout={0}
        infiniteScroll
      />
    </div>
  );
};

getRenderMasterFunc.propTypes = {
  deleteGroup: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  nextPage: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func,
};

getRenderMasterFunc.defaultProps = {
  items: undefined,
  nextPage: null,
  onShowMore: () => {},
};

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const useStyles = theme => ({
  masterDetailContent: {
    boxShadow:
      '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
  },
  ...getDrawerStyles()(theme),
});

const Groups = props => (
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

Groups.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

Groups.defaultProps = {
  selectedItem: null,
};

export default withStyles(useStyles)(Groups);
