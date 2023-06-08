import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  useParams,
  useHistory,
  useLocation,
  generatePath,
} from 'react-router-dom';

import MasterComponent from './components/Master';
import DetailsComponent from './components/Details';
import { CurrentDraftContext } from '../../context';
import { gvsUrlPattern } from '../../constants';

const useStyles = makeStyles(theme => ({
  masterDetails: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
  master: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRight: '1px solid rgba(0,0,0,0.35)',
    paddingRight: theme.spacing(2),
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: theme.spacing(2),
    position: 'relative',
  },
}));

const Drafts = () => {
  const classes = useStyles();
  const { draftId, ...params } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [currentDraftId] = useContext(CurrentDraftContext);
  useEffect(() => {
    if (draftId || !currentDraftId || params.scene !== 'drafts') return;
    history.push({
      pathname: generatePath(`${gvsUrlPattern}/:draftId?`, {
        ...params,
        draftId: currentDraftId,
      }),
      search: location.search,
    });
  }, [draftId, currentDraftId, history, location, params]);
  if (params.scene === 'drafts' && !draftId && currentDraftId) return null; // Would be redirected to the last visited draft
  return (
    <div className={classes.masterDetails}>
      <div className={classes.master}>
        <MasterComponent />
      </div>
      <div className={classes.details}>
        <DetailsComponent />
      </div>
    </div>
  );
};
export default Drafts;
