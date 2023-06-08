import { sagas as contentServerSagas } from './ContentServer/sagas';
import { sagas as publisherStorageSagas } from './PublisherStorage/sagas';
import { sagas as publisherVariablesSagas } from './PublisherVariables/sagas';
import { sagas as userContextStorageSagas } from './UserContextStorage/sagas';

export default [
  ...contentServerSagas,
  ...publisherStorageSagas,
  ...publisherVariablesSagas,
  ...userContextStorageSagas,
];
