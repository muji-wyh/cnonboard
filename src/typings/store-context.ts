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
  pending: {
    [vendorId: string]: string[];
  };
  pendingMap: {
    [vendorId: string]: {
      [gameId: string]: string;
    };
  };
  isStaging: boolean;
};
