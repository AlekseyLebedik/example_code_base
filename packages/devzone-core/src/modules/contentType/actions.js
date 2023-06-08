import { createFetch } from '../../helpers/actions';

export const CONTENT_TYPES_PREFIX = 'devzone/CONTENT_TYPES';

export const fetchContentTypes = () => createFetch(CONTENT_TYPES_PREFIX);
