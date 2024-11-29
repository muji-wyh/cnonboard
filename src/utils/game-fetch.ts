import { vendors } from "../configs/venders.ts";
import type {
  AllVendorGamesMap,
  AllVendorGamesMapById,
  Game,
} from "../typings/game.ts";
import type { Vendor } from "../typings/vendor.ts";

export const fetchMsnGames = async ({
  signal,
  isStaging,
}: {
  signal: AbortSignal;
  isStaging: boolean;
}) => {
  const base_url =
    "https://api.msn.com/msn/v0/pages/CasualGames/Landing?apiKey=815OFUpUhXOWSB8eMuBSy9iV8FQfTpD9h9oF9nmBfO&ocid=cg-landing&contentType=landing&ids=&market=zh-cn&user=m-1880ABCDF86F62640DE5BF66F99D630E&lat=39.9078&long=116.3976&activityId=679AA07B-286C-47BD-B8DC-443AC5EDACA3&it=edgeid";

  const api_prod = `${base_url}&scn=APP_ANON&fdhead=1s-cg-cnnewvd,prg-cg-lstfix-`;
  const api_staging = `${base_url}&scn=AL_APP_ANON&fdhead=prg-cg-aent-staging,1s-cg-cnnewvd`;

  let retry = 10;

  while (retry-- >= 0) {
    try {
      const data = (
        (await fetch(isStaging ? api_staging : api_prod, {
          signal,
          cache: "no-store",
        }).then((res) => res.json())) as { value: { data: string }[] }
      )?.value?.[0].data;

      return JSON.parse(data);
    } catch (e: any) {
      if (e.name === "AbortError") {
        return;
      }
    }
  }

  try {
    const data = (
      (await fetch(isStaging ? api_staging : api_prod, {
        signal,
        cache: "no-store",
      }).then((res) => res.json())) as { value: { data: string }[] }
    )?.value?.[0].data;

    return JSON.parse(data);
  } catch (e: any) {
    if (e.name === "AbortError") {
      return;
    }

    throw e;
  }
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
