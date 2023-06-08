import { usePermissions } from '@demonware/devzone-core/access/CheckPermissions';
import {
  CLANS_ADD_CLAN,
  CLANS_DISBAND_CLAN,
  CLANS_EDIT_CLAN,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';

export const useClansPermissions = () => {
  const predicates = [CLANS_ADD_CLAN, CLANS_EDIT_CLAN, CLANS_DISBAND_CLAN];
  const [, , result] = usePermissions(predicates, 'company.all');
  return {
    canCreateClans: result?.data?.[CLANS_ADD_CLAN] ?? false,
    canEditClans: result?.data?.[CLANS_EDIT_CLAN] ?? false,
    canDisbandClans: result?.data?.[CLANS_DISBAND_CLAN] ?? false,
  };
};
