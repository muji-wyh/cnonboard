import type { Game, MsnGame } from "../typings/game.ts";

export const getVendorGameFromMsnGame = (game: MsnGame): Game => {
  return {
    ExternalId: game.id.split("-")[1],
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
    VendorId: game.id.split("-")[0],
  } as Game;
};
