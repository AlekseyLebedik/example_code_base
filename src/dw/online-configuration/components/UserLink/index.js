import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { serviceEnabledSelector } from 'dw/core/helpers/title-env-selectors';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { getReactBaseURL } from 'dw/online-configuration/selectors';

const UserLink = ({ userId, userName }) => {
  const accountsUrl = useSelector(state => `${getReactBaseURL(state)}accounts`);
  return <Link to={`${accountsUrl}/${userId}`}>{userName || userId}</Link>;
};

UserLink.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  userName: PropTypes.string,
};

UserLink.defaultProps = {
  userName: null,
};

export default UserLink;

export const LinkedAccountsLink = ({ provider, userId, userName }) => {
  const linkedAccountsEnabled = useSelector(state =>
    serviceEnabledSelector(state)(SERVICE_NAMES.ACCOUNTS_MANAGEMENT)
  );
  const accountsUrl = useSelector(
    state => `${getReactBaseURL(state)}linked-accounts`
  );
  if (!linkedAccountsEnabled) return <UserLink userId={userId} />;
  return (
    <Link to={`${accountsUrl}/?provider=${provider}&q=${userId}`}>
      {userName || userId}
    </Link>
  );
};

LinkedAccountsLink.propTypes = {
  provider: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  userName: PropTypes.string,
};

LinkedAccountsLink.defaultProps = {
  provider: 'uno',
  userName: null,
};
