import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Icon as AntdIcon } from 'antd';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import { hasData } from 'dw/core/helpers/object';

import AdvancedSearch from './components/AdvancedSearch';
import './index.css';

const { Search } = Input;

const advancedSearchStatus = ({ initialValue }) => ({
  value:
    (initialValue !== null && typeof initialValue === 'object'
      ? initialValue.default && initialValue.q
      : initialValue) || '',
  isAdvancedSearchActive:
    initialValue !== null &&
    typeof initialValue === 'object' &&
    !initialValue.default &&
    hasData(initialValue.values),
  advancedValues:
    (initialValue !== null &&
      typeof initialValue === 'object' &&
      initialValue.values) ||
    {},
});

const initialState = props => {
  const { advancedSearchFields } = props;

  return {
    searchComponent: null,
    isAdvancedEnabled: advancedSearchFields.length > 0,
    isAdvancedSearchOpened: false,
    defaultSearchValueTypeError: false,
    // The value could be changed externally only once after componentMounted.
    // Only in case when Search is initialized with empty value
    // and than component reads `history.search` and sets search value.
    // Once it is changed externaly or by user
    // the value should be controlled exclusively by Search component.
    valueCouldBeChangedExternally: true,
    ...advancedSearchStatus(props),
  };
};

export class SearchComponent extends React.Component {
  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.valueCouldBeChangedExternally) {
      const nextState = advancedSearchStatus(nextProps);
      if (prevState.value !== nextState.value) {
        return { ...nextState, valueCouldBeChangedExternally: false };
      }
    }
    return null;
  }

  onChangeValue = e => {
    this.setState({
      value: e.target.value,
      valueCouldBeChangedExternally: false,
    });
    if (this.props.searchOnChange)
      this.onBeforeOnSearch(this.props.onSearch, e.target.value);
  };

  onBeforeOnSearch = (onSearch, value) => {
    if (
      this.props.defaultSearchField.type === 'number' &&
      Number.isNaN(Number(value))
    ) {
      this.setState({ defaultSearchValueTypeError: true });
    } else {
      this.setState({ defaultSearchValueTypeError: false });
      onSearch({ default: true, q: value });
    }
  };

  onAdvancedSearch = values => {
    const newValues = hasData(values)
      ? {
          default: false,
          values,
        }
      : { default: true, q: '' };
    this.setState({
      ...advancedSearchStatus({ initialValue: newValues }),
      isAdvancedSearchOpened: false,
    });
    this.props.onSearch(newValues);
  };

  clickAdvancedIcon = () => {
    const { value } = this.state;
    const { defaultSearchField } = this.props;
    let { advancedValues } = this.state;

    if (value !== '') {
      advancedValues = {};
      advancedValues[defaultSearchField.key] = value;
    }

    this.setState({
      value: '',
      advancedValues: { ...advancedValues },
      isAdvancedSearchOpened: true,
    });
  };

  closeAdvanced = () => {
    const { isAdvancedSearchActive, advancedValues } = this.state;
    const defaultKey = this.props.defaultSearchField.key;
    let defaultValue = '';

    if (
      !isAdvancedSearchActive &&
      Object.keys(advancedValues).includes(defaultKey)
    )
      defaultValue = advancedValues[defaultKey];

    this.setState({
      isAdvancedSearchOpened: false,
      value: defaultValue,
      advancedValues: isAdvancedSearchActive ? advancedValues : {},
    });
  };

  emitEmpty = () => {
    if (this.state.searchComponent) this.state.searchComponent.focus();
    this.setState({ value: '' });
    this.props.onSearch({ default: true, q: '' });
  };

  render() {
    const {
      value,
      isAdvancedSearchOpened,
      isAdvancedEnabled,
      isAdvancedSearchActive,
      advancedValues,
      defaultSearchValueTypeError,
      searchComponent,
    } = this.state;
    const {
      defaultSearchField,
      advancedSearchFields,
      timezone,
      placeholder,
      className,
      onSearch,
      size,
      iconClassName,
    } = this.props;

    const caretIcon = (
      <Tooltip title="Advanced Search">
        <IconButton onClick={() => this.clickAdvancedIcon()}>
          <Icon fontSize="small">keyboard_arrow_down</Icon>
        </IconButton>
      </Tooltip>
    );

    const openAdvancedSearchButton = !isAdvancedSearchOpened && caretIcon;

    const advancedSuffix = isAdvancedEnabled && openAdvancedSearchButton;

    const resetSuffix = value && (
      <Tooltip title="Clear Search">
        <IconButton key="clear-btn" onClick={() => this.emitEmpty()}>
          <Icon fontSize="small">clear</Icon>
        </IconButton>
      </Tooltip>
    );

    const suffix = (
      <div key="key-suffix-icons-div" className="suffix-icons">
        {resetSuffix}
        {advancedSuffix}
      </div>
    );

    const prefix = (
      <Icon fontSize="small" className={iconClassName}>
        search
      </Icon>
    );

    const getPlaceholder = () => {
      if (isAdvancedSearchOpened) {
        return 'Fill the fields and press "Filter" button';
      }
      return !placeholder ? defaultSearchField.label : placeholder;
    };

    const error = (
      <Row className="error">
        <Col span={24}>
          <AntdIcon type="warning" /> Should be a number.
        </Col>
      </Row>
    );

    return (
      <div className={classnames(className, 'common__search')}>
        {defaultSearchValueTypeError && error}
        <Search
          size={size || 'default'}
          placeholder={getPlaceholder()}
          suffix={suffix}
          prefix={prefix}
          value={value}
          onChange={this.onChangeValue}
          ref={node => {
            this.setState(state =>
              state.searchComponent
                ? null
                : { searchComponent: node.input.input }
            );
          }}
          onSearch={
            isAdvancedSearchOpened
              ? () => {}
              : newValue => this.onBeforeOnSearch(onSearch, newValue)
          }
          disabled={isAdvancedSearchOpened || isAdvancedSearchActive}
        />
        {isAdvancedEnabled ? (
          <AdvancedSearch
            close={this.closeAdvanced}
            isOpen={isAdvancedSearchOpened}
            values={advancedValues}
            fields={[defaultSearchField, ...advancedSearchFields]}
            onSearch={this.onAdvancedSearch}
            timezone={timezone}
            searchComponent={searchComponent}
          />
        ) : null}
      </div>
    );
  }
}

SearchComponent.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  // eslint-disable-next-line
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
  ]),
  defaultSearchField: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['string', 'number']),
    desc: PropTypes.string,
  }),
  advancedSearchFields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.oneOf(['string', 'number', 'bool', 'date', 'datetime']),
      desc: PropTypes.string,
    })
  ),
  timezone: PropTypes.string,
  size: PropTypes.string,
  searchOnChange: PropTypes.bool,
  iconClassName: PropTypes.string,
};

SearchComponent.defaultProps = {
  className: '',
  placeholder: '',
  initialValue: '',
  advancedSearchFields: [],
  defaultSearchField: {},
  timezone: undefined,
  size: undefined,
  searchOnChange: false,
  iconClassName: '',
};

export default SearchComponent;
