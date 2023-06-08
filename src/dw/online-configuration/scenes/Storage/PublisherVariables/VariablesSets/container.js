import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { submit } from 'redux-form';

import { connect } from 'dw/core/helpers/component';

import {
  fetchVariablesSets,
  addVariablesSets,
  variablesSetsListItemClick,
  openAddModal as openAddModalAction,
  closeAddModal as closeAddModalAction,
} from './actions';
import {
  isAddModalOpenSelector,
  listItemsSelector,
  loadingSelector,
  nextPageTokeSelector,
  querySelector,
  selectedListItemSelector,
} from './selectors';
import StatelessComponent from './presentational';
import { FORM_NAME as AddVariablesSetsFormName } from './components/AddVariablesSetsForm/constants';

class VariablesSets extends Component {
  static propTypes = {
    isAddModalOpen: PropTypes.bool.isRequired,
    openAddModal: PropTypes.func.isRequired,
    closeAddModal: PropTypes.func.isRequired,
    addOnRemoteSubmit: PropTypes.func.isRequired,
    onAddVariablesSetsFormHandler: PropTypes.func.isRequired,
    location: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    location: window.location,
  };

  componentDidMount() {
    const { q } = queryString.parse(this.props.location.search);
    this.props.onLoad(q);
  }

  search(payload) {
    this.props.onSearch(payload);
  }

  render() {
    const { isAddModalOpen, openAddModal, closeAddModal, ...props } =
      this.props;
    const newProps = {
      reduxProps: props,
      reactProps: {
        onSearch: payload => this.search(payload),
      },
      addVariablesSetsFormModalProps: {
        addVariablesSetsFormModalVisible: isAddModalOpen,
        openAddVariablesSetsFormModalHandler: openAddModal,
        closeAddVariablesSetsFormModalHandler: closeAddModal,
        addOnRemoteSubmit: this.props.addOnRemoteSubmit,
        onAddVariablesSetsFormHandler: this.props.onAddVariablesSetsFormHandler,
      },
    };
    return <StatelessComponent {...newProps} />;
  }
}

const stateToProps = state => ({
  isAddModalOpen: isAddModalOpenSelector(state),
  listItems: listItemsSelector(state),
  loading: loadingSelector(state),
  nextPageToken: nextPageTokeSelector(state),
  q: querySelector(state),
  selectedListItem: selectedListItemSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchVariablesSets(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchVariablesSets({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchVariablesSets({ nextPageToken, q }, true)),
  onClickListItem: variablesSet =>
    dispatch(variablesSetsListItemClick(variablesSet)),
  addOnRemoteSubmit: () => dispatch(submit(AddVariablesSetsFormName)),
  onAddVariablesSetsFormHandler: values =>
    new Promise((resolve, reject) =>
      dispatch(addVariablesSets(values, resolve, reject))
    ),
  openAddModal: () => dispatch(openAddModalAction()),
  closeAddModal: () => dispatch(closeAddModalAction()),
});

export default connect(stateToProps, dispatchToProps, VariablesSets);
