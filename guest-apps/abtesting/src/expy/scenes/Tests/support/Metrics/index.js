import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Metric from './support/Metric';
import { getTestData, getDataByYear } from './helpers';

import { useStyles } from './styles';

const currentYear = new Date().getFullYear();
const previousYear = currentYear - 1;

const Metrics = () => {
  const classes = useStyles();
  const [proposals, setProposals] = useState([]);
  const [live, setLive] = useState([]);
  const [done, setDone] = useState({ original: [], filtered: [] });
  const [year, setYear] = useState(currentYear);

  const setData = async () => {
    const { liveData, proposalData, doneOriginal, doneFiltered } =
      await getTestData(currentYear);
    setProposals(proposalData);
    setLive(liveData);
    setDone({ original: doneOriginal, filtered: doneFiltered });
  };

  useEffect(() => {
    setData();
  }, []);

  const onYearClick = date => {
    const newDoneState = getDataByYear(done.original, date);
    setDone({ ...done, filtered: newDoneState });
    setYear(date);
  };

  return (
    <div className={classes.wrapper}>
      <Metric
        className={classes.metric}
        type="live"
        amount={live.length}
        heading="Live Tests"
      >
        <span className={classes.badge}>Current</span>
      </Metric>
      <Metric
        className={classes.metric}
        type="proposal"
        amount={proposals.length}
        heading="Proposals"
      >
        <span className={classes.badge}>Current</span>
      </Metric>
      <Metric
        className={classes.metric}
        type="done"
        amount={done.filtered.length}
        heading="Done Tests"
      >
        <button
          type="button"
          className={cn(classes.badge, classes.badgeClickable, {
            [classes.badgeInActive]: currentYear !== year,
          })}
          onClick={() => onYearClick(currentYear)}
        >
          {currentYear}
        </button>
        <button
          type="button"
          className={cn(classes.badge, classes.badgeClickable, {
            [classes.badgeInActive]: previousYear !== year,
          })}
          onClick={() => onYearClick(previousYear)}
        >
          {previousYear}
        </button>
      </Metric>
    </div>
  );
};

export default Metrics;
