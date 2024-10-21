import "./game-table.css";
import type { CheckDuplicateTableColumn } from "../../typings/check-duplicate.ts";
import { checkDuplicateTableColumns } from "../../configs/check-duplicate.tsx";
import { Button, Switch, Table } from "antd";
import className from "classnames";
import { useCallback, useContext, useMemo, useState } from "react";
import { StoreContext } from "../../configs/store-context.ts";

type Props = {
  list: CheckDuplicateTableColumn[];
  withMargin?: boolean;
};

export const GameTable = ({ list: list_, withMargin }: Props) => {
  const { pendingMap } = useContext(StoreContext);
  const [showPending, setPending] = useState(true);

  const [list, pendingList, notPendingList] = useMemo(() => {
    const p = [] as CheckDuplicateTableColumn[];
    const not = [] as CheckDuplicateTableColumn[];

    list_.forEach((d) => {
      if (pendingMap[d.vendor]?.[d.game.ExternalId]) {
        p.push(d);
        return;
      }

      not.push(d);
    });

    return [showPending ? p.concat(not) : not, p, not];
  }, [list_, showPending]);

  // todo-Yoki
  console.info("pending", pendingMap, list, pendingList, notPendingList);

  const handleChangePending = useCallback((v: boolean) => {
    setPending(v);
  }, []);

  return (
    <div
      className={className("game-table", {
        "with-margin": withMargin,
      })}
    >
      <div className="show-pending">
        <span className="label">展示 pending 的游戏</span>
        <Switch checked={showPending} onChange={handleChangePending} />
      </div>

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
