import { createContext } from "react";
import type { storeContext as GameDataContextType } from "../typings/store-context.ts";
import { pending, pendingMap } from "./pending.ts";

export const storeContextValue = (): GameDataContextType => ({
  allVendorGamesMap: {},
  allVendorGamesMapById: {},
  gamesByVendor: {},
  allMsnGames: [],
  allMsnGamesMap: {},
  allMsnGamesMapById: {},
  allMsnGamesByVendor: {},
  isStaging: false,
  pending,
  pendingMap,
});

export const StoreContext = createContext(storeContextValue());
