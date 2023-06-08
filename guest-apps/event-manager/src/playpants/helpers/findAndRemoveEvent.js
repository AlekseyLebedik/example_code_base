const findAndRemoveEvent = (events, action) =>
  events.filter(event => event.id !== action.event.id);

export default findAndRemoveEvent;
