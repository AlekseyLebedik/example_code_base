import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { TAGS_PREFIX } from './constants';

export const fetchTags = () => createFetch(TAGS_PREFIX);

export const addTag = tag => ({
  type: `${TAGS_PREFIX}_ADD_TAG`,
  tag,
});
