import { vendors } from "../configs/venders.ts";
import type {
  AllVendorGamesMap,
  AllVendorGamesMapById,
  Game,
  LandingApi,
  MsnGame,
} from "../typings/game.ts";
import type { Vendor } from "../typings/vendor.ts";
import allMsnGames from "../configs/allMsnGames.ts";

export const fetchMsnGamesByIds = async ({
  signal,
  isStaging,
  ids = "",
}: {
  signal: AbortSignal;
  isStaging: boolean;
  ids?: string;
}): Promise<MsnGame[]> => {
  const base_url =
    "https://api.msn.com/msn/v0/pages/CasualGames/Landing?apiKey=815OFUpUhXOWSB8eMuBSy9iV8FQfTpD9h9oF9nmBfO&ocid=cg-landing&contentType=landing&market=zh-cn&user=m-1880ABCDF86F62640DE5BF66F99D630E&lat=39.9078&long=116.3976&activityId=679AA07B-286C-47BD-B8DC-443AC5EDACA3&it=edgeid";

  const api_prod = `${base_url}&ids=${ids}&scn=APP_ANON&fdhead=1s-cg-cnnewvd,prg-cg-lstfix-`;
  const api_staging = `${base_url}&ids=${ids}&scn=AL_APP_ANON&fdhead=prg-cg-aent-staging,1s-cg-cnnewvd`;

  let retry = 10;

  while (retry-- >= 0) {
    try {
      const data = (
        (await fetch(isStaging ? api_staging : api_prod, {
          signal,
          cache: "no-store",
        }).then((res) => res.json())) as { value: { data: string }[] }
      )?.value?.[0].data;

      const tmpMap = {} as {
        [k: string]: boolean;
      };

      const allMsnGames = (JSON.parse(data) as LandingApi).gamesByGenre.reduce(
        (acc, cur) => {
          acc.concat(cur.games);

          for (const game of cur.games) {
            if (tmpMap[game.id]) {
              continue;
            }

            tmpMap[game.id] = true;
            acc.push(game);
          }

          return acc;
        },
        [] as MsnGame[],
      );

      return allMsnGames;
    } catch (e: any) {
      if (e.name === "AbortError") {
        return [];
      }
    }
  }

  return [];
};

export const fetchMsnGames = async ({
  signal,
  isStaging,
  isOnline,
}: {
  signal: AbortSignal;
  isStaging: boolean;
  isOnline: boolean;
}): Promise<MsnGame[]> => {
  if (isOnline) {
    return await fetchMsnGamesByIds({ signal, isStaging });
  }

  return new Promise((resolve) => {
    resolve(allMsnGames);
  });
};

export const fetchVendorGames = async ({ signal }: { signal: AbortSignal }) => {
  const gamesByVendor = {} as {
    [vendorId: string]: Game[];
  };

  const data: Game[][] = await Promise.all(
    vendors
      .filter(({ Api }) => Api)
      .map(
        (vendor: Vendor) =>
          new Promise<Game[]>((resolve, reject) => {
            fetch(vendor.Api, { signal, cache: "no-store" })
              .then((res) => res.json())
              .then((data) => {
                let result: Game[];

                if (!Array.isArray(data)) {
                  result = data.data as Game[];
                } else {
                  result = data as Game[];
                }

                gamesByVendor[vendor.VendorId] = result;

                resolve(
                  result.map((d) =>
                    Object.assign(d, {
                      VendorId: vendor.VendorId,
                    }),
                  ),
                );
              })
              .catch((e) => {
                if (e.name === "AbortError") {
                  return;
                }

                reject(e);
              });
          }),
      ),
  );

  const allVendorGamesMap = data.reduce((acc, cur) => {
    for (const game of cur) {
      if (!acc[game.Name]) {
        acc[game.Name] = [];
      }

      acc[game.Name].push(game);
    }
    return acc;
  }, {} as AllVendorGamesMap);

  const allVendorGamesMapById = data.reduce((acc, cur) => {
    for (const game of cur) {
      acc[game.ExternalId] = game;
    }
    return acc;
  }, {} as AllVendorGamesMapById);

  return {
    allVendorGamesMap,
    allVendorGamesMapById,
    gamesByVendor,
  };
};
