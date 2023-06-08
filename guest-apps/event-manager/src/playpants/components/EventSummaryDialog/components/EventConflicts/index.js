import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'dw/core/components/Link';
import StatusDot from 'playpants/components/StatusDot';

import { CONFLICT_TYPES } from 'playpants/constants/conflicts';
import * as styles from './index.module.css';

const EventConflictsConfirmation = ({
  baseUrl,
  classes,
  conflicts,
  eventId,
  needsConfirmations,
  onClick,
  requiresConfirmation,
  setNeedsConfirmations,
}) => (
  <>
    <div className={classes.conflictsSummaryLinks}>
      {conflicts.map(({ conflicting_event: conflictingEvent, severity }) => (
        <Link
          key={`conflictingEventLink/${conflictingEvent.id}`}
          onClick={onClick}
          to={`${baseUrl}events/${eventId}/conflicts/${conflictingEvent.id}`}
        >
          <StatusDot
            iconClassName={classNames(
              classes[`conflict-${severity}`],
              styles.statusDot
            )}
          />
          {`Event #${conflictingEvent.id}: ${conflictingEvent.title} (${CONFLICT_TYPES[severity]})`}
        </Link>
      ))}
    </div>
    {requiresConfirmation && (
      <FormControlLabel
        checked={!needsConfirmations.conflictsCheck}
        className={classes.confirmProceed}
        control={
          <Checkbox
            className={classes.confirmProceedCheckbox}
            color="default"
            onChange={() =>
              setNeedsConfirmations({
                ...needsConfirmations,
                conflictsCheck: !needsConfirmations.conflictsCheck,
              })
            }
          />
        }
        label="Proceed Anyway"
      />
    )}
  </>
);

EventConflictsConfirmation.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  conflicts: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  needsConfirmations: PropTypes.object.isRequired,
  requiresConfirmation: PropTypes.bool.isRequired,
  setNeedsConfirmations: PropTypes.func.isRequired,
};

export default EventConflictsConfirmation;
