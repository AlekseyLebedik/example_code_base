/**
 * Given a list and the dispatched action, it searches for the event found in
 * the dispatched action, replaces it, and returns the modified list
 * @param {[]} events                   - The list of events to search from
 * @param {{}} updatedEvent             - The event used to search
 * @param {number} updatedEvent.project - The project the event belongs to
 */
const findAndReplaceEvent = (events, updatedEvent) =>
  events.map(event =>
    event.id === updatedEvent.id && event.project === updatedEvent.project
      ? updatedEvent
      : event
  );
export default findAndReplaceEvent;
