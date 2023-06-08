import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  timezoneOrDefaultSelector,
  humanizedElapsedTime,
} from 'playpants/helpers/dateTime';
import SearchableListItem from 'dw/core/components/SearchableListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Icon from '@material-ui/core/Icon';
import styles from './index.module.css';

const ListItem = props => {
  const { item, onClick, selectedStory, timezone } = props;
  const isSelected = selectedStory.id === item.id;
  const isScheduling = item.state === 'scheduled';
  const hasTask = !!item.task;
  const hasFailedTask = hasTask && item.task.state === 'failed';

  return (
    <SearchableListItem
      className="flex flex-col"
      selected={isSelected}
      onClick={onClick}
    >
      <div className={styles.listItem}>
        <Grid container spacing={1} alignItems="center" direction="row">
          <Grid item>
            <Tooltip
              title={`Updated ${humanizedElapsedTime(
                item.updated_at,
                timezone
              )}`}
            >
              <Icon fontSize="inherit">info_outlined</Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <MuiListItemText
              primary={item.name}
              primaryTypographyProps={{ color: 'inherit' }}
            />
          </Grid>
        </Grid>

        {isScheduling && !hasFailedTask && (
          <div className={styles.listItemActionContainer}>
            <Tooltip
              title={
                !hasTask
                  ? 'Scheduling'
                  : `${Math.round(item.task.progress * 100)}%`
              }
              TransitionComponent={Zoom}
            >
              {!hasTask ? (
                <CircularProgress
                  classes={{ colorPrimary: styles.scheduling }}
                  thickness={10}
                  size={16}
                />
              ) : (
                <CircularProgress
                  classes={{ colorPrimary: styles.inProgress }}
                  variant="static"
                  value={Math.round(item.task.progress * 100)}
                  thickness={10}
                  size={16}
                />
              )}
            </Tooltip>
          </div>
        )}
      </div>
    </SearchableListItem>
  );
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedStory: PropTypes.object,
  timezone: PropTypes.string.isRequired,
};

ListItem.defaultProps = {
  selectedStory: {},
};

const mapStateToProps = state => ({
  timezone: timezoneOrDefaultSelector(state),
});

const ConnectedListItem = connect(mapStateToProps)(ListItem);

export const getRenderItemFunc = (onSelectItem, selectedStory) => item =>
  (
    <ConnectedListItem
      key={item.id}
      item={item}
      selectedStory={selectedStory}
      onClick={() => onSelectItem(item)}
    />
  );
