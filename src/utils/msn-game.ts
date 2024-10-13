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
