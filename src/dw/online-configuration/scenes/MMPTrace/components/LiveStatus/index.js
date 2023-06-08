import React from 'react';
import { Paper, Grid, makeStyles, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#0003001e',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    color: 'black',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 900,
  },
  activeColor: {
    color: '#009688',
  },
  valuesTitle: {
    fontSize: '12px',
    fontWeight: '100',
    marginRight: '5px',
  },
});

export default function LiveStatus(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    data && (
      <Paper className={classes.root}>
        <Grid container direction="row" spacing={2} wrap>
          <Grid
            container
            xs={4}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Grid item>
              <Typography className={[classes.title, classes.activeColor]}>
                {data.title[0]}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.valuesTitle}>
                Party of {data.values.party.length}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.valuesTitle}>
                Presense of {data.values.presence.length}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={8}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Grid item>
              <Typography className={classes.title}>{data.title[1]}</Typography>
            </Grid>
            <Grid item>
              {data.values.party.map(partyName => {
                return (
                  <Typography
                    component="span"
                    className={
                      data.values.presence.includes(partyName)
                        ? [classes.valuesTitle, classes.activeColor]
                        : classes.valuesTitle
                    }
                  >
                    {partyName},
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  );
}

LiveStatus.defaultProps = {
  data: null,
};

LiveStatus.propTypes = {
  data: PropTypes.object,
};
