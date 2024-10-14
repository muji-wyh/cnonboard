import "./before-onboard.css";
import { Button, Divider, notification } from "antd";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { useCallback, useContext, useState } from "react";
import type { Vendor } from "../../typings/vendor.ts";
import { GameDataContext } from "../../configs/game-data-context.ts";
import { Game, MsnGame } from "../../typings/game.ts";

export const BeforeOnboard = () => {
  const [vendor, setVendor] = useState("");
  const gameDataContext = useContext(GameDataContext);
  const { gamesByVendor, allMsnGamesByVendor } = gameDataContext;
  const [notifyApi, notifyContextHolder] = notification.useNotification();

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
  }, []);

  const showNotify = useCallback((desc: string, msg: string = "错误") => {
    notifyApi.info({
      message: msg,
      description: desc,
      placement: "top",
    });
  }, []);

  const handleCheck = useCallback(() => {
    if (!vendor) {
      showNotify("请选择 vendor");
      return;
    }

    const gamesFromVendor = gamesByVendor[vendor];
    const gamesFromMsn = allMsnGamesByVendor[vendor];
    const newGames = [] as Game[];
    const gamesToBeDelete = [] as MsnGame[];

    const idMapVendor = gamesFromVendor.reduce(
      (acc, cur) => {
        acc[cur.ExternalId] = cur;
        return acc;
      },
      {} as { [VendorId: string]: Game },
    );
    const idMapMsn = gamesFromMsn.reduce(
      (acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      },
      {} as { [id: string]: MsnGame },
    );

    // new games
    for (const game of gamesFromVendor) {
      if (!idMapMsn[`${vendor}_${game.ExternalId}`]) {
        newGames.push(game);
      }
    }

    // games to be deleted
    for (const game of gamesFromMsn) {
      if (!idMapVendor[game.id.split("_")[1]]) {
        gamesToBeDelete.push(game);
      }
    }

    // todo-Yoki
    console.info(">>> newGames", newGames);
    console.info(">>> toBeDeleted", gamesToBeDelete);
  }, [vendor]);

  return (
    <div className="">
      {notifyContextHolder}

      <p className="">检查某个 vendor 的接口变动（跟现有线上数据的 dif）</p>

      <Divider />

      <p className="">请选择 vendor</p>
      <VendorRadio value={vendor} onChange={handleChangeVendor} />

      <Divider />

      <h4 className="">要上架的新游戏：</h4>

      <Divider />

      <h4 className="">将被删除的游戏：</h4>

      <Divider />

      <div className="">
        <Button onClick={handleCheck}>开始</Button>
      </div>
    </div>
  );
};
