import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { tagFiltersHelpers } from 'dw/core/components/EventsCalendar/helpers';
import { validateTag } from 'playpants/components/ScheduleComponent/helpers';

import { prettyPrint } from 'playpants/helpers/json';
import Tags from 'playpants/components/FormFields/Tags';

const TagsPanel = ({ disabled, eventData, onSave }) => {
  const { auto_tags: autoTags = [], manual_tags: manualTags } = eventData;
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const tags = autoTags.concat(manualTags);

  const onChangeTag = tagText => {
    const tagsError = validateTag(tags, tagText);
    setError(tagsError);
    setInput(tagText);
  };

  const handleAdd = tagText => {
    if (!validateTag(tags, tagText) && tagText.length) {
      onSave(
        'manual_tags',
        prettyPrint([...manualTags, ...tagFiltersHelpers.extractTags(tagText)])
      );
      setError(null);
      setInput('');
    }
  };

  const handleRemove = tag => {
    if (manualTags.includes(tag)) {
      onSave('manual_tags', prettyPrint(manualTags.filter(t => t !== tag)));
    }
  };

  return (
    <Tags
      addTag={handleAdd}
      autoTags={autoTags}
      deleteTag={handleRemove}
      disabled={disabled}
      input={input}
      manualTags={manualTags}
      onChangeTag={onChangeTag}
      tagsError={error}
    />
  );
};

TagsPanel.propTypes = {
  disabled: PropTypes.bool.isRequired,
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TagsPanel;
