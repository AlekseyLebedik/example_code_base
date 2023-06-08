export interface Environment {
  id: number;
  contentTypeId: number;
  shortType: string;
  type: string;
  usesABTesting: boolean;
  usesAE: boolean;
  usesAsyncMMP: boolean;
  usesLegacyStore: boolean;
  usesMarketplace: boolean;
  usesObjectStore: boolean;
  options: {
    legacy_storage_enabled: boolean;
    is_multicontext: boolean;
    async_matchmaking_enabled: boolean;
    is_crossplay: boolean;
    content_in_cloud: boolean;
    show_server_list_prod: boolean;
    player_battle_pass_enabled: boolean;
    player_centric_view: boolean;
  };
}

export interface Title {
  id: number;
  platform: string;
  name: string;
  environments: Environment[];
}

export interface Project {
  id: number;
  name: string;
  contentTypeId: number;
  titles: Title[];
}
