import "./total-duplicates.css";
import { Table } from "antd";
import type { CheckDuplicateTableColumn } from "../../typings/check-duplicate.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import type { Game } from "../../typings/game.ts";
import { useContext } from "react";
import { GameDataContext } from "../../configs/game-data-context.ts";

function TotalDuplicate() {
  const gameDataContext = useContext(GameDataContext);
  const { allVendorGamesMap } = gameDataContext;
  const duplicatedGames = [] as Game[];

  for (const name in allVendorGamesMap) {
    if (!allVendorGamesMap.hasOwnProperty(name)) {
      continue;
    }

    const games = allVendorGamesMap[name];

    if (games.length < 2) {
      continue;
    }

    duplicatedGames.push(...games);
  }

  return (
    <div className="">
      <p className="">数据来自: 各个 vendor 提供的接口</p>
      <p className="">
        数量:
        <span className="">
          {new Set(duplicatedGames.map((d) => d.Name)).size}
        </span>
      </p>

      <Table
        pagination={{ pageSize: 50 }}
        dataSource={duplicatedGames.map(
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
    </div>
  );
}

export default TotalDuplicate;
