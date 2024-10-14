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
});

export const GameDataContext = createContext(defaultGameDataContextValue());
