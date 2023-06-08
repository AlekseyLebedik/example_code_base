import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Select from 'dw/core/components/FormFields/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './presentational.module.css';

const TitleSearchSelectorPresentational = props => (
  <Select
    label="Filter by Title"
    InputProps={{
      endAdornment: props.value.length > 0 && (
        <InputAdornment position="end">
          <Tooltip title="Clear Selection">
            <IconButton onClick={() => props.handleClear()}>
              <Icon>clear</Icon>
            </IconButton>
          </Tooltip>
        </InputAdornment>
      ),
    }}
    value={props.value}
    onChange={props.handleChange}
    className={styles.selectTitle}
  >
    {props.testTitles.sort().map(title => (
      <MenuItem key={title} value={title}>
        {title}
      </MenuItem>
    ))}
  </Select>
);

TitleSearchSelectorPresentational.propTypes = {
  value: PropTypes.string,
  testTitles: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  handleClear: PropTypes.func,
};

TitleSearchSelectorPresentational.defaultProps = {
  value: '',
  testTitles: [],
  handleChange: () => {},
  handleClear: () => {},
};

export default TitleSearchSelectorPresentational;
