import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultTimezone } from 'dw/core/helpers/date-time';

import { processNestedValues, addField } from '../../utils';
import AdvancedFieldsSection from './components/AdvancedFieldsSection';
import AdvancedTagsSection from './components/AdvancedTagsSection';

const initialState = ({ separator, ...props }) => {
  const { values, fields } = processNestedValues(
    props.values,
    props.fields,
    separator
  );
  return {
    separator,
    values,
    fields,
    currentValues: { ...values },
    prevPropsValues: null,
  };
};

class AdvancedSearch extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    separator: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    timezone: PropTypes.string,
  };

  static defaultProps = {
    separator: ',',
    timezone: undefined,
  };

  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { values } = nextProps;
    if (prevState.prevPropsValues !== values) {
      return {
        ...processNestedValues(
          nextProps.values,
          nextProps.fields,
          nextProps.separator
        ),
        prevPropsValues: values,
      };
    }
    return null;
  }

  onChange = (newValue, key) => {
    this.setState(prevState => ({
      values: { ...prevState.values, [key]: newValue },
    }));
  };

  onSearch = values => {
    const searchValues = values === undefined ? this.state.values : values;
    this.props.onSearch(this.groupNestedChildsValues(searchValues));
  };

  removeField = (key, search = false) => {
    const value = this.state.values[key];
    const origKey = this.state.fields.find(f => f.key === key).parent || key;
    const field = this.state.fields.find(f => f.key === origKey);
    const values = this.groupNestedChildsValues(this.state.values);
    if (field.multi) {
      const multiValues = (values[origKey] || '')
        .split(this.props.separator)
        .filter(v => v !== value)
        .join(this.props.separator);
      if (multiValues.length > 0) values[origKey] = multiValues;
      else delete values[origKey];
    } else delete values[origKey];
    if (search) {
      this.props.onSearch(values);
    } else {
      this.setState(
        processNestedValues(values, this.props.fields, this.props.separator)
      );
    }
  };

  addMoreFields = field => {
    this.setState(prevState => {
      const { newField, newFields } = addField(field, [...prevState.fields]);
      const newValues = { ...prevState.values, [newField.key]: '' };
      return { fields: newFields, values: newValues };
    });
  };

  groupNestedChildsValues = values => {
    const fields = this.state.fields.filter(f =>
      Object.keys(values).includes(f.key)
    );
    const parents = fields.filter(f => !f.parent);
    const childs = fields.filter(f => f.parent !== undefined);

    const newValues = {};
    parents.forEach(item => {
      const childValues = childs
        .filter(c => c.parent === item.key)
        .map(c => values[c.key]);
      const joinedValues = () =>
        [values[item.key], ...childValues].join(this.props.separator);
      newValues[item.key] =
        childValues.length > 0 ? joinedValues() : values[item.key];
    });
    return newValues;
  };

  render() {
    const { timezone = defaultTimezone } = this.props;
    return this.props.isOpen ? (
      <AdvancedFieldsSection
        isOpen={this.props.isOpen}
        searchComponent={this.props.searchComponent}
        close={this.props.close}
        fields={this.state.fields}
        onSearch={this.onSearch}
        values={this.state.values}
        onChange={this.onChange}
        timezone={timezone}
        addMoreFields={this.addMoreFields}
        removeField={this.removeField}
      />
    ) : (
      <AdvancedTagsSection
        values={this.state.values}
        fields={this.state.fields}
        timezone={timezone}
        removeField={this.removeField}
      />
    );
  }
}

AdvancedSearch.propTypes = {
  values: PropTypes.object,
  searchComponent: PropTypes.object,
};

AdvancedSearch.defaultProps = {
  values: undefined,
  searchComponent: undefined,
};

export default AdvancedSearch;
