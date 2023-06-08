import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  title: {
    opacity: '0.8',
  },
  itemValue: {
    opacity: '0.6',
  },
  coloredItem: {
    opacity: '1',
    fontWeight: 'bold',
  },
}));

const GridItem = ({
  title,
  value,
  size,
  titleSize,
  isChips,
  showTitle,
  classes: parentClasses,
  colorKey,
}) => {
  const classes = { ...parentClasses, ...useStyles() };
  const colorClass =
    typeof value === 'string' && get(classes, colorKey(value.toLowerCase()));

  return (
    <Grid item key={title} xs={size}>
      <Grid container spacing={1}>
        <Grid item key={`${title}_title`} xs={titleSize}>
          {showTitle && (
            <Typography
              component="span"
              variant="subtitle1"
              display="inline"
              classes={{ subtitle1: classes.title }}
            >
              {title}
            </Typography>
          )}
        </Grid>
        <Grid item key={`${title}_value`} xs={12 - titleSize}>
          {(isChips && value && (
            <Grid container spacing={1}>
              {value.map(chip => (
                <Grid item key={chip.value}>
                  <Chip
                    label={chip.value}
                    avatar={
                      chip.avatar ? (
                        <Avatar className={classes.activityAvatar}>
                          {chip.avatar}
                        </Avatar>
                      ) : undefined
                    }
                    className={classes.activityChip}
                  />
                </Grid>
              ))}
            </Grid>
          )) || (
            <Typography
              component="span"
              variant="subtitle1"
              display="inline"
              classes={{
                root: cn(classes.itemValue, {
                  [colorClass]: colorClass,
                  [classes.coloredItem]: colorClass,
                }),
              }}
            >
              {value}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

GridItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({ value: PropTypes.string, avatar: PropTypes.number })
    ),
  ]).isRequired,
  size: PropTypes.number,
  titleSize: PropTypes.number,
  isChips: PropTypes.bool,
  showTitle: PropTypes.bool,
  classes: PropTypes.object,
  colorKey: PropTypes.func,
};

GridItem.defaultProps = {
  size: 12,
  titleSize: 3,
  isChips: false,
  showTitle: true,
  classes: {},
  colorKey: () => {},
};

export default GridItem;
