import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { connect } from 'dw/core/helpers/component';
import omit from 'lodash/omit';
import scrollIntoView from 'scroll-into-view';
import { hasData } from 'dw/core/helpers/object';
import { uuid } from 'dw/core/helpers/uuid';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import AggridPresentational from './presentational';
import ExpandedMessagePanel from '../ExpandedMessagePanel';

import {
  fetchServerLogs,
  fetchServerLogsExpanded,
  exportServerLogs,
} from '../../actions';
import {
  expandedDetailsSelector,
  querySelector,
  exportIsLoadingSelector,
} from '../../selectors';

const stateToProps = (state, props) => ({
  expandedInfo: expandedDetailsSelector(state),
  isLoading: state.Scenes.Debugging.ServerLogs.isLoading,
  formatDateTime: formatDateTimeSelector(state),
  query: querySelector(state, props),
  exportIsLoading: exportIsLoadingSelector(state),
});
const dispatchToProps = dispatch => ({
  fetchLogs: (filters, nextPageToken, params) => {
    dispatch(fetchServerLogs(filters, nextPageToken, params));
  },
  fetchServerLogsExpanded: (params, messageId) =>
    dispatch(fetchServerLogsExpanded(params, messageId)),
  onServerLogsExport: (fileType, query) =>
    dispatch(exportServerLogs(fileType, query)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  fetchExpandedMessage: (messageId, trId) =>
    dispatchProps.fetchServerLogsExpanded(
      {
        ...(omit(stateProps.query, ['error', 'warning', 'debug', 'info']) ||
          {}),
        transId: trId,
      },
      messageId
    ),
});

class AggridContainer extends Component {
  state = {
    userIdSort: null,
    showUserIdMenuIcon: false,
    expandedInfo: undefined,
    shouldScroll: false,
    isDrawerOpen: false,
    query: this.props.query,
    refreshKey: null,
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    const { expandedInfo, transId, query } = props;
    if (!isEqual(expandedInfo, state.expandedInfo)) {
      newState.expandedInfo = expandedInfo;
    }
    if (transId !== state.transId) {
      newState.transId = transId;
    }

    if (!isEqual(query, state.query)) {
      newState.query = query;
      newState.refreshKey = uuid();
    }
    return hasData(newState) ? newState : null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeGrid);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeGrid);
  };

  onChangeUserIdSort = clickEvent => {
    if (
      clickEvent.target.parentElement.className.includes(
        'userIdColumnHeaderRight'
      )
    ) {
      return;
    }
    this.setState(state => {
      let userIdSort;
      if (state.userIdSort === null) {
        userIdSort = 'asc';
      } else if (state.userIdSort === 'asc') {
        userIdSort = 'desc';
      } else {
        userIdSort = null;
      }
      return {
        userIdSort,
      };
    });
  };

  toggleUserIdMenuIcon = e => {
    if (e?.toElement?.className?.includes('ag-tab')) return;
    const { showUserIdMenuIcon } = this.state;
    if (e.type === 'mouseenter' && showUserIdMenuIcon === false)
      this.setState({ showUserIdMenuIcon: true });
    else if (e.type === 'mouseleave' && showUserIdMenuIcon === true)
      this.setState({ showUserIdMenuIcon: false });
  };

  messageRef = el => {
    if (el && this.state.shouldScroll) {
      this.setState({ shouldScroll: false }, () =>
        scrollIntoView(el, {
          align: {
            top: 0,
            left: 0,
          },
          time: 0,
        })
      );
    }
  };

  expandedMessageRef = el => {
    if (el && this.state.isDrawerOpen) {
      scrollIntoView(el, {
        align: {
          top: 0,
          left: 0,
        },
        time: 600,
      });
    }
  };

  handleClick = (msgId, trId) => {
    this.props.fetchExpandedMessage(msgId, trId);
    this.setState({ isDrawerOpen: true });
  };

  onLoadData = (nextPageToken, params) => {
    const { query, fetchLogs } = this.props;
    fetchLogs(query, nextPageToken, params);
  };

  onExport = fileType => {
    const { query } = this.state;
    this.props.onServerLogsExport(fileType, query);
  };

  render() {
    const {
      expandedInfo,
      isDrawerOpen,
      refreshKey,
      userIdSort,
      showUserIdMenuIcon,
    } = this.state;
    return (
      <>
        <AggridPresentational
          {...this.props}
          onClickExpand={this.handleClick}
          onLoadData={this.onLoadData}
          refreshKey={refreshKey}
          onExport={this.onExport}
          userIdSort={userIdSort}
          onChangeUserIdSort={this.onChangeUserIdSort}
          showUserIdMenuIcon={showUserIdMenuIcon}
          toggleUserIdMenuIcon={this.toggleUserIdMenuIcon}
        />
        <ExpandedMessagePanel
          data={expandedInfo.data}
          isOpen={isDrawerOpen}
          isLoading={expandedInfo.isLoading}
          toggleDrawer={() => this.setState({ isDrawerOpen: false })}
          selectedMessageId={expandedInfo.msgId}
          messageRef={this.expandedMessageRef}
        />
      </>
    );
  }
}

AggridContainer.propTypes = {
  query: PropTypes.object,
  onServerLogsExport: PropTypes.func.isRequired,
  fetchLogs: PropTypes.func.isRequired,
  expandedInfo: PropTypes.object.isRequired,
  fetchExpandedMessage: PropTypes.func.isRequired,
  transId: PropTypes.string,
};
AggridContainer.defaultProps = {
  query: {},
  transId: undefined,
};

export default connect(
  stateToProps,
  dispatchToProps,
  AggridContainer,
  mergeProps
);
