import "./before-onboard.css";
import { Button, Divider, notification, Table } from "antd";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Vendor } from "../../typings/vendor.ts";
import { StoreContext } from "../../configs/store-context.ts";
import { Game, MsnGame } from "../../typings/game.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import { getTableColumn } from "../../utils/game.ts";
import { CopyResult } from "../copy-result/copy-result.tsx";

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

  const toBeOnboard = useMemo(() => {
    return newGames.map((game, i) => getTableColumn(game, "vendor", i));
  }, [newGames]);

  const toBeDelete = useMemo(() => {
    return gamesToBeDelete.map((game, i) => getTableColumn(game, "msn", i));
  }, [gamesToBeDelete]);

  return (
    <div className="">
      {notifyContextHolder}

      <p className="">检查某个 vendor 的接口变动（跟现有线上数据的 diff）</p>

      <Divider />

      <p className="">请选择 vendor</p>
      <VendorRadio value={vendor} onChange={handleChangeVendor} />

      <Divider />

      <h4 className="result-item">
        <span className="">要上架的新游戏 ({toBeOnboard.length})</span>
        {!!toBeOnboard.length && (
          <CopyResult list={toBeOnboard.map(({ gameName }) => gameName)} />
        )}
      </h4>
      {!newGames.length ? (
        <p className="">无</p>
      ) : (
        <Table dataSource={toBeOnboard} columns={checkDuplicateTableColumns} />
      )}

      <Divider />

      <h4 className="result-item">
        <span className="">将被删除的游戏 ({toBeDelete.length})</span>
        {!!gamesToBeDelete.length && (
          <CopyResult list={toBeDelete.map(({ gameName }) => gameName)} />
        )}
      </h4>
      {!gamesToBeDelete.length ? (
        <p className="">无</p>
      ) : (
        <Table dataSource={toBeDelete} columns={checkDuplicateTableColumns} />
      )}

      <Divider />

      <div className="">
        <Button onClick={handleCheck}>检查</Button>
      </div>
    </div>
  );
};
