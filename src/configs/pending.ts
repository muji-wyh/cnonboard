import { vendorMap } from "./venders.ts";
import { pending_u7u9 } from "./pending_u7u9.ts";
import { pending_yiqiyoo } from "./pending_yiqiyoo.ts";
import { pending_7k7k } from "./pending_7k7k.ts";

export const pending = {
  [vendorMap.u7u9.VendorId]: pending_u7u9.split("\n").filter(Boolean),
  [vendorMap.yiqiyoo.VendorId]: pending_yiqiyoo.split("\n").filter(Boolean),
  [vendorMap["7k7k"].VendorId]: pending_7k7k.split("\n").filter(Boolean),
};

const reducer = (acc: any, cur: string) => {
  acc[cur] = cur;
  return acc;
};

export const pendingMap = {
  [vendorMap.u7u9.VendorId]: pending[vendorMap.u7u9.VendorId].reduce(
    reducer,
    {} as { [gameId: string]: string },
  ),
  [vendorMap.yiqiyoo.VendorId]: pending[vendorMap.yiqiyoo.VendorId].reduce(
    reducer,
    {} as { [gameId: string]: string },
  ),
  [vendorMap["7k7k"].VendorId]: pending[vendorMap["7k7k"].VendorId].reduce(
    reducer,
    {} as { [gameId: string]: string },
  ),
};
