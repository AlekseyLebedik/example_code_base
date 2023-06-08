import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ACCOUNTS_RENAME_PLAYERS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import KeyValue from 'dw/core/components/KeyValue';
import RouteLink from 'dw/online-configuration/components/RouteLink';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import RenamePlayerModal from '../RenamePlayerModal';
import styles from './index.module.css';

const UNO_PROVIDER = 'uno';
const DATE_TIME_FIELDS = { created: 'datetime', updated: 'datetime' };

const LinkedBansComponent = ({ linkedBans }) => {
  // There is no need to display Uno acount itself.
  if (linkedBans.length <= 1) return null;
  const size = 12;
  return (
    <Row>
      <Col span={size} className={styles.linkedBans}>
        Linked Banned Accounts
      </Col>
      <Col span={size} className={styles.bannedLinks}>
        {linkedBans.map(ban => {
          const [provider, accountID] = ban.split('-');
          return (
            provider !== UNO_PROVIDER && (
              <RouteLink
                key={accountID}
                routeName="linked-accounts"
                linkName={`${accountID} [${provider}]`}
                queryParams={{ q: accountID, provider }}
                target="blank"
              />
            )
          );
        })}
      </Col>
    </Row>
  );
};

LinkedBansComponent.propTypes = {
  linkedBans: PropTypes.arrayOf(PropTypes.string),
};
LinkedBansComponent.defaultProps = {
  linkedBans: [],
};

const getAccountsSorted = accounts => {
  const uno = accounts.find(a => a.provider === 'uno');
  return [
    uno,
    ...accounts
      .filter(a => a.provider !== 'uno')
      .sort((a, b) => a.provider.localeCompare(b.provider)),
  ];
};

const Details = ({
  bannedAccounts: { linkedBansID = [], linkedBans = [] },
  selectedItem,
}) => {
  const hasAccountsRenamePermission = useCurrentEnvPermission(
    ACCOUNTS_RENAME_PLAYERS
  );
  if (!selectedItem) return null;
  const { accounts } = selectedItem;

  return (
    <div className={styles.scrollable}>
      <div className={styles.details}>
        {getAccountsSorted(accounts).map(
          account =>
            account && (
              <Card key={account.accountID} className={styles.card}>
                <CardContent>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={styles.cardHeader}
                  >
                    {linkedBansID.includes(account.accountID) ? (
                      <div className={styles.banned}>
                        <span className={styles.provider}>
                          {account.provider}
                        </span>
                        <span className={styles.bannedTxt}>
                          Account is banned
                        </span>
                      </div>
                    ) : (
                      <span className={styles.provider}>
                        {account.provider}
                      </span>
                    )}
                    {hasAccountsRenamePermission &&
                      account.provider &&
                      account.provider.toLowerCase() === UNO_PROVIDER && (
                        <RenamePlayerModal account={account} />
                      )}
                  </Typography>
                  <KeyValue
                    item={Object.entries(account).reduce(
                      (acc, [key, value]) => ({
                        ...acc,
                        [key]: DATE_TIME_FIELDS[key] ? new Date(value) : value,
                      }),
                      {}
                    )}
                    customFormats={DATE_TIME_FIELDS}
                  />
                  {account.provider &&
                    account.provider.toLowerCase() === UNO_PROVIDER && (
                      <LinkedBansComponent linkedBans={linkedBans} />
                    )}
                </CardContent>
              </Card>
            )
        )}
      </div>
    </div>
  );
};

Details.propTypes = {
  bannedAccounts: PropTypes.object,
  selectedItem: PropTypes.object,
};

Details.defaultProps = {
  bannedAccounts: {},
  selectedItem: null,
};

export default Details;
