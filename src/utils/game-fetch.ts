import { vendors } from "../configs/venders.ts";
import type { AllVendorGamesMap, Game } from "../typings/game.ts";
import type { Vendor } from "../typings/vendor.ts";

export const fetchMsnGames = async ({
  signal,
  isStaging,
}: {
  signal: AbortSignal;
  isStaging: boolean;
}) => {
  const api_staging =
    "https://api.msn.com/msn/v0/pages/CasualGames/Landing?apiKey=815OFUpUhXOWSB8eMuBSy9iV8FQfTpD9h9oF9nmBfO&ocid=cg-landing&contentType=landing&ids=&market=zh-cn&user=m-045423792DE661CA365C36792CD8600B&lat=1.3056&long=103.823&activityId=12E7CC8D-FE25-463C-BD64-BA67C39D0ECB&it=edgeid&fdhead=prg-1sw-cg-cndev,prg-cg-aent-staging&scn=AL_APP_ANON";
  const api_prod =
    "https://api.msn.com/msn/v0/pages/CasualGames/Landing?apiKey=815OFUpUhXOWSB8eMuBSy9iV8FQfTpD9h9oF9nmBfO&ocid=cg-landing&contentType=landing&ids=&market=zh-cn&user=m-1880ABCDF86F62640DE5BF66F99D630E&lat=39.9078&long=116.3976&activityId=679AA07B-286C-47BD-B8DC-443AC5EDACA3&it=edgeid&fdhead=prg-1sw-cg-cndev&scn=APP_ANON";
  try {
    const data = (
      (await fetch(isStaging ? api_staging : api_prod, { signal }).then((res) =>
        res.json(),
      )) as { value: { data: string }[] }
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
    vendors.map(
      (vendor: Vendor) =>
        new Promise<Game[]>((resolve, reject) => {
          fetch(vendor.Api, { signal })
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

  return {
    allVendorGamesMap,
    gamesByVendor,
  };
};
