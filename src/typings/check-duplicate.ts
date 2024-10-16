import type { Game } from "./game.ts";

export type CheckDuplicateTableColumn = {
  gameName: string;
  key: string;
  vendor: string;
  playUrl: string;
  heroThumbnails: Game["HeroThumbnail"];
  genres: Game["Genres"];
  mobileFriendly: Game["MobileFriendly"];
  fullDescription: Game["FullDescription"];
  game: Game;
};
