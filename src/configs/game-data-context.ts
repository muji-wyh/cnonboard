import { createContext } from "react";
import type { GameDataContext as GameDataContextType } from "../typings/game-data-context.ts";

export const defaultGameDataContextValue = (): GameDataContextType => ({
  allGames: {},
  gamesByVendor: {},
  msnGames: {
    gamesByGenre: [
      {
        games: [],
      },
    ],
  },
  allMsnGames: [],
  allMsnGamesByVendor: {},
});

export const GameDataContext = createContext(defaultGameDataContextValue());
