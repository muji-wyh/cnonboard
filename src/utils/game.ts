import type { Game, MsnGame } from "../typings/game.ts";
import type { CheckDuplicateTableColumn } from "../typings/check-duplicate.ts";

export const getVendorGameFromMsnGame = (game: MsnGame): Game => {
  return {
    ExternalId: game.id.split("_")[1],
    Name: game.name,
    PlayUrl: game.playUrl,
    Thumbnail: `https://ts4.cn.mm.bing.net/th?id=${game.thumbnailId}&w=124&h=124&qlt=80&c=0&rs=1`,
    HeroThumbnail: `https://ts4.cn.mm.bing.net/th?id=${game.heroThumbnailId}&w=124&h=124&qlt=80&c=0&rs=1`,
    Genres: game.genres,
    Version: "v1",
    FullDescription: {
      Headline: "",
      Short: "",
    },
    MobileFriendly: false,
    DeviceOrientation: ["Portrait", "Landscape"],
    DefaultRank: game.defaultRank,
    PublisherId: game.publisherId,
    PublisherName: game.publisherName,
    Tags: game.tags,
    RelatedGameIds: [],

    // added by FE
    VendorId: game.id.split("_")[0],
  } as Game;
};

export const getTableColumn = (
  game_: MsnGame | Game,
  type: "vendor" | "msn",
  index: number,
): CheckDuplicateTableColumn => {
  const game: Game =
    type === "vendor"
      ? (game_ as Game)
      : getVendorGameFromMsnGame(game_ as MsnGame);

  return {
    key: game.Name + index,
    gameName: game.Name,
    vendor: game.VendorId.split("_")[0],
    playUrl: game.PlayUrl,
    genres: game.Genres,
    heroThumbnails: game.HeroThumbnail,
    mobileFriendly: game.MobileFriendly,
    fullDescription: game.FullDescription,
    game,
  };
};
