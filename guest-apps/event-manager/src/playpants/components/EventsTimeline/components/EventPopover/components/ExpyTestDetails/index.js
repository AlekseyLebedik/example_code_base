import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { formatDateTime } from 'playpants/helpers/dateTime';

import { EXPY_TEST_PROPTYPE } from 'playpants/scenes/Schedule/constants';

import GridItem from '../GridItem';

const ExpyTestDetails = props => {
  const { event, userTimezone } = props;
  const {
    categories,
    dateEnd,
    dateStart,
    detailsTitle,
    hypothesis,
    id,
    name,
    owner,
    status,
    summary,
  } = event;

  if (isEmpty(event)) {
    return null;
  }

  const testDateStart = formatDateTime(
    new Date(dateStart),
    'MMM Do YYYY, hh:mma',
    userTimezone
  );
  const testDateEnd = formatDateTime(
    new Date(dateEnd),
    'MMM Do YYYY, hh:mma',
    userTimezone
  );

  return (
    <Grid container spacing={2}>
      <Grid item key={`expyDetails/${id}/${name}/${name}`} xs={12}>
        <Typography component="div" variant="h6">
          {name}
        </Typography>
      </Grid>
      <GridItem
        key={`expyDetails/${id}/${name}/owner`}
        title="Owner"
        titleSize={2}
        value={owner}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/status`}
        title="Status"
        titleSize={2}
        value={status}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/hypothesis`}
        title="Hypothesis"
        titleSize={2}
        value={hypothesis}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/summary`}
        title="Summary"
        titleSize={2}
        value={summary}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/testDateStart`}
        title="Start Date"
        titleSize={2}
        value={testDateStart}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/testDateEnd`}
        title="End Date"
        titleSize={2}
        value={testDateEnd}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/title`}
        title="Title"
        titleSize={2}
        value={detailsTitle}
      />
      <GridItem
        key={`expyDetails/${id}/${name}/category`}
        title="Category"
        titleSize={2}
        value={categories?.join(', ')}
      />
    </Grid>
  );
};

ExpyTestDetails.propTypes = {
  event: EXPY_TEST_PROPTYPE.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

export default ExpyTestDetails;
