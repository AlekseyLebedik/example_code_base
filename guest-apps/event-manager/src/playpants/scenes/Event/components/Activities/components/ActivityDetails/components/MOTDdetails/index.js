import React from 'react';
import PropTypes from 'prop-types';

import GridList from '@material-ui/core/GridList';
import Item from './components/Item';
import ActivityTitle from '../ActivityTitle';

import styles from './index.module.css';

const MOTD = props => {
  const { selectedActivity, onUpdate, disabled, classes } = props;
  const { id, activity } = selectedActivity;
  const { languages } = activity;
  const listOfMOTDs = languages.map((motd, idx) => (
    <Item
      languages={languages}
      language={motd.language}
      text={motd.text}
      key={`MOTDItem/${id}/${motd.language}`}
      id={idx}
      onUpdate={onUpdate}
      disabled={disabled}
    />
  ));
  return (
    <>
      <ActivityTitle
        customComponent={
          <Item
            languages={languages}
            onUpdate={onUpdate}
            key={`NewMOTDItem/${id}`}
            disabled={disabled}
          />
        }
      />
      <div className={classes.activityContainer}>
        <GridList className={styles.motdList} cellHeight="auto" cols={null}>
          {listOfMOTDs}
        </GridList>
      </div>
    </>
  );
};

MOTD.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default MOTD;
