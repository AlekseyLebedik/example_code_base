import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ExpansionPanel from 'playpants/components/ExpansionPanel';
import Badge from '@material-ui/core/Badge';

import EventStatus from './components/EventStatus';
import EventTask from './components/EventTask';
import Authorization from './components/Authorization';
import Notes from './components/Notes';
import Tags from './components/Tags';

const ExpansionPanels = props => {
  const { badgeCount, classes, eventData, isEventManagerEvent, status } = props;
  const [expanded, setExpanded] = useState(
    isEventManagerEvent ? 'workflow' : 'notes'
  );

  return (
    <>
      {isEventManagerEvent && (
        <Badge
          classes={{
            root: classes.panelBadgeRoot,
            badge: classes.panelBadge,
          }}
          badgeContent={badgeCount.workflowCount}
        >
          {!eventData.is_schedule && (
            <ExpansionPanel
              classes={{
                title: classes.lightGrey,
              }}
              details={
                <Grid container spacing={5}>
                  <EventStatus {...props} />
                  {eventData.task && <EventTask {...props} />}
                  {status.showAuths && <Authorization {...props} />}
                </Grid>
              }
              expanded={expanded}
              handleSelection={setExpanded}
              title="workflow"
            />
          )}
        </Badge>
      )}
      <ExpansionPanel
        classes={{
          title: classes.lightGrey,
        }}
        dataCy="notesExpansionPanel"
        defaultExpanded={false}
        details={<Notes {...props} />}
        expanded={expanded}
        handleSelection={setExpanded}
        title="notes"
      />
      <ExpansionPanel
        classes={{
          title: classes.lightGrey,
        }}
        dataCy="tagsExpansionPanel"
        defaultExpanded={false}
        details={<Tags {...props} />}
        expanded={expanded}
        handleSelection={setExpanded}
        title="tags"
      />
    </>
  );
};

ExpansionPanels.propTypes = {
  badgeCount: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  eventData: PropTypes.object.isRequired,
  isEventManagerEvent: PropTypes.bool.isRequired,
  status: PropTypes.object.isRequired,
};

export default ExpansionPanels;
