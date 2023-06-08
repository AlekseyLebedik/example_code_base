/**
 * This file let you override dynamically some app configuration.
 * If you don't need to override some configuration, just let it empty.
 *
 * Example:
 * window.APP_CONFIG_API_HOST = 'https://api-prod.example.com';
 */

window.APP_CONFIG_FEATURE_FLAGS = {
  OPS4_SPECIFIC_FEATURES_ENABLED: {
    type: 'project',
    value: [1],
  },
  GAMEMODES_CHART_ENABLED: {
    type: 'project',
    value: [2],
  },
  PUBLISHER_OBJECTS_PARTIAL_SEARCH: {
    type: 'title',
    value: [3, 5681],
  },
  USE_COREVIZ_CHARTS: {
    type: 'project',
    // value: [1165], T9 on PROD
    value: [1, 1015], // T9 on QA
  },
};

window.APP_CONFIG_CONFIG_OPTIONS = {
  MATCHMAKING_MATCH_CONFIG: [
    {
      type: 'title',
      entityIds: [1, 5800, 5816],
      value: {
        title: 'mw',
        game_modes: 'mp,blackout',
      },
    },
    {
      type: 'title',
      entityIds: [5836],
      value: {
        title: 'cw',
        game_modes: 'mp',
      },
    },
  ],
  MARKETPLACE_ITEM_TYPE: [
    {
      type: 'title',
      entityIds: [1],
      value: {
        0: 'dev items',
        1: 'weapon',
        2: 'perk',
        3: 'equipment',
        4: 'killstreak',
        5: 'role',
        6: 'operator',
        7: 'operator_skin',
        8: 'accessory',
        9: 'attachment',
        10: 'playercards',
        11: 'emblems',
        12: 'camo',
        13: 'reticle',
        14: 'weapon_charm',
        15: 'sticker',
        16: 'gestures',
        17: 'super',
        19: 'executions',
        20: 'intro',
        22: 'sprays',
        23: 'feature',
        25: 'consumable',
        26: 'operator_quip',
        27: 'bundle',
        28: 'battlepass',
        29: 'special',
        30: 'vehicle_camo',
        32: 'playercardtitles',
        33: 'playercardframes',
        34: 'MVPHighlight',
        35: 'PlayOfMatchIntro',
        99: 'default/everythingelse',
      },
    },
  ],
  GVS_PLATFORMS: [
    {
      type: 'project',
      entityIds: [6, 1015],
      value: ['ps4', 'ps5', 'xb1', 'xbsx', 'bnet'],
    },
  ],
};

// window.EMBEDDED_COREVIZ_CHART_IDS = ['392', '1328', '1204', '1369'];  // Should be enabled on PROD
window.EMBEDDED_COREVIZ_CHART_IDS = ['282']; // QA charts
