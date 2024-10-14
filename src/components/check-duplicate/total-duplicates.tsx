import "./total-duplicates.css";
import type { AllGames } from "../../utils/game-fetch.ts";
import { Table } from "antd";
import type { CheckDuplicateTableColumn } from "../../typings/check-duplicate.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import type { Game } from "../../typings/game.ts";

type Props = {
  allGames: AllGames;
};

function TotalDuplicate({ allGames }: Props) {
  console.info("allGames: AllGames;", allGames);

  const duplicatedGames = [] as Game[];

  for (const name in allGames) {
    if (!allGames.hasOwnProperty(name)) {
      continue;
    }

    const games = allGames[name];

    if (games.length < 2) {
      continue;
    }

    duplicatedGames.push(...games);
  }

  return (
    <div className="">
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
