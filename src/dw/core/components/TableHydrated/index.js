import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Icon as AntdIcon } from 'antd';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { formatDateTime as defaultFormatDateTime } from 'dw/core/helpers/date-time';
import { hasData } from 'dw/core/helpers/object';
import { uuid } from 'dw/core/helpers/uuid';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import { setSelectedRowKeys } from './actions';
import { selectedRowKeysSelector } from './selectors';

import './index.css';

const initialFilterDropdownVisible = columns =>
  columns.map(c => ({
    key: c.key,
    visible: false,
  }));

const initialFiltered = columns =>
  columns.map(c => ({
    key: c.key,
    filtered: false,
  }));

const initialSearchText = columns =>
  columns.map(c => ({
    key: c.key,
    text: '',
  }));

const initialState = (props, clearAll) => {
  let sortedInfo = props.sortedInfo ? props.sortedInfo : {};
  // provide for the case where some sortedInfo value is provided in props
  // we want to clear that as well, rather than reset to it
  if (clearAll) {
    sortedInfo = {};
  }
  return {
    ...props,
    filterDropdownVisible: initialFilterDropdownVisible(props.columns),
    searchText: initialSearchText(props.columns),
    filterText: {},
    filtered: initialFiltered(props.columns),
    data: [...props.data],
    size: !props.size ? 'small' : props.size,
    sortedInfo,
    selectedRowKeys: props.selectedRowKeys,
    actions: props.actions,
  };
};

const setFilterDropdownVisible = (filterDropdownVisible, key, value) => {
  const rest = filterDropdownVisible.filter(fdv => fdv.key !== key);

  return [
    ...rest,
    {
      key,
      visible: value,
    },
  ];
};

const getFilterDropdownVisible = (filterDropdownVisible, key) => {
  const foundDropdownVisible = filterDropdownVisible.find(
    fdv => fdv.key === key
  );
  return foundDropdownVisible ? foundDropdownVisible.visible : false;
};

const setSearchText = (searchText, key, value) => {
  const rest = searchText.filter(fdv => fdv.key !== key);

  return [
    ...rest,
    {
      key,
      text: value,
    },
  ];
};

const getSearchText = (searchText, key) => {
  const foundText = searchText.find(fdv => fdv.key === key);
  return foundText ? foundText.text : '';
};

const setFiltered = (filtered, key, value) => {
  const rest = filtered.filter(fdv => fdv.key !== key);

  return [
    ...rest,
    {
      key,
      filtered: value,
    },
  ];
};

const getFiltered = (filtered, key) => {
  const foundFiltered = filtered.find(fdv => fdv.key === key);
  return foundFiltered ? foundFiltered.filtered : false;
};

const search = (collection, filters, columns, formatDateTime) => {
  let result = [...collection];

  Object.keys(filters).forEach(k => {
    const reg = new RegExp(filters[k], 'gi');
    result = result
      .map(record => {
        let value = record[k];
        const isArray = value instanceof Array;
        const getValueString = v =>
          typeof v === 'string' ? v : (v && v.toString()) || '';

        const { subRecordSearchField } = columns.find(c => c.key === k);
        if (subRecordSearchField !== undefined) {
          value = isArray
            ? record[k].map(element =>
                getValueString(element[subRecordSearchField])
              )
            : record[k][subRecordSearchField];
        }

        const column = columns.find(
          col => col.key === k && col.type === 'datetime'
        );
        value = column ? formatDateTime(value, column.format) : value;

        const match = isArray
          ? value.some(v => v.match(reg))
          : getValueString(value).match(reg);
        if (!match) {
          return null;
        }
        return { ...record };
      })
      .filter(record => !!record);
  });

  return result;
};

