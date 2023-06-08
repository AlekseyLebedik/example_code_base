import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ReplicaUpdater only update the replica when the data props change.
class ReplicaUpdater extends PureComponent {
  componentDidMount() {
    this.props.onUpdate(this.props.data);
  }

  componentDidUpdate() {
    this.props.onUpdate(this.props.data);
  }

  render() {
    return null;
  }
}

ReplicaUpdater.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function makeReplica(tag, initialState) {
  const UPDATE_REPLICA = `core/UPDATE_${tag.toUpperCase()}_REPLICA`;
  const updateReplica = data => ({ type: UPDATE_REPLICA, data });
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_REPLICA:
        return { ...state, ...action.data };
      default:
        return state;
    }
  };

  const Context = React.createContext({
    ...initialState,
  });

  // eslint-disable-next-line react/prop-types
  const Replica = ({ update }) => (
    <Context.Consumer>
      {({ data }) => <ReplicaUpdater onUpdate={update} data={data} />}
    </Context.Consumer>
  );
  const ConnectedReplica = connect(null, { update: updateReplica })(Replica);

  return { reducer, updateReplica, Context, ConnectedReplica };
}

export default makeReplica;
