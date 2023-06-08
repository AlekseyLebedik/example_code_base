import range from 'lodash/range';
import random from 'lodash/random';

const data = {
  data: [
    { currencyId: 20, code: 'CoD Points', value: '0000000' },
    { currencyId: 21, code: 'Nebullum Plasma', value: '0000000' },
    { currencyId: 249, code: 'Contract Unlock', value: '0000000' },
    { currencyId: 250, code: 'Season Pass NP Token', value: '0000000' },
    { currencyId: 252, code: 'Season Pass CP Token', value: '0000000' },
    { currencyId: 253, code: 'Token for DOTD', value: '0000000' },
  ],
  nextPageToken: 'CAE',
  context: 'game_context',
};

export const getPlayerBalances = () =>
  new Promise(resolve => setTimeout(() => resolve({ data }), 2000));

const createNewItem = () => ({
  itemID: random(10000000, 16781012),
  lastUpdate: 1550666559272,
  usageExpiry: 1550666559272,
  isRental: true,
  expiry: 1550666559272,
  collisionField: 0,
  xp: 0,
  data: '',
  quantity: random(1, 4),
});

const inventoryList = range(5000).map(() => createNewItem());

const dataInventory = {
  data: inventoryList,
  nextPageToken: 'CAE',
  context: 'game_context',
};

export const getPlayerItems = () =>
  new Promise(resolve => {
    setTimeout(() => resolve({ data: dataInventory }), 1000);
  });

const getNewError = errorMessage => {
  const newError = new Error('Error happen when calling API');
  newError.response = {
    data: {
      error: {
        name: 'Error:ClientError:MockedAPIError',
        msg: errorMessage,
      },
    },
  };
  return newError;
};

export const getPlayerItemsFail = () =>
  new Promise((_, reject) => {
    setTimeout(
      () =>
        reject(
          getNewError(
            'Mocked error calling API: No linked account for platform xbl'
          )
        ),
      1000
    );
  });

export const getPlayerItemsFailOther = () =>
  new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(
          getNewError(
            'Mocked error calling API: This mocked error should appear in the screen.'
          )
        ),
      1000
    )
  );

const inventoryTransaction = {
  transactionTimestamp: 123456,
  updatedBalances: [
    {
      lastUpdate: 123455,
      context: 'game_context',
      currencyID: 255,
      userID: 1234,
      collisionField: 1,
      accountType: 'psn',
      signedBalance: 1,
      balance: 1,
    },
  ],
  transactionID: '12345',
  updatedInventoryItems: [],
  updatedEntitlements: [],
};

const dataInventoryChanges = {
  data: inventoryTransaction,
  context: 'game_context',
};

export const postPlayerAssetChanges = () =>
  new Promise(resolve =>
    setTimeout(() => resolve({ data: dataInventoryChanges }), 1000)
  );

const itemsList = inventoryList.map((x, index) => ({
  itemID: x.itemID,
  itemType: random(1, 15).toString(),
  isExpirable: false,
  maxUsageTime: null,
  itemSubType: random(1, 10).toString(),
  isConsumable: false,
  maxQuantity: random(2, 20),
  itemName: `cc_dec_item_${index}`,
}));

const createNewItemProduct = () => ({
  itemID: random(10000000, 16781012),
  overrideRentalDuration: false,
  rentalDuration: null,
  itemQuantity: random(1, 5),
});

const createNewProduct = () => ({
  grantedMoney: [],
  productName: `product_fk_j_${random(20000000, 26781012)}`,
  description: null,
  productData: null,
  requiredEntitlements: [],
  productID: random(20000000, 26781012),
  grantedEntitlements: [],
  grantedItems: range(random(1, 50)).map(() => createNewItemProduct()),
});

const productList = range(4000).map(() => createNewProduct());

const products = {
  data: productList,
  nextPageToken: 'CAE',
  context: 'game_context',
};

const storeItems = {
  data: itemsList,
  nextPageToken: 'CAE',
  context: 'game_context',
};

export const getProducts = () =>
  new Promise(resolve => setTimeout(() => resolve({ data: products }), 2000));

export const getItems = () =>
  new Promise(resolve => setTimeout(() => resolve({ data: storeItems }), 2000));

const storeInfo = { created: 1551456048, context: '5682', label: 'dev-store' };

export const getActiveStore = () =>
  new Promise(resolve => setTimeout(() => resolve({ data: storeInfo }), 2000));

const storeDetails = {
  items: itemsList,
};
export const getStoreDetail = () =>
  new Promise(resolve =>
    setTimeout(() => resolve({ data: storeDetails }), 2000)
  );