class TableHydrated extends React.Component {
  static propTypes = {
    selectedRowKeys: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
      ])
    ),
    setSelectedRowKeys: PropTypes.func,
    hideActions: PropTypes.bool,
    getKey: PropTypes.func,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number,
          ])
        ),
      ])
    ).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    formatDateTime: PropTypes.func,
    sortedInfo: PropTypes.object,
    columnProps: PropTypes.object,
    className: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    selectedRowKeys: [],
    hideActions: false,
    getKey: null,
    setSelectedRowKeys: null,
    sortedInfo: {},
    columnProps: undefined,
    formatDateTime: defaultFormatDateTime,
    className: undefined,
    fontSize: undefined,
  };

  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.data !== prevState.data) {
      const filteredData = search(
        nextProps.data,
        prevState.filterText,
        nextProps.columns,
        nextProps.formatDateTime
      );
      newState.data = [...filteredData];
    }
    if (nextProps.selectedRowKeys !== prevState.selectedRowKeys) {
      newState.selectedRowKeys = nextProps.selectedRowKeys;
    }
    return hasData(newState) ? newState : null;
  }

  componentDidMount() {
    this.searchInputs = {};
    this.props.setSelectedRowKeys([]);
  }

  onInputChange = (e, key) => {
    this.setState(prevState => ({
      searchText: setSearchText(prevState.searchText, key, e.target.value),
    }));
  };

  addFilter = (columnKey, text) => {
    const newFilter = { ...this.state.filterText };
    newFilter[columnKey] = !text
      ? getSearchText(this.state.searchText, columnKey)
      : text;
    this.setState({
      filterText: { ...newFilter },
    });
    return newFilter;
  };

  removeFilter = columnKey => {
    const filters = { ...this.state.filterText };
    delete filters[columnKey];
    this.setState(prevState => ({
      searchText: setSearchText(prevState.searchText, columnKey, ''),
    }));

    return filters;
  };

  onSearch = (columnKey, text) => {
    const filters = this.addFilter(columnKey, text);

    this.setState(prevState => ({
      filterDropdownVisible: setFilterDropdownVisible(
        prevState.filterDropdownVisible,
        columnKey,
        false
      ),
      filtered: setFiltered(
        prevState.filtered,
        columnKey,
        !!getSearchText(prevState.searchText, columnKey)
      ),
      data: search(
        this.props.data,
        filters,
        this.props.columns,
        this.props.formatDateTime
      ),
    }));
    this.props.setSelectedRowKeys([]);
  };

  onKeyPress = (e, columnKey) => {
    if (e.charCode === 13) {
      this.onSearch(columnKey);
    }
  };

  onClearFilter = columnKey => {
    const filters = this.removeFilter(columnKey);

    this.setState(prevState => ({
      filterDropdownVisible: setFilterDropdownVisible(
        prevState.filterDropdownVisible,
        columnKey,
        false
      ),
      filtered: setFiltered(prevState.filtered, columnKey, false),
      filterText: { ...filters },
      data: search(
        this.props.data,
        filters,
        this.props.columns,
        this.props.formatDateTime
      ),
    }));
  };

  getSorter = column => {
    if (column.noSorting) {
      return false;
    }
    switch (column.type) {
      case 'number':
        return (a, b) => a[column.key] - b[column.key];
      default:
        return (a, b) => {
          if (a[column.key] < b[column.key]) return -1;
          if (a[column.key] > b[column.key]) return 1;
          return 0;
        };
    }
  };

  getFilterDropdown = column => {
    if (column.noFiltering) {
      return false;
    }
    return (
      <div className="custom-filter-dropdown">
        <TextField
          name={column.key}
          placeholder={
            !column.filterPlaceholder
              ? 'Refine the displayed column'
              : column.filterPlaceholder
          }
          value={getSearchText(this.state.searchText, column.key)}
          onChange={e => this.onInputChange(e, column.key)}
          onKeyPress={e => this.onKeyPress(e, column.key)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small">search</Icon>
              </InputAdornment>
            ),
            endAdornment: getFiltered(this.state.filtered, column.key) ? (
              <InputAdornment position="end">
                <IconButton onClick={() => this.onClearFilter(column.key)}>
                  <Icon fontSize="small">clear</Icon>
                </IconButton>
              </InputAdornment>
            ) : null,
            inputProps: {
              autoFocus: true,
              ref: ele => {
                this.searchInputs[column.key] = ele;
              },
            },
          }}
        />
      </div>
    );
  };

  clearAll = () => {
    this.setState(initialState(this.props, true));
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({ sortedInfo: sorter });
  };

  getColumns = () => {
    const { columns } = this.props;
    const { sortedInfo } = this.state;

    return columns.map(c => {
      const newColumn = {
        ...c,
      };
      if (newColumn.render && newColumn.columnProps && this.props.columnProps) {
        newColumn.render = newColumn.render.bind(this.props.columnProps);
      }
      switch (c.type) {
        case 'datetime': {
          const { render } = newColumn;
          newColumn.render =
            render !== undefined
              ? (text, record) =>
                  render(text, record, this.props.formatDateTime)
              : text => this.props.formatDateTime(text, c.format);
          break;
        }
        default:
      }
      return c.key === 'action'
        ? newColumn
        : {
            ...newColumn,
            filterDropdown: this.getFilterDropdown(c),
            filterIcon: (
              <AntdIcon
                type="filter"
                style={{
                  color: getFiltered(this.state.filtered, c.key)
                    ? '#108ee9'
                    : '#aaa',
                }}
              />
            ),
            filterDropdownVisible: getFilterDropdownVisible(
              this.state.filterDropdownVisible,
              c.key
            ),
            onFilterDropdownVisibleChange: visible => {
              this.setState(
                prevState => ({
                  filterDropdownVisible: setFilterDropdownVisible(
                    prevState.filterDropdownVisible,
                    c.key,
                    visible
                  ),
                }),
                () =>
                  this.searchInputs[c.key] && this.searchInputs[c.key].focus()
              );
            },
            sorter: this.getSorter(c, c.subRecordSearchField !== undefined),
            sortOrder: sortedInfo.columnKey === c.key && sortedInfo.order,
          };
    });
  };

  isClearAllButtonVisible = () => {
    const { filterText, sortedInfo, noClearAllButton } = this.state;
    if (noClearAllButton) {
      return false;
    }
    const notEmptyFilterText = hasData(filterText);
    const notEmptySortedInfo = hasData(sortedInfo);
    return notEmptyFilterText || notEmptySortedInfo;
  };

  onSelectRowChange = selectedRowKeys => {
    this.props.setSelectedRowKeys(selectedRowKeys);
  };

  onResetSelectedRowKeys = () => {
    this.props.setSelectedRowKeys([]);
  };

  onExecuteHandlerAndCleanIfisNeeded = action => {
    action.handler(this.state.selectedRowKeys);
    if (action.cleanAfterExecute) {
      this.onResetSelectedRowKeys();
    }
  };

  render() {
    const clearButton = (
      <button
        type="button"
        id="hydrated-table__clear-filters"
        onClick={this.clearAll}
        className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
      >
        <Icon fontSize="small">clear</Icon>
      </button>
    );

    const actionPanel = () => {
      const { actions, selectedRowKeys } = this.state;
      const hasSelectedItems = selectedRowKeys.length > 0;
      const actionButtons = () =>
        actions.map(action => (
          <ConfirmActionComponent
            component="IconButton"
            confirm={action.confirm}
            tooltipProps={
              hasSelectedItems
                ? { title: action.label, placement: 'bottom' }
                : null
            }
            onClick={() => this.onExecuteHandlerAndCleanIfisNeeded(action)}
            disabled={!hasSelectedItems}
            key={action.label}
          >
            {action.iconName}
          </ConfirmActionComponent>
        ));

      return <div className="action-panel">{actionButtons()}</div>;
    };

    const actionPanelEnabled =
      this.state.actions && this.state.actions.length > 0;

    let newProps = this.props;
    if (actionPanelEnabled) {
      const rowSelection = {
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: this.onSelectRowChange,
      };
      newProps = { ...newProps, rowSelection };
    }

    return (
      <div className={this.props.className || 'common__table-hydrated'}>
        <div className="table-operations">
          {/* Add this button in action panel maybe? */}
          {this.isClearAllButtonVisible() ? clearButton : null}
        </div>
        {actionPanelEnabled && !this.props.hideActions && actionPanel()}
        <Table
          {...newProps}
          columns={this.getColumns()}
          dataSource={this.state.data.map(r => ({
            ...r,
            key: !this.props.getKey ? uuid() : this.props.getKey(r),
          }))}
          size={this.state.size}
          className={
            !newProps.fontSize
              ? newProps.className
              : `${newProps.className} font-size-${newProps.fontSize}`
          }
          onChange={this.handleChange}
          pagination={
            this.state.pagination
              ? {
                  ...this.state.pagination,
                  size: 'small',
                  total: this.state.data.length,
                }
              : false
          }
        />
      </div>
    );
  }
}

const stateToProps = state => ({
  selectedRowKeys: selectedRowKeysSelector(state),
});

const dispatchToProps = dispatch => ({
  setSelectedRowKeys: selectedRowKeys =>
    dispatch(setSelectedRowKeys(selectedRowKeys)),
});

export default connect(stateToProps, dispatchToProps)(TableHydrated);

export { selectedRowKeysSelector, setSelectedRowKeys };
export { default as reducer } from './reducer';
