declare module 'dw/config';
declare module 'dw/core/*';
declare module '*.module.css';
declare module '@demonware/*';

declare module '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors' {
  import { RootState } from 'playpants/types/store';

  type Arguments = { featureSwitches: string; isStaffAllowed: boolean };
  function makeHasFeaturesEnabledSelector(): (
    state: RootState,
    arguments: Arguments
  ) => boolean;
}

declare module '@demonware/devzone-core/helpers/sagas' {
  function getSaga(
    actionPrefix: string,
    apiCallFn: (params: never) => void,
    dataOrigin?: string,
    fetchSuccess?: (params: never) => void,
    fetchAllFn?: (params: never) => void,
    fetchFailed?: (params: never) => void
  ): (params: never) => void;
}

declare module '@demonware/devzone-core/helpers/actions' {
  import { Action } from 'redux';

  function updateSuccess(
    actionPrefix: string,
    data?: never,
    append?: boolean
  ): { type: string; data: never; append: boolean };

  function updateFailed(actionPrefix: string, error: string): Action;
}
