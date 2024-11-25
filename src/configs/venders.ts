import { Vendor, VendorIds, VendorMap } from "../typings/vendor.ts";
import { Game } from "../typings/game.ts";

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

const v_yiqiyoo3 = {
  VendorId: "yiqiyoo3",
  IsVendorDomainRequired: true,
  VendorDomain: "msn.17yoo.cn",
  Api: "",
  Market: "zh-cn",
  GameIdPrefix: "yiqiyoo3_",
};

export const vendors: Vendor[] = [
  v_360,
  v_3dm,
  v_7k7k,
  v_u7u9,
  v_yiqiyoo,
  v_yiqiyoo2,
  v_yiqiyoo3,
].map((d) => ({
  ...d,
  games: [] as Game[],
}));

export const vendorMap = vendors.reduce((acc, cur) => {
  acc[cur.VendorId as VendorIds] = cur;
  return acc;
}, {} as VendorMap);
