import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { formatDateTimeSelector } from 'playpants/helpers/dateTime';
import Overview from './components/Overview';
import MonacoExpansion from './components/MonacoExpansion';
import SubTasks from './components/SubTasks';

import styles from './index.module.css';

const TaskMonitorDetail = props => {
  const {
    baseUrl,
    classes,
    onSelectItem,
    overviewDetails,
    subTasks,
    taskDetails,
  } = props;
  const handleOnSelectItem = id => onSelectItem(id, baseUrl);
  return (
    <>
      <Overview details={overviewDetails} />
      <Grid container className={styles.gridContainer}>
        <Grid item xs={12}>
          {taskDetails.map(itemProps => {
            const taskDetailProps = { ...itemProps };
            if (!taskDetailProps.options) taskDetailProps.options = {};
            taskDetailProps.options.automaticLayout = true;
            return <MonacoExpansion {...taskDetailProps} />;
          })}
        </Grid>
        <Grid item xs={12}>
          <SubTasks
            classes={classes}
            subTasks={subTasks}
            handleOnSelectItem={handleOnSelectItem}
          />
        </Grid>
      </Grid>
    </>
  );
};

TaskMonitorDetail.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  overviewDetails: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  subTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  taskDetails: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
      defaultExpanded: PropTypes.bool,
    })
  ).isRequired,
};

const mapStateToProps = state => ({
  dateTime: formatDateTimeSelector(state),
});

export default connect(mapStateToProps)(TaskMonitorDetail);
