import PropTypes from 'prop-types';
import { connect } from '@demonware/devzone-core';

import GroupMembershipCheckStateless from './presentational';
import { isInGroupsSelector } from './selectors';

const mapStateToProps = (state, props) => ({
  hasGroupMembershipAccess: isInGroupsSelector(state, props),
});

const GroupMembershipCheck = connect(mapStateToProps)(
  GroupMembershipCheckStateless
);

GroupMembershipCheck.propTypes = {
  requiredGroups: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

GroupMembershipCheck.defaultProps = {
  requiredGroups: [],
};

export default GroupMembershipCheck;
