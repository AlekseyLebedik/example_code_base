import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import MasterDetail from 'dw/core/components/MasterDetail';
import SectionTitle from 'dw/core/components/SectionTitle';
import SearchableList from 'dw/core/components/SearchableList';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import Empty from 'dw/core/components/Empty';
import ModalForm from 'dw/core/components/ModalForm';

import { NAVBAR_HEIGHT } from '@demonware/devzone-core/constants';

import CreateGroupForm from './components/CreateGroupForm';
import Details from './components/Details';
import ButtonGroups from './components/ButtonsGroup';
import { FORM_NAME } from './constants';

import styles from './presentational.module.css';

const EXTRA_OFFSET = 40;

const useStyles = makeStyles({
  drawer: props => {
    const offset = props?.scene === 'groups' ? EXTRA_OFFSET : 0;
    return {
      height: `calc(100% - ${NAVBAR_HEIGHT + offset}px)`,
      marginTop: `${NAVBAR_HEIGHT + offset}px`,
    };
  },
});

const ListItem = ({
  groupID,
  groupName,
  selectedItem,
  onClick,
  onSubmitReplaceUsers,
}) => {
  const isSelected = selectedItem && selectedItem.groupID === groupID;

  return (
    <SearchableListItem selected={isSelected} onClick={onClick}>
      <div className={styles.listItem}>
        <div>{groupID}</div>
        <div>{groupName}</div>
      </div>
      <ButtonGroups
        selectedItem={selectedItem}
        onSubmitReplaceUsers={onSubmitReplaceUsers}
      />
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  groupID: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onSubmitReplaceUsers: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  selectedItem: {
    groupID: '',
  },
};

const getRenderItemFunc = (onSelectItem, selectedItem) => item => {
  return (
    <ListItem
      key={item.groupID}
      {...item}
      selectedItem={selectedItem}
      onClick={() => onSelectItem(item)}
    />
  );
};

export function OpenModalButton({ onClick }) {
  const { state } = useLocation();
  useEffect(() => {
    if (state?.createGroup) onClick();
  }, [state]);
  return (
    <Tooltip
      title="Create Group"
      placement="bottom"
      data-cy="createGroupModalButton"
    >
      <IconButton onClick={onClick}>
        <Icon>playlist_add</Icon>
      </IconButton>
    </Tooltip>
  );
}
OpenModalButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const getRenderMasterFunc = props => {
  const { items, onSearch, selectedItem } = props;
  // eslint-disable-next-line
  return ({ actions }) => (
    <div className="flex flex-col h-full">
      <SectionTitle color="default" shown={items ? items.length : 0}>
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
        loadingTimeout={0}
      />
    </div>
  );
};

getRenderMasterFunc.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

getRenderMasterFunc.defaultProps = {
  items: undefined,
};

const renderEmpty = () => <Empty>Select an item to get more details</Empty>;

const GroupObjects = props => {
  const { scene } = useParams();
  const classes = useStyles({ scene });

  return (
    <MasterDetail
      component="section"
      master={getRenderMasterFunc(props)}
      classes={{
        drawerPaper: classes.drawer,
        content: styles.masterDetailContent,
      }}
      detail={detailProps => (
        <Details {...detailProps} selectedItem={props.selectedItem} />
      )}
      empty={renderEmpty}
      baseUrl={props.baseUrl}
    />
  );
};

GroupObjects.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onSearch: PropTypes.func.isRequired,
};

GroupObjects.defaultProps = {
  selectedItem: null,
};

export default GroupObjects;
