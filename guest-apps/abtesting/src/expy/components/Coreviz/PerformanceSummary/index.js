import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import axios from 'dw/core/axios';
import UpIcon from '../../../icons/UpIcon';
import DownIcon from '../../../icons/DownIcon';
import Svg from '../../Svg';
import NoResults from './support/NoResults';
import DashboardButton from '../DashboardButton';
import { useStyles } from './styles';

const PerformanceSummary = ({ name, status, type, hasDashboardButton }) => {
  const classes = useStyles();
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/kpi-service-prod/experiments/result/${encodeURI(name)}`
      );
      const { data } = response;
      setSummary(data);
    }
    fetchData();
  }, []);

  const renderIcon = color => {
    if (!color) {
      return (
        <div className={cn(classes.badge, classes.grey)}>
          <div className={classes.circle} />
        </div>
      );
    }

    if (color === 'green') {
      return (
        <div className={cn(classes.badge, classes.green)}>
          <Svg
            className={classes.svg}
            size="small"
            color="approved"
            icon={<UpIcon />}
          />
        </div>
      );
    }

    return (
      <div className={cn(classes.badge, classes.red)}>
        <Svg
          className={classes.svg}
          size="small"
          color="denied"
          icon={<DownIcon />}
        />
      </div>
    );
  };

  const renderSymbol = color => (color === 'green' ? '+' : '');

  if (summary.length === 0) return <NoResults />;

  return (
    <>
      {summary.map(s => (
        <div key={s.treatment} className={classes.container}>
          <p className={classes.title}>{s.treatment}</p>
          <div className={classes.details}>
            <div className={classes.nameContainer}>
              {renderIcon(s.color)}
              <p className={classes.name}>Percent Change CP Spend</p>
            </div>
            <p className={classes.value}>
              {renderSymbol(s.color)} {s.incremental_cp_spend}
            </p>
          </div>
          <div className={classes.details}>
            <div className={classes.nameContainer}>
              {renderIcon(s.color)}
              <p className={classes.name}>Increase in Daily Revenue</p>
            </div>
            <p className={classes.value}>
              {renderSymbol(s.color)} {s.incremental_daily_revenue}
            </p>
          </div>
          <div className={classes.details}>
            <div className={classes.nameContainer}>
              {renderIcon(s.color)}
              <p className={classes.name}>Increase in Total Revenue</p>
            </div>
            <p className={classes.value}>
              {renderSymbol(s.color)} {s.incremental_revenue}
            </p>
          </div>
          <div className={classes.details}>
            <div className={classes.nameContainer}>
              {renderIcon()}
              <p className={classes.name}>Cohort Size</p>
            </div>
            <p className={classes.value}>{s.cohort_pcnt}</p>
          </div>
          <div className={classes.details}>
            <div className={classes.nameContainer}>
              {renderIcon()}
              <p className={classes.name}>Control Size</p>
            </div>
            <p className={classes.value}>{s.control_pcnt}</p>
          </div>
        </div>
      ))}
      {hasDashboardButton && (
        <DashboardButton name={name} status={status} type={type}>
          Details
        </DashboardButton>
      )}
    </>
  );
};

PerformanceSummary.defaultProps = {
  hasDashboardButton: false,
  status: '',
  type: '',
};

PerformanceSummary.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  type: PropTypes.string,
  hasDashboardButton: PropTypes.bool,
};

export default PerformanceSummary;
