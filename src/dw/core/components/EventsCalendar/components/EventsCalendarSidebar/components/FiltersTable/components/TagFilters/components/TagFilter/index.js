import React, { useState } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { useSelector } from 'react-redux';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from 'dw/core/components/IconButton';

import { extractTags, validateTags } from '../../helpers';

import styles from './index.module.css';

const TagFilter = ({ setCalendarSettings, setTagsExpanded }) => {
  const [tagText, setTagText] = useState('');
  const [tagTextError, setTagTextError] = useState(null);
  const filters = useSelector(state => state.Core.EventsCalendar.filters);

  const addCustomTagSet = ({ target: { value: tagsValue } }) => {
    const extractedTags = extractTags(tagsValue);
    const { userTags } = filters.customTags;
    const updatedCustomTags = { ...userTags };
    const error = validateTags(userTags, tagsValue);
    let customTagsLength = Object.keys(userTags).length;
    const containsEnterChars =
      tagsValue.includes(',') || tagsValue.includes('\n');

    if (error) {
      setTagText(containsEnterChars ? tagText : tagsValue);
      setTagTextError(error);
    } else if (containsEnterChars) {
      if (customTagsLength >= 10) {
        range(0, 9).forEach(idx => {
          updatedCustomTags[idx] = userTags[idx + 1];
        });
        customTagsLength = 9;
      }

      updatedCustomTags[customTagsLength] = {
        checked: true,
        tags: extractedTags,
      };
      setCalendarSettings({
        filters: {
          ...filters,
          customTags: {
            ...filters.customTags,
            userTags: updatedCustomTags,
          },
        },
        selectedStyle: 'tagFilters',
      });
      setTagText('');
      setTagTextError(null);
      setTagsExpanded(true);
    } else {
      setTagText(tagsValue);
      setTagTextError(null);
    }
  };

  return (
    <>
      <div className={styles.eventsCalendarFilter}>
        <TextField
          error={tagTextError && tagTextError.length > 0}
          fullWidth
          helperText={tagTextError}
          InputProps={
            tagText.length
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        icon="close"
                        onClick={() => {
                          setTagText('');
                          setTagTextError(null);
                        }}
                        size="small"
                        tooltip="Clear Tag Entry"
                      />
                    </InputAdornment>
                  ),
                }
              : {}
          }
          multiline
          onChange={addCustomTagSet}
          placeholder="Add Tag Set"
          value={tagText}
        />
      </div>
    </>
  );
};

TagFilter.propTypes = {
  setCalendarSettings: PropTypes.func.isRequired,
  setTagsExpanded: PropTypes.func.isRequired,
};

export default TagFilter;
