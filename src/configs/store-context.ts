import { createContext } from "react";
import type { storeContext as GameDataContextType } from "../typings/store-context.ts";

export const storeContextValue = (): GameDataContextType => ({
  allVendorGamesMap: {},
  gamesByVendor: {},
  msnGames: {
    gamesByGenre: [
      {
        games: [],
      },
    ],
  },
  allMsnGames: [],
  allMsnGamesMap: {},
  allMsnGamesByVendor: {},
  isStaging: false,
});

export const StoreContext = createContext(storeContextValue());
