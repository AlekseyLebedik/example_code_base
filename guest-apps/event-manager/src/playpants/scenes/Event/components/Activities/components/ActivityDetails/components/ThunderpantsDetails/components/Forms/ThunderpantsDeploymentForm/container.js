import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as selectors from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/selectors';
import { parseDataFromSchema, parseTargets, parseUserParams } from './helpers';
import ThunderpantsDeploymentFormStateless from './presentational';

export const ThunderpantsDeploymentForm = ({
  formData,
  formSchema,
  formSummaryData,
  formTargets,
  formType,
  ...restProps
}) => {
  const target =
    formData.target ||
    formTargets.reduce((accum, el) => ({ ...accum, [el.name]: false }), {});

  const initialData = {
    userParams: parseDataFromSchema(formData, formSchema),
    build_uid: formData.build_uid,
    buildData: formSummaryData,
    deploymentType: formData.deploymentType,
    target,
    type: formType,
    uid: formData.uid,
  };

  const [formState, setFormState] = useState({
    ...initialData,
    target: parseTargets(initialData.target),
    userParams: parseUserParams(initialData.userParams),
  });

  return (
    <ThunderpantsDeploymentFormStateless
      {...restProps}
      formState={formState}
      setFormState={setFormState}
      schema={formSchema}
      summaryData={formSummaryData}
      targets={formTargets}
    />
  );
};

const makeMapStateToProps = () => {
  const activityBuildListSelector = selectors.makeActivityBuildListSelector();
  const mapStateToProps = (state, props) => ({
    activityBuildList: activityBuildListSelector(state, props),
    formData: selectors.formDataSelector(state),
    formSchema: selectors.formSchemaSelector(state),
    formSummaryData: selectors.formSummaryDataSelector(state),
    formTargets: selectors.formTargetsSelector(state),
    formType: selectors.formTypeSelector(state),
  });
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(ThunderpantsDeploymentForm);

ThunderpantsDeploymentForm.propTypes = {
  formData: PropTypes.object.isRequired,
  formSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  formSummaryData: PropTypes.object.isRequired,
  formTargets: PropTypes.arrayOf(PropTypes.object).isRequired,
  formType: PropTypes.string.isRequired,
};
