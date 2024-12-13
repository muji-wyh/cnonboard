// vendor API 中的 game
export type Game = {
  ExternalId: string; // "10009249";
  Name: string; // "城市极速赛车";
  PlayUrl: string; // "https://www.u7u9.com/flash/playbing/10009249?bing.com";
  Thumbnail: string; // "https://s.u7u9.com/images/b/d/bdc3cd58331de0e919a8fceb1e3b287b.jpg";
  HeroThumbnail: string; // "https://mstatic.u7u9.com/h5game/2/206468/images/intro/game_zu_heng_206468_089738.jpg";
  Genres: string[]; // ["Classics"];
  Version: string; // "1.0.0";
  FullDescription: {
    Headline: string; // "身为赛车手的你正在进行一场比赛，想要成功挑战这个赛道就必须要敏锐的反应，速度加快随时注意路况，现在看看最后的胜者是谁吧。";
    Short: string; // "鼠标触屏操作。";
  };
  MobileFriendly: boolean; // true;
  DeviceOrientation: string[]; // ["Portrait", "Landscape"];
  DefaultRank: number; // 22;
  PublisherId: string; // "u7u9";
  PublisherName: string; // "u7u9.com";
  Tags: string[]; // ["赛车", "男生", "体育", "双人", "城市", "运动", "html5游戏"];
  RelatedGameIds: string[]; // [ "10010025", "10010017" ];

  // added by FE
  VendorId: string;
};

export type MsnGame = {
  cmsBrandId: string; // "";
  created: string; // "2024-09-30T11:17:25.7874998Z";
  // defaultName: string; // "3dm_liezhan";
  defaultRank: number; // 21;
  description: any;
  genres: string[]; // ["Web"];
  heroThumbnailId: string; // "OCGE.3dm_liezhan_v1_hero";
  id: string; // "3dm_liezhan";
  // lastModified: string; // "2024-09-30T11:17:25.7874998Z";
  market: string; // "zh-cn";
  mobileFriendly: boolean;
  name: string; // "烈斩";
  playUrl: string; // "https://yx.shwswl.cn/zt/sqlz/login/";
  publishDate: string; // "2024-09-30T11:17:25.7874998Z";
  publisherId: string; // "game5";
  publisherName: string; // "文枢网络";
  // softLaunched: false;
  tags: string[];
  thumbnailId: string; // "OCGE.3dm_liezhan_v1_main";
  trailers: any[];
};

export type AllMsnGamesByVendor = {
  [vendorId: string]: MsnGame[];
};

export type LandingApi = {
  gamesByGenre: {
    games: MsnGame[];
  }[];

  genres: {
    genre: string;
  }[];
};

// vendor 的游戏 map
export type AllVendorGamesMap = {
  [gameName: string]: Game[];
};

export type AllVendorGamesMapById = {
  [id: string]: Game;
};

export type AllMsnGamesMap = {
  [name: string]: MsnGame[];
};

export type AllMsnGamesMapById = {
  [id: string]: MsnGame;
};

// vendor 的 vendor-游戏 map
export type GamesByVendor = {
  [vendorId: string]: Game[];
};
