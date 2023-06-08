import { sagas as groupMembersSagas } from './GroupMembers/sagas';
import { sagas as variablesSetsSagas } from './VariablesSets/sagas';

export const sagas = [...groupMembersSagas, ...variablesSetsSagas];
