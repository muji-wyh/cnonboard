import { Card, List } from "antd";
import "./online-games-summary.css";
import { useContext, useMemo } from "react";
import { StoreContext } from "../../configs/store-context.ts";
import className from "classnames";

export const OnlineGamesSummary = ({ hide }: { hide?: boolean }) => {
  const storeContext = useContext(StoreContext);

  const { allMsnGames, allMsnGamesByVendor } = storeContext;

  // todo-Yoki
  console.info(">>> allMsnGames", allMsnGames, allMsnGamesByVendor);

  const dataSource = useMemo(() => {
    return [
      {
        title: "total",
        value: !!allMsnGames.length ? (
          <span className="">{allMsnGames.length}</span>
        ) : (
          <span className="data-error" onClick={() => window.location.reload()}>
            数据异常,点击刷新
          </span>
        ),
      },
      ...Object.keys(allMsnGamesByVendor).map((v) => ({
        title: v,
        value: allMsnGamesByVendor[v].length,
      })),
    ];
  }, [allMsnGames, allMsnGamesByVendor]);

  return (
    <div className={className("summary-component", { hide })}>
      <List
        grid={{ gutter: 8, column: 8 }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} size="small">
              {item.value}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
