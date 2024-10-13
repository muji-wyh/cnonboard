import { Input, Popover } from "antd";
import { GameCard } from "../components/game-card/game-card.tsx";
import { type Game } from "../typings/game.ts";

const { TextArea } = Input;

export type CheckDuplicateTableColumn = {
  gameName: string;
  key: string;
  vendor: string;
  playUrl: string;
  game: Game;
};

export const checkDuplicateTableColumns = [
  {
    title: "游戏名称",
    key: "gameName",
    dataIndex: "gameName",
    render(_: string, { game }: CheckDuplicateTableColumn) {
      return (
        <Popover
          content={
            <TextArea
              className="game-detail-data"
              value={JSON.stringify(Object.assign(game), undefined, 4)}
            />
          }
          title="数据详情"
          trigger="click"
        >
          <span className="">{game.Name}</span>
        </Popover>
      );
    },
  },
  {
    title: "vendor",
    key: "vendor",
    dataIndex: "vendor",
    sorter: (a: CheckDuplicateTableColumn, b: CheckDuplicateTableColumn) =>
      a.vendor > b.vendor ? -1 : 1,
  },
  {
    title: "playUrl",
    key: "playUrl",
    dataIndex: "playUrl",
    render(_: string, g: CheckDuplicateTableColumn) {
      return (
        <div className="game-column">
          <GameCard game={g.game} type="vendor" />
          <GameCard game={g.game} type="msn" />
        </div>
      );
    },
  },
];
