import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import Typography from '@material-ui/core/Typography';

import Empty from 'dw/core/components/Empty';
import Loading from 'dw/core/components/Loading';

import { VIEW_ACCOUNTS_DASHBOARD } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import FeatureSwitchesCheck from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';

import CCPAInfoComponent from './components/CCPAInfoComponent';
import KpiInfoComponent from './components/KpiInfo';
import KpiPerAgeGroup from './components/KpiPerAgeGroup';
import PrivacyKpiComponent from './components/PrivacyKpiComponent';
import * as actions from './actions';
import { getLatestUpToDateMsg, transformPrivKpiData } from './helpers';

import styles from './index.module.css';

const AccountsDashboard = () => {
  const dispatch = useDispatch();

  const [, , result] = usePermissions(VIEW_ACCOUNTS_DASHBOARD, 'company.all');
  const hasUnoAccountsPermission = result?.data?.permission ?? false;

  const kpis = useSelector(state => state.Scenes.AccountsDashboard.kpis.kpis);
  const kpiData = useSelector(
    state => state.Scenes.AccountsDashboard.kpis.kpiData
  );
  const loadingKpis = useSelector(
    state => state.Scenes.AccountsDashboard.kpis.loadingKpis
  );
  const privacyKpis = useSelector(
    state => state.Scenes.AccountsDashboard.privacyKpis.data
  );
  const privacyKpisTotals = useSelector(
    state => state.Scenes.AccountsDashboard.privacyKpisTotals.data
  );
  const privacyKpisPerCountry = useSelector(
    state => state.Scenes.AccountsDashboard.privacyKpisPerCountry.data
  );

  const transformedPrivKpiData = transformPrivKpiData(privacyKpis);
  const transformedPrivKpiTotalsData = transformPrivKpiData(privacyKpisTotals);
  const transformedPrivKpiPerCountryData = transformPrivKpiData(
    privacyKpisPerCountry
  );
  const getDetails = useCallback(
    name => kpiData.find(item => item.name === name),
    [kpiData]
  );

  useEffect(() => {
    dispatch(actions.fetchKPIs());
    dispatch(actions.fetchPrivacyKPIs());
    dispatch(actions.fetchPrivacyKPIsTotals());
    dispatch(actions.fetchPrivacyKPIsPerCountry());
  }, [dispatch]);

  if (!hasUnoAccountsPermission)
    return (
      <Empty>You don&apos;t have permissions to view this information.</Empty>
    );

  if (loadingKpis)
    return (
      <div className={styles.loadingAccountsDashboard}>
        <Loading />
      </div>
    );
  if (kpiData.length === 0) return <Empty>No data to display</Empty>;

  return (
    <FeatureSwitchesCheck
      featureSwitches={[fs.PLAYER_ACCOUNTS_DASHBOARD]}
      isStaffAllowed={false}
    >
      <div className={styles.accountsDashboardContainer}>
        <Typography
          className={styles.accountsDashboardHeader}
          color="primary"
          component="h6"
          variant="h6"
        >
          Accounts Dashboard: {getLatestUpToDateMsg(kpiData)} from Demonware
          Accounts Services
        </Typography>
        <Typography
          className={styles.accountsDashboardHeader}
          color="primary"
          component="h6"
          variant="h6"
        >
          UNO / ACTIVISION ACCOUNTS
        </Typography>
        <div className={styles.accountsDashboardTablesContainer}>
          <div className={styles.unoActivisionaccounts}>
            <div className="flex flex-col">
              <div className={styles.unoActivisionTotalAccounts}>
                <KpiInfoComponent
                  autogenAcctsExcluded
                  calculateTotal
                  key="total_uno_accounts"
                  kpis={kpis}
                  kpiDetails={getDetails('total_uno_accounts')}
                  overrideTableStyle={styles.totalAccountsOverrideStyle}
                />
                <KpiInfoComponent
                  calculateTotal
                  key="total_verified_emails"
                  kpis={kpis}
                  kpiDetails={getDetails('total_verified_emails')}
                  overrideTableStyle={styles.totalAccountsOverrideStyle}
                />
              </div>
              <div className={styles.unoActivisionaccountspercountryandage}>
                <KpiPerAgeGroup
                  getDetails={getDetails}
                  itemsToDisplay={2}
                  key="total_uno_accounts_per_country"
                  kpis={kpis}
                  kpiDetails={getDetails('total_uno_accounts_per_country')}
                />
              </div>
            </div>
          </div>
          <div className={styles.emailsregisteredLinked}>
            <div className="flex flex-col">
              <KpiInfoComponent
                calculateTotal
                key="total_tfa_enrolls"
                kpis={kpis}
                kpiDetails={getDetails('total_tfa_enrolls')}
              />

              <KpiInfoComponent
                autogenAcctsExcluded
                calculateTotal
                key="total_linked_first_party_accounts_per_account_type"
                kpis={kpis}
                kpiDetails={getDetails(
                  'total_linked_first_party_accounts_per_account_type'
                )}
              />
            </div>
          </div>
        </div>
        <div className={styles.ccpaPrivacyContainer}>
          <div>
            <Typography
              className={styles.accountsDashboardHeader}
              color="primary"
              component="h6"
              variant="h6"
            >
              CCPA
            </Typography>
            <div className={styles.accountsDashboardTablesContainer}>
              <div className={styles.ccpaUniquetotalsTotalinteractions}>
                <div className={styles.lifetimeUnique}>
                  <CCPAInfoComponent
                    getDetails={getDetails}
                    kpis={kpis}
                    ok="ccpa_total_ok_to_sell"
                    notOk="ccpa_total_not_ok_to_sell"
                    name="ccpa_total"
                    key="ccpa_total"
                    overrideTableStyle={styles.lifetimeUniqueTableStyle}
                  />
                </div>
                <div>
                  <CCPAInfoComponent
                    getDetails={getDetails}
                    ok="ccpa_player_actions_ok_to_sell_by_title"
                    notOk="ccpa_player_actions_not_ok_to_sell_by_title"
                    name="ccpa_interactions_by_title"
                    key="ccpa_interactions_by_title"
                    overrideTableStyle={styles.interactionsByTitleTableStyle}
                    showDataModalOnly
                  />
                </div>
              </div>
              <div className={styles.ccpaUniquetotalsTotalinteractions}>
                <div className={styles.ccpaUniquetotals}>
                  <CCPAInfoComponent
                    getDetails={getDetails}
                    ok="ccpa_unique_player_actions_ok_to_sell"
                    notOk="ccpa_unique_player_actions_not_ok_to_sell"
                    underAge="ccpa_unique_player_actions_not_ok_to_sell_under_age"
                    name="ccpa_uniq"
                    key="ccpa_uniq"
                    rolloverText="Based on each player's last interaction with the system during this time period"
                  />
                </div>
                <div className={styles.ccpaTotalinteractions}>
                  <CCPAInfoComponent
                    getDetails={getDetails}
                    ok="ccpa_player_actions_ok_to_sell"
                    notOk="ccpa_player_actions_not_ok_to_sell"
                    underAge="ccpa_player_actions_not_ok_to_sell_under_age"
                    name="ccpa_interactions"
                    key="ccpa_interactions"
                    rolloverText="These figures include all player interactions"
                  />
                </div>
              </div>
            </div>
          </div>
          {!isEmpty(transformedPrivKpiData) && (
            <div>
              <Typography
                className={styles.accountsDashboardHeader}
                color="primary"
                component="h6"
                variant="h6"
              >
                PRIVACY REQUEST STATISTICS
              </Typography>
              <div className={styles.privacyTablesContainer}>
                <PrivacyKpiComponent
                  getDetails={getDetails}
                  name="privacy_kpi_total_requests"
                  key="privacy_kpi_total_requests"
                  privacyKpis={transformedPrivKpiData}
                  privacyKpisData={transformedPrivKpiPerCountryData}
                  privacyKpisTotals={transformedPrivKpiTotalsData}
                />
                <div className={styles.deletesExportsContainer}>
                  <PrivacyKpiComponent
                    getDetails={getDetails}
                    name="privacy_kpi_delete_requests"
                    key="privacy_kpi_delete_requests"
                    privacyKpis={transformedPrivKpiData}
                    privacyKpisTotals={transformedPrivKpiTotalsData}
                  />
                  <PrivacyKpiComponent
                    getDetails={getDetails}
                    name="privacy_kpi_export_requests"
                    key="privacy_kpi_export_requests"
                    privacyKpis={transformedPrivKpiData}
                    privacyKpisTotals={transformedPrivKpiTotalsData}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FeatureSwitchesCheck>
  );
};

export default AccountsDashboard;
