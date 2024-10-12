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

export type Vendor = {
  VendorId: string; // "360",
  IsVendorDomainRequired: boolean; // false,
  Api: string; // "https://fun.360.cn/micro/api/game/list",
  Market: string; // "zh-cn",
  GameIdPrefix: string; // "360_",
};

const v_360 = {
  VendorId: "360",
  IsVendorDomainRequired: false,
  Api: "https://fun.360.cn/micro/api/game/list",
  Market: "zh-cn",
  GameIdPrefix: "360_",
};

const v_3dm = {
  VendorId: "3dm",
  IsVendorDomainRequired: true,
  VendorDomain: "msn.shwswl.cn",
  Api: "https://yx.shwswl.cn/api/exportjson",
  Market: "zh-cn",
  GameIdPrefix: "3dm_",
};

const v_7k7k = {
  VendorId: "7k7k",
  IsVendorDomainRequired: true,
  VendorDomain: "msn.7k7k.com",
  Api: "https://msn.7k7k.com/msngame.json",
  Market: "zh-cn",
  GameIdPrefix: "7k7k_",
};

const v_u7u9 = {
  VendorId: "u7u9",
  IsVendorDomainRequired: true,
  VendorDomain: "msn.u7u9.com",
  Api: "https://msn.u7u9.com/json/gameinfo.json",
  Market: "zh-cn",
  GameIdPrefix: "u7u9_",
};

const v_yiqiyoo = {
  VendorId: "yiqiyoo",
  IsVendorDomainRequired: true,
  VendorDomain: "msn.17yoo.cn",
  Api: "https://ge.yiqiyoo.com/game/v1/msn/game",
  Market: "zh-cn",
  GameIdPrefix: "yiqiyoo_",
};

const v_yiqiyoo2 = {
  VendorId: "yiqiyoo2",
  IsVendorDomainRequired: true,
  VendorDomain: "ms.17yoo.cn",
  Api: "https://ge.yiqiyoo.com/game/v1/msn/game?pid=PIDMT6PHNoet",
  Market: "zh-cn",
  GameIdPrefix: "yiqiyoo2_",
};

export const vendors: Vendor[] = [
  v_360,
  v_3dm,
  v_7k7k,
  // v_u7u9,
  v_yiqiyoo,
  v_yiqiyoo2,
].map((d) => ({
  ...d,
  games: [] as Game[],
}));
