import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SectionTitle from 'dw/core/components/SectionTitle';
import Tabs from './components/Tabs';

import styles from './index.module.css';

function AccountDetailsStateless(props) {
  const { selectedAccount, usesObjectStore, titleId, envType } = props;
  // Block rendering until userDetail are fetched (initial loading only)
  if (!selectedAccount) return null;

  const userFilesUrl = usesObjectStore
    ? `/online-configuration/${titleId}/${envType}/object-store/user/${selectedAccount.userID}/`
    : `/online-configuration/${titleId}/${envType}/storage/user-context-storage/${selectedAccount.userID}/`;

  const userFilesLink = (
    <Link className={styles.userFiles} to={userFilesUrl}>
      User Files
    </Link>
  );

  return (
    <div className="details__container account flex-rows-container">
      <SectionTitle small extraContent={<div />} />
      <Tabs tabBarExtraContent={userFilesLink} />
    </div>
  );
}

AccountDetailsStateless.propTypes = {
  selectedAccount: PropTypes.shape({
    userID: PropTypes.string.isRequired,
    userName: PropTypes.string,
  }),
  usesObjectStore: PropTypes.bool.isRequired,
  titleId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  envType: PropTypes.string,
};

AccountDetailsStateless.defaultProps = {
  selectedAccount: null,
  titleId: undefined,
  envType: undefined,
};

export default AccountDetailsStateless;
