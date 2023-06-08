import { Component } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';
import { submit } from 'redux-form';

import { connect } from 'dw/core/helpers/component';

import {
  fetchQuotaAllowance,
  openAddModal,
  closeAddModal,
  addQuotaAllowance,
  quotaAllowanceListItemClick,
} from './actions';
import StatelessComponent from './presentational';
import { FORM_NAME as AddQuotaAllowanceFormName } from './components/AddQuotaAllowanceForm/constants';

class QuotaAllowance extends Component {
  componentDidMount() {
    const { q } = queryString.parse(this.props.location.search);
    this.props.onLoad(q);
  }

  search(payload) {
    this.props.onSearch(payload);
  }

  render() {
    const newProps = {
      reduxProps: this.props,
      reactProps: {
        onSearch: payload => this.search(payload),
      },
      addQuotaAllowanceFormModalProps: {
        addModalVisible: this.props.addModalVisible,
        openAddModal: this.props.openAddModal,
        closeAddModal: this.props.closeAddModal,
        addOnRemoteSubmit: this.props.addOnRemoteSubmit,
        onAddQuotaAllowanceFormHandler:
          this.props.onAddQuotaAllowanceFormHandler,
      },
    };
    return <StatelessComponent {...newProps} />;
  }
}
QuotaAllowance.propTypes = {
  addModalVisible: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddQuotaAllowanceFormHandler: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  listItems: state.Scenes.Storage.ContentServer.QuotaAllowance.entries,
  nextPageToken:
    state.Scenes.Storage.ContentServer.QuotaAllowance.nextPageToken,
  elementsOrder:
    state.Scenes.Storage.ContentServer.QuotaAllowance.elementsOrder,
  selectedListItem:
    state.Scenes.Storage.ContentServer.QuotaAllowance.selectedListItem,
  q: state.Scenes.Storage.ContentServer.QuotaAllowance.q,
  addModalVisible:
    state.Scenes.Storage.ContentServer.QuotaAllowance.addModalVisible,
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchQuotaAllowance(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchQuotaAllowance({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchQuotaAllowance({ nextPageToken, q }, true)),
  onClickListItem: listItem => dispatch(quotaAllowanceListItemClick(listItem)),
  addOnRemoteSubmit: () => dispatch(submit(AddQuotaAllowanceFormName)),
  onAddQuotaAllowanceFormHandler: values => dispatch(addQuotaAllowance(values)),
  openAddModal: () => dispatch(openAddModal()),
  closeAddModal: () => dispatch(closeAddModal()),
});

export default connect(stateToProps, dispatchToProps, QuotaAllowance);
