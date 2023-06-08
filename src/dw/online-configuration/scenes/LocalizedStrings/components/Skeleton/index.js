import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  headSection: {
    width: 300,
    height: 20,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  bodySection: {
    width: 600,
    height: 40,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  smallerBodySection: {
    width: 450,
    height: 30,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footerSection: {
    width: 200,
    height: 20,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  stringSetHead: {
    width: 150,
    height: 25,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  stringSetListItem: {
    width: 100,
    height: 17,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export const DetailsRendererSkeleton = () => {
  const classes = useStyles();
  return (
    <div>
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.headSection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.bodySection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.smallerBodySection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.footerSection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.headSection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.bodySection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.smallerBodySection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.footerSection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.headSection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.bodySection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.smallerBodySection}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.footerSection}
      />
    </div>
  );
};

export const StringSetNameSelectorSkeleton = () => {
  const classes = useStyles();
  return (
    <div>
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetHead}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetListItem}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetListItem}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetListItem}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetListItem}
      />
    </div>
  );
};

export const ContextSelectorSkeleton = () => {
  const classes = useStyles();
  return (
    <div>
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetHead}
      />
      <Skeleton
        variant="rect"
        animation="wave"
        className={classes.stringSetListItem}
      />
    </div>
  );
};
