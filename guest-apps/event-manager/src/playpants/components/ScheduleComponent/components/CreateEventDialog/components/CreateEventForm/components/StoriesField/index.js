import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import debounce from 'lodash/debounce';
import { Field } from 'redux-form';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import { searchGroupStories } from 'playpants/scenes/GroupStories/actions';
import { searchedGroupStoriesDataSelector } from 'playpants/scenes/GroupStories/selectors';

const StoriesField = props => {
  const {
    groupStoriesData,
    handleStoryChange,
    onSearchGroupStories,
    searchedGroupStoriesData,
  } = props;

  const orderedStories = sortBy(groupStoriesData, stories => stories.name);

  const orderedSearchedGroupStories = sortBy(
    searchedGroupStoriesData,
    stories => stories.name
  );

  const [inputValue, setInputValue] = useState('');
  const onSearchStoriesDebounced = useCallback(
    debounce(onSearchGroupStories, 1000),
    []
  );

  return (
    <>
      <Field
        component={AutocompleteGeneral}
        valuesOnly={false}
        options={
          inputValue === ''
            ? orderedStories.map(orderedStoriesSetting => ({
                label: orderedStoriesSetting.name,
                value: orderedStoriesSetting.id,
              }))
            : orderedSearchedGroupStories.map(curr => ({
                label: curr.name,
                value: curr.id,
              }))
        }
        props={{
          onChange: e => handleStoryChange(e),
          onInputChange: e => {
            setInputValue(e);
            onSearchStoriesDebounced(e);
          },
          inputValue,
        }}
        fullWidth
        label="Story"
        name="story"
      />
    </>
  );
};

StoriesField.propTypes = {
  groupStoriesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedGroupStoriesData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleStoryChange: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(StoriesField);
