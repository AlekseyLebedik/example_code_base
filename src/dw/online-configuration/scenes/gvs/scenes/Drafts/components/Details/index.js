import React, { useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Empty from 'dw/core/components/Empty';
import { BreadcrumbsContext } from 'dw/online-configuration/scenes/gvs/context';
import { SCENES } from 'dw/online-configuration/scenes/gvs/constants';

import { useQueryParam } from 'dw/core/hooks';

import Config from '../Config';
import EditsDetails from '../EditsDetails';
import DraftDiffs, { EventDiff } from '../DraftDiffs';
import DeleteDraftButton from '../DeleteDraftButton';
import ReleaseDraftButton from '../ReleaseDraftButton';
import RevertDraftButton from '../RevertDraftButton';
import RestoreEventButton from '../RestoreEventButton';

const useStyles = makeStyles(theme => ({
  actions: ({ component }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: component === SCENES.DRAFTS ? 'unset' : 1,
    marginTop: -theme.spacing(1),
  }),
}));

const DetailsBase = ({ component }) => {
  const paramName = component === SCENES.DRAFTS ? 'draftId' : 'eventId';
  const componentName = component === SCENES.DRAFTS ? 'Draft' : 'Event';
  const defaultViewMode = component === SCENES.DRAFTS ? 'diff' : 'config';
  const classes = useStyles({ component });
  const { [paramName]: itemId } = useParams();
  const [OCCToken, setOCCToken] = useState();
  const refetchDraftDetails = useRef();
  const [view, setView] = useQueryParam('viewMode', defaultViewMode);
  const { actionsContainer } = useContext(BreadcrumbsContext);
  const DiffComponent = useMemo(
    () => (component === SCENES.DRAFTS ? DraftDiffs : EventDiff),
    [component]
  );
  if (!itemId) return <Empty>Select an item for details</Empty>;
  return (
    <>
      <Portal container={actionsContainer}>
        <div className={classes.actions}>
          {component === SCENES.DRAFTS && (
            <>
              <RevertDraftButton />
              <ReleaseDraftButton
                OCCToken={OCCToken}
                refetchDraftDetails={refetchDraftDetails}
              />
              <DeleteDraftButton />
            </>
          )}
          {component === SCENES.EVENTS && <RestoreEventButton />}
        </div>
      </Portal>
      <Tabs
        value={view}
        indicatorColor="primary"
        textColor="primary"
        onChange={(...[, newValue]) => setView(newValue)}
      >
        {component === SCENES.EVENTS && (
          <Tab label="Global Group Config" value="config" />
        )}
        <Tab label={`Complete ${componentName} Diff`} value="diff" />
        <Tab label="Edits" value="edits" />
      </Tabs>
      {view === 'diff' ? (
        <DiffComponent
          setOCCToken={setOCCToken}
          setRefetchDraftDetails={refetch => {
            refetchDraftDetails.current = refetch;
          }}
        />
      ) : null}
      {view === 'edits' ? <EditsDetails /> : null}
      {view === 'config' ? <Config /> : null}
    </>
  );
};

DetailsBase.propTypes = {
  component: PropTypes.string.isRequired,
};

const Details = () => {
  const params = useParams();
  return <DetailsBase component={params.scene} />;
};

export default Details;
