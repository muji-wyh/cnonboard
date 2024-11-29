import { Game, MsnGame } from "../typings/game.ts";
import type { CheckDuplicateTableColumn } from "../typings/check-duplicate.ts";
import { type DetailedDiff, detailedDiff } from "deep-object-diff";
import { isEmpty } from "lodash-es";

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

export const getDiff = (msnGame: MsnGame, vendorGame: Game) => {
  const x = {
    Thumbnail16x9: "",
    Screenshots: "",
    FullDescription: "",
    PublishDate: "",
    Trailers: "",
    RelatedGameIds: "",
    DeviceOrientation: "",
    Thumbnail: "",
    HeroThumbnail: "",
    Version: "",
    DefaultRank: "",
    PublisherId: "",
    PublisherName: "",
    Tags: "",
  };

  const fromMsn = getVendorGameFromMsnGame(msnGame);
  const detail = detailedDiff(
    Object.assign(fromMsn, x),
    Object.assign(vendorGame, x),
  ) as unknown as Partial<DetailedDiff>;

  if (isEmpty(detail.added)) {
    delete detail.added;
  }

  if (isEmpty(detail.deleted)) {
    delete detail.deleted;
  } else {
    for (const key in detail.deleted as any) {
      (detail.deleted as any)[key] = (fromMsn as any)[key];
    }
  }

  if (isEmpty(detail.updated)) {
    delete detail.updated;
  }

  return isEmpty(detail) ? null : detail;
};

export const getTableColumn = (
  game_: MsnGame | Game,
  type: "vendor" | "msn",
  index: number,
  diff?: any,
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
    diff,
    game,
  };
};
