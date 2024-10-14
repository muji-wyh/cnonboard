import {
  type MenuProps,
  Menu,
  Spin,
  notification,
  Switch,
  Divider,
} from "antd";
import CheckDuplicate from "./components/check-duplicate/check-duplicate";
import { menuItems, menuKeys } from "./configs/menu.tsx";
import { useState, useEffect, useCallback } from "react";
import { OnboardNewGame } from "./components/onboard-new-game/onboard-new-game.tsx";
import { BeforeOnboard } from "./components/before-onboard/before-onboard.tsx";
import { OnlineGamesSummary } from "./components/online-games-summary/online-games-summary.tsx";
import { fetchMsnGames, fetchVendorGames } from "./utils/game-fetch.ts";
import "./App.css";
import {
  AllMsnGamesByVendor,
  AllMsnGamesMap,
  LandingApi,
  MsnGame,
} from "./typings/game.ts";
import {
  storeContextValue as getStoreContextValue,
  StoreContext,
} from "./configs/store-context.ts";

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState(menuKeys.checkDuplicate);
  const [storeContextValue, setStoreContextValue] = useState(
    getStoreContextValue(),
  );
  const [loading, setLoading] = useState(false);
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const showNotify = useCallback((desc: string, msg: string = "错误") => {
    notifyApi.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  }, []);

  const initData = async ({ signal }: { signal: AbortSignal }) => {
    try {
      setLoading(true);
      const vendorGames = await fetchVendorGames({ signal });
      const allVendorGamesMap = vendorGames.allVendorGamesMap;
      const gamesByVendor = vendorGames.gamesByVendor;
      const msnGames: LandingApi = await fetchMsnGames({
        signal,
        isStaging: storeContextValue.isStaging,
      });
      let allMsnGames = msnGames.gamesByGenre.reduce(
        (acc, cur) => acc.concat(cur.games),
        [] as MsnGame[],
      );

      // deduplicate
      const allMsnGamesTmpMap = allMsnGames.reduce(
        (acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        },
        {} as { [id: MsnGame["id"]]: MsnGame },
      );
      allMsnGames = Object.values(allMsnGamesTmpMap);
      const allMsnGamesMap = {} as AllMsnGamesMap;
      const allMsnGamesByVendor = {} as AllMsnGamesByVendor;

      for (const game of allMsnGames) {
        const [vendorId] = game.id.split("_");

        if (!allMsnGamesByVendor[vendorId]) {
          allMsnGamesByVendor[vendorId] = [];
        }

        allMsnGamesByVendor[vendorId].push(game);

        if (!allMsnGamesMap[game.name]) {
          allMsnGamesMap[game.name] = [];
        }

        allMsnGamesMap[game.name].push(game);
      }

      setStoreContextValue((prevState) => ({
        ...prevState,
        allVendorGamesMap,
        gamesByVendor,
        msnGames,
        allMsnGames,
        allMsnGamesMap,
        allMsnGamesByVendor,
      }));
    } catch (e: any) {
      showNotify(e.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    initData({ signal });

    return () => {
      setLoading(false);
      controller.abort();
    };
  }, [storeContextValue.isStaging]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentMenuKey(e.key);
  };

  const compMap = {
    [menuKeys.checkDuplicate]: <CheckDuplicate />,
    [menuKeys.onboard]: <OnboardNewGame />,
    [menuKeys.beforeOnboard]: <BeforeOnboard />,
    [menuKeys.onlineGameSummary]: <OnlineGamesSummary />,
  };

  const handleStagingChange = useCallback((v: boolean) => {
    setStoreContextValue(() => ({
      ...getStoreContextValue(),
      isStaging: v,
    }));
  }, []);

  return (
    <StoreContext.Provider value={storeContextValue}>
      {notifyContextHolder}

      <div className="staging-wrap">
        <span className="">staging:</span>
        <Switch
          checked={storeContextValue.isStaging}
          onChange={handleStagingChange}
        />
      </div>

      <Divider />

      <Spin tip="Loading" size="large" spinning={loading}>
        <Menu
          onClick={onClick}
          selectedKeys={[currentMenuKey]}
          mode="horizontal"
          items={menuItems}
        />
        {compMap[currentMenuKey]}
      </Spin>
    </StoreContext.Provider>
  );
}

export default App;
