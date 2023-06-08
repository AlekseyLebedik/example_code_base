import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Tooltip from '@material-ui/core/Tooltip';
import { List, AutoSizer } from 'react-virtualized';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import SectionTitle from 'dw/core/components/SectionTitle';
import Search from 'dw/core/components/Search';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Loading from 'dw/core/components/Loading';
import {
  SECURITY_ADD_TASK_RULES,
  SECURITY_DELETE_TASK_RULES,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';

import AddTaskRuleModal from './components/AddTaskRuleModal';
import {
  COLUMNS,
  SEARCH_DEFAULT_FIELD,
  SEARCH_ADVANCED_FIELDS,
} from './constants';
import './presentational.css';

const TaskRulesStateless = ({
  taskRules,
  onSearch,
  addModalVisible,
  openAddModal,
  closeAddModal,
  deleteTaskRule,
  addTaskRule,
  q,
}) => {
  const [loadingPermission, , result] = useCurrentEnvPermission(
    [SECURITY_DELETE_TASK_RULES, SECURITY_ADD_TASK_RULES],
    false
  );
  const hasDeletePermission = result?.data?.[SECURITY_DELETE_TASK_RULES];
  const hasAddPermission = result?.data?.[SECURITY_ADD_TASK_RULES];
  const empty = <div className="empty">No data to display</div>;

  const tableHeaders = taskRules.length && (
    <Row className="table-headers">
      {COLUMNS.map(
        ({ key, label, width }) =>
          label && (
            <Col span={width} key={key}>
              {label}
            </Col>
          )
      )}
    </Row>
  );

  const renderRow = rowProps => {
    const { index, key, style } = rowProps;
    const item = taskRules[index];
    const isServiceRow = typeof item === 'string' || item instanceof String;
    const formatField = fieldName => {
      switch (fieldName) {
        case 'service':
          return ' ';
        case 'allow':
          return item.allow ? 'Yes' : 'No';
        case 'delete':
          return hasDeletePermission && item.source === 'devzone' ? (
            <ConfirmActionComponent
              component="IconButton"
              tooltip="Delete"
              tooltipPosition="bottom"
              onClick={() => deleteTaskRule(item.id)}
              confirm={{
                title: 'Confirm Delete',
                confirmMsg: 'Are you sure you want to delete this Task Rule?',
                mainButtonLabel: 'Delete',
                destructive: true,
              }}
            >
              delete
            </ConfirmActionComponent>
          ) : (
            ' '
          );
        default:
          return item[fieldName];
      }
    };
    return (
      <Row
        className={`table-row ${isServiceRow && 'service'}`}
        style={style}
        key={key}
      >
        {isServiceRow ? (
          <Col span={24}>
            <hr />
            <span>{item}</span>
          </Col>
        ) : (
          COLUMNS.map(c => (
            <Col span={c.width} key={c.key}>
              {formatField(c.key)}
            </Col>
          ))
        )}
      </Row>
    );
  };

  return loadingPermission ? (
    <Loading />
  ) : (
    <section className="acl-task-rules">
      <div className="main-container task-rules">
        <SectionTitle
          extraContent={
            <Search
              placeholder="Search by Task Name"
              initialValue={q}
              onSearch={onSearch}
              defaultSearchField={SEARCH_DEFAULT_FIELD}
              advancedSearchFields={SEARCH_ADVANCED_FIELDS}
              size="small"
            />
          }
        >
          {addModalVisible && (
            <AddTaskRuleModal
              visible={addModalVisible}
              onCancel={closeAddModal}
              onSubmit={addTaskRule}
            />
          )}
          {hasAddPermission && (
            <Tooltip title="Add Task Rule" placement="bottom">
              <IconButton color="inherit" onClick={openAddModal}>
                <Icon>playlist_add</Icon>
              </IconButton>
            </Tooltip>
          )}
        </SectionTitle>
        {taskRules.length === 0 && empty}
        {tableHeaders}
        {taskRules.length !== 0 && (
          <div className="list-wrapper">
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={36}
                  rowCount={taskRules.length}
                  rowRenderer={renderRow}
                />
              )}
            </AutoSizer>
          </div>
        )}
      </div>
    </section>
  );
};

TaskRulesStateless.propTypes = {
  taskRules: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  q: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSearch: PropTypes.func.isRequired,
  addModalVisible: PropTypes.bool.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  deleteTaskRule: PropTypes.func.isRequired,
  addTaskRule: PropTypes.func.isRequired,
};

TaskRulesStateless.defaultProps = {
  taskRules: [],
  q: null,
};

export default TaskRulesStateless;
