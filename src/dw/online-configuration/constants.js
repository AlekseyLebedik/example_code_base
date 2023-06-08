export const ERROR_MSG = 'Something went wrong, see logs for details.';

export const Services = {
  ObjectStore: 'ObjectStore',
  Groups: 'Groups',
  AE: 'AchievementsEngine',
  Marketplace: 'Marketplace',
  ExchangeMarketplace: 'ExchangeMarketplace',
  DWPushService: 'DWPushService',
  DDLTranslation: 'DDLTranslation',
};

export const ServiceKeyMapping = Object.entries(Services).reduce(
  (acc, [key, service]) => ({
    ...acc,
    [service]: key,
  }),
  {}
);

export const ServiceEndpoints = {
  ObjectStore: {
    // Publisher Objects
    getPublisherObjects: 'get_publisher_objects',
    getPublisherObjectDetails: 'get_publisher_object_details',
    getPublisherObjectsCategories: 'get_publisher_objects_categories',
    deletePublisherObject: 'delete_publisher_object',
    createPublisherObject: 'create_publisher_object',
    createPublisherObjectsCategory: 'create_publisher_objects_category',
    propagatePublisherObject: 'propagate_publisher_objects',
    // User Objects
    getUserObjects: 'get_user_objects',
    getUserObjectDetails: 'get_user_object_details',
    deleteUserObject: 'delete_user_object',
    createUserObject: 'create_user_object',
    restoreUserObjectBackup: 'restore_user_object_backup',
    // Pooled Objects
    getPooledObjects: 'get_pooled_user_objects',
    deletePooledObject: 'delete_pooled_user_object',
  },
  DDLTranslation: {
    ddlToJson: 'objectstore_ddltojson',
  },
  Groups: {
    getGroups: 'get_groups',
    getGroup: 'get_group',
    createGroup: 'create_group',
    deleteGroup: 'delete_group',
    addMembersToGroup: 'add_members_to_group',
    removeMembersFromGroup: 'remove_members_from_group',
    replaceMembers: 'replace_members',
  },
  AE: {
    getRulesets: 'get_rulesets',
    getActiveRulesets: 'get_achievements',
    getUserAchievements: 'get_user_achievements',
    getClanAchievements: 'get_clan_achievements',
    deleteUserAchievements: 'delete_user_achievements',
    deleteClanAchievements: 'delete_clan_achievements',
    getRulesetsDetail: 'get_rulesets_detail',
    putRulesetsDetail: 'put_rulesets_detail',
    deleteRuleset: 'delete_ruleset',
    checkRuleset: 'ruleset_checks',
    getUserState: 'get_user_state',
    getClanState: 'get_clan_state',
    putUserState: 'put_user_state',
    putClanState: 'put_clan_state',
    postUserEvent: 'post_user_event',
    postClanEvent: 'post_clan_event',
    cloneUserAchievements: 'clone_user_achievements',
    backupUserInventory: 'user_achievements_backup',
    restoreUserInventory: 'restore_user_inventory',
  },
  Marketplace: {
    getDefaultStore: 'get_default_store',
    getLabelledStore: 'get_labelled_store',
    putDefaultStore: 'put_default_store',
    getStores: 'get_stores',
    createStore: 'create_store',
    deleteStore: 'delete_store',
    getStore: 'get_store',
    getPlayerBalances: 'get_player_balances',
    getClanBalances: 'get_clan_balances',
    getPlayerItems: 'get_player_items',
    getClanItems: 'get_clan_items',
    postPlayerProduct: 'post_player_product',
    postClanProduct: 'post_clan_product',
    postPlayerAssetChanges: 'post_player_asset_changes',
    postClanAssetChanges: 'post_clan_asset_changes',
    getPlayerAuditLogs: 'get_player_audit_logs',
    resetPlayerInventory: 'reset_player_inventory',
    inventoryBulkUpdate: 'inventory_bulk_update',
    clonePlayerInventory: 'clone_player_inventory',
    backupPlayerInventory: 'player_inventory_backup',
    restorePlayerInventory: 'restore_player_inventory',
  },
  ExchangeMarketplace: {
    getExchangeItems: 'get_exchange_items',
    getExchangeItem: 'get_exchange_item',
  },
  DWPushService: {
    postRemoteCall: 'post_remote_call',
  },
};
