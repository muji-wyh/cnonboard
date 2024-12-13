import { type MenuProps, Menu, Spin, notification, Switch } from "antd";
import { menuItems, menuKeys } from "./configs/menu.tsx";
import { useState, useEffect, useCallback } from "react";
import { OnboardedGames } from "./components/onboarded-game/onboarded-games.tsx";
import { BeforeOnboard } from "./components/before-onboard/before-onboard.tsx";
import { OnlineGamesSummary } from "./components/online-games-summary/online-games-summary.tsx";
import { VendorManageSystem } from "./components/vendor-manage-system/vendor-manage-system.tsx";
import { DebugInfo } from "./components/debug-info/debug-info.tsx";
import { fetchMsnGames, fetchVendorGames } from "./utils/game-fetch.ts";
import "./App.css";
import {
  AllMsnGamesByVendor,
  AllMsnGamesMap,
  MsnGame,
} from "./typings/game.ts";
import {
  storeContextValue as getStoreContextValue,
  StoreContext,
} from "./configs/store-context.ts";
import TotalDuplicate from "./components/check-duplicate/total-duplicates.tsx";
import VendorDuplicate from "./components/check-duplicate/vendor-duplicates.tsx";
import { SearchGame } from "./components/search-game/searchGame.tsx";

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState(menuKeys.checkDuplicate);
  const [storeContextValue, setStoreContextValue] = useState(
    getStoreContextValue(),
  );
  const [loading, setLoading] = useState(true);
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const showNotify = useCallback((desc: string, msg: string = "错误") => {
    notifyApi.error({
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
      const allMsnGames = await fetchMsnGames({
        signal,
        isStaging: storeContextValue.isStaging,
      });

      // deduplicate
      const allMsnGamesMapById = allMsnGames.reduce(
        (acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        },
        {} as { [id: MsnGame["id"]]: MsnGame },
      );

      const allMsnGamesMap = {} as AllMsnGamesMap;
      const allMsnGamesByVendor = {} as AllMsnGamesByVendor;

      for (const game of allMsnGames) {
        const gameNameSplit = game.id.split("_");
        let vendorId =
          gameNameSplit.length === 1
            ? "other" // like "9p0frkbsdvrq"
            : gameNameSplit[0];

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
        allVendorGamesMapById: vendorGames.allVendorGamesMapById,
        gamesByVendor,
        allMsnGames,
        allMsnGamesMap,
        allMsnGamesMapById,
        allMsnGamesByVendor,
      }));
    } catch (e: any) {
      showNotify(e.message + " | 请刷新重试！");
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
    [menuKeys.checkDuplicate]: <VendorDuplicate />,
    [menuKeys.totalDuplicate]: <TotalDuplicate />,
    [menuKeys.onboard]: <OnboardedGames />,
    [menuKeys.beforeOnboard]: <BeforeOnboard />,
    [menuKeys.onlineGameSummary]: <OnlineGamesSummary />,
    [menuKeys.searchGame]: <SearchGame />,
    [menuKeys.debugInfo]: <DebugInfo />,
    [menuKeys.vendorManageSystem]: <VendorManageSystem />,
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

      <Spin tip="Loading" size="large" spinning={loading}>
        <div className="body-wrap">
          <OnlineGamesSummary hide={loading} />
          <Menu
            onClick={onClick}
            selectedKeys={[currentMenuKey]}
            mode="horizontal"
            items={menuItems}
          />
          {compMap[currentMenuKey]}
        </div>
      </Spin>

      <div className="staging-wrap">
        <span className="">staging:</span>
        <Switch
          checked={storeContextValue.isStaging}
          onChange={handleStagingChange}
        />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
