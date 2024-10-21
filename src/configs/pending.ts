import { vendorMap } from "./venders.ts";
import { pending_u7u9 } from "./pending_u7u9.ts";

export const pending = {
  [vendorMap.u7u9.VendorId]: pending_u7u9.split("\n").filter(Boolean),
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
};
