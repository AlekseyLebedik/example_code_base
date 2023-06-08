import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from 'playpants/components/ExpansionPanel';

import { getDurationFromNowString } from 'playpants/helpers/dateTime';
import { printValue } from './helpers';

import styles from './index.module.css';

const EventCards = ({ history, dateTime }) => {
  const [expanded, setExpanded] = useState(false);

  return history.map(
    ({
      field,
      id: key,
      new_value: newValue,
      original_value: originalValue,
      timestamp,
      type,
      user,
    }) => {
      const duration = getDurationFromNowString(timestamp);
      const title = (
        <Typography color="textSecondary" gutterBottom>
          <strong>{user && user.name} </strong>
          {type === 'create' ? (
            <>
              created{' '}
              <strong>
                {field === 'id'
                  ? 'event'
                  : field.substring(0, field.indexOf('.id'))}
              </strong>
            </>
          ) : (
            <>
              made changes to <strong>{field}</strong>
            </>
          )}{' '}
          - {duration.length > 1 ? `${duration} ago` : 'now'}
        </Typography>
      );
      const details = type !== 'create' && (
        <>
          <Divider />
          <Grid container className={styles.contentDetails}>
            <Grid item xs={4}>
              {field}
            </Grid>
            <Grid item xs={4}>
              {printValue(dateTime, originalValue)}
            </Grid>
            <Grid item xs={4}>
              {printValue(dateTime, newValue, originalValue)}
            </Grid>
          </Grid>
        </>
      );
      return (
        <div className={styles.container} key={key}>
          <div className={styles.content}>
            <ExpansionPanel
              classes={{
                title: styles.title,
              }}
              defaultExpanded={false}
              details={details}
              expanded={expanded}
              handleSelection={setExpanded}
              id={key}
              title={title}
            />
          </div>
        </div>
      );
    }
  );
};

export default EventCards;
