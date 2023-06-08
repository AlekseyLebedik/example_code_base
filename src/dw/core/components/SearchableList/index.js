import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Checkbox from '@material-ui/core/Checkbox';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import NextPageButton from 'dw/core/components/NextPageButton';
import Search from 'dw/core/components/Search';
import { hasData } from 'dw/core/helpers/object';

import SkeletonProgress from './components/SkeletonProgress';
import ItemsList from './components/ItemsList';
import './index.css';

const initialState = ({ items, initialLoading }) => ({
  itemsSelected: [],
  items,
  initialLoading:
    initialLoading === undefined
      ? !items || items.length === 0
      : initialLoading,
  nextPageLoading: false,
});

class SearchableList extends React.Component {
  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    const { items, initialLoading } = nextProps;
    if (items !== prevState.items) {
      newState.items = items;
      newState.initialLoading =
        initialLoading === undefined ? false : initialLoading;
      newState.nextPageLoading = false;
    }
    if (initialLoading !== prevState.initialLoading) {
      newState.initialLoading = initialLoading;
    }

    if (hasData(newState)) return newState;
    return null;
  }

  componentDidMount() {
    this.setInitialLoadingCleanUp();
  }

  componentWillUnmount() {
    clearTimeout(this.initialLoadingTimeout);
  }

  handleSelectAllClick() {
    this.setState(currentState => {
      const { items, applySelectConditionFunc } = this.props;
      const filteredItems = items ? items.filter(applySelectConditionFunc) : [];
      const allItemsSelected =
        filteredItems.length === currentState.itemsSelected.length;
      return { itemsSelected: allItemsSelected ? [] : filteredItems };
    });
  }

  handleCheckboxClick(item) {
    this.setState(currentState => {
      const { getItemKey } = this.props;
      const itemsSelected = !this.isSelected(item, currentState)
        ? [...currentState.itemsSelected, item]
        : currentState.itemsSelected.filter(
            i => getItemKey(i) !== getItemKey(item)
          );
      return { itemsSelected };
    });
  }

  onSearch = payload => {
    this.props.onSearch(payload);
    this.setState({ initialLoading: true });
    this.setInitialLoadingCleanUp();
  };

  onShowMore = () => {
    this.setState({ nextPageLoading: true });
    this.props.onShowMore();
  };

  setInitialLoadingCleanUp = () => {
    if (this.props.loadingTimeout === 0) return;
    this.initialLoadingTimeout = setTimeout(
      () =>
        this.setState(prevState =>
          prevState.initialLoading ? { initialLoading: false } : {}
        ),
      this.props.loadingTimeout
    );
  };

  isSelected(item, currentState) {
    const { getItemKey } = this.props;
    const state = !currentState ? this.state : currentState;
    const selectedKeys = state.itemsSelected.map(i => getItemKey(i));
    return selectedKeys.includes(getItemKey(item));
  }

  areAllChecked() {
    const { items, applySelectConditionFunc } = this.props;
    const isNotEmpty =
      this.state.itemsSelected.length !== 0 && items && items.length !== 0;
    const fItems = !applySelectConditionFunc
      ? items
      : (items && items.filter(applySelectConditionFunc)) || [];
    const allSelected = () => fItems.length === this.state.itemsSelected.length;
    return isNotEmpty && allSelected();
  }

  cleanSelected() {
    this.setState({ itemsSelected: [] });
  }

  render() {
    const {
      toRenderFunc,
      placeholder,
      showMore,
      initialValue,
      actions,
      applySelectConditionFunc,
      loadingMaster,
      defaultSearchField,
      advancedSearchFields,
      timezone,
      searchEnabled,
      infiniteScroll,
    } = this.props;
    const { initialLoading, nextPageLoading, items } = this.state;

    const enabledCheckboxes = actions && actions.length > 0;
    const noItems = !items || items.length === 0;

    const actionPanel = () => {
      const hasSelectedItems = this.state.itemsSelected.length > 0;

      const executeAndCleanIfNeeded = action => {
        action.handler(this.state.itemsSelected);
        if (action.cleanAfterExecute) {
          this.cleanSelected();
        }
      };

      const actionButtons = () =>
        actions.map(action => (
          <ConfirmActionComponent
            component="IconButton"
            confirm={action.confirm}
            tooltipProps={
              hasSelectedItems
                ? { title: action.label, placement: 'bottom-end' }
                : null
            }
            onClick={() => executeAndCleanIfNeeded(action)}
            disabled={!hasSelectedItems}
            key={action.label}
          >
            {action.iconName || 'delete'}
          </ConfirmActionComponent>
        ));

      return (
        <div className="action-panel" key="action-panel">
          <div className="select-all-checkbox">
            <Checkbox
              color="primary"
              className="checkbox"
              checked={this.areAllChecked()}
              onClick={() => this.handleSelectAllClick()}
            />
          </div>
          <div className="action-button">{actionButtons()}</div>
        </div>
      );
    };

    const renderCheckbox = (item, className = '') => (
      <Checkbox
        color="primary"
        className={`item-checkbox ${className}`}
        checked={this.isSelected(item)}
        onClick={() => this.handleCheckboxClick(item)}
      />
    );

    const list = () => {
      const getItem = item => {
        const hasConditionOrIsIncluded =
          !applySelectConditionFunc || applySelectConditionFunc(item);

        return toRenderFunc(
          item,
          (enabledCheckboxes && hasConditionOrIsIncluded && renderCheckbox) ||
            null
        );
      };

      const elements = [];
      if (enabledCheckboxes) elements.push(actionPanel());
      elements.push(
        <ItemsList
          key="items-list"
          infiniteScroll={infiniteScroll}
          items={items}
          showMore={showMore}
          onShowMore={this.onShowMore}
          getItem={getItem}
        />
      );

      return elements;
    };

    const showMoreButton = showMore && !infiniteScroll && !initialLoading && (
      <NextPageButton
        onClick={this.onShowMore}
        isLoading={nextPageLoading}
        nextPageToken
      />
    );

    const empty = (
      <div
        className={classNames(
          'empty-list',
          'flex-grow',
          this.props.emptyClassName
        )}
      >
        No data to display
      </div>
    );

    const renderItems = () => (noItems ? empty : list());

    return (
      <div
        ref={this.props.innerRef}
        className="common__searchable-list flex flex-col flex-grow"
      >
        {searchEnabled && (
          <Search
            placeholder={placeholder}
            initialValue={initialValue}
            onSearch={this.onSearch}
            defaultSearchField={defaultSearchField}
            advancedSearchFields={advancedSearchFields}
            timezone={timezone}
          />
        )}
        {loadingMaster || initialLoading ? (
          <div className="loading__container">
            <SkeletonProgress />
          </div>
        ) : (
          renderItems()
        )}
        {noItems || !showMore ? null : showMoreButton}
      </div>
    );
  }
}

