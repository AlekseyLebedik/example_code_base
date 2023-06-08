import { uuid } from 'dw/core/helpers/uuid';

export const generateId = item =>
  `${item.component}-${item.version}-${item.release_date}-${uuid()}`;

export const generateAnchorLink = item =>
  `${item.component}-release-${item.version}-${item.release_date}`;
