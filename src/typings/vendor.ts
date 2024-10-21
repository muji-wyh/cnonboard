export type VendorIds =
  | "360"
  | "3dm"
  | "7k7k"
  | "u7u9"
  | "yiqiyoo"
  | "yiqiyoo2";

export type VendorMap = {
  [vendorId in VendorIds]: Vendor;
};

export type Vendor = {
  VendorId: string; // "360",
  IsVendorDomainRequired: boolean; // false,
  Api: string; // "https://fun.360.cn/micro/api/game/list",
  Market: string; // "zh-cn",
  GameIdPrefix: string; // "360_",
};
