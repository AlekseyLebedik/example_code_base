import { useSelector } from 'react-redux';
import { VIEW_UNO_ACCOUNT_PII_DETAILS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { isHijackedSelector } from '@demonware/devzone-core/modules/user/selectors';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';

export const useHasPIIPermissionCheck = () => {
  const [, , result] = usePermissions(
    VIEW_UNO_ACCOUNT_PII_DETAILS,
    'company.all'
  );
  const hasPIIPermission = result?.data?.permission ?? false;
  const isHijacked = useSelector(isHijackedSelector);
  const hasPIIFlagEnabled = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)([fs.SHOW_PLAYER_UNO_PII], false)
  );
  return hasPIIPermission && hasPIIFlagEnabled && !isHijacked;
};
