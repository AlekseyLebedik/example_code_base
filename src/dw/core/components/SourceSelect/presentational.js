import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AutoComplete, Input } from 'antd';
import Icon from '@material-ui/core/Icon';

import './presentational.css';

const SourceSelectStateless = ({
  data,
  value,
  placeholder,
  onType,
  onSelect,
  onFocus,
  onChange,
  renderOption,
  withoutPrefix,
  ...props
}) => {
  const inputProps = { placeholder, onFocus };
  if (!withoutPrefix) {
    inputProps.prefix = <Icon fontSize="small">search</Icon>;
  }
  return (
    <div className={classNames('source-select', 'source-select-reworked')}>
      <AutoComplete
        style={{ width: '100%' }}
        dataSource={data.map(renderOption)}
        value={value}
        onSelect={onSelect}
        onChange={onChange}
        onSearch={onType}
        placeholder={placeholder}
        {...props}
      >
        <Input {...inputProps} />
      </AutoComplete>
    </div>
  );
};

SourceSelectStateless.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onType: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  renderOption: PropTypes.func.isRequired,
  withoutPrefix: PropTypes.bool,
};

SourceSelectStateless.defaultProps = {
  value: '',
  placeholder: '',
  withoutPrefix: false,
};

export default SourceSelectStateless;
