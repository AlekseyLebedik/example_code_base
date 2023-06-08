import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import NameField from 'playpants/components/StoryFormComponents/components/NameField';
import DescriptionField from 'playpants/components/StoryFormComponents/components/DescriptionField';

const GroupStoryForm = props => {
  const { asyncValidating, onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NameField
            asyncValidating={asyncValidating && asyncValidating === 'name'}
          />
        </Grid>
        <Grid item xs={12}>
          <DescriptionField />
        </Grid>
      </Grid>
    </Form>
  );
};

GroupStoryForm.propTypes = {
  asyncValidating: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSubmit: PropTypes.func.isRequired,
};

GroupStoryForm.defaultProps = {
  asyncValidating: false,
};

export default GroupStoryForm;
