import {
  AllVendorGamesMap,
  AllMsnGamesByVendor,
  GamesByVendor,
  LandingApi,
  MsnGame,
  AllMsnGamesMap,
} from "./game.ts";

export type storeContext = {
  allVendorGamesMap: AllVendorGamesMap;
  gamesByVendor: GamesByVendor;
  msnGames: LandingApi;
  allMsnGames: MsnGame[];
  allMsnGamesMap: AllMsnGamesMap;
  allMsnGamesByVendor: AllMsnGamesByVendor;
  isStaging: boolean;
};
