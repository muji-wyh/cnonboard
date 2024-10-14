import { Divider } from "antd";
import "./online-games-summary.css";
import { useContext } from "react";
import { StoreContext } from "../../configs/store-context.ts";

export const OnlineGamesSummary = () => {
  const storeContext = useContext(StoreContext);

  const { allMsnGames, allMsnGamesByVendor } = storeContext;

  // todo-Yoki
  console.info(">>> allMsnGames", allMsnGames, allMsnGamesByVendor);

  return (
    <div className="">
      <p className="">现有线上游戏的统计</p>

      <h4 className="">总数量: {allMsnGames.length}</h4>

      <Divider />

      <h4 className="">按分类</h4>
      <ul className="genre-list">
        {Object.keys(allMsnGamesByVendor).map((vendor) => (
          <li key={vendor} className="genre-item">
            <span className="label">{vendor}</span>
            <span className="content">
              {allMsnGamesByVendor[vendor].length}
            </span>
          </li>
        ))}
      </ul>
      <Divider />
    </div>
  );
};
