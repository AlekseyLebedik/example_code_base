import React from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';

import { connect } from 'dw/core/helpers/component';
import { changeUser as changeContextUser } from 'dw/online-configuration/components/ContextSelector/actions';
import { userSelector as contextUserSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import PlayerAssetsStatelessComponent from './presentational';
import { tabs, subtabs } from './constants';
import {
  userIdSelector,
  selectedTabSelector,
  selectedSubtabSelector,
  isClanSelector,
} from './selectors';

class PlayerAssets extends React.Component {
  state = { searchInput: '' };

  componentDidMount() {
    const {
      userId,
      match,
      history,
      location,
      contextUser,
      changeContextUser: onChangeContextUser,
      isClan,
    } = this.props;
    if (isClan) return;

    // Update Context Selector userId if not updated
    if (
      onChangeContextUser &&
      match.params.userId &&
      match.params.userId !== contextUser.userId
    ) {
      onChangeContextUser(match.params.userId);
    }

    // Set Inventory as default routes
    let { tab, subtab } = match.params;
    if (!tab) {
      tab = tabs.inventory;
      subtab = userId ? subtabs.items : undefined;
    } else if (!subtab || tab !== tabs.inventory) {
      subtab = userId && tab === tabs.inventory ? subtabs.items : undefined;
    }

    if (tab !== match.params.tab || subtab !== match.params.subtab) {
      const pathname = generatePath(match.path, {
        ...match.params,
        tab,
        subtab,
        userId,
      });
      history.push({ ...location, pathname });
    }
  }

  onFilterTextBoxChanged = value => {
    this.setState({ searchInput: value });
  };

  render() {
    return (
      <PlayerAssetsStatelessComponent
        onSearch={e => this.onFilterTextBoxChanged(e.target.value)}
        searchInput={this.state.searchInput}
        {...this.props}
      />
    );
  }
}

PlayerAssets.propTypes = {
  changeContextUser: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  contextUser: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  isClan: PropTypes.bool.isRequired,
};

PlayerAssets.defaultProps = {
  userId: undefined,
  contextUser: {},
  match: {},
  history: {},
  location: {},
};

const stateToProps = (state, props) => {
  const contextUser = contextUserSelector(state);
  const isClan = isClanSelector(state, props);
  return {
    selectedTab: selectedTabSelector(state, props),
    selectedSubtab: selectedSubtabSelector(state, props),
    userId: !isClan
      ? userIdSelector(state, props) || contextUser.userId
      : userIdSelector(state, props),
    contextUser,
    isClan,
  };
};

const dispatchToProps = {
  changeContextUser,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  onSelectUser: itemSelected => {
    const userId =
      itemSelected && itemSelected.value ? itemSelected.value : itemSelected;
    if (!userId) return;

    dispatchProps.changeContextUser(
      userId && userId.value ? userId.value : userId
    );

    const { match, history, location } = ownProps;
    const pathname = generatePath(match.path, {
      ...match.params,
      tab: stateProps.selectedTab,
      subtab:
        stateProps.selectedTab === subtabs.items
          ? stateProps.selectedSubtab
          : undefined,
      userId,
    });
    history.push({ ...location, pathname });
  },
  onSelectTab: value => {
    const { match, history } = ownProps;
    const path = generatePath(match.path, {
      ...match.params,
      tab: value,
    });
    history.push(path);
  },
});

export default connect(stateToProps, dispatchToProps, PlayerAssets, mergeProps);
