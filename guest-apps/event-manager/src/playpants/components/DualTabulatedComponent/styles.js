export default theme => ({
  success: {
    color: theme.eventManager.palette.green,
  },
  failed: {
    color: theme.eventManager.palette.red,
  },
  pending: {
    color: theme.eventManager.palette.yellow,
  },
  bgGrey: {
    background: theme.eventManager.bg.grey,
  },
  bgWhite: {
    background: theme.eventManager.bg.inherit,
  },
  lightGrey: {
    color: theme.eventManager.palette.grey,
    opacity: 0.38,
  },
  grey: {
    color: theme.eventManager.palette.grey,
    opacity: 0.6,
  },
  darkGrey: {
    color: theme.eventManager.palette.grey,
    opacity: 0.87,
  },
  bold: {
    fontWeight: 'bold',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  font: {
    fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
  },
  tabBadge: {
    right: '-10px',
  },
});
