import type { AllGames, GamesByVendor, LandingApi } from "./game.ts";

export type GameDataContext = {
  allGames: AllGames;
  gamesByVendor: GamesByVendor;
  msnGames: LandingApi;
};
