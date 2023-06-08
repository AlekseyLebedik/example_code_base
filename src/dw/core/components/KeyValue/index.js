import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';

import {
  DATE_TIME_FORMATS,
  formatDateTime as formatDateTimeDefault,
} from 'dw/core/helpers/date-time';
import { formatBool } from 'dw/core/helpers/formatters';

import './index.css';

class KeyValue extends React.Component {
  static propTypes = {
    boldEntries: PropTypes.arrayOf(PropTypes.PropTypes.string),
    classes: PropTypes.object,
    item: PropTypes.object.isRequired,
    size: PropTypes.number,
    elementsOrder: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
    customFormats: PropTypes.object,
    formatDateTime: PropTypes.func,
  };

  static defaultProps = {
    boldEntries: [],
    classes: {},
    size: 6,
    elementsOrder: null,
    customFormats: null,
    formatDateTime: formatDateTimeDefault,
  };

  render() {
    const {
      classes,
      item,
      size,
      elementsOrder,
      customFormats,
      formatDateTime,
    } = this.props;

    const format = (key, value) => {
      if (!customFormats || !Object.keys(customFormats).includes(key))
        return value;
      if (typeof customFormats[key] === 'function') {
        return customFormats[key](value);
      }
      switch (customFormats[key]) {
        case 'date':
          return formatDateTime(value, DATE_TIME_FORMATS.DEFAULT_DATE);
        case 'datetime':
          return formatDateTime(value);
        case 'boolean':
          return formatBool(value);
        default:
          return value;
      }
    };

    const detailsSize = 12 - size;
    const row = (rowKey, name, value, label) => {
      const { boldEntries } = this.props;
      const bold = boldEntries && boldEntries.includes(name);
      return (
        <Grid container key={rowKey}>
          <Grid item xs={size}>
            <div className={classNames('key', classes.key, { bold })}>
              {label}
            </div>
          </Grid>
          <Grid item xs={detailsSize}>
            <div className={classNames('value', classes.value, { bold })}>
              {format(name, value)}
            </div>
          </Grid>
        </Grid>
      );
    };

    const withOrderElements = order =>
      order.map((element, index) => {
        let name;
        let key;
        let value;

        if (typeof element === 'string' || element instanceof String) {
          name = element;
          key = element;
        } else {
          name = element.name || element.label;
          key = element.key;
        }
        if (Object.keys(item).includes(key)) {
          const formatter =
            element.formatter !== undefined ? element.formatter : x => x;
          value = formatter(item[key], item);
        } else {
          value = '';
        }
        return row(index, key, value, name);
      });

    const withoutOrderElements = () =>
      Object.keys(item).map(k => row(k, k, item[k], k));

    return (
      <div
        className={classNames('common__keyvalue', classes.keyValueContainer)}
      >
        {!elementsOrder
          ? withoutOrderElements()
          : withOrderElements(elementsOrder)}
      </div>
    );
  }
}

export default KeyValue;
