import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'dw/core/helpers/component';

import * as Actions from './actions';
import TaskRulesStatelessComponent from './presentational';
import { formattedTaskRules, searchParams } from './selectors';

const makeStateToProps = state => ({
  addModalVisible: state.Scenes.Security.ACL.TaskRules.addModalVisible,
  taskRules: formattedTaskRules(state),
  q: searchParams(state),
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(Actions.fetchTaskRules()),
  fetchServiceAndTaskInfo: () => dispatch(Actions.fetchServiceAndTaskInfo()),
  onSearch: payload => dispatch(Actions.onSearch(payload)),
  openAddModal: () => dispatch(Actions.openAddModal()),
  closeAddModal: () => dispatch(Actions.closeAddModal()),
  addTaskRule: values => dispatch(Actions.addTaskRule(values)),
  deleteTaskRule: taskId => dispatch(Actions.deleteTaskRule(taskId)),
});

class TaskRules extends React.Component {
  componentDidMount() {
    const { onLoad, onSearch, history } = this.props;
    const { q } = queryString.parse(history.location.search);

    this.props.fetchServiceAndTaskInfo();
    onSearch(q);
    onLoad();
  }

  render() {
    return (
      <TaskRulesStatelessComponent
        taskRules={this.props.taskRules}
        onSearch={this.props.onSearch}
        addModalVisible={this.props.addModalVisible}
        openAddModal={this.props.openAddModal}
        closeAddModal={this.props.closeAddModal}
        deleteTaskRule={this.props.deleteTaskRule}
        addTaskRule={this.props.addTaskRule}
      />
    );
  }
}

TaskRules.propTypes = {
  ...TaskRulesStatelessComponent.propTypes,
  onLoad: PropTypes.func.isRequired,
};

export default connect(makeStateToProps, dispatchToProps, TaskRules);
