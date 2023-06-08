import { Component } from 'react';
import { connect } from 'react-redux';
import * as IP from 'dw/core/helpers/ip';

import { selectGroupWhenSaved } from '../../helpers';
import AddIPControlModalStateless from './presentational';
import * as C from '../../constants';

const stateToProps = state => ({
  submitting:
    state.Scenes.Security.Anticheat.Whitelist.IPControl.addModalSubmitting,
});

class AddIPControlModal extends Component {
  static propTypes = {
    ...AddIPControlModalStateless.propTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      group: null,
      type: C.WL_TYPE_VALUE_IP,
      currentIp: null,
      currentUserId: null,
      currentGamerTag: null,
      currentConsoleId: null,
      currentNote: '',
      allValues: [],
      error: null,
      creatingGroup: null,
      hasNoteGroupAddPermission: props.hasNoteGroupAddPermission,
    };
  }

  componentDidUpdate() {
    selectGroupWhenSaved(this);
  }

  onChangeType = type => {
    this.setState({ type });
  };

  onChangeIp = currentIp => {
    this.setState({ currentIp });
  };

  onChangePlayer = player => {
    if (!player) {
      return;
    }
    const values = player.label.split('|', 2);
    if (values.length === 2) {
      this.setState({
        currentGamerTag: values[0].trim(),
        currentUserId: values[1].trim(),
      });
    }
  };

  onChangeConsoleId = currentConsoleId => {
    this.setState({ currentConsoleId });
  };

  onChangeNote = note => {
    this.setState({
      currentNote: note.replace(/↵/g, '\n'),
    });
  };

  isTypeInputDisabled = () => {
    return this.state.allValues.length >= 1;
  };

  onAdd = () => {
    this.setState(prevState => this.processInput(prevState));
    this.setState({
      currentIp: null,
      currentUserId: null,
      currentGamerTag: null,
      currentConsoleId: null,
      currentNote: '',
    });
    // FIXME - Autocomplete user can't be cleared when reset.
    // console.log("onAdd  new values:", this.state.allValues);
    // console.log("onAdd currentUser", this.state.currentUserId, this.state.currentGamerTag);
  };

  onEdit = itemKey => {
    this.setState(prevState => {
      const editValue = prevState.allValues.find(
        v => this.getKey(v) === itemKey
      );
      return {
        ...prevState,
        currentIp:
          editValue.ipAddr && editValue.ipRange
            ? `${editValue.ipAddr}+${editValue.ipRange}`
            : null,
        currentUserId: editValue.userId ? editValue.userId : null,
        currentNote: editValue.note ? editValue.note : '',
        allValues: prevState.allValues.filter(v => this.getKey(v) !== itemKey),
      };
    });
  };

  onDelete = itemKey => {
    this.setState(prevState => ({
      allValues: prevState.allValues.filter(v => this.getKey(v) !== itemKey),
    }));
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.allValues);
  };

  getKey = item => {
    const currType = this.state.type;
    if (currType === C.WL_TYPE_VALUE_IP) {
      return item.ipInt;
    }
    if (currType === C.WL_TYPE_VALUE_USER_ID) {
      return item.userId;
    }
    return null;
  };

  getValue = item => {
    const currType = this.state.type;
    if (currType === C.WL_TYPE_VALUE_IP) {
      return `${item.ipAddr}+${item.ipRange}`;
    }
    if (currType === C.WL_TYPE_VALUE_USER_ID) {
      return item.userId;
    }
    return '';
  };

  processIPValue = v => {
    if (!v.trim()) return null;
    const ipRange = v.trim().split('+');
    const ip = ipRange[0];
    let range = ipRange[1];
    if (!range) range = '0';
    range = parseInt(range, 10);
    return {
      ipAddr: ip,
      ipRange: range,
      ipInt: IP.toInt(ip),
    };
  };

  processInput = state => {
    const prevState = state || this.state;
    const errors = [];
    const newValues = [];
    let updatedValues = [];
    const currNote = prevState.currentNote;
    const currGrpId = prevState.group?.value;

    if (prevState.type === C.WL_TYPE_VALUE_IP) {
      const currentIp = prevState.currentIp.replace(/[ ;,]+/g, ',');
      currentIp.split(',').forEach(v => {
        const parsedIp = this.processIPValue(v);
        if (
          !parsedIp ||
          !parsedIp.ipAddr ||
          Number.isNaN(parsedIp.ipRange) ||
          !IP.isValid(parsedIp.ipAddr)
        ) {
          errors.push(v.trim());
        } else {
          newValues.push({
            ...parsedIp,
            ...(currGrpId !== undefined && { groupID: currGrpId }),
            note: currNote,
          });
        }
      });
      const existing = prevState.allValues.map(v => v.ipInt);
      updatedValues = [
        ...prevState.allValues,
        ...newValues.filter(v => !existing.includes(v.ipInt)),
      ];
    } else if (prevState.type === C.WL_TYPE_VALUE_USER_ID) {
      newValues.push({
        userId: prevState.currentUserId,
        note: currNote,
        ...(currGrpId !== undefined && { groupID: currGrpId }),
      });
      const existing = prevState.allValues.map(v => v.userId);
      updatedValues = [
        ...prevState.allValues,
        ...newValues.filter(v => !existing.includes(v.userId)),
      ];
    }

    return {
      allValues: updatedValues,
    };
  };

  handleTextFieldKeyDown = event => {
    switch (event.key) {
      case 'Enter':
        this.onAdd();
        break;
      default:
        break;
    }
  };

  handleGroupChange = (newValue, actionMeta) => {
    const { value, label } = newValue || {};
    const { addIPGroup } = this.props;
    switch (actionMeta.action) {
      case 'create-option': {
        const newGroup = { name: label };
        addIPGroup(newGroup);
        this.setState({ creatingGroup: label });
        break;
      }
      case 'select-option': {
        this.setState(prevState => ({
          ...prevState,
          group: newValue,
          creatingGroup: false,
          allValues: prevState.allValues.map(v => ({ ...v, groupID: value })),
        }));
        break;
      }
      case 'clear':
        this.setState(prevState => ({
          ...prevState,
          group: undefined,
          allValues: prevState.allValues.map(v => ({
            ...v,
            groupID: undefined,
          })),
        }));
        break;
      default:
        break;
    }
  };

  render() {
    const {
      group,
      type,
      currentIp,
      currentUserId,
      currentGamerTag,
      currentConsoleId,
      currentNote,
      allValues,
      error,
      hasNoteGroupAddPermission,
    } = this.state;

    const { ipGroups } = this.props;
    const ipGroupsOptions = ipGroups.map(g => ({
      label: g.name,
      value: g.id,
    }));
    return AddIPControlModalStateless({
      ...this.props,
      onChangeType: this.onChangeType,
      onChangeIp: this.onChangeIp,
      onChangePlayer: this.onChangePlayer,
      onChangeConsoleId: this.onChangeConsoleId,
      onChangeNote: this.onChangeNote,
      onAdd: this.onAdd,
      onDelete: this.onDelete,
      onEdit: this.onEdit,
      onSubmit: this.onSubmit,
      onSetGroup: this.onSetGroup,
      getKey: this.getKey,
      getValue: this.getValue,
      handleTextFieldKeyDown: this.handleTextFieldKeyDown,
      handleGroupChange: this.handleGroupChange,
      isTypeInputDisabled: this.isTypeInputDisabled,
      group,
      type,
      currentIp,
      currentUserId,
      currentGamerTag,
      currentConsoleId,
      currentNote,
      allValues,
      error,
      ipGroupsOptions,
      isLoading: !!this.state.creatingGroup,
      hasNoteGroupAddPermission,
    });
  }
}

export default connect(stateToProps)(AddIPControlModal);
