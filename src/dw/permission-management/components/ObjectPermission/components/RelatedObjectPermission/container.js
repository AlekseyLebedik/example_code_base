import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRelatedPermissions } from '../../actions';
import { relatedObjectPermissionMain } from '../../selectors';
import RelatedObjectPermissionStateless from './presentational';

const stateProps = state => ({
  relatedPermissions: relatedObjectPermissionMain(state),
});

const dispatchProps = {
  fetchRelatedPermissions,
};

class RelatedObjectPermissionContainer extends React.Component {
  componentDidMount() {
    this.props.fetchRelatedPermissions(this.props.ctypeId, this.props.objectId);
  }

  render() {
    return <RelatedObjectPermissionStateless {...this.props} />;
  }
}

export default connect(
  stateProps,
  dispatchProps
)(RelatedObjectPermissionContainer);

RelatedObjectPermissionContainer.propTypes = {
  fetchRelatedPermissions: PropTypes.func.isRequired,
  objectId: PropTypes.string.isRequired,
  ctypeId: PropTypes.string.isRequired,
};
