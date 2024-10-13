import { Game, Vendor, vendors } from "../configs/venders.ts";

export const fetchMsnGames = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const data = (
      (await fetch(
        "https://api.msn.com/msn/v0/pages/CasualGames/Landing?apiKey=815OFUpUhXOWSB8eMuBSy9iV8FQfTpD9h9oF9nmBfO&ocid=cg-landing&contentType=landing&ids=&market=zh-cn&user=m-1880ABCDF86F62640DE5BF66F99D630E&lat=39.9078&long=116.3976&activityId=679AA07B-286C-47BD-B8DC-443AC5EDACA3&it=edgeid&fdhead=prg-1sw-cg-cndev,prg-cg-global-gm&scn=APP_ANON",
        { signal },
      ).then((res) => res.json())) as { value: { data: string }[] }
    )?.value?.[0].data;

    return JSON.parse(data);
  } catch (e: any) {
    if (e.name === "AbortError") {
      return;
    }

    throw e;
  }
};

export type AllGames = {
  [gameName: string]: Game[];
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

  const allGames = data.reduce((acc, cur) => {
    for (const game of cur) {
      if (!acc[game.Name]) {
        acc[game.Name] = [];
      }

      acc[game.Name].push(game);
    }
    return acc;
  }, {} as AllGames);

  return {
    allGames,
    gamesByVendor,
  };
};
