import type { Game } from "./game.ts";

export type CheckDuplicateTableColumn = {
  gameName: string;
  key: string;
  vendor: string;
  playUrl: string;
  game: Game;
};
