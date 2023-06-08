import PropTypes from 'prop-types';

export const ABTestLink = props => {
  const event = props.group.events.find(e => e.id === props.data.id);
  return event.name;
};

ABTestLink.propTypes = {
  data: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

export default ABTestLink;
