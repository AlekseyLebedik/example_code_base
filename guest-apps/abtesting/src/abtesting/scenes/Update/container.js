import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';
import { projectByTitleIDSelector } from 'dw/core/helpers/selectors';

import ABTestForm from '../ABTestForm';
import { fetchTest, resetTest, changeShowDetails } from './actions';
import { FORM_MODE_ENUM } from '../ABTestForm/constants';

const stateToProps = (state, props) => {
  const { test, loading } = state.Scenes.Update;
  const { showActionsPanel } = props;

  if (hasData(test) && showActionsPanel) {
    const { titleID, environment, id } = props.match.params;
    const projectByTitle = projectByTitleIDSelector(state, titleID);
    const project = hasData(projectByTitle) ? projectByTitle[0] : {};
    const title =
      hasData(project) &&
      project.titles.filter(t => t.id === parseInt(titleID, 10))[0];
    Object.assign(test, {
      project,
      environment,
      id,
      titleID: title ? title.id : undefined,
    });
  }
  return {
    loading,
    test,
    propagateShowDetails: state.Scenes.Update.propagateShowDetails,
  };
};

const dispatchToProps = dispatch => ({
  onLoad: (titleID, environment, id) =>
    dispatch(fetchTest(titleID, environment, id)),
  resetTest: () => dispatch(resetTest()),
  changeDetails: showDetails => dispatch(changeShowDetails(showDetails)),
});

class UpdateTestForm extends Component {
  // eslint-disable-next-line
  state = {};

  componentDidMount() {
    const { titleID, environment, id } = this.props.match.params;
    this.props.onLoad(titleID, environment, id);
  }

  componentWillUnmount() {
    this.props.resetTest();
  }

  static getDerivedStateFromProps(props) {
    const { test, mode } = props;
    if (
      hasData(test) &&
      mode !== FORM_MODE_ENUM.UPDATE &&
      mode !== FORM_MODE_ENUM.VIEW
    ) {
      // Remove test id to create the new one instead of updating existing.
      test.removedTestID = test.testID;
      delete test.testID;

      // TODO
      // eslint-disable-next-line
      test.cohorts.forEach(cohort => delete cohort.cohortID);
    }
    return null;
  }

  render() {
    const {
      loading,
      test,
      disableFormContext,
      mode,
      propagateShowDetails,
      changeDetails,
      showActionsPanel,
      viewOnly,
    } = this.props;
    const { titleID, environment } = this.props.match.params;
    return (
      <ABTestForm
        test={test}
        titleID={titleID}
        environment={environment}
        mode={mode || FORM_MODE_ENUM.UPDATE}
        disableFormContext={disableFormContext}
        changeShowDetails={changeDetails}
        propagateShowDetails={propagateShowDetails}
        showActionsPanel={showActionsPanel}
        viewOnly={viewOnly}
        loading={loading}
      />
    );
  }
}

UpdateTestForm.propTypes = {
  disableFormContext: PropTypes.bool,
  mode: PropTypes.string,
  match: PropTypes.object.isRequired,

  onLoad: PropTypes.func.isRequired,
  resetTest: PropTypes.func.isRequired,
  propagateShowDetails: PropTypes.bool.isRequired,
  changeDetails: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired,
  showActionsPanel: PropTypes.bool,
  viewOnly: PropTypes.bool,
  loading: PropTypes.bool,
};

UpdateTestForm.defaultProps = {
  disableFormContext: true,
  mode: FORM_MODE_ENUM.UPDATE,
  showActionsPanel: false,
  viewOnly: false,
  loading: null,
};

export default connect(stateToProps, dispatchToProps, UpdateTestForm);
