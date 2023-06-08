import React from 'react';
import PropTypes from 'prop-types';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import { TEMPLATE_FORM_NAME } from 'playpants/components/TemplateFormDialog/constants';
import TemplateFormDialog from 'playpants/components/TemplateFormDialog';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { getDurationFromSeconds } from 'playpants/helpers/dateTime';

import styles from './index.module.css';

const ListItem = props => {
  const { selectedItemId, item, onDeleteThenRedirect, onClick } = props;
  const isSelected = selectedItemId === `${item.source_event}`;
  const thisFormName = `${TEMPLATE_FORM_NAME}-${item.id}`;
  return (
    <SearchableListItem
      className="flex flex-col"
      selected={isSelected}
      onClick={onClick}
    >
      <div className={styles.listItem} data-cy={item.name}>
        <MuiListItemText
          primary={item.name}
          primaryTypographyProps={{ color: 'inherit' }}
        />
        {isSelected && (
          <div className={styles.listItemActionContainer}>
            <TemplateFormDialog
              action="patch"
              form={thisFormName}
              icon="edit"
              initialValues={{
                description: item.description,
                duration: getDurationFromSeconds(item.duration),
                hasEndDate: !!item.duration,
                is_schedule: item.is_schedule,
                name: item.name,
                oldName: item.name,
                restrict_activities: item.restrict_activities,
                templateId: item.id,
              }}
              submitText="Save"
              submittingText="Saving"
              title="Edit Template"
            />
            <ConfirmActionComponent
              data-cy="delete-template"
              className={styles.secondaryButton}
              onClick={() => onDeleteThenRedirect(item.id)}
              tooltip="Delete Template"
              confirm={{
                title: 'Confirm Template Deletion',
                confirmMsg:
                  'This will delete the template. Are you sure you want to delete this template?',
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
      {isSelected && (
        <>
          <MuiListItem divider disableGutters>
            <MuiListItemIcon>
              {item.restrict_activities ? (
                <Icon color="error" fontSize="small">
                  lock
                </Icon>
              ) : (
                <Icon color="inherit" fontSize="small">
                  lock_open
                </Icon>
              )}
            </MuiListItemIcon>
            <MuiListItemText
              secondary={
                item.restrict_activities
                  ? 'Activity addition/deletion restricted'
                  : 'Activity addition/deletion allowed'
              }
              classes={{ root: styles.listItemText }}
              secondaryTypographyProps={{ color: 'inherit' }}
            />
          </MuiListItem>
          <MuiListItem disableGutters>
            <MuiListItemText
              secondary={item.description || 'No description'}
              secondaryTypographyProps={{ color: 'inherit' }}
            />
          </MuiListItem>
        </>
      )}
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  selectedItemId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onDeleteThenRedirect: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

ListItem.defaultProps = {
  selectedItemId: undefined,
};

export const getRenderItemFunc =
  (onSelectItem, selectedItemId, onDeleteThenRedirect, onCloseForm) => item => {
    const { id, header } = item;
    return (
      <ListItem
        key={id}
        item={item}
        selectedItemId={selectedItemId}
        onClick={() => onSelectItem(item)}
        header={header}
        onDeleteThenRedirect={onDeleteThenRedirect}
        onCloseForm={onCloseForm}
      />
    );
  };
