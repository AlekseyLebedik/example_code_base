import { Component } from 'react';
import PropTypes from 'prop-types';

import queryString from 'query-string';
import { submit } from 'redux-form';

import { connect } from 'dw/core/helpers/component';

import {
  fetchQuotaUsage,
  openAddModal,
  closeAddModal,
  addQuotaUsage,
  quotaUsageListItemClick,
} from './actions';
import StatelessComponent from './presentational';
import { FORM_NAME as AddQuotaUsageFormName } from './components/AddQuotaUsageForm/constants';

class QuotaUsage extends Component {
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
      addQuotaUsageFormModalProps: {
        addModalVisible: this.props.addModalVisible,
        openAddModal: this.props.openAddModal,
        closeAddModal: this.props.closeAddModal,
        addOnRemoteSubmit: this.props.addOnRemoteSubmit,
        onAddQuotaUsageFormHandler: this.props.onAddQuotaUsageFormHandler,
      },
    };
    return <StatelessComponent {...newProps} />;
  }
}
QuotaUsage.propTypes = {
  location: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  closeAddModal: PropTypes.func.isRequired,
  addOnRemoteSubmit: PropTypes.func.isRequired,
  onAddQuotaUsageFormHandler: PropTypes.func.isRequired,
  addModalVisible: PropTypes.bool.isRequired,
};

const stateToProps = state => ({
  listItems: state.Scenes.Storage.ContentServer.QuotaUsage.entries,
  nextPageToken: state.Scenes.Storage.ContentServer.QuotaUsage.nextPageToken,
  elementsOrder: state.Scenes.Storage.ContentServer.QuotaUsage.elementsOrder,
  selectedListItem:
    state.Scenes.Storage.ContentServer.QuotaUsage.selectedListItem,
  q: state.Scenes.Storage.ContentServer.QuotaUsage.q,
  addModalVisible:
    state.Scenes.Storage.ContentServer.QuotaUsage.addModalVisible,
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchQuotaUsage(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchQuotaUsage({ q: payload.q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchQuotaUsage({ nextPageToken, q }, true)),
  onClickListItem: listItem => dispatch(quotaUsageListItemClick(listItem)),
  addOnRemoteSubmit: () => dispatch(submit(AddQuotaUsageFormName)),
  onAddQuotaUsageFormHandler: values => dispatch(addQuotaUsage(values)),
  openAddModal: () => dispatch(openAddModal()),
  closeAddModal: () => dispatch(closeAddModal()),
});

export default connect(stateToProps, dispatchToProps, QuotaUsage);
