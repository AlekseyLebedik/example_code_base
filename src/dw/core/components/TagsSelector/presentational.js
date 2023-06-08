import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

import AutoComplete from 'dw/core/components/AutocompleteGeneral';

import styles from './presentational.module.css';

const TagsStateless = ({ tags, onChange, addTag, value, readOnly }) =>
  readOnly ? (
    <div className={styles.tags}>
      {value.map(({ label }) => (
        <Chip className={styles.tag} key={label} label={label} />
      ))}
    </div>
  ) : (
    <AutoComplete
      options={tags}
      label="Tags"
      variant="default"
      defaultValue={value}
      onChange={onChange}
      onAdd={addTag}
      placeholder="Select or Create ..."
      isMulti
    />
  );

TagsStateless.propTypes = {
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
};

TagsStateless.defaultProps = {
  readOnly: false,
};

export default TagsStateless;
