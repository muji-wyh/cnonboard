import "./before-onboard.css";
import { Button, Divider, notification, Table } from "antd";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { useCallback, useContext, useEffect, useState } from "react";
import type { Vendor } from "../../typings/vendor.ts";
import { StoreContext } from "../../configs/store-context.ts";
import { Game, MsnGame } from "../../typings/game.ts";
import type { CheckDuplicateTableColumn } from "../../typings/check-duplicate.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import { getVendorGameFromMsnGame } from "../../utils/game.ts";

export const BeforeOnboard = () => {
  const [vendor, setVendor] = useState("");
  const storeContext = useContext(StoreContext);
  const { gamesByVendor, allMsnGamesByVendor, isStaging } = storeContext;
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const [newGames, setNewGames] = useState([] as Game[]);
  const [gamesToBeDelete, setGamesToBeDelete] = useState([] as MsnGame[]);

  useEffect(() => {
    setVendor("");
    setNewGames([]);
    setGamesToBeDelete([]);
  }, [isStaging]);

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
    const newGames_ = [] as Game[];
    const gamesToBeDelete_ = [] as MsnGame[];

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
        newGames_.push(game);
      }
    }

    // games to be deleted
    for (const game of gamesFromMsn) {
      if (!idMapVendor[game.id.split("_")[1]]) {
        gamesToBeDelete_.push(game);
      }
    }

    setNewGames(newGames_);
    setGamesToBeDelete(gamesToBeDelete_);
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
      {!newGames.length ? (
        <p className="">无</p>
      ) : (
        <Table
          dataSource={newGames.map(
            (game, i) =>
              ({
                key: game.Name + i,
                gameName: game.Name,
                vendor: game.VendorId,
                playUrl: game.PlayUrl,
                game,
              }) as CheckDuplicateTableColumn,
          )}
          columns={checkDuplicateTableColumns}
        />
      )}

      <Divider />

      <h4 className="">将被删除的游戏：</h4>
      {!gamesToBeDelete.length ? (
        <p className="">无</p>
      ) : (
        <Table
          dataSource={gamesToBeDelete.map(
            (game, i) =>
              ({
                key: game.name + i,
                gameName: game.name,
                vendor: game.id.split("_")[0],
                playUrl: game.playUrl,
                game: getVendorGameFromMsnGame(game),
              }) as CheckDuplicateTableColumn,
          )}
          columns={checkDuplicateTableColumns}
        />
      )}

      <Divider />

      <div className="">
        <Button onClick={handleCheck}>检查</Button>
      </div>
    </div>
  );
};
