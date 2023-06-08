import inventorySaga from './PlayerInventory/saga';
import productsSaga from './StoreProducts/saga';
import storeBalancesSaga from './StoreBalances/saga';
import playerBalancesSaga from './PlayerBalances/saga';
import auditLogsSaga from './Audit/saga';

import saga from './saga';

export default [
  inventorySaga,
  productsSaga,
  playerBalancesSaga,
  storeBalancesSaga,
  auditLogsSaga,
  saga,
];
