import {
  AllVendorGamesMap,
  AllMsnGamesByVendor,
  GamesByVendor,
  MsnGame,
  AllMsnGamesMap,
  AllVendorGamesMapById,
  AllMsnGamesMapById,
} from "./game.ts";

export type storeContext = {
  gamesByVendor: GamesByVendor;
  allVendorGamesMap: AllVendorGamesMap; // by name
  allVendorGamesMapById: AllVendorGamesMapById;

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