SearchableList.propTypes = {
  loadingTimeout: PropTypes.number,
  // eslint-disable-next-line
  initialLoading: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ),
  toRenderFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showMore: PropTypes.bool.isRequired,
  onSearch: PropTypes.func,
  onShowMore: PropTypes.func,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  getItemKey: PropTypes.func,
  applySelectConditionFunc: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.string,
      label: PropTypes.string,
      handler: PropTypes.func,
      cleanAfterExecute: PropTypes.bool,
      confirm: PropTypes.object,
    })
  ),
  loadingMaster: PropTypes.bool,
  defaultSearchField: PropTypes.object,
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  timezone: PropTypes.string,
  searchEnabled: PropTypes.bool,
  emptyClassName: PropTypes.string,
  innerRef: PropTypes.func,
  infiniteScroll: PropTypes.bool,
};

SearchableList.defaultProps = {
  items: undefined,
  loadingTimeout: 0,
  initialLoading: undefined,
  placeholder: '',
  onSearch: () => {},
  onShowMore: null,
  initialValue: '',
  loadingMaster: false,
  getItemKey: null,
  applySelectConditionFunc: () => true,
  actions: [],
  defaultSearchField: undefined,
  advancedSearchFields: undefined,
  timezone: undefined,
  searchEnabled: true,
  emptyClassName: undefined,
  innerRef: undefined,
  infiniteScroll: false,
};

export default SearchableList;
