import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PlatformIcons from 'playpants/components/PlatformIcons';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import { selectedTitlesSelector } from 'playpants/scenes/Event/components/Activities/selectors';
import { SUBTITLE } from './constants';
import styles from './index.module.css';

export const ActivityListItemBase = props => {
  const {
    activity,
    activitySettings,
    activityTypeFilter,
    disabled,
    exec_order: index,
    handleActivitySelection,
    handleDelete,
    id,
    isRestricted,
    name,
    permissions,
    selectedItemId,
    selectedTitles,
    type,
  } = props;

  const disableListItem =
    disabled || permissions[`${type}WritePermission`] === false;
  const isSelected = selectedItemId === id;
  const subtitle = SUBTITLE(type, activity);
  const displayName =
    name || activitySettings.filter(a => a.type === type).map(a => a.name);

  return (
    <Draggable
      draggableId={id}
      index={index}
      isDragDisabled={activityTypeFilter !== 'all' || disableListItem}
    >
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            className={classNames(styles.card, {
              [styles.selected]: isSelected,
            })}
            onClick={() => handleActivitySelection(id)}
          >
            <CardContent className={styles.cardBody}>
              <div className={styles.activityDesc}>
                <div className={styles.activityName}>
                  {`${index + 1}) ${displayName} (${id})`}
                </div>
                {subtitle}
              </div>
              <div
                className={classNames(styles.titleIcons, {
                  [styles.highlightIcon]: isSelected,
                })}
              >
                <PlatformIcons titles={selectedTitles} />
              </div>
              {!disableListItem && (
                <div className={styles.deleteActivity}>
                  <ConfirmActionComponent
                    tooltip="Delete Activity"
                    className={styles.deleteButton}
                    confirm={{
                      title: 'Confirm Delete',
                      confirmMsg: (
                        <>
                          <p>Are you sure you want to delete this activity?</p>
                          <p>You will not be able to undo this operation.</p>
                        </>
                      ),
                      mainButtonLabel: 'Delete',
                      destructive: true,
                    }}
                    component="IconButton"
                    onClick={() => handleDelete(id)}
                    iconClassName={styles.deleteIcon}
                    cancelOnBackdropClick
                    disabled={isRestricted}
                  >
                    delete_forever
                  </ConfirmActionComponent>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

ActivityListItemBase.propTypes = {
  activity: PropTypes.object,
  activitySettings: PropTypes.arrayOf(PropTypes.object).isRequired,
  activityTypeFilter: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  exec_order: PropTypes.number.isRequired,
  handleActivitySelection: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isRestricted: PropTypes.bool,
  name: PropTypes.string,
  permissions: PropTypes.object.isRequired,
  selectedItemId: PropTypes.string,
  selectedTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

ActivityListItemBase.defaultProps = {
  activity: {},
  isRestricted: false,
  name: null,
  selectedItemId: '',
};

const mapStateToProps = (state, props) => ({
  selectedTitles: selectedTitlesSelector(state, props),
});

export default connect(mapStateToProps)(ActivityListItemBase);
