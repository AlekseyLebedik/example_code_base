/**
 * Determine if a tag is found in list of valid tags, allows
 * access to humanReadable name for tag if exists, else
 * return tag key for display
 * @param {*} validTags
 * @param {*} tag
 * @returns
 */
export const getTagDisplay = (validTags, tagKey) =>
  validTags?.find(tag => tag.key === tagKey)?.humanReadable || tagKey;
