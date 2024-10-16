import "./total-duplicates.css";
import { Table } from "antd";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import type { Game } from "../../typings/game.ts";
import { useContext } from "react";
import { StoreContext } from "../../configs/store-context.ts";
import "./total-duplicates.css";
import { CopyResult } from "../copy-result/copy-result.tsx";
import { getTableColumn } from "../../utils/game.ts";

function TotalDuplicate() {
  const storeContext = useContext(StoreContext);
  const { allVendorGamesMap } = storeContext;
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
      <p className="result">
        <span className="">数量</span>
        <span className="">
          {new Set(duplicatedGames.map((d) => d.Name)).size}
        </span>
        {!!duplicatedGames.length && (
          <CopyResult list={duplicatedGames.map(({ Name }) => Name)} />
        )}
      </p>

      <Table
        pagination={{ pageSize: 50 }}
        dataSource={duplicatedGames.map((game, i) =>
          getTableColumn(game, "vendor", i),
        )}
        columns={checkDuplicateTableColumns}
      />
    </div>
  );
}

export default TotalDuplicate;
