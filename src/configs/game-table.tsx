import { Input, Popover, Tag } from "antd";
import { GameCard } from "../components/game-card/game-card.tsx";
import type { CheckDuplicateTableColumn } from "../typings/check-duplicate.ts";
import "./game-table.css";

const { TextArea } = Input;

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
    title: "from",
    key: "vendor",
    dataIndex: "vendor",
    sorter: (a: CheckDuplicateTableColumn, b: CheckDuplicateTableColumn) =>
      a.vendor > b.vendor ? -1 : 1,
  },
  {
    title: "genres",
    key: "genres",
    dataIndex: "genres",
    render(_: string, { game }: CheckDuplicateTableColumn) {
      return (
        <div className="genre-list">
          {game.Genres.map((genre) => (
            <Tag color="#108ee9" key={genre}>
              {genre}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: "heroThumbnails",
    key: "heroThumbnails",
    dataIndex: "heroThumbnails",
    render(_: string, { game }: CheckDuplicateTableColumn) {
      return (
        <div className="heroThumbnails-column">
          <div className="heroThumbnails-item">
            <img
              referrerPolicy="no-referrer"
              src={game.HeroThumbnail}
              alt={game.Name}
              className="img"
              style={{
                height: "124px",
                verticalAlign: "top",
              }}
            />
            <span className="label">HeroThumbnail</span>
          </div>

          <div className="heroThumbnails-item">
            <img
              referrerPolicy="no-referrer"
              src={game.Thumbnail16x9}
              alt={game.Name}
              className="img"
              style={{
                height: "124px",
                verticalAlign: "top",
              }}
            />
            <span className="label">Thumbnail16x9</span>
          </div>
        </div>
      );
    },
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
  {
    title: "MF",
    key: "mobileFriendly",
    dataIndex: "mobileFriendly",
    render(_: string, g: CheckDuplicateTableColumn) {
      return (
        <div className="game-column mobile-friendly">
          {g.game.MobileFriendly ? (
            <Tag color="#87d068">Yes</Tag>
          ) : (
            <Tag color="#f50">No</Tag>
          )}
        </div>
      );
    },
  },
  {
    title: "fullDescription",
    key: "fullDescription",
    dataIndex: "fullDescription",
    render(_: string, g: CheckDuplicateTableColumn) {
      return (
        <div className="fullDescription-column">
          <TextArea
            className="fullDescription-textarea"
            value={JSON.stringify(g.game.FullDescription, undefined, 4)}
          />
        </div>
      );
    },
  },
  {
    title: "diff",
    key: "diff",
    dataIndex: "diff",
    render(_: string, data: CheckDuplicateTableColumn) {
      return (
        <div className="diff-column">
          {!data.diff ? (
            <Tag color="#f50">No</Tag>
          ) : (
            <TextArea
              className="game-detail-diff"
              value={JSON.stringify(data.diff, undefined, 4)}
            />
          )}
        </div>
      );
    },
  },
];
