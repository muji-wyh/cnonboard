import "./game-table.css";
import type { CheckDuplicateTableColumn } from "../../typings/check-duplicate.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import { Button, Table } from "antd";
import className from "classnames";

type Props = {
  list: CheckDuplicateTableColumn[];
  withMargin?: boolean;
};

export const GameTable = ({ list, withMargin }: Props) => {
  return (
    <div
      className={className("game-table", {
        "with-margin": withMargin,
      })}
    >
      {!list.length ? (
        <p className="">无</p>
      ) : (
        <>
          <div className="header">
            <span className="total-num">
              总数:{" "}
              <span className="num">
                {new Set(list.map(({ game }) => game.Name)).size}
              </span>{" "}
            </span>
            <Button
              onClick={() => {
                navigator.clipboard
                  .writeText(list.map(({ gameName }) => gameName).join(", "))
                  .then(() => {
                    console.log("Text copied to clipboard");
                  })
                  .catch((err) => {
                    console.error("Failed to copy text: ", err);
                  });
              }}
            >
              复制名称（成行）
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard
                  .writeText(list.map(({ gameName }) => gameName).join("\n"))
                  .then(() => {
                    console.log("Text copied to clipboard");
                  })
                  .catch((err) => {
                    console.error("Failed to copy text: ", err);
                  });
              }}
            >
              复制名称（成列）
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard
                  .writeText(list.map(({ game }) => game.ExternalId).join("\n"))
                  .then(() => {
                    console.log("Text copied to clipboard");
                  })
                  .catch((err) => {
                    console.error("Failed to copy text: ", err);
                  });
              }}
            >
              复制 id（成列）
            </Button>
          </div>

          <div className="body">
            <Table
              dataSource={list}
              columns={checkDuplicateTableColumns}
              pagination={{ pageSize: 50 }}
            />
          </div>
        </>
      )}
    </div>
  );
};
