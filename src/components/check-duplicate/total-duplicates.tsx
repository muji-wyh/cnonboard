import "./total-duplicates.css";
import type { Game } from "../../typings/game.ts";
import { useContext } from "react";
import { StoreContext } from "../../configs/store-context.ts";
import "./total-duplicates.css";
import { getTableColumn } from "../../utils/game.ts";
import { Tips } from "../tips/tips.tsx";
import { GameTable } from "../game-table/game-table.tsx";

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
    <div className="total-dup-container">
      <Tips content="各 vendor 相互查重" />

      <GameTable
        withMargin={true}
        list={duplicatedGames.map((game, i) =>
          getTableColumn(game, "vendor", i),
        )}
      />
    </div>
  );
}

export default TotalDuplicate;
