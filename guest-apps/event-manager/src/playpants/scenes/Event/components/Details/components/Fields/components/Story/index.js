import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchGroupStories } from 'playpants/scenes/GroupStories/actions';
import { searchedGroupStoriesDataSelector } from 'playpants/scenes/GroupStories/selectors';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import debounce from 'lodash/debounce';

export const StoryBase = ({
  storiesData,
  eventData,
  onSave,
  disabled,
  onSearchGroupStories,
  searchedGroupStoriesData,
}) => {
  const handleChange = e => {
    if (e) {
      const id = e.value;
      return onSave('story', { id });
    }
    return onSave('story', null);
  };
  const { story } = eventData;
  const initialSelectValue = story ? story.name : story;
  const groupStories = storiesData.filter(
    data => !data.schedule && !data.title_env
  );

  const [inputValue, setInputValue] = useState('');
  const onSearchStoriesDebounced = useCallback(
    debounce(onSearchGroupStories, 1000),
    []
  );

  return (
    <AutocompleteGeneral
      fullWidth
      isDisabled={disabled}
      label="Story"
      name="story"
      placeholder="Select/Search Story"
      valuesOnly={false}
      onChange={handleChange}
      defaultValue={initialSelectValue}
      options={
        inputValue === ''
          ? groupStories.map(currentStory => ({
              label: currentStory.name,
              value: currentStory.id,
            }))
          : searchedGroupStoriesData.map(curr => ({
              label: curr.name,
              value: curr.id,
            }))
      }
      onInputChange={e => {
        setInputValue(e);
        onSearchStoriesDebounced(e);
      }}
      inputValue={inputValue}
    />
  );
};

StoryBase.propTypes = {
  storiesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  searchedGroupStoriesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchGroupStories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchedGroupStoriesData: searchedGroupStoriesDataSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchGroupStories: payload => {
    dispatch(
      searchGroupStories({
        name__icontains: payload,
        project: ownProps.currentProject.id,
        schedule: null,
      })
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryBase);
