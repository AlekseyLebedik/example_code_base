/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';

class CreateSelectGroup extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      creatingGroup: null,
      value: parseInt(props.data?.groupID, 10),
    };
  }

  componentDidMount() {
    setTimeout(() => this.inputRef.current && this.inputRef.current.focus());
  }

  componentDidUpdate() {
    // selectGroupWhenSaved(this);
  }

  getValue() {
    return this.state.value;
  }

  handleIPGroupUpdates = (context, data, newGrpId) => {
    const { updateIPNote, addIPNote } = context;
    const { noteID: id, ipAddr, ipRange, note } = data;
    if (id) {
      updateIPNote({
        id,
        ipAddr,
        ipRange,
        note,
        groupID: newGrpId,
      });
    } else {
      addIPNote({
        ipAddr,
        ipRange,
        note,
        groupID: newGrpId,
      });
    }
  };

  handleUserIdGroupUpdates = (context, data, newGrpId) => {
    const { handleUpdateWhitelistedUserId } = context;
    const { userId, note } = data;
    handleUpdateWhitelistedUserId(userId, {
      note,
      groupID: newGrpId,
    });
  };

  handleGroupChange = (newValue, actionMeta) => {
    const { label, value } = newValue || {};
    const { addIPGroup } = this.props.context;
    switch (actionMeta.action) {
      case 'create-option': {
        const newGroup = { name: label };
        addIPGroup(newGroup);
        // Component level: are we waiting for a new group that we just created?
        this.setState({ creatingGroup: label });
        break;
      }
      case 'select-option': {
        if (this.props.data.ipAddr) {
          this.handleIPGroupUpdates(this.props.context, this.props.data, value);
        } else if (this.props.data.userId) {
          this.handleUserIdGroupUpdates(
            this.props.context,
            this.props.data,
            value
          );
        }
        this.setState({ value, creatingGroup: false });
        break;
      }
      case 'clear':
        if (this.props.data.ipAddr) {
          this.handleIPGroupUpdates(this.props.context, this.props.data, 0);
        } else if (this.props.data.userId) {
          this.handleUserIdGroupUpdates(this.props.context, this.props.data, 0);
        }
        this.setState({ value: 0 });
        break;
      default:
        break;
    }
  };

  render() {
    const { ipGroups } = this.props;
    const ipGroupsOptions = ipGroups?.map(g => ({
      label: g.name,
      value: g.id,
    }));
    const value =
      this.state.value !== 0
        ? ipGroupsOptions.find(g => g.value === this.state.value)
        : undefined;

    return (
      <CreatableSelect
        ref={this.inputRef}
        isClearable
        fullWidth
        key={ipGroupsOptions?.length || 0}
        placeholder="Select/Create IP Group"
        onChange={this.handleGroupChange}
        options={ipGroupsOptions}
        isLoading={!!this.state.creatingGroup}
        value={value}
      />
    );
  }
}
CreateSelectGroup.propTypes = {
  context: PropTypes.shape({
    updateIPNote: PropTypes.func.isRequired,
    addIPNote: PropTypes.func.isRequired,
    addIPGroup: PropTypes.func.isRequired,
    handleUpdateWhitelistedUserId: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    noteID: PropTypes.number,
    note: PropTypes.string,
  }).isRequired,
  ipGroups: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  ).isRequired,
};
CreateSelectGroup.defaultProps = {};

const mapStateToProps = (state, props) => ({
  ...props,
  ipGroups: state.Scenes.Security.Anticheat.Whitelist.IPControl.ipGroups,
});

export default connect(mapStateToProps)(CreateSelectGroup);
