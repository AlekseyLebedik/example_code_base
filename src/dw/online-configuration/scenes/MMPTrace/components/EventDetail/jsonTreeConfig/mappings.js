import { ntoa } from 'dw/core/helpers/ip';
import { NAT_TYPE_MAP } from '../../../constants';

const MAPPINGS = {
  ip4_addr: value => ntoa(value),
  nat_type: value => NAT_TYPE_MAP[value],
};

export const mapEvent = event => {
  /* Right now the mappings will be only in the first level,
    we don't need to make recursive this mapping function for the moment.
    But take in consideration it for future mappings. */
  if (!MAPPINGS) return event;

  const mappedEvent = { ...event };
  Object.keys(MAPPINGS).forEach(key => {
    const eventPropValue = mappedEvent[key];
    if (eventPropValue !== undefined) {
      mappedEvent[key] = MAPPINGS[key](eventPropValue);
    }
  });
  return { ...mappedEvent };
};
