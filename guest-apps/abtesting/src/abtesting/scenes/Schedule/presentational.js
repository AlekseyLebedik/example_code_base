import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { useContextListHook } from 'abtesting/scenes/hooks';
import AgGridComponent from '../../components/AgGridComponent';
import styles from './presentational.module.css';

const Schedule = ({ scheduledTests, history, formatDateTime }) => {
  const availableContexts = useContextListHook();
  const addTestButton = (
    <Tooltip title="Create new test">
      <Fab
        color="primary"
        className={styles.addButtonContainer}
        onClick={() => history.push('/abtesting/create')}
      >
        <Icon>add</Icon>
      </Fab>
    </Tooltip>
  );
  return (
    <div className={styles.scheduleContainer}>
      {availableContexts.length > 0 ? addTestButton : null}
      <AgGridComponent rowData={scheduledTests} formatDate={formatDateTime} />
    </div>
  );
};
Schedule.propTypes = {
  history: PropTypes.object.isRequired,
  scheduledTests: PropTypes.arrayOf(PropTypes.object),
  formatDateTime: PropTypes.func,
};
Schedule.defaultProps = {
  scheduledTests: [],
  formatDateTime: null,
};

export default Schedule;
