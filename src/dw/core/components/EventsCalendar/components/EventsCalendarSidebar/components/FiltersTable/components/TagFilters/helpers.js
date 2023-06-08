import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';

// Changes selected status of a custom tag set checkbox
export const toggleTagFilters = (tagFilters, selected) => {
  const newSelected = !selected || selected === 'indeterminate';
  // eslint-disable-next-line no-param-reassign
  tagFilters.unspecified = newSelected;
  if (!isEmpty(tagFilters.userTags)) {
    Object.values(tagFilters.userTags).forEach(userTag => {
      // eslint-disable-next-line no-param-reassign
      userTag.checked = newSelected;
    });
  }
};

// Splits by whitespace, removes commas, and returns tags longer than 1 char
const getValidLengthTags = tags =>
  tags
    .replace(/,/gi, '')
    .split(/[\n\s]+/)
    .filter(tag => tag.length > 1);

// Gets valid tags and returns list of unique tags
export const extractTags = tags => uniq(getValidLengthTags(tags));

// Checks if there are single character tags
const containsSingleCharTags = tags =>
  tags.split(' ').some(tag => tag.length === 1);

// Checks tags list for duplicate tags
const duplicateTagsExist = tags => {
  const tagList = getValidLengthTags(tags).map(tag => tag.toLowerCase());

  return tagList.length !== uniq(tagList).length;
};

// Determine if a tag set already exists
const tagSetExists = (userTags, newTags) =>
  Object.values(userTags).some(tagSet =>
    isEqual(
      tagSet.tags.map(t => t.toLowerCase()).sort(),
      newTags.map(t => t.toLowerCase()).sort()
    )
  );

// Validate a tag set or return appropriate error message if invalid
export const validateTags = (userTags, newTags) => {
  const newTagsNoCommas = newTags.replace(/,/g, '');
  if (containsSingleCharTags(newTagsNoCommas)) {
    return 'All tags must be at least 2 characters!';
  }
  if (duplicateTagsExist(newTagsNoCommas)) {
    return 'You have entered duplicate tags!';
  }
  if (tagSetExists(userTags, extractTags(newTagsNoCommas))) {
    return 'Tag set already exists!';
  }

  return null;
};

// Gets selected status for tag filters, whether true, false, or indeterminate
export const getTagFiltersSelected = tagFilters => {
  if (isEmpty(tagFilters.userTags)) {
    return tagFilters.unspecified;
  }

  const numUserTagsSelected =
    tagFilters.unspecified +
    Object.values(tagFilters.userTags).reduce(
      (acc, userTag) => acc + userTag.checked,
      0
    );

  if (numUserTagsSelected === 0) {
    return false;
  }
  if (numUserTagsSelected === Object.values(tagFilters.userTags).length + 1) {
    return true;
  }
  return 'indeterminate';
};
