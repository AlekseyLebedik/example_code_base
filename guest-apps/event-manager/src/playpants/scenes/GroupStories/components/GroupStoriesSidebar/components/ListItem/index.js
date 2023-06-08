import React from 'react';
import PropTypes from 'prop-types';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import GroupStoryFormDialog from '../GroupStoryFormDialog';
import { GROUP_STORY_FORM } from '../GroupStoryFormDialog/constants';
import DeleteStoryMessage from '../DeleteStoryMessage';
import styles from './index.module.css';

export const ListItem = props => {
  const {
    currentProject,
    item,
    onClick,
    onDeleteThenRedirect,
    selectedGroupStory,
  } = props;
  const isSelected = selectedGroupStory.id === item.id;
  const thisFormName = `${GROUP_STORY_FORM}-${item.id}`;
  return (
    <SearchableListItem
      className="flex flex-col"
      selected={isSelected}
      onClick={onClick}
    >
      <div className={styles.listItem}>
        <MuiListItemText
          primary={item.name}
          primaryTypographyProps={{ color: 'inherit' }}
        />
        {isSelected && (
          <div className={styles.listItemActionContainer}>
            <GroupStoryFormDialog
              action="patch"
              currentProject={currentProject}
              form={thisFormName}
              icon="edit"
              initialValues={{
                name: item.name,
                description: item.description,
                storyId: item.id,
              }}
              submitText="Save"
              submittingText="Saving"
              title="Edit Story"
            />
            <ConfirmActionComponent
              className={styles.secondaryButton}
              onClick={() => onDeleteThenRedirect(item.id)}
              tooltip="Delete Story"
              confirm={{
                title: 'Confirm Story Deletion',
                confirmMsg: <DeleteStoryMessage />,
                mainButtonLabel: 'Delete',
                destructive: true,
              }}
              component="IconButton"
            >
              delete_forever
            </ConfirmActionComponent>
          </div>
        )}
      </div>
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  currentProject: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDeleteThenRedirect: PropTypes.func.isRequired,
  selectedGroupStory: PropTypes.object.isRequired,
};

export const getRenderItemFunc =
  (onSelectItem, selectedGroupStory, onDeleteThenRedirect, currentProject) =>
  item =>
    (
      <ListItem
        currentProject={currentProject}
        item={item}
        key={item.id}
        onClick={() => onSelectItem(item)}
        onDeleteThenRedirect={onDeleteThenRedirect}
        selectedGroupStory={selectedGroupStory}
      />
    );
