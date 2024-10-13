import { useCallback, useEffect, useRef, useState } from "react";
import { Spin, Tabs } from "antd";
import { notification } from "antd";
import "./check-duplicate.css";
import {
  AllGames,
  fetchMsnGames,
  fetchVendorGames,
} from "../../utils/game-fetch.ts";
import VendorDuplicate from "./vendor-duplicates.tsx";
import TotalDuplicate from "./total-duplicates.tsx";
import { type Game } from "../../typings/game.ts";

const activeKeys = {
  vendor: "vendor",
  total: "total",
};

function CheckDuplicate() {
  const [loading, setLoading] = useState(false);
  const allGames = useRef({} as AllGames);
  const gamesByVendor = useRef(
    {} as {
      [vendorId: string]: Game[];
    },
  );
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const msnGames = useRef({});
  const [activeKey, setActiveKey] = useState(activeKeys.vendor);

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

        console.info("msgGames", msnGames.current);
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

  const handleActiveKeyChange = useCallback((key: string) => {
    setActiveKey(key);
  }, []);

  return (
    <div className="container">
      {notifyContextHolder}

      <Spin tip="Loading" size="large" spinning={loading}>
        <Tabs
          activeKey={activeKey}
          items={[
            {
              key: activeKeys.vendor,
              label: "查重",
              children: (
                <VendorDuplicate
                  gamesByVendor={gamesByVendor.current}
                  allGames={allGames.current}
                />
              ),
            },
            {
              key: activeKeys.total,
              label: "总体重复情况",
              children: <TotalDuplicate />,
            },
          ]}
          onChange={handleActiveKeyChange}
        />
      </Spin>
    </div>
  );
}

export default CheckDuplicate;
