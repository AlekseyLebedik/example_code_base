import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import IconButton from 'dw/core/components/IconButton';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { allGroupStoryEventsDataSelector } from 'playpants/scenes/GroupStories/components/GroupStoriesSidebar/selectors';
import {
  setSelectedThenOpen,
  removeGroupStoryFromEvent,
} from 'playpants/scenes/GroupStories/components/GroupStoriesSidebar/actions';
import { GROUP_STORIES_SIDEBAR_EVENT_DETAIL_ID } from 'playpants/scenes/GroupStories/constants';

export const DeleteStoryMessageBase = ({
  allGroupStoryEventsData,
  openDeletableEventDetail,
  onSetSelectedThenOpen,
  onRemoveGroupStoryFromEvent,
}) => (
  <Grid item xs={12}>
    <Typography>
      Deleting this story will also delete the events linked to this story.
      Please review the events that are grouped in this story before deleting.
    </Typography>

    <div>
      <List>
        {isEmpty(allGroupStoryEventsData) ? (
          <ListItem disableGutters>
            <ListItemText primary="This story has no events" />
          </ListItem>
        ) : (
          allGroupStoryEventsData.map(event => (
            <ListItem
              onClick={() =>
                onSetSelectedThenOpen(event, openDeletableEventDetail)
              }
              button
              key={event.id}
            >
              <ListItemIcon>
                <Icon>event</Icon>
              </ListItemIcon>
              <ListItemText primary={event.title} />
              <ListItemSecondaryAction>
                <IconButton
                  tooltip="Unlink event"
                  icon="link"
                  onClick={() => onRemoveGroupStoryFromEvent(event.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
    </div>
  </Grid>
);

DeleteStoryMessageBase.propTypes = {
  allGroupStoryEventsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  openDeletableEventDetail: PropTypes.func.isRequired,
  onSetSelectedThenOpen: PropTypes.func.isRequired,
  onRemoveGroupStoryFromEvent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  allGroupStoryEventsData: allGroupStoryEventsDataSelector(state),
});

const mapDispatchToProps = dispatch => ({
  openDeletableEventDetail: () =>
    dispatch(ModalHandlers.open(GROUP_STORIES_SIDEBAR_EVENT_DETAIL_ID)),
  onSetSelectedThenOpen: (event, openModal) =>
    dispatch(setSelectedThenOpen(event, openModal)),
  onRemoveGroupStoryFromEvent: eventId =>
    dispatch(removeGroupStoryFromEvent(eventId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteStoryMessageBase);
