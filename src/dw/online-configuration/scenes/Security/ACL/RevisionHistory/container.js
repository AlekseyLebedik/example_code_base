import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dw/core/helpers/component';

import {
  fetchRevisions,
  revertRevision as revertRevisionAction,
} from './actions';
import RevisionHistoryStatelessComponent from './presentational';

const makeStateToProps = state => ({
  revisions: state.Scenes.Security.ACL.RevisionHistory.revisions,
});

const dispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchRevisions()),
  revertRevision: revisionId => dispatch(revertRevisionAction(revisionId)),
});

class RevisionHistory extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    return (
      <RevisionHistoryStatelessComponent
        revisions={this.props.revisions}
        revertRevision={this.props.revertRevision}
      />
    );
  }
}

RevisionHistory.propTypes = {
  onLoad: PropTypes.func.isRequired,
  revisions: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ).isRequired,
  revertRevision: PropTypes.func.isRequired,
};

export default connect(makeStateToProps, dispatchToProps, RevisionHistory);
