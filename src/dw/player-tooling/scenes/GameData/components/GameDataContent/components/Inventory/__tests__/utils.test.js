import { formatRecentInventoryData, formatTitleInventoryData } from '../utils';

const recentData = {
  currencies: [
    {
      amount: 1300,
      name: 'CoD Points',
      titleId: 5830,
      updated: 1618973810,
    },
  ],
  items: [
    {
      name: 'CurrencyPack200',
      quantity: 1,
      titleId: 5827,
      updated: 1618224049,
    },
    {
      name: 'ui_icon_callingcards_league_rank_20',
      quantity: 1,
      titleId: 5830,
      updated: 1618224049,
    },
    {
      name: 'ui_icon_callingcards_league_rank_30',
      quantity: 1,
      titleId: 5827,
      updated: 1618000000,
    },
  ],
};

const titleData = [
  {
    titleId: 5830,
    currencies: [
      {
        amount: 1300,
        name: 'CoD Points',
        titleId: 5830,
        updated: 1614176413,
      },
    ],
    items: [
      {
        name: 'CurrencyPack200',
        quantity: 1,
        titleId: 5830,
        updated: 1618224049,
      },
    ],
  },
  {
    titleId: 5827,
    currencies: [],
    items: [
      {
        name: 'ui_icon_callingcards_league_rank_10',
        quantity: 1,
        titleId: 5827,
        updated: 1618224049,
      },
      {
        name: 'ui_icon_callingcards_league_rank_25',
        quantity: 1,
        titleId: 5827,
        updated: 1618224049,
      },
    ],
  },
];

describe('PlayerView Iventory', () => {
  describe('formatRecentInventoryData', () => {
    const result = formatRecentInventoryData(recentData);
    it('returns correct values for 5827', () => {
      expect(result.get(5827)).toEqual([
        {
          name: 'CurrencyPack200',
          quantity: 1,
          updated: 1618224049,
        },
      ]);
    });
    it('returns correct values for 5830', () => {
      expect(result.get(5830)).toEqual([
        {
          amount: 1300,
          name: 'CoD Points',
          updated: 1618973810,
        },
        {
          name: 'ui_icon_callingcards_league_rank_20',
          quantity: 1,
          updated: 1618224049,
        },
      ]);
    });
    it('returns only 3 items', () => {
      expect(result.get(5827).length + result.get(5830).length).toEqual(3);
    });
  });
  describe('formatTitleInventoryData', () => {
    const result = formatTitleInventoryData(titleData);
    it('returns no currencies for 5827', () => {
      expect(result.get(5827).currencies).toEqual([]);
    });
    it('returns correct currencies for 5830', () => {
      expect(result.get(5830).currencies).toEqual([
        {
          amount: 1300,
          name: 'CoD Points',
          titleId: 5830,
          updated: 1614176413,
        },
      ]);
    });
    it('returns correct items for 5827', () => {
      expect(result.get(5827).items).toEqual([
        {
          name: 'ui_icon_callingcards_league_rank_10',
          quantity: 1,
          titleId: 5827,
          updated: 1618224049,
        },
        {
          name: 'ui_icon_callingcards_league_rank_25',
          quantity: 1,
          titleId: 5827,
          updated: 1618224049,
        },
      ]);
    });
    it('returns correct item for 5830', () => {
      expect(result.get(5830).items).toEqual([
        {
          name: 'CurrencyPack200',
          quantity: 1,
          titleId: 5830,
          updated: 1618224049,
        },
      ]);
    });
  });
});
