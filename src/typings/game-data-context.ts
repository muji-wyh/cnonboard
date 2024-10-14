import {
  AllGames,
  AllMsnGamesByVendor,
  GamesByVendor,
  LandingApi,
  MsnGame,
} from "./game.ts";

export type GameDataContext = {
  allGames: AllGames;
  gamesByVendor: GamesByVendor;
  msnGames: LandingApi;
  allMsnGames: MsnGame[];
  allMsnGamesByVendor: AllMsnGamesByVendor;
};
