import {
  AllVendorGamesMap,
  AllMsnGamesByVendor,
  GamesByVendor,
  LandingApi,
  MsnGame,
  AllMsnGamesMap,
  AllVendorGamesMapById,
  AllMsnGamesMapById,
} from "./game.ts";

export type storeContext = {
  gamesByVendor: GamesByVendor;
  allVendorGamesMap: AllVendorGamesMap; // by name
  allVendorGamesMapById: AllVendorGamesMapById;

  msnGames: LandingApi;
  allMsnGames: MsnGame[];
  allMsnGamesMap: AllMsnGamesMap; // by name
  allMsnGamesMapById: AllMsnGamesMapById;
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
