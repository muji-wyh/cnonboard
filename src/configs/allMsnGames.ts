import osValues from "./allMsnGamesFromOS";
import { MsnGame } from "../typings/game.ts";

const allMsnGames: MsnGame[] = [];

const DeviceOrientationMap = {
  1: "Portrait",
  2: "LandScape",
} as {
  [key: string]: string;
};

const GenreMap = {
  0: "Unknown",
  1: "All",
  2: "Card",
  3: "Puzzle",
  4: "Strategy",
  5: "Arcade",
  6: "Casino",
  7: "Match",
  8: "Word",
  9: "Hidden",
  10: "Multiplayer",
  11: "Mahjong",
  12: "Family",
  13: "Adventure",
  14: "Racing",
  15: "Classics",
  16: "Educational",
  17: "Fighting",
  18: "Music",
  19: "Other",
  20: "Platformer",
  21: "RolePlaying",
  22: "Shooter",
  23: "Simulation",
  24: "Sports",
  25: "Tools",
  26: "Bubble",
  27: "Idle",
  28: "Board",
  29: "Math",
  30: "Education",
  31: "Web",
  32: "Pc",
} as {
  [key: string]: string;
};

for (const osValue of osValues) {
  const v = osValue.Value;

  if (!v || !v.Enabled?.[0]) {
    continue;
  }

  allMsnGames.push({
    cmsBrandId: "",
    created: v.Created,
    // defaultName: v.DefaultName,
    defaultRank: +v.DefaultRank,
    description: v.Description,
    deviceOrientation: (v.DeviceOrientation?.[0] ?? []).map(
      (n) => DeviceOrientationMap[+n],
    ),
    genres: (v.Genres?.[0] ?? []).map((n) => GenreMap[+n]),
    heroThumbnailId: v.HeroThumbnail,
    id: v.ExternalId,
    market: v.Market,
    mobileFriendly: v.MobileFriendly?.[0] ?? false,
    name: v.Name,
    playUrl: v.PlayUrl,
    publishDate: v.PublishDate,
    publisherId: v.PublisherId,
    publisherName: v.PublisherName,
    tags: v.Tags?.[0] ?? [],
    thumbnailId: v.Thumbnail,
    thumbnail16x9Id: v.Thumbnail16x9,
    trailers: v.Trailers?.[0] ?? [],
  } as MsnGame);
}

export default allMsnGames;
