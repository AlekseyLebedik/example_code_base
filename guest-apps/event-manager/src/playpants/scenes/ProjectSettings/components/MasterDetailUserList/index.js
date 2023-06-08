import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { fetchAvailableUsers } from 'playpants/scenes/ProjectSettings/actions';

import MasterDetail from 'dw/core/components/MasterDetail';
import Empty from 'dw/core/components/Empty';
import UserList from './components/UserList';

import { usersNextPageSelector, userListFilteredSelector } from './selectors';

import styles from './index.module.css';

export const MasterDetailUserListBase = ({
  classes,
  initialValue,
  nextPage,
  onSearch,
  onShowMore,
  renderDetails,
  userList,
}) => (
  <div className={styles.userBody}>
    <MasterDetail
      classes={{
        drawerPaper: classNames(styles.drawer, classes.masterDetailDrawerPaper),
        expander: classes.masterDetailExpander,
      }}
      master={({ actions, selectedItemId }) => (
        <UserList
          initialValue={initialValue}
          nextPage={nextPage}
          onSearch={onSearch}
          onSelectItem={actions.onSelectItem}
          onShowMore={onShowMore}
          selectedItemId={selectedItemId}
          userList={userList}
        />
      )}
      detail={detailsProps =>
        renderDetails({
          ...detailsProps,
          selectedItem: userList.find(
            user => user.id.toString() === detailsProps.selectedItemId
          ),
        })
      }
      empty={() => <Empty>Select an item to get more details</Empty>}
    />
  </div>
);

MasterDetailUserListBase.propTypes = {
  classes: PropTypes.object,
  initialValue: PropTypes.string,
  nextPage: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
  renderDetails: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MasterDetailUserListBase.defaultProps = {
  classes: {},
  initialValue: '',
  nextPage: null,
};

const stateToProps = state => ({
  nextPage: usersNextPageSelector(state),
  userList: userListFilteredSelector(state),
});

const dispatchToProps = dispatch => ({
  onShowMore: nextPage => dispatch(fetchAvailableUsers({ nextPage })),
  onSearch: payload => dispatch(fetchAvailableUsers({ q: payload.q })),
});

export default connect(stateToProps, dispatchToProps)(MasterDetailUserListBase);
