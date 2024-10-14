import { Divider } from "antd";
import "./online-games-summary.css";

export const OnlineGamesSummary = () => {
  return (
    <div className="">
      <p className="">现有线上游戏的统计</p>

      <h4 className="">总数量</h4>
      <Divider />

      <h4 className="by-pc-web">按分类</h4>
      <div className="by-pc-web">
        <span className="">PC: 0</span>
        <span className="">WEB: 0</span>
        <span className="">PC + WEB: 0</span>
        <span className="">其他: 0</span>
      </div>
      <Divider />
    </div>
  );
};
