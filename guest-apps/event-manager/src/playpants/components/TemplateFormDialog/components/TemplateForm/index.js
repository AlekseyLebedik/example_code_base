import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Duration from 'playpants/components/FormFields/Duration';
import FlagField from './components/FlagField';
import NameField from './components/NameField';
import DescriptionField from './components/DescriptionField';
import EnvironmentField from './components/EnvironmentField';

const TemplateForm = props => {
  const {
    action,
    hasEndDate,
    initialValues: { duration },
    isSchedule,
    onSubmit,
  } = props;

  return (
    <Form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NameField />
        </Grid>
        <Grid item xs={12}>
          <DescriptionField />
        </Grid>
        {action === 'create' && (
          <Grid item xs={12}>
            <EnvironmentField />
          </Grid>
        )}

        <Grid item xs={12}>
          <FlagField
            name="is_schedule"
            onProps={{
              label: 'Timewarp Schedule Event',
              text: 'Events created from this template will be restricted to timewarp schedule stories with only client commands allowed',

              icon: 'event_available',
            }}
            offProps={{
              label: 'Not a Timewarp Schedule Event',
              text: 'Events created from this template will act as normal and remain available from the main calendar',
              icon: 'update_disabled',
            }}
            inputProps={{
              'data-cy': 'template-timewarp-schedule-field',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FlagField
            name="restrict_activities"
            onProps={{
              label: 'Restricted',
              text: 'Events created from this template will not be able to add new or delete existing activities',

              icon: 'lock',
            }}
            offProps={{
              label: 'Allowed',
              text: 'Events created from this template will be able to add new or delete existing activities',
              icon: 'lock_open',
            }}
            inputProps={{
              'data-cy': 'template-restrict-activities-field',
            }}
            valueOverride={isSchedule}
          />
        </Grid>
        {action !== 'save' && (
          <>
            <Grid item xs={12}>
              <FlagField
                name="hasEndDate"
                onProps={{
                  label: 'Duration',
                  text: 'Events created from this template will have a start and end publish date',
                  icon: 'date_range',
                }}
                offProps={{
                  label: 'No Duration',
                  text: 'Events created from this template will only have a start publish date',
                  icon: 'event_busy',
                }}
                inputProps={{
                  'data-cy': 'template-duration-field',
                }}
                valueOverride={isSchedule}
              />
            </Grid>
            {hasEndDate && <Duration duration={duration} />}
          </>
        )}
      </Grid>
    </Form>
  );
};

TemplateForm.propTypes = {
  action: PropTypes.string.isRequired,
  hasEndDate: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  isSchedule: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TemplateForm;
