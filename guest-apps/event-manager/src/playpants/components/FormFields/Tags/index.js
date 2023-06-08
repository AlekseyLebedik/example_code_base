import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import styles from './index.module.css';

const TagChip = ({ classes, deleteTag, disabled, tag }) => (
  <Chip
    className={classNames(styles.chip, classes.chip)}
    label={tag}
    onDelete={!disabled ? () => deleteTag(tag) : null}
  />
);

TagChip.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTag: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  tag: PropTypes.string.isRequired,
};

const Tags = ({
  addTag,
  autoTags,
  classes,
  deleteTag,
  disabled,
  input,
  manualTags,
  onChangeTag,
  keysPressed,
  tagsError,
  tagLabel,
}) => (
  <div className={styles.tagsContainer}>
    <TextField
      className={classes.textfield}
      data-cy="eventTagsField"
      error={tagsError !== null}
      helperText={tagsError}
      disabled={disabled}
      fullWidth
      label={tagLabel}
      onChange={({ target: { value } }) =>
        onChangeTag(value !== ',' || value !== ' ' ? value : '')
      }
      onKeyPress={e => {
        if (keysPressed.includes(e.key)) {
          addTag(e.target.value);
          e.preventDefault();
        }
      }}
      value={input}
    />
    {(!isEmpty(manualTags) || !isEmpty(autoTags)) && (
      <div
        className={classNames(styles.chips, classes.chips)}
        data-cy="tagsContainer"
      >
        {manualTags.map(tag => (
          <TagChip
            key={`eventManualTag/${tag}`}
            disabled={disabled}
            tag={tag}
            classes={classes}
            deleteTag={deleteTag}
          />
        ))}
        {autoTags.map(tag => (
          <TagChip
            key={`eventAutoTag/${tag}`}
            disabled
            tag={tag}
            classes={classes}
            deleteTag={deleteTag}
          />
        ))}
      </div>
    )}
  </div>
);

Tags.propTypes = {
  addTag: PropTypes.func.isRequired,
  autoTags: PropTypes.arrayOf(PropTypes.string),
  classes: PropTypes.object,
  deleteTag: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  input: PropTypes.string.isRequired,
  manualTags: PropTypes.arrayOf(PropTypes.string),
  onChangeTag: PropTypes.func.isRequired,
  keysPressed: PropTypes.arrayOf(PropTypes.string),
  tagsError: PropTypes.string,
  tagLabel: PropTypes.string,
};

Tags.defaultProps = {
  autoTags: [],
  classes: {},
  disabled: false,
  tagLabel: 'Tags',
  keysPressed: ['Enter', ',', ' '],
  manualTags: [],
  tagsError: null,
};

export default Tags;
