import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateSchemaModel, fetchPyScriptSchemas } from './actions';
import { getPyScript, getNewSchemaInputs } from './helpers';
import {
  pyScriptTemplatesSelector,
  makePyScriptSelector,
  makeVersionUpdateSelector,
} from './selectors';

import StatelessPyScriptDetails from './presentational';

export const PyScriptDetailsBase = props => {
  const {
    eventId,
    needsUpdate,
    onLoadFetchSchemas,
    onSchemaModelUpdate,
    pyScript,
    selectedActivity,
    templates,
  } = props;

  useEffect(() => {
    onLoadFetchSchemas();
  }, []);

  const handleUpdate = id => {
    let params = {
      selectedActivity,
      eventId,
      pyScript: id ? getPyScript(templates, id) : pyScript,
    };
    if (needsUpdate) {
      params = {
        ...params,
        ...getNewSchemaInputs(params),
      };
    }
    onSchemaModelUpdate(params);
  };

  return <StatelessPyScriptDetails {...props} handleUpdate={handleUpdate} />;
};

const makeMapStateToProps = () => {
  const pyScriptSelector = makePyScriptSelector();
  const versionUpdateSelector = makeVersionUpdateSelector();
  const mapStateToProps = (state, props) => ({
    templates: pyScriptTemplatesSelector(state),
    pyScript: pyScriptSelector(state, props),
    needsUpdate: versionUpdateSelector(state, props),
  });
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  onSchemaModelUpdate: bindActionCreators(updateSchemaModel, dispatch),
  onLoadFetchSchemas: bindActionCreators(fetchPyScriptSchemas, dispatch),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onLoadFetchSchemas: () =>
    propsFromDispatch.onLoadFetchSchemas(ownProps.currentProject.id),
});

PyScriptDetailsBase.propTypes = {
  eventId: PropTypes.number.isRequired,
  needsUpdate: PropTypes.bool.isRequired,
  onLoadFetchSchemas: PropTypes.func.isRequired,
  onSchemaModelUpdate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  pyScript: PropTypes.object.isRequired,
  selectedActivity: PropTypes.object.isRequired,
  selectedTitle: PropTypes.object,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PyScriptDetailsBase.defaultProps = {
  selectedTitle: undefined,
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PyScriptDetailsBase);
