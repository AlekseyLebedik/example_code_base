import * as AT from '../actionTypes';
import { reducer } from '../reducer';

const storeDetails = {
  currencies: [
    {
      currencyID: 1,
      currencyCode: 'cod_points',
      paymentProviderCode: null,
    },
    {
      currencyID: 2,
      currencyCode: 'loot_xp',
      paymentProviderCode: null,
    },
  ],
  created: 1607657905,
  items: [
    {
      itemID: 16785001,
      itemType: null,
      isExpirable: false,
      maxUsageTime: null,
      itemSubType: null,
      isConsumable: false,
      maxQuantity: null,
      itemName: 'cc_dec_assassin_01',
    },
  ],
  label: 'my-test-marketplace-store',
  products: [
    {
      grantedMoney: [],
      description: null,
      requiredEntitlements: [],
      grantedItems: [
        {
          overrideRentalDuration: false,
          itemID: 16785001,
          rentalDuration: null,
          overrideUsageDuration: false,
          itemQuantity: 1,
          usageDuration: null,
        },
      ],
      productData: null,
      productName: 'product_cc_dec_assassin_01',
      grantedEntitlements: [
        {
          entitlementID: 16785001,
          entitlementLevel: 0,
        },
      ],
      productID: 16785001,
    },
  ],
  context: 'game_context',
  entitlements: [
    {
      entitlementName: 'itemset_dec_assassin_0',
      entitlementID: 16785001,
    },
    {
      entitlementName: 'itemset_dec_bad_karma_2',
      entitlementID: 16785002,
    },
  ],
  conversionRules: [
    {
      kind: 1,
      requirements: {
        entitlements: [
          {
            entitlementID: 16784001,
            entitlementLevel: 3,
          },
        ],
        items: [],
        currencies: [],
      },
      description: 'Upgrade loft for 100 pigeon points',
      grants: {
        entitlements: [],
        items: [
          {
            rentalDuration: null,
            itemID: 16781010,
            usageDuration: null,
            quantity: 1,
          },
        ],
        currencies: [],
      },
      fees: {
        entitlements: [],
        items: [],
        currencies: [
          {
            currencyID: 3,
            amount: 100,
          },
        ],
      },
      conversionRuleID: '216014d2-33de-4870-b155-70722d1661bb',
      name: 'Upgrade loft',
    },
  ],
  skus: [
    {
      couponEnabled: true,
      skuID: 16785001,
      ignoreRequiredEntitlements: false,
      promotionalText: null,
      rentalDuration: null,
      saleStart: null,
      skuType: 0,
      expiryDate: 1527149866,
      currencyID: 40,
      skuData: null,
      maxQuantity: 1,
      productID: 16785001,
      usageDuration: null,
      price: 275,
      counterName: null,
      saleEnd: null,
    },
  ],
  pawnableItems: [
    {
      itemID: 16785024,
      choiceType: 0,
      ignoreRequiredEntitlements: true,
      productID: 16784061,
    },
  ],
  isActive: true,
};

jest.mock('../components/Tabs/reducer', () => {
  const tabs = { TabOne: {}, TabTwo: {} };
  return {
    INITIAL_STATE: tabs,
    reducer: () => tabs,
  };
});

describe('ActiveStore', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('ACTIVE_STORE_FETCH_SUCCESS', () => {
      it('sets the activeStore', () => {
        const action = {
          type: AT.ACTIVE_STORE_FETCH_SUCCESS,
          activeStore: {
            context: 'title-plaform-type',
            created: '1531162853',
            label: 'progression_store',
          },
          storeDetails,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
