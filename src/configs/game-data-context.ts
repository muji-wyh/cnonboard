import { createContext } from "react";
import type { GameDataContext as GameDataContextType } from "../typings/game-data-context.ts";

export const defaultGameDataContextValue = (): GameDataContextType => ({
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
});

export const GameDataContext = createContext(defaultGameDataContextValue());