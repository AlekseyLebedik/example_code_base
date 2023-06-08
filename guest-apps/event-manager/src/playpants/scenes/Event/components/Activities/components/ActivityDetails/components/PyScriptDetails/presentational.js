import React from 'react';
import PropTypes from 'prop-types';

import SchemaForm from 'playpants/components/SchemaForm';
import MainDetailsEmpty from 'playpants/components/MainDetailsEmpty';
import { NO_TITLE_SELECTED } from 'playpants/scenes/Event/components/Activities/constants';

import ActivityTitle from '../ActivityTitle';
import CustomTitleComponent from './components/CustomTitleComponent';

const StatelessPyScriptDetails = ({
  classes,
  disabled,
  handleUpdate,
  needsUpdate,
  noTitleSelected,
  onUpdate,
  pyScript,
  selectedActivity,
  templates,
}) => (
  <>
    <ActivityTitle
      customComponent={
        <CustomTitleComponent
          selectedActivity={selectedActivity}
          onSchemaModelUpdate={handleUpdate}
          templates={templates}
          disabled={disabled}
        />
      }
    />
    {noTitleSelected ? (
      <MainDetailsEmpty msg={NO_TITLE_SELECTED} />
    ) : (
      <div className={classes.activityContainer}>
        <SchemaForm
          data={selectedActivity.activity}
          schema={pyScript.schema}
          onUpdate={onUpdate}
          handleVersionUpdate={handleUpdate}
          disabled={disabled}
          needsUpdate={needsUpdate}
        />
      </div>
    )}
  </>
);

StatelessPyScriptDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  needsUpdate: PropTypes.bool.isRequired,
  noTitleSelected: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  pyScript: PropTypes.object.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StatelessPyScriptDetails;
