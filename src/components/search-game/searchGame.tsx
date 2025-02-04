import "./searchGame.css";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { StoreContext } from "../../configs/store-context.ts";
import { Button, Input, Tabs } from "antd";
import { GameTable } from "../game-table/game-table.tsx";
import type { Game, MsnGame } from "../../typings/game.ts";
import { getTableColumn } from "../../utils/game.ts";

export const SearchGame = () => {
  const {
    allVendorGamesMap,
    allMsnGamesMap,
    allVendorGamesMapById,
    allMsnGamesMapById,
  } = useContext(StoreContext);
  const [ipt, setIpt] = useState("");
  const [fromVendor, setFromVendor] = useState([] as Game[]);
  const [fromMsn, setFromMsn] = useState([] as MsnGame[]);

  const handleGameNameInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setIpt(e.currentTarget?.value);
    },
    [],
  );

  const handleSearchName = useCallback(() => {
    const searchList = Array.from(new Set(ipt.trim().split("\n")));

    if (!searchList.length) {
      return;
    }

    const fromVendor_ = [];
    const fromMsn_ = [];

    for (const name of searchList) {
      if (allVendorGamesMap[name]) {
        fromVendor_.push(...allVendorGamesMap[name]);
      }

      if (allMsnGamesMap[name]) {
        fromMsn_.push(...allMsnGamesMap[name]);
      }
    }

    setFromVendor(fromVendor_);
    setFromMsn(fromMsn_);
  }, [ipt, allVendorGamesMap, allMsnGamesMap]);

  const handleSearchId = useCallback(() => {
    const searchList = Array.from(new Set(ipt.trim().split("\n")));

    if (!searchList.length) {
      return;
    }

    const fromVendor_ = [];
    const fromMsn_ = [];

    for (const item of searchList) {
      if (allVendorGamesMapById[item]) {
        fromVendor_.push(allVendorGamesMapById[item]);
      }

      if (allMsnGamesMapById[item]) {
        fromMsn_.push(allMsnGamesMapById[item]);
      }
    }

    setFromVendor(fromVendor_);
    setFromMsn(fromMsn_);
  }, [ipt, allVendorGamesMapById, allMsnGamesMapById]);

  return (
    <div className="search-game-wrap">
      <div className="">
        <p className="">请输入要检查的游戏的名字/ID（每行一个）</p>
        <Input.TextArea rows={10} value={ipt} onChange={handleGameNameInput} />
      </div>

      <div className="search-wrap">
        <Button onClick={handleSearchName}>搜名字</Button>
        <Button onClick={handleSearchId}>搜 ID</Button>
      </div>

      <Tabs
        items={[
          {
            key: "from-vendor",
            label: `接口(${fromVendor.length})`,
            children: (
              <GameTable
                list={fromVendor.map((game, i) =>
                  getTableColumn(game, "vendor", i),
                )}
              />
            ),
          },
          {
            key: "to-be-delete",
            label: `线上(${fromMsn.length})`,
            children: (
              <GameTable
                list={fromMsn.map((game, i) => getTableColumn(game, "msn", i))}
              />
            ),
          },
        ]}
      />
    </div>
  );
};
