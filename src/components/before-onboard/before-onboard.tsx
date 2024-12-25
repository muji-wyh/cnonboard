import "./before-onboard.css";
import { Divider, Tabs } from "antd";
import { VendorRadio } from "../vendor-radio/vendor-radio.tsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Vendor } from "../../typings/vendor.ts";
import { StoreContext } from "../../configs/store-context.ts";
import { Game, MsnGame } from "../../typings/game.ts";
import { getDiff, getTableColumn } from "../../utils/game.ts";
import { GameTable } from "../game-table/game-table.tsx";
import { Tips } from "../tips/tips.tsx";

export const BeforeOnboard = () => {
  const [vendor, setVendor] = useState("");
  const storeContext = useContext(StoreContext);
  const { gamesByVendor, allMsnGamesByVendor, isStaging, isOnline } =
    storeContext;
  const [newGames, setNewGames] = useState([] as Game[]);
  const [gamesToBeDelete, setGamesToBeDelete] = useState([] as MsnGame[]);
  const [gamesToBeUpdate, setGamesToBeUpdate] = useState(
    [] as unknown as [msnGame: MsnGame, diff: any],
  );

  useEffect(() => {
    setVendor("");
    setNewGames([]);
    setGamesToBeDelete([]);
    setGamesToBeUpdate([] as unknown as [msnGame: MsnGame, diff: any]);
  }, [isStaging, isOnline]);

  const handleChangeVendor = useCallback((v: Vendor["VendorId"]) => {
    setVendor(v);
    handleCheck(v);
  }, []);

  const handleCheck = useCallback((v: Vendor["VendorId"]) => {
    if (!v) {
      return;
    }

    const gamesFromVendor = gamesByVendor[v] ?? [];
    const gamesFromMsn = allMsnGamesByVendor[v];
    const newGames_ = [] as Game[];
    const gamesToBeDelete_ = [] as MsnGame[];
    const gamesToBeUpdate_ = [] as unknown as [msnGame: MsnGame, diff: any];

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
      if (!idMapMsn[`${v}_${game.ExternalId}`]) {
        newGames_.push(game);
      }
    }

    // games to be deleted/update
    for (const msnGame of gamesFromMsn) {
      const id = msnGame.id.split("_")[1];
      const vendorGame = idMapVendor[id];

      if (!vendorGame) {
        gamesToBeDelete_.push(msnGame);
        continue;
      }

      const diff = getDiff(msnGame, vendorGame);

      if (diff) {
        gamesToBeUpdate_.push([msnGame, diff]);
      }
    }

    setNewGames(newGames_);
    setGamesToBeDelete(gamesToBeDelete_);
    setGamesToBeUpdate(gamesToBeUpdate_);
  }, []);

  const toBeOnboard = useMemo(() => {
    return newGames.map((game, i) => getTableColumn(game, "vendor", i));
  }, [newGames]);

  const toBeDelete = useMemo(() => {
    return gamesToBeDelete.map((game, i) => getTableColumn(game, "msn", i));
  }, [gamesToBeDelete]);

  const toBeUpdate = useMemo(() => {
    return gamesToBeUpdate.map(([game, diff], i) =>
      getTableColumn(game, "msn", i, diff),
    );
  }, [gamesToBeDelete]);

  return (
    <div className="pre-onboard-wrap">
      <Tips content="vendor 接口和 MSN 线上的 diff" />

      <p className="">请选择 vendor</p>
      <VendorRadio value={vendor} onChange={handleChangeVendor} />

      <Divider />

      {vendor && (
        <Tabs
          items={[
            {
              key: "to-be-onboard",
              label: `上架(${toBeOnboard.length})`,
              children: <GameTable list={toBeOnboard} />,
            },
            {
              key: "to-be-delete",
              label: `删除(${toBeDelete.length})`,
              children: <GameTable list={toBeDelete} />,
            },
            {
              key: "to-be-update",
              label: `更新(${toBeUpdate.length})`,
              children: <GameTable list={toBeUpdate} />,
            },
            {
              key: "current-online",
              label: `线上(${allMsnGamesByVendor[vendor]?.length})`,
              children: (
                <GameTable
                  list={(allMsnGamesByVendor[vendor] ?? []).map((game, i) =>
                    getTableColumn(game, "msn", i),
                  )}
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
};
