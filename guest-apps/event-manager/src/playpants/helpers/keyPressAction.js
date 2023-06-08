export default (event, onEnter, onEscape) => {
  if (event.key === 'Enter' && onEnter) onEnter();
  else if (event.key === 'Escape' && onEscape) onEscape();
};
