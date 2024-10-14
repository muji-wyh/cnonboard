import { type MenuProps, Menu, Spin, notification } from "antd";
import CheckDuplicate from "./components/check-duplicate/check-duplicate";
import { menuItems, menuKeys } from "./configs/menu.tsx";
import { useState, useEffect, useCallback, useRef } from "react";
import { OnboardNewGame } from "./components/onboard-new-game/onboard-new-game.tsx";
import { BeforeOnboard } from "./components/before-onboard/before-onboard.tsx";
import { OnlineGamesSummary } from "./components/online-games-summary/online-games-summary.tsx";
import { fetchMsnGames, fetchVendorGames } from "./utils/game-fetch.ts";
import type { AllGames, Game, LandingApi } from "./typings/game.ts";
import {
  defaultGameDataContextValue,
  GameDataContext,
} from "./configs/game-data-context.ts";

function App() {
  const [currentMenuKey, setCurrentMenuKey] = useState(menuKeys.checkDuplicate);
  const [gameDataContextValue, setGameDataContextValue] = useState(
    defaultGameDataContextValue(),
  );
  const [loading, setLoading] = useState(false);
  const allGames = useRef({} as AllGames);
  const gamesByVendor = useRef(
    {} as {
      [vendorId: string]: Game[];
    },
  );
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const msnGames = useRef({} as LandingApi);

  const showNotify = useCallback((desc: string, msg: string = "错误") => {
    notifyApi.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    (async () => {
      try {
        const vendorGames = await fetchVendorGames({ signal });
        allGames.current = vendorGames.allGames;
        gamesByVendor.current = vendorGames.gamesByVendor;
        msnGames.current = await fetchMsnGames({ signal });

        setGameDataContextValue({
          allGames: allGames.current,
          gamesByVendor: gamesByVendor.current,
          msnGames: msnGames.current,
        });
      } catch (e: any) {
        showNotify(e.message);
      }

      setLoading(false);
    })();

    return () => {
      setLoading(false);
      controller.abort();
    };
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrentMenuKey(e.key);
  };

  const compMap = {
    [menuKeys.checkDuplicate]: <CheckDuplicate />,
    [menuKeys.onboard]: <OnboardNewGame />,
    [menuKeys.beforeOnboard]: <BeforeOnboard />,
    [menuKeys.onlineGameSummary]: <OnlineGamesSummary />,
  };

  return (
    <GameDataContext.Provider value={gameDataContextValue}>
      {notifyContextHolder}

      <Spin tip="Loading" size="large" spinning={loading}>
        <Menu
          onClick={onClick}
          selectedKeys={[currentMenuKey]}
          mode="horizontal"
          items={menuItems}
        />
        {compMap[currentMenuKey]}
      </Spin>
    </GameDataContext.Provider>
  );
}

export default App;
